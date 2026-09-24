/**
 * ============================================================
 * NYTRIX AI ANALYZER - EMPATHETIC LEGAL ASSISTANT
 * Warm, respectful Indian professional voice for legal guidance
 * ============================================================
 */

import { LegalAnalysis, RiskLevel } from "../types";

// Declare process.env for Vite
declare const process: { env: { GEMINI_API_KEY?: string } };

// System prompt for the empathetic AI persona
const SYSTEM_PROMPT = `You're an empathetic, well-educated Indian early-career professional legal assistant named "Nytrix". You work at a legal tech startup helping everyday Indians understand their legal rights and options.

PERSONALITY & VOICE:
- Warm, respectful, and natural - like a helpful friend who happens to know law
- Mid-20s Indian English voice - professional but not stiff
- Use "you" and "your" to be direct and personal
- Keep explanations clear and jargon-free (explain legal terms when used)
- Short to medium responses, small paragraphs
- Match the user's tone: casual for casual, professional for serious topics

EMOTIONAL RESPONSIVENESS:
- Show genuine empathy when user is stressed, anxious, or scared ("I understand this must be really overwhelming...")
- Be encouraging when they're taking the right steps ("That's actually a smart move...")
- Offer gentle reassurance ("You're not alone in this, many people face similar situations...")
- For light moments, you can use mild humor if appropriate
- Never dismiss or minimize their concerns

COMMUNICATION STYLE:
- Start by acknowledging their situation before diving into advice
- Use relatable examples when explaining complex legal concepts
- Break down steps clearly but conversationally, not like a boring manual
- End with encouragement or a clear next step they can take today
- Avoid bullet points unless they specifically help clarity

LIMITATIONS & HONESTY:
- Never pretend to be a lawyer or give definitive legal advice
- When uncertain, say so honestly: "I'm not 100% sure about this specific situation, but here's what I know..."
- Always recommend consulting a qualified lawyer for serious matters
- Don't guess at case outcomes or make promises about legal results

INDIAN CONTEXT:
- Familiar with Indian laws, acts, and procedures (IPC, CrPC, IT Act, etc.)
- Understand the practical realities of dealing with police, courts, and government offices in India
- Aware of common challenges: delays, documentation requirements, costs
- Can suggest practical resources (legal aid, helplines, government portals)

MENTAL WELLNESS:
- Legal problems are stressful - always include emotional support
- For serious situations, gently suggest speaking to trusted people or professionals
- Remind them that seeking help is a sign of strength, not weakness

Remember: You're talking to a real person going through a tough time. Be the helpful, knowledgeable friend they need right now.`;

// Conversation context for maintaining chat history
interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

let conversationHistory: ConversationMessage[] = [];

/**
 * Reset conversation history for a new chat
 */
export function resetConversation(): void {
  conversationHistory = [];
}

/**
 * Generate empathetic response using Gemini AI
 */
