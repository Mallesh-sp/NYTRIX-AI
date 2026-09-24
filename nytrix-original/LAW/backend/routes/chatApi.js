const express = require('express');
const router = express.Router();
const mockDb = require('../services/mockDatabase');

// Groq AI Configuration
const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
// Available Groq models in fallback order
const GROQ_MODELS = [
  'openai/gpt-oss-120b',
  'groq/compound',
  'qwen/qwen3.8-27b',
  'openai/gpt-oss-20b',
  'groq/compound-mini'
];

// System prompt for the AI assistant
const SYSTEM_PROMPT = `You are "Nytrix AI", India's premier Legal Intelligence and Legal Action Assistant.
You are dedicated to empowering citizens with clear, objective, and comprehensive legal guidance on Indian laws (IPC, Bharatiya Nyaya Sanhita (BNS), CrPC, Bharatiya Nagarik Suraksha Sanhita (BNSS), Indian Evidence Act / Bharatiya Sakshya Adhiniyam (BSA), IT Act 2000, Hindu Marriage Act, Domestic Violence Act, Consumer Protection Act, Labour Laws, and related statutes).

CORE DIRECTIVE:
Whenever a user shares their situation, problem, suggestion, or legal query (in English, Tamil, Tanglish, Hindi, or any language):
Always provide a complete, actionable, and structured response covering these 4 ESSENTIAL PILLARS:

### ⚖️ 1. Applicable Indian Laws & Sections (பொருந்தும் சட்டங்கள்)
- Specifically cite all applicable sections from Indian law (include both legacy IPC/CrPC and modern BNS/BNSS equivalents).
- State clearly whether the offense is Cognizable vs Non-Cognizable, Bailable vs Non-Bailable, and the prescribed punishment.

### 🚨 2. Illegal Actions & Available Legal Actions/Remedies (சட்டவிரோத செயல்கள் & சட்ட நடவடிக்கைகள்)
- Identify the unlawful or illegal actions committed against the user (e.g. extortion, false accusation, cheating, arbitrary detention, breach of trust, harassment).
- Clearly list all legal actions/remedies available to the user (e.g., Filing an FIR under Sec 154 CrPC, filing for Anticipatory Bail under Sec 438 CrPC / 482 BNSS, High Court quashing under Sec 482 CrPC / 528 BNSS, filing counter-complaint for false charges under IPC 182/211/BNS 248, defamation suit under IPC 499/500, issuing advocate legal notice).

### 📋 3. What You Should Do: Step-by-Step Action Plan (நீங்கள் என்ன செய்ய வேண்டும்?)
- **Immediate Steps (Next 24-48 Hours)**: What exact actions to take right away (securing safety, not deleting messages, obtaining legal representation if arrest is threatened).
- **Formal Procedures**: How to lodge a formal complaint, approach senior police officers (SP/Commissioner) under Sec 154(3) CrPC if local police refuse to register FIR, or approach the Magistrate under Sec 156(3) CrPC.
- **Defense & Court Strategy**: Preparing counter-affidavits, mediation guidelines, or filing for quashing/discharge.

### 📁 4. Required Evidence Checklist & Crucial Precautions (தேவையான ஆதாரங்கள் & செய்யக்கூடாதவை)
- **Evidence Checklist**: Specific proofs needed (WhatsApp chats, call recordings, emails, bank statements, CCTV, Section 65B Evidence Act / Section 63 BSA certificate).
- **Crucial Do's & Don'ts**: Mistakes to strictly avoid (do NOT delete chats, do NOT pay extortion money, do NOT sign blank papers, do NOT confront alone).
- **Recommended Lawyer & Free Helplines**: Type of advocate to hire + Free Legal Aid (National Legal Services Authority NALSA Helpline: 15100, Cyber Crime Portal: 1930 / cybercrime.gov.in).

LANGUAGE FLEXIBILITY:
- Understand English, Tamil, and Tanglish queries natively.
- If the user asks in Tamil or Tanglish (e.g., "panam kuduthuten thirumba tharala enna panrathu", "false case potutanga enna legal action edukalam"), explain clearly so that the user immediately knows:
  1) என்னென்ன சட்டப் பிரிவுகள் பொருந்தும் (What laws apply)
  2) என்ன சட்ட நடவடிக்கைகள் உள்ளன (What legal actions exist)
  3) அவர்கள் என்ன செய்ய வேண்டும் (What they should do)
- Format with clean markdown headings, bold terms, bullet points, and checkmarks for maximum clarity.`;

// Store conversation histories for each session
const conversationHistories = new Map();

/**
 * Send message to Groq AI with multi-model fallback
 */
async function sendToGroqAI(messages) {
  let lastError = null;

  for (const model of GROQ_MODELS) {
    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: model,
          messages: messages,
          temperature: 0.7,
          max_tokens: 2500,
          top_p: 0.95
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`⚠️ Groq model [${model}] returned ${response.status}: ${errorText.substring(0, 150)}`);
        lastError = new Error(`Groq model ${model} failed (${response.status})`);
        continue; // Try next model
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (content && content.trim().length > 0) {
        console.log(`✅ AI Response generated successfully using model: ${model}`);
        return content;
      }
    } catch (error) {
      console.warn(`⚠️ Groq model [${model}] network error: ${error.message}`);
      lastError = error;
    }
  }

  throw lastError || new Error('All Groq models failed to respond.');
}

/**
 * Chat endpoint - Main conversation handler
 */
router.post('/chat', async (req, res) => {
  try {
    const { message, sessionId, files } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get or create conversation history for this session
    const session = sessionId || 'default';
    if (!conversationHistories.has(session)) {
      conversationHistories.set(session, []);
    }
    const history = conversationHistories.get(session);

    // Build enhanced message with file context
    let enhancedMessage = message;
    
    if (files && Array.isArray(files) && files.length > 0) {
      const fileDescriptions = files.map(file => {
        const fileType = file.type || 'unknown';
        const fileName = file.name || 'unnamed file';
        
        if (fileType.startsWith('image/')) {
          return `[User uploaded an image: "${fileName}". This appears to be a legal document, screenshot, or evidence photo. Please provide guidance on what legal documents commonly look like, how to verify authenticity, and what legal implications images/photos might have as evidence.]`;
        } else if (fileType === 'application/pdf') {
          return `[User uploaded a PDF document: "${fileName}". This could be a legal notice, court order, FIR, contract, or other legal document. Please provide guidance on understanding legal documents, important sections to look for, and general advice about this type of document.]`;
        } else if (fileType.includes('word') || fileType === 'application/msword') {
          return `[User uploaded a Word document: "${fileName}". This could be a draft legal notice, agreement, or correspondence. Please provide guidance on reviewing legal documents and important clauses to look for.]`;
        } else if (fileType === 'text/plain') {
          return `[User uploaded a text file: "${fileName}". Please help analyze any legal content that might be mentioned.]`;
        }
        return `[User uploaded a file: "${fileName}" of type "${fileType}".]`;
      }).join('\n');
      
      enhancedMessage = `${message}\n\n---\nFile Context:\n${fileDescriptions}\n\nNote: While I cannot directly read or view the uploaded files, I can provide guidance based on the type of document you've shared. Please describe the key contents or questions about the document, and I'll help you understand the legal aspects.`;
    }

    // Add user message to history
    history.push({ role: 'user', content: enhancedMessage });

    // Keep only last 20 messages to manage context window
    const recentHistory = history.slice(-20);

    // 1. RAG Retrieval from Indian Legal Database
    let retrievedContext = '';
    try {
      const searchResult = mockDb.searchLegalDatabase({
        query: message,
        limit: 4
      });

      if (searchResult && searchResult.sections && searchResult.sections.length > 0) {
        console.log(`📚 RAG Retrieval found ${searchResult.sections.length} relevant sections for query: "${message.substring(0, 50)}..."`);
        retrievedContext = `\n\n[VERIFIED INDIAN STATUTE & SECTION RETRIEVAL - RAG KNOWLEDGE BASE]:\n` +
          searchResult.sections.map(s => 
            `• ${s.act.name} (${s.act.short_name}) - Section ${s.section_number}: ${s.section_title}\n` +
            `  Summary: ${s.summary}\n` +
            `  Offence Type: ${s.offence_type || 'Specified under law'} | Punishment: ${s.punishment || 'Prescribed by Court'}`
          ).join('\n') + `\nExplicitly cite and integrate these verified statutory sections into your legal analysis.`;
      }
    } catch (ragErr) {
      console.warn('RAG retrieval notice:', ragErr.message);
    }

    // Build messages array for LLM with RAG-augmented system prompt
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT + retrievedContext },
      ...recentHistory
    ];

    // Get AI response
    let aiResponse = '';
    try {
      aiResponse = await sendToGroqAI(messages);
    } catch (aiErr) {
      console.warn('⚠️ Groq AI models failed or unavailable. Falling back to built-in Legal Intelligence Engine:', aiErr.message);
      aiResponse = generateLocalLegalFallback(message);
    }

    // Add AI response to history
    history.push({ role: 'assistant', content: aiResponse });

    // Update history (keep last 50 messages)
    if (history.length > 50) {
      conversationHistories.set(session, history.slice(-50));
    }

    res.json({
      success: true,
      message: aiResponse,
      sessionId: session,
      timestamp: Date.now()
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    // Even on uncaught errors, return a helpful legal assistant fallback instead of crashing
    const fallbackResponse = generateLocalLegalFallback(req.body?.message || 'legal query');
    res.json({
      success: true,
      message: fallbackResponse,
      sessionId: req.body?.sessionId || 'default',
      timestamp: Date.now()
    });
  }
});