export async function generateEmpathicResponse(
  userMessage: string,
  apiKey?: string
): Promise<string> {
  const key = apiKey || process.env.GEMINI_API_KEY;
  
  if (!key) {
    return generateFallbackResponse(userMessage);
  }

  try {
    // Add user message to history
    conversationHistory.push({ role: 'user', content: userMessage });
    
    // Build conversation context
    const conversationContext = conversationHistory
      .slice(-10) // Keep last 10 messages for context
      .map(msg => `${msg.role === 'user' ? 'User' : 'Nytrix'}: ${msg.content}`)
      .join('\n\n');

    const prompt = `${SYSTEM_PROMPT}

CONVERSATION SO FAR:
${conversationContext}

Now respond as Nytrix to the user's latest message. Be warm, helpful, and natural. Keep your response focused and not too long unless the situation requires detailed explanation.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.8,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
          ]
        })
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Clean up the response
    let cleanResponse = generatedText.trim();
    if (cleanResponse.startsWith('Nytrix:')) {
      cleanResponse = cleanResponse.substring(7).trim();
    }
    
    // Add assistant response to history
    conversationHistory.push({ role: 'assistant', content: cleanResponse });
    
    return cleanResponse || generateFallbackResponse(userMessage);
  } catch (error) {
    console.error('AI Analyzer Error:', error);
    return generateFallbackResponse(userMessage);
  }
}

/**
 * Analyze legal situation with empathetic context
 */
export async function analyzeWithEmpathy(
  situation: string,
  apiKey?: string
): Promise<LegalAnalysis & { empathyNote: string }> {
  const key = apiKey || process.env.GEMINI_API_KEY;
  
  if (!key) {
    return generateFallbackAnalysis(situation);
  }

  try {
    const prompt = `${SYSTEM_PROMPT}

USER'S SITUATION:
"${situation}"

Analyze this legal situation and provide a structured response. Be warm and supportive in your language.

RESPOND IN THIS EXACT JSON FORMAT (no markdown code blocks):
{
  "empathyNote": "A warm, empathetic opening acknowledgment of their situation (1-2 sentences)",
  "summary": "Clear, jargon-free explanation of the legal situation and what's at stake",
  "riskLevel": "Low" or "Medium" or "High",
  "relevantLaws": ["List of applicable Indian laws/sections with brief plain-English explanations"],
  "legalRights": ["Their rights explained in clear, empowering language"],
  "donts": ["What NOT to do, explained like a friend giving advice"],
  "lawfulSteps": ["Numbered action steps they can take, practical and specific to India"],
  "lawyerGuidance": "When and why they should consult a lawyer, with practical tips",
  "mentalHealthReminder": "Supportive message about taking care of themselves during this"
}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
          ]
        })
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    let responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Clean JSON response
    responseText = responseText.trim();
    if (responseText.startsWith('```json')) {
      responseText = responseText.slice(7);
    }
    if (responseText.startsWith('```')) {
      responseText = responseText.slice(3);
    }
    if (responseText.endsWith('```')) {
      responseText = responseText.slice(0, -3);
    }
    
    const parsed = JSON.parse(responseText.trim());
    
    // Map risk level string to enum
    const riskMap: { [key: string]: RiskLevel } = {
      'Low': RiskLevel.LOW,
      'Medium': RiskLevel.MEDIUM,
      'High': RiskLevel.HIGH
    };
    
    return {
      empathyNote: parsed.empathyNote || "I understand you're going through a difficult time. Let me help you understand your options.",
      summary: parsed.summary || "Unable to analyze the situation fully.",
      riskLevel: riskMap[parsed.riskLevel] || RiskLevel.MEDIUM,
      relevantLaws: parsed.relevantLaws || [],
      legalRights: parsed.legalRights || [],
      donts: parsed.donts || [],
      lawfulSteps: parsed.lawfulSteps || [],
      lawyerGuidance: parsed.lawyerGuidance || "Consider consulting a lawyer for personalized advice.",
      mentalHealthReminder: parsed.mentalHealthReminder || "Remember to take care of yourself during this process. Reach out to friends, family, or a counselor if you need support."
    };
  } catch (error) {
    console.error('AI Analysis Error:', error);
    return generateFallbackAnalysis(situation);
  }
}

/**
 * Quick legal question answering with empathetic tone
 */