/**
 * Built-in Legal Intelligence Fallback Engine
 * Generates structured, actionable legal intelligence when external LLMs are unavailable
 */
function generateLocalLegalFallback(query) {
  const q = (query || '').toLowerCase().trim();
  
  // 1. Greetings & Pleasantries
  const greetings = ['hi', 'hello', 'hey', 'vanakkam', 'வணக்கம்', 'namaste', 'namaskaram', 'good morning', 'good afternoon', 'good evening', 'hi nytrix', 'hello nytrix', 'start', 'help', 'hi sir', 'hello sir'];
  if (greetings.includes(q) || q === 'hi!' || q === 'hello!' || q.startsWith('hi ') || q.startsWith('hello ') || q.startsWith('hey ')) {
    return `Hello! 👋 Welcome to **Nytrix AI** — your AI Legal Intelligence and Legal Rights Assistant for India.

I am here to guide you with complete legal awareness, applicable laws, and step-by-step remedies for your situation.

### 💡 What I can help you with:
* ⚖️ **Indian Laws & Sections**: Detailed explanation of IPC / Bharatiya Nyaya Sanhita (BNS), CrPC / BNSS, IT Act, Labour Laws, Consumer Protection, etc.
* 🚨 **Legal Action & Remedies**: What actions you can take if you're facing false accusations, extortion/blackmail, financial fraud, police harassment, workplace disputes, or marital issues.
* 📋 **Step-by-Step Action Plan**: How to file an FIR, send an advocate legal notice, apply for Anticipatory Bail, or approach the High Court.
* 📁 **Evidence Checklist**: What documents, audio recordings, or WhatsApp chats you need to preserve.

---
✨ **How can I help you today?** Please share your problem, situation, or legal question in **English**, **தமிழ் (Tamil)**, or **Tanglish**!`;
  }

  // 2. Identity & About
  if (q.includes('who are you') || q.includes('who made you') || q.includes('who created you') || q.includes('owner') || q.includes('about you') || q === 'who is nytrix') {
    return `I am **Nytrix AI**, India's premier Legal Intelligence & Legal Action Platform.

* 🏛️ **Created & Owned by**: **MALLESH SP**
* 💻 **Built by**: **Keseven, Manojkumar, and Jainithil**
* 🎯 **Mission**: Empowering Indian citizens with clear legal awareness, verified statutory sections (IPC/BNS, CrPC/BNSS), lawful steps to take, and defense strategies.

You can ask me any legal questions or share any situation you are facing. How can I assist you today? ⚖️`;
  }

  // 3. Thanks & Gratitude
  if (q.includes('thank') || q.includes('nandri') || q === 'thx' || q === 'thanks a lot') {
    return `You're very welcome! 🙏 Glad I could be of help.

If you have any further questions about Indian laws, court procedures, or evidence collection, feel free to ask anytime. Stay informed, stay safe, and remember: knowing your rights is your strongest defense! ⚖️`;
  }

  // 4. "How are you"
  if (q.includes('how are you') || q.includes('epdi iruka') || q.includes('how r u')) {
    return `I'm doing great, thank you for asking! 😊 I'm fully ready to assist you with any legal queries or advice under Indian law.

What situation or legal question would you like to explore today?`;
  }

  // Specific specialized scenarios
  if (q.includes('498a') || q.includes('dowry') || q.includes('cruelty') || q.includes('marital') || q.includes('wife') || q.includes('divorce') || q.includes('custody') || q.includes('maintenance') || q.includes('pondati') || q.includes('kalyanam') || q.includes('kudumbam')) {
    return `### ⚖️ 1. Applicable Indian Laws & Sections (பொருந்தும் சட்டங்கள்)
* **IPC Section 498A / Bharatiya Nyaya Sanhita (BNS) Section 85**: Matrimonial cruelty by husband or relatives (Cognizable, Non-Bailable; Up to 3 years imprisonment).
* **Section 438 CrPC / BNSS Section 482**: Anticipatory Bail provision to prevent arbitrary arrest.
* **Section 41A CrPC / BNSS Section 35(3)**: Mandatory notice before arrest (*Arnesh Kumar v. State of Bihar* Supreme Court guidelines).
* **IPC Section 182 & 211 / BNS Section 248**: Punishment for false charges and malicious criminal complaints.
* **IPC Section 506 / BNS Section 351**: Criminal intimidation and extortion threats.
* **Section 482 CrPC / BNSS Section 528**: High Court power to quash fabricated FIRs.

---

### 🚨 2. Illegal Actions Committed & Your Legal Remedies (சட்டவிரோத செயல்கள் & சட்ட நடவடிக்கைகள்)
* **Unlawful Actions Against You**: Fabrication of false domestic violence/dowry allegations, extortion threats to settle disputes, police harassment without 41A notice.
* **Legal Remedies You Can Take**:
  1. **File for Anticipatory Bail** immediately in Sessions Court or High Court.
  2. **File High Court Quashing Petition** under Section 482 CrPC / 528 BNSS to nullify false FIR.
  3. **File Counter-Complaint** under IPC 182/211 (False complaint) and IPC 506 (Criminal intimidation).
  4. **Claim Defamation Damages** under Section 499/500 IPC for reputational injury.

---

### 📋 3. What You Should Do: Step-by-Step Action Plan (நீங்கள் என்ன செய்ய வேண்டும்?)
* **Step 1 (Immediate - First 24-48 Hours)**:
  * Secure all communication logs (WhatsApp messages, audio calls, emails, photos).
  * Do NOT delete any conversation history.
  * Contact a criminal defense advocate to move an Anticipatory Bail application.
* **Step 2 (Response to Police & Mediation)**:
  * If summoned by police or Mahila Thana/CAW Cell, appear only with an advocate or written reply citing Section 41A compliance.
  * Do not sign any blank documents or forced compromise deeds.
* **Step 3 (Court Defense Strategy)**:
  * Present documented evidence showing separate residence, lack of dowry demands, and genuine financial independence.

---

### 📁 4. Required Evidence Checklist & Crucial Precautions (தேவையான ஆதாரங்கள் & செய்யக்கூடாதவை)
* [x] **Digital Records**: Complete WhatsApp chats, audio call recordings, emails.
* [x] **Section 65B Certificate**: Mandatory electronic evidence admissibility certificate.
* [x] **Financial Proof**: Bank statements, bills showing household expenses, absence of cash demands.
* [x] **Witness & Alibi Proof**: Office attendance records, CCTV logs, independent witness affidavits.
* **DO**: Communicate strictly in writing; preserve original mobile phone and memory devices.
* **DON'T**: Do not abuse or retaliate; do not post on social media; do not sign blank papers under duress.
* **Legal Help**: Senior Criminal Defense & Matrimonial Advocate | **NALSA Helpline: 15100**.`;
  }

  if (q.includes('panam') || q.includes('money') || q.includes('cheat') || q.includes('fraud') || q.includes('420') || q.includes('kadan') || q.includes('loan') || q.includes('upi') || q.includes('invest') || q.includes('scam') || q.includes('thiruttu') || q.includes('mosam')) {
    return `### ⚖️ 1. Applicable Indian Laws & Sections (பொருந்தும் சட்டங்கள்)
* **IPC Section 420 / Bharatiya Nyaya Sanhita (BNS) Section 318(4)**: Cheating and dishonestly inducing delivery of property (Cognizable, Non-Bailable; Up to 7 years imprisonment + Fine).
* **IPC Section 406 / BNS Section 316**: Criminal Breach of Trust (Cognizable, Non-Bailable; Up to 3 years imprisonment).
* **Section 138 Negotiable Instruments Act**: Dishonour of Cheque for insufficiency of funds (Criminal complaint with up to 2 years jail or double amount fine).
* **Information Technology Act Section 66D**: Cheating by personation using computer resource or online UPI fraud (Cognizable, Non-Bailable; Up to 3 years).
* **Order 37 Civil Procedure Code (CPC)**: Summary suit for quick recovery of debt with interest.

---

### 🚨 2. Illegal Actions Committed & Your Legal Remedies (சட்டவிரோத செயல்கள் & சட்ட நடவடிக்கைகள்)
* **Unlawful Actions Committed**: Fraudulent inducement to part with money, dishonouring commitments, fraudulent financial misrepresentation.
* **Legal Remedies You Can Take**:
  1. **Lodge Criminal Police Complaint/FIR** under IPC Section 420/406 at the jurisdictional police station.
  2. **National Cyber Crime Helpline (1930)**: If fraud was executed online, lodge a complaint immediately to freeze beneficiary bank accounts.
  3. **Issue Statutory Advocate Legal Notice**: Send a 15-day formal legal demand notice for full repayment with interest.
  4. **File Order 37 CPC Summary Suit**: File in Civil Court for rapid recovery of the outstanding sum.
  5. **Approach Magistrate under Sec 156(3) CrPC**: If local police hesitate to register an FIR, file a direct petition before the Judicial Magistrate.

---

### 📋 3. What You Should Do: Step-by-Step Action Plan (நீங்கள் என்ன செய்ய வேண்டும்?)
* **Step 1 (Within 24 Hours)**:
  * Collect bank transaction statements, UPI UTR numbers, account details, and payment receipts.
  * If online fraud occurred within the last 24 hours ("Golden Hour"), dial **1930** immediately to freeze the recipient account.
* **Step 2 (Formal Demand & Police Action)**:
  * Issue a formal advocate demand notice giving 15 days time for repayment.
  * Submit a detailed written complaint to the Station House Officer (SHO) with copies of transaction receipts and WhatsApp acknowledgments of debt.
* **Step 3 (Judicial Escalation)**:
  * If police fail to take action within 15 days, send the complaint by registered post to the Superintendent of Police (SP) / Commissioner under Sec 154(3) CrPC.
  * If still unresolved, your lawyer can file an application under Sec 156(3) CrPC before the Magistrate.

---

### 📁 4. Required Evidence Checklist & Crucial Precautions (தேவையான ஆதாரங்கள் & செய்யக்கூடாதவை)
* [x] **Financial Documents**: Bank account statements, UPI/NEFT transfer receipts with transaction UTR numbers.
* [x] **Acknowledgment of Debt**: WhatsApp chats, SMS, emails where the other party admits taking money or promising repayment.
* [x] **Promissory Note / Cheques**: Cheque copies, return memos, signed loan receipts, or written agreements.
* [x] **Section 65B Certificate**: For printing WhatsApp/SMS communications as valid court evidence.
* **DO**: Keep all original receipts and proof of communication safe.
* **DON'T**: Do not use threats or violence to recover money (this could lead to counter-complaints under IPC 506/384).
* **Helpline Support**: Cyber Crime Helpline **1930** / [cybercrime.gov.in](https://cybercrime.gov.in) | Legal Aid: **15100**.`;
  }

  if (q.includes('police') || q.includes('arrest') || q.includes('false') || q.includes('fir') || q.includes('threat') || q.includes('mirattal') || q.includes('station') || q.includes('summons')) {
    return `### ⚖️ 1. Applicable Indian Laws & Sections (பொருந்தும் சட்டங்கள்)
* **Constitution of India Article 21 & 22**: Fundamental rights protecting personal liberty and guaranteeing the right to be defended by a legal practitioner.
* **Section 41A CrPC / BNSS Section 35(3)**: Mandatory notice of appearance before arrest for offences punishable up to 7 years (*Arnesh Kumar Supreme Court guidelines*).
* **Section 438 CrPC / BNSS Section 482**: Anticipatory Bail remedy in Sessions Court and High Court.
* **IPC Section 182 & 211 / BNS Section 248**: Severe punishment for lodging false criminal complaints and fabricating evidence.
* **IPC Section 166A**: Punishment for public servants disobeying directions of law (police refusing FIR or committing illegal arrest).
* **Section 482 CrPC / BNSS Section 528**: High Court power to quash illegal investigations or malicious complaints.

---

### 🚨 2. Illegal Actions Committed & Your Legal Remedies (சட்டவிரோத செயல்கள் & சட்ட நடவடிக்கைகள்)
* **Unlawful Actions**: Threats of arbitrary arrest, harassment without summons, extortion of compromise, custodial intimidation.
* **Legal Remedies You Can Take**:
  1. **Apply for Anticipatory Bail** immediately to secure judicial protection against arrest.
  2. **Demand Written Notice under Section 41A**: Police cannot arrest you without a documented reason if the alleged offence carries <= 7 years.
  3. **Writ Petition under Article 226**: Approach High Court for directions or protection against police harassment.
  4. **Complaint to Police Complaints Authority / Human Rights Commission (SHRC)**: For abuse of power and threats.

---

### 📋 3. What You Should Do: Step-by-Step Action Plan (நீங்கள் என்ன செய்ய வேண்டும்?)
* **Step 1 (Immediate - Do Not Panic)**:
  * Do NOT visit any police station alone. Always accompany an advocate or trusted family members.
  * Inform trusted relatives of your location and keep your phone's location history turned ON.
* **Step 2 (Legal Representation)**:
  * Engage a criminal defense advocate to draft a pre-emptive Anticipatory Bail petition.
  * If police call verbally, politely request an official summons or Section 41A notice in writing.
* **Step 3 (Escalation Against Harassment)**:
  * Submit a written representation to the Commissioner of Police / Superintendent of Police detailing threats and harassment.
  * Approach the State High Court under Section 482 CrPC to seek direction preventing police harassment.

---

### 📁 4. Required Evidence Checklist & Crucial Precautions (தேவையான ஆதாரங்கள் & செய்யக்கூடாதவை)
* [x] **Call Records & Audio**: Audio recordings of police calls, threat messages, or third-party intimidation.
* [x] **Alibi Proof**: Proof of whereabouts (CCTV, office biometric records, GPS Google timeline, tickets).
* [x] **Written Notices**: Copies of any notices received (or written proof that oral threats were made).
* **DO**: Assert your constitutional right to speak to an advocate before answering interrogations.
* **DON'T**: Do NOT sign blank papers, pre-written confession statements, or unauthorized compromise bonds.
* **Free Legal Aid**: National Legal Services Authority (NALSA) Toll-Free: **15100**.`;
  }

  if (q.includes('rape') || q.includes('blackmail') || q.includes('extortion') || q.includes('photo') || q.includes('video') || q.includes('cyber')) {
    return `### ⚖️ 1. Applicable Indian Laws & Sections (பொருந்தும் சட்டங்கள்)
* **IPC Section 384 / BNS Section 308**: Extortion (Cognizable, Non-Bailable; Up to 3 years imprisonment).
* **Information Technology Act Section 66E**: Violation of privacy by capturing or transmitting private photos without consent (Cognizable, Bailable; Up to 3 years).
* **Information Technology Act Section 67 / 67A**: Publishing sexually explicit content electronically (Cognizable, Non-Bailable; Up to 5 years + ₹10 Lakh fine).
* **IPC Section 506 / BNS Section 351**: Criminal intimidation.
* **Section 438 CrPC / BNSS Section 482**: Anticipatory Bail if false counter-charges are threatened.

---

### 🚨 2. Illegal Actions Committed & Your Legal Remedies (சட்டவிரோத செயல்கள் & சட்ட நடவடிக்கைகள்)
* **Unlawful Actions**: Demanding money under threat of sharing private media, non-consensual image distribution, criminal extortion.
* **Legal Remedies You Can Take**:
  1. **Lodge Immediate Cyber Crime Complaint**: File at [cybercrime.gov.in](https://cybercrime.gov.in) or call 1930.
  2. **File Criminal FIR for Extortion**: Under IPC Section 384 and IT Act Sections 66E & 67A.
  3. **Takedown Notice**: Cyber police mandate immediate social media platforms takedown under IT Rules 2021.
  4. **Anticipatory Bail Protection**: If blackmailer threatens to file false sexual assault allegations.

---

### 📋 3. What You Should Do: Step-by-Step Action Plan (நீங்கள் என்ன செய்ய வேண்டும்?)
* **Step 1 (Immediate - Do Not Pay Money)**:
  * Do NOT transfer any amount. Extortionists never stop after the first payment.
  * Stop replying immediately, but DO NOT block before taking full screenshots.
* **Step 2 (Capture Digital Evidence)**:
  * Capture clear screenshots showing blackmailer's account profile, phone numbers, UPI payment IDs, and threat chats with timestamps.
* **Step 3 (Report to Authorities)**:
  * Call National Cyber Crime Helpline **1930** and register a complaint.
  * File a formal complaint at your district Cyber Crime Police Station.

---

### 📁 4. Required Evidence Checklist & Crucial Precautions (தேவையான ஆதாரங்கள் & செய்யக்கூடாதவை)
* [x] **Evidence**: Full chat export, screenshots of threat messages, extortion demand UPI/bank details, audio recordings.
* [x] **Section 65B Certificate**: Prepared by advocate for digital admissibility.
* **DO**: Report immediately to Cyber Cell; keep original device untouched.
* **DON'T**: Do not delete chat logs; do not pay ransom; do not give in to fear.
* **Helpline Support**: Cyber Crime Helpline **1930** (24x7) | [cybercrime.gov.in](https://cybercrime.gov.in).`;
  }

  if (q.includes('property') || q.includes('land') || q.includes('tenant') || q.includes('rent') || q.includes('evict') || q.includes('advance') || q.includes('veedu') || q.includes('deposit')) {
    return `### ⚖️ 1. Applicable Indian Laws & Sections (பொருந்தும் சட்டங்கள்)
* **Transfer of Property Act 1882 & State Rent Control / Tenancy Act**: Governs lease contracts, eviction norms, and tenant-landlord covenants.
* **Specific Relief Act 1963 Section 6**: Summary suit for restoration of possession if dispossessed without due process of law.
* **IPC Section 441 & 447 / BNS Section 329**: Criminal trespass into property.
* **Order 39 Rules 1 & 2 CPC**: Temporary injunction application to prevent forceful eviction or unauthorized construction.
* **IPC Section 506 / BNS Section 351**: Criminal intimidation.

---

### 🚨 2. Illegal Actions Committed & Your Legal Remedies (சட்டவிரோத செயல்கள் & சட்ட நடவடிக்கைகள்)
* **Unlawful Actions**: Forcible eviction without court decree, cutting electricity/water supplies, retaining security deposit unlawfully, illegal land encroachment.
* **Legal Remedies You Can Take**:
  1. **File Injunction Suit in Civil Court**: Obtain a temporary stay order preventing dispossession.
  2. **File Petition before Rent Controller / Tenancy Court**: For restoration of essential amenities and deposit refund.
  3. **Lodge Police Complaint for Criminal Trespass**: Under IPC 447/506 if goons or threats are used.
  4. **Send Advocate Legal Notice**: Demanding return of advance deposit within 15 days with interest.

---

### 📋 3. What You Should Do: Step-by-Step Action Plan (நீங்கள் என்ன செய்ய வேண்டும்?)
* **Step 1 (Preserve Documents)**: Gather rental agreement, monthly rent bank transfer receipts, advance payment receipts, and property tax records.
* **Step 2 (Issue Legal Notice)**: Issue an advocate legal notice citing breach of contract and demanding adherence to law.
* **Step 3 (Civil Court Protection)**: File an urgent injunction suit under Order 39 CPC to prevent illegal eviction.

---

### 📁 4. Required Evidence Checklist & Crucial Precautions (தேவையான ஆதாரங்கள் & செய்யக்கூடாதவை)
* [x] Registered/signed Rental Agreement or Sale Deed.
* [x] Bank passbook showing regular rent payments and initial security deposit transfer.
* [x] Photographs/videos of property status, water/electricity meter records.
* **DO**: Pay rent strictly via bank transfer or cheque; obtain written receipts.
* **DON'T**: Do not vacate under oral threats; do not take the law into your own hands.
* **Legal Assistance**: Property & Civil Rights Advocate | **NALSA Helpline: 15100**.`;
  }

  if (q.includes('salary') || q.includes('job') || q.includes('work') || q.includes('termination') || q.includes('employer') || q.includes('wages') || q.includes('sambalam') || q.includes('velai')) {
    return `### ⚖️ 1. Applicable Indian Laws & Sections (பொருந்தும் சட்டங்கள்)
* **Payment of Wages Act 1936 / Code on Wages 2019**: Mandatory payment of earned salary without unlawful deductions.
* **Industrial Disputes Act 1947 Section 25F**: Mandatory notice and retrenchment compensation before terminating workmen.
* **State Shops and Establishments Act**: Governs working hours, leave encashment, and service termination regulations.
* **Indian Contract Act 1872 Section 73**: Compensation for breach of employment contract.

---

### 🚨 2. Illegal Actions Committed & Your Legal Remedies (சட்டவிரோத செயல்கள் & சட்ட நடவடிக்கைகள்)
* **Unlawful Actions**: Non-payment of earned wages, illegal termination without notice period pay, refusing to return educational certificates.
* **Legal Remedies You Can Take**:
  1. **Complaint to the Labour Commissioner**: Under the Payment of Wages Act / Industrial Disputes Act.
  2. **Statutory Legal Notice through Advocate**: Demanding immediate settlement of unpaid salary, gratuity, and PF dues.
  3. **Approach Labour Court / Industrial Tribunal**: For reinstatement with back wages or statutory compensation.

---

### 📋 3. What You Should Do: Step-by-Step Action Plan (நீங்கள் என்ன செய்ய வேண்டும்?)
* **Step 1**: Download and preserve offer letter, appointment letter, payslips, attendance records, and performance emails.
* **Step 2**: Send a formal written grievance to HR and Management demanding clearance within 7 days.
* **Step 3**: If unresolved, send an advocate legal notice and file a complaint before the District Labour Officer.

---

### 📁 4. Required Evidence Checklist & Crucial Precautions (தேவையான ஆதாரங்கள் & செய்யக்கூடாதவை)
* [x] Offer letter, employment contract, resignation/termination email.
* [x] Payslips, bank statements showing salary credits, PF account statement.
* [x] Email exchanges with supervisor regarding assigned tasks and completion.
* **DO**: Keep personal copies of all employment records outside company email servers.
* **DON'T**: Do not sign blank full & final settlement release forms without receiving payment.
* **Legal Help**: Labour & Employment Law Advocate | **National Legal Aid: 15100**.`;
  }

  // General Comprehensive Legal Guidance Fallback
  return `### ⚖️ 1. Applicable Indian Laws & Sections (பொருந்தும் சட்டங்கள்)
* **Constitutional Protections (Articles 21 & 22)**: Guaranteeing personal liberty, right to fair procedure, and right to consult an advocate.
* **Bharatiya Nyaya Sanhita (BNS) / Indian Penal Code (IPC)**: Governs criminal liability, fraud, assault, defamation, and intimidation.
* **Bharatiya Nagarik Suraksha Sanhita (BNSS) / CrPC**: Governs complaint registration, bail procedures, and court trials.
* **Bharatiya Sakshya Adhiniyam (BSA) / Indian Evidence Act**: Governs electronic evidence compliance (Section 65B Evidence Act / Section 63 BSA).

---

### 🚨 2. Illegal Actions & Available Legal Actions/Remedies (சட்டவிரோத செயல்கள் & சட்ட நடவடிக்கைகள்)
* **Unlawful Actions Identified**: Deprivation of legal rights, harassment, breach of statutory duties.
* **Available Legal Remedies**:
  1. **File Police Complaint / FIR** under Section 154 CrPC at jurisdictional station.
  2. **Apply for Judicial Relief / Bail** under Sec 438/437 CrPC if criminal prosecution is threatened.
  3. **Issue Advocate Legal Demand Notice**: Establishing formal cause of action.
  4. **Approach High Court (Article 226 / Sec 482 CrPC)**: For quashing or enforcement of fundamental rights.

---

### 📋 3. What You Should Do: Step-by-Step Action Plan (நீங்கள் என்ன செய்ய வேண்டும்?)
* **Step 1 (Gather Records)**: Compile every text, WhatsApp message, email, payment trail, and witness statement.
* **Step 2 (Formal Communication)**: Communicate only in writing; do not enter verbal compromises without legal counsel.
* **Step 3 (Legal Representation)**: Consult an advocate specializing in the relevant legal field.

---

### 📁 4. Required Evidence Checklist & Crucial Precautions (தேவையான ஆதாரங்கள் & செய்யக்கூடாதவை)
* [x] Written communications, screenshots, emails with timestamps.
* [x] Bank account transaction statements / official receipts.
* [x] Section 65B Electronic Evidence Certificate.
* **DO**: Maintain chronological timeline of events; keep original documents safe.
* **DON'T**: Do not destroy evidence; do not sign documents under pressure.
* **Free Legal Assistance**: National Legal Services Authority (NALSA) Helpline: **15100** | Portal: [nalsa.gov.in](https://nalsa.gov.in).

*Disclaimer: This guidance is for educational and legal awareness purposes under Indian law and does not constitute formal attorney-client representation.*`;
}