export async function askLegalQuestion(
  question: string,
  apiKey?: string
): Promise<string> {
  const key = apiKey || process.env.GEMINI_API_KEY;
  
  if (!key) {
    return "I'd love to help you with this, but I'm having some technical difficulties right now. Could you try again in a moment? In the meantime, for urgent legal matters, you can call the Legal Aid helpline at 15100.";
  }

  try {
    const prompt = `${SYSTEM_PROMPT}

USER'S QUESTION:
"${question}"

Answer this legal question in a warm, conversational tone. Keep it concise but helpful. If you're not sure about something specific, say so honestly. Always remind them to verify with a qualified lawyer for important decisions.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.8,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 800,
          },
          safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
          ]
        })
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 
      "I'm having trouble processing that right now. Could you rephrase your question?";
  } catch (error) {
    console.error('Quick Question Error:', error);
    return "I'm having some technical difficulties. For urgent legal help, you can call the National Legal Services Authority helpline at 15100 - they provide free legal aid.";
  }
}

/**
 * Detect emotional tone in user message
 */
export function detectEmotionalTone(message: string): 'anxious' | 'angry' | 'sad' | 'neutral' | 'urgent' {
  const lowerMessage = message.toLowerCase();
  
  const anxiousKeywords = ['scared', 'worried', 'nervous', 'afraid', 'panic', 'stress', 'anxious', 'fear', 'terrified', 'helpless', 'don\'t know what to do'];
  const angryKeywords = ['angry', 'furious', 'mad', 'unfair', 'injustice', 'disgusted', 'outraged', 'frustrated', 'annoyed', 'pissed'];
  const sadKeywords = ['sad', 'depressed', 'hopeless', 'devastated', 'heartbroken', 'lost', 'alone', 'cry', 'crying', 'miserable'];
  const urgentKeywords = ['urgent', 'emergency', 'immediately', 'asap', 'now', 'today', 'deadline', 'arrest', 'police coming', 'hurry'];
  
  if (urgentKeywords.some(kw => lowerMessage.includes(kw))) return 'urgent';
  if (anxiousKeywords.some(kw => lowerMessage.includes(kw))) return 'anxious';
  if (angryKeywords.some(kw => lowerMessage.includes(kw))) return 'angry';
  if (sadKeywords.some(kw => lowerMessage.includes(kw))) return 'sad';
  
  return 'neutral';
}

/**
 * Get empathetic opening based on emotional tone
 */
export function getEmpathyOpening(tone: 'anxious' | 'angry' | 'sad' | 'neutral' | 'urgent'): string {
  const openings = {
    anxious: "I can tell you're worried about this, and that's completely understandable. Let me help you understand your options so you feel more in control.",
    angry: "I hear your frustration, and honestly, anyone in your situation would feel the same way. Let's focus on what we can actually do about this.",
    sad: "I'm really sorry you're going through this. It sounds incredibly tough, but you're taking the right step by seeking help. Let me see how I can support you.",
    urgent: "I understand this is urgent. Let me get straight to what you need to know and do right now.",
    neutral: "Thanks for reaching out! Let me help you understand this better."
  };
  
  return openings[tone];
}

/**
 * Fallback response when API is unavailable
 */
function generateFallbackResponse(message: string): string {
  const tone = detectEmotionalTone(message);
  const opening = getEmpathyOpening(tone);
  
  return `${opening}

I'm experiencing some technical difficulties right now, so I can't give you a detailed analysis at the moment. However, here are some general resources that might help:

📞 **National Legal Services Authority Helpline**: 15100 (Free Legal Aid)
📞 **Women Helpline**: 181
📞 **Police Emergency**: 100
🌐 **eCourts Services**: ecourts.gov.in

Please try again in a few minutes, and I'll be able to help you more specifically. If this is urgent, I'd recommend calling one of these helplines or visiting your nearest legal aid center.

Take care, and remember - you're doing the right thing by seeking help. 💪`;
}

/**
 * Fallback analysis when API is unavailable
 */
function generateFallbackAnalysis(situation: string): LegalAnalysis & { empathyNote: string } {
  const tone = detectEmotionalTone(situation);
  
  return {
    empathyNote: getEmpathyOpening(tone),
    summary: "I'm currently unable to provide a detailed analysis due to technical limitations. Please try again shortly or consult with a qualified legal professional for immediate guidance.",
    riskLevel: RiskLevel.MEDIUM,
    relevantLaws: [
      "Please consult a lawyer for specific legal provisions applicable to your situation"
    ],
    legalRights: [
      "Right to legal representation",
      "Right to remain silent",
      "Right to a fair hearing",
      "Right to free legal aid if financially unable (Article 39A)"
    ],
    donts: [
      "Don't panic or make hasty decisions",
      "Don't discuss your case on social media",
      "Don't ignore legal notices or court summons",
      "Don't confront the other party without legal advice"
    ],
    lawfulSteps: [
      "1. Document everything related to your situation",
      "2. Consult a qualified lawyer for specific advice",
      "3. Call National Legal Services Authority (15100) for free legal aid",
      "4. Preserve all relevant evidence and communications"
    ],
    lawyerGuidance: "I strongly recommend consulting with a qualified lawyer who can review the specific details of your case. You can find pro-bono lawyers through your local Legal Services Authority.",
    mentalHealthReminder: "I know legal matters can be stressful. Remember to take breaks, talk to someone you trust, and don't hesitate to seek professional support if you're feeling overwhelmed. Your wellbeing matters. 🤗"
  };
}

// Export the system prompt for external use if needed
export { SYSTEM_PROMPT };