/**
 * Get chat history for a session
 */
router.get('/history/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const history = conversationHistories.get(sessionId) || [];
  
  res.json({
    success: true,
    sessionId,
    history: history.map((msg, index) => ({
      id: `${sessionId}-${index}`,
      role: msg.role,
      content: msg.content,
      timestamp: Date.now() - (history.length - index) * 60000
    }))
  });
});

/**
 * Clear chat history for a session
 */
router.delete('/history/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  conversationHistories.delete(sessionId);
  
  res.json({
    success: true,
    message: 'Chat history cleared'
  });
});

/**
 * Export chat history as text
 */
router.get('/export/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const history = conversationHistories.get(sessionId) || [];
  
  if (history.length === 0) {
    return res.status(404).json({
      success: false,
      error: 'No chat history found for this session'
    });
  }

  // Format conversation for export
  let exportText = '═══════════════════════════════════════════════════════════\n';
  exportText += '              NYTRIX AI - CHAT CONVERSATION EXPORT\n';
  exportText += '═══════════════════════════════════════════════════════════\n\n';
  exportText += `Session ID: ${sessionId}\n`;
  exportText += `Export Date: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}\n`;
  exportText += '\n───────────────────────────────────────────────────────────\n\n';

  history.forEach((msg, index) => {
    const sender = msg.role === 'user' ? '👤 You' : '🤖 Nytrix';
    exportText += `${sender}:\n`;
    exportText += `${msg.content}\n\n`;
    if (index < history.length - 1) {
      exportText += '- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n\n';
    }
  });

  exportText += '\n═══════════════════════════════════════════════════════════\n';
  exportText += '                    END OF CONVERSATION\n';
  exportText += '═══════════════════════════════════════════════════════════\n';
  exportText += '\n⚠️ DISCLAIMER: This is AI-generated legal information.\n';
  exportText += 'Please consult a qualified lawyer for professional legal advice.\n';

  res.json({
    success: true,
    sessionId,
    exportText,
    messageCount: history.length,
    exportDate: new Date().toISOString()
  });
});

module.exports = router;
