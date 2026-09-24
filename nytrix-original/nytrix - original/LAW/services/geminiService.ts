
import { LegalAnalysis, RiskLevel } from "../types";

// Re-export AI Analyzer functions for empathetic responses
export { 
  generateEmpathicResponse, 
  analyzeWithEmpathy, 
  askLegalQuestion, 
  detectEmotionalTone,
  getEmpathyOpening,
  resetConversation,
  SYSTEM_PROMPT 
} from './aiAnalyzer';

// Predefined legal responses based on user input keywords
const legalResponses: { [key: string]: LegalAnalysis } = {
  "false accusation": {
    summary: "False accusations under Indian law are serious and can constitute defamation, criminal intimidation, or filing false complaints.",
    riskLevel: "High",
    relevantLaws: [
      "IPC Section 211 - Fabricating false evidence",
      "IPC Section 212 - Fabricating false evidence with intent to procure conviction",
      "IPC Section 499 - Defamation",
      "IPC Section 500 - Punishment for defamation",
      "IPC Section 506 - Criminal intimidation",
      "CrPC Section 200-203 - Inquiry by police and magistrate before taking cognizance"
    ],
    legalRights: [
      "Right to legal representation and defense",
      "Right to cross-examine witnesses",
      "Right to file counter-case for false accusations",
      "Right to claim damages for defamation",
      "Right to claim compensation under Section 357-A CrPC",
      "Right to file quashing petition under Section 482 CrPC"
    ],
    donts: [
      "Do NOT threaten, abuse, or harass the accuser",
      "Do NOT destroy evidence or communicate with witnesses",
      "Do NOT make statements without legal counsel",
      "Do NOT ignore legal notices or court summons",
      "Do NOT take revenge or engage in counter-intimidation"
    ],
    lawfulSteps: [
      "1. Immediately consult a criminal defense lawyer",
      "2. Gather all evidence supporting your innocence (messages, witnesses, documents)",
      "3. File a formal police complaint against false accusations (FIR)",
      "4. Request magistrate inquiry before formal charges",
      "5. File anticipatory bail if necessary",
      "6. Document all communications with the accuser",
      "7. Cooperate fully with police investigation while exercising your rights"
    ],
    lawyerGuidance: "Consult a criminal lawyer immediately. False accusations can lead to serious legal consequences. A lawyer will help protect your rights during investigation and trial.",
    mentalHealthReminder: "Being falsely accused is traumatic. Seek support from family, friends, or a counselor. Remember: the burden of proof lies with the accuser."
  },
  "blackmail": {
    summary: "Blackmail is extortion under Indian law, often combined with threats or demands of money/favors using sensitive information.",
    riskLevel: "High",
    relevantLaws: [
      "IPC Section 383 - Extortion",
      "IPC Section 384 - Punishment for extortion",
      "IPC Section 385 - Putting person in fear of injury to commit extortion",
      "IPC Section 386 - Punishment for putting person in fear of injury",
      "IPC Section 506 - Criminal intimidation",
      "IT Act Section 66 - Computer-related offenses",
      "IT Act Section 67 - Publishing obscene material electronically"
    ],
    legalRights: [
      "Right to file FIR against blackmailer",
      "Right to compensation for harassment",
      "Right to protection order from court",
      "Right to cyber crime complaint (if digital blackmail)",
      "Right to claim damages under civil law"
    ],
    donts: [
      "Do NOT pay the blackmailer (encourages repetition)",
      "Do NOT try to meet the blackmailer alone",
      "Do NOT delete evidence",
      "Do NOT threaten the blackmailer in return",
      "Do NOT share sensitive information further"
    ],
    lawfulSteps: [
      "1. Stop all communication with the blackmailer immediately",
      "2. Preserve all evidence (messages, emails, calls, photos)",
      "3. File FIR at local police station or cyber crime cell",
      "4. Contact a criminal lawyer specializing in extortion",
      "5. Apply for restraining order from court",
      "6. Inform relevant authorities (bank, employer, if necessary)",
      "7. Seek police protection if threatened"
    ],
    lawyerGuidance: "Seek legal help immediately. Blackmail cases often involve evidence preservation and restraining orders. A lawyer will guide the FIR process and legal remedies.",
    mentalHealthReminder: "Blackmail is a form of abuse. Seek counseling to process trauma. Remember: you are the victim, not the perpetrator."
  },
  "cyber harassment": {
    summary: "Cyber harassment includes online abuse, trolling, defamation, or threatening behavior on digital platforms.",
    riskLevel: "Medium",
    relevantLaws: [
      "IT Act Section 66A - Sending offensive messages through communication service",
      "IT Act Section 67 - Publishing obscene material",
      "IPC Section 499 - Defamation",
      "IPC Section 504 - Intentional insult provoking breach of peace",
      "IPC Section 506 - Criminal intimidation",
      "IPC Section 509 - Word, gesture or act intending to insult modesty"
    ],
    legalRights: [
      "Right to file cyber crime complaint",
      "Right to demand removal of defamatory content",
      "Right to block harasser on platforms",
      "Right to claim damages",
      "Right to seek restraining order"
    ],
    donts: [
      "Do NOT engage with harasser or respond to abuse",
      "Do NOT delete evidence",
      "Do NOT counter-harass or abuse back",
      "Do NOT share personal information online",
      "Do NOT ignore escalating threats"
    ],
    lawfulSteps: [
      "1. Document all harassing messages (screenshots with timestamps)",
      "2. Block the harasser on all platforms",
      "3. File cyber crime complaint with local police or cybercrime.gov.in",
      "4. Report to social media platform for content removal",
      "5. Consult a cyber law attorney",
      "6. Request platform to disable harasser's account",
      "7. Obtain restraining order if threats escalate"
    ],
    lawyerGuidance: "A cyber law specialist can help file complaints and obtain platform cooperation for account suspension and content removal.",
    mentalHealthReminder: "Online harassment can feel overwhelming. Remember: you control your digital space. Block, report, and don't engage."
  },
  "defamation": {
    summary: "Defamation is making false statements that damage someone's reputation. Can be civil (lawsuit) or criminal (prosecution).",
    riskLevel: "Medium",
    relevantLaws: [
      "IPC Section 499 - Definition of defamation",
      "IPC Section 500 - Punishment for defamation (up to 2 years)",
      "IPC Section 501 - Printing or engraving matter knowing it to be defamatory",
      "IPC Section 502 - Printing or engraving defamatory matter",
      "IPC Section 503 - Intentional insult with knowledge it will provoke",
      "IPC Section 504 - Intentional insult provoking breach of peace"
    ],
    legalRights: [
      "Right to file defamation suit for damages",
      "Right to demand public apology/retraction",
      "Right to seek interim injunction against further publication",
      "Right to claim compensation for loss of reputation",
      "Right to file criminal defamation case"
    ],
    donts: [
      "Do NOT repeat the defamatory statement",
      "Do NOT threaten or intimidate the defamer",
      "Do NOT make counter-false statements",
      "Do NOT ignore public defamation"
    ],
    lawfulSteps: [
      "1. Collect evidence of defamatory statement (publication, date, witnesses)",
      "2. Send cease and desist notice through lawyer",
      "3. Demand written apology and retraction",
      "4. File civil suit for damages under tort law",
      "5. Optionally file criminal case under IPC Section 500",
      "6. Seek interim injunction to prevent further publication",
      "7. Pursue damages calculation based on reputation loss"
    ],
    lawyerGuidance: "Consult a lawyer to assess defamation claim strength and pursue civil/criminal remedies. Damages depend on extent of harm and publication.",
    mentalHealthReminder: "Defamation damages reputation and can cause emotional distress. Focus on legal remedy rather than retaliation."
  },
  "relationship dispute": {
    summary: "Relationship disputes involving men often include false domestic violence accusations, custody battles, or alimony disputes.",
    riskLevel: "High",
    relevantLaws: [
      "IPC Section 498A - Cruelty by husband/relatives (frequently misused)",
      "Protection of Women from Domestic Violence Act 2005",
      "Hindu Marriage Act 1955 - Divorce and maintenance",
      "Indian Divorce Act 1869 - Christian marriage divorce",
      "Dowry Prohibition Act 1961",
      "Guardianship and Wardship Act 1890 - Child custody"
    ],
    legalRights: [
      "Right to fair custody arrangement (child's best interest)",
      "Right to challenge false domestic violence accusations",
      "Right to maintenance if economically dependent",
      "Right to challenge unreasonable alimony demands",
      "Right to legal aid if economically weak",
      "Right to demand investigation before arrest"
    ],
    donts: [
      "Do NOT engage in verbal or physical altercations",
      "Do NOT isolate children from other parent",
      "Do NOT destroy marriage documents or financial records",
      "Do NOT hide assets or income",
      "Do NOT make unrecorded statements to police"
    ],
    lawfulSteps: [
      "1. Consult a family law attorney immediately",
      "2. Document all interactions and communications",
      "3. File counter-FIR if falsely accused under 498A",
      "4. File for divorce (if necessary) with proper grounds",
      "5. Seek interim custody order for children",
      "6. Request maintenance assessment",
      "7. Attempt mediation before prolonged litigation"
    ],
    lawyerGuidance: "Family law disputes are complex. Hire experienced family lawyer to protect custody rights and financial interests. Mediation often saves time and money.",
    mentalHealthReminder: "Family disputes are emotionally draining, especially with children involved. Seek counseling and prioritize the child's well-being."
  },
  "domestic violence": {
    summary: "Domestic violence accusations require careful handling. False accusations under 498A are common; genuine cases need protection.",
    riskLevel: "High",
    relevantLaws: [
      "Protection of Women from Domestic Violence Act 2005 - Section 12-16",
      "IPC Section 498A - Cruelty (misused frequently against men)",
      "IPC Section 337-348 - Hurt and grievous injury",
      "IPC Section 506 - Criminal intimidation",
      "CrPC Section 41B - Procedure for arrest in cognizable offense"
    ],
    legalRights: [
      "Right to bail (498A is bailable if properly applied)",
      "Right to file quashing petition if false accusation",
      "Right to counter-FIR against false accusation",
      "Right to protection order if genuinely victimized",
      "Right to anticipatory bail before arrest"
    ],
    donts: [
      "Do NOT be alone with the accuser without witnesses",
      "Do NOT make unrecorded apologies or admissions",
      "Do NOT flee or hide from police summons",
      "Do NOT indulge in actual violence (even in retaliation)",
      "Do NOT communicate threats or intimidation"
    ],
    lawfulSteps: [
      "1. Consult criminal lawyer immediately to file anticipatory bail",
      "2. Gather evidence of false accusation (messages, witnesses, medical reports)",
      "3. File counter-FIR if accusation is malicious",
      "4. Document previous harmonious relationship",
      "5. Request in-camera investigation by CBI/SIT if widespread accusations",
      "6. Obtain bail immediately on arrest",
      "7. Pursue aggressive defense with character witnesses"
    ],
    lawyerGuidance: "498A cases require specialized handling. Anticipatory bail is critical. Preserve all evidence supporting your innocence.",
    mentalHealthReminder: "False accusations are devastating. Seek psychological support. Justice delayed is injustice, but persistence pays off."
  },
  "maintenance": {
    summary: "Maintenance (alimony) obligations exist under Indian law for spouses and children. Men can claim reverse maintenance in certain cases.",
    riskLevel: "Medium",
    relevantLaws: [
      "Hindu Marriage Act 1955 - Section 25 (Alimony)",
      "Indian Divorce Act 1869 - Section 36 (Christian marriage)",
      "Muslim Women (Protection of Rights on Divorce) Act 1986",
      "CrPC Section 125 - Maintenance for wife, children, and parents",
      "CrPC Section 126 - Cancellation of maintenance order"
    ],
    legalRights: [
      "Right to claim reasonable maintenance only (not excessive)",
      "Right to modify maintenance based on changed circumstances",
      "Right to claim reimbursement for wife's unnecessary expenses",
      "Men can claim reverse maintenance if wife is earning and husband is dependent",
      "Right to reduce/cancel maintenance on cohabitation or remarriage of wife"
    ],
    donts: [
      "Do NOT default on maintenance payments (court can attach property)",
      "Do NOT claim poverty without financial disclosure",
      "Do NOT hide assets or income",
      "Do NOT dispute maintenance without legal grounds"
    ],
    lawfulSteps: [
      "1. Determine monthly maintenance based on income and expenses",
      "2. File written statement in maintenance petition",
      "3. Provide financial documents (salary, business income, assets)",
      "4. Request interim maintenance reduction if applicable",
      "5. File for modification if income changes",
      "6. Seek cancellation of maintenance on valid grounds",
      "7. Appeal adverse orders to higher courts if necessary"
    ],
    lawyerGuidance: "Maintenance disputes require financial analysis. A lawyer will argue for reasonable maintenance and challenge excessive demands.",
    mentalHealthReminder: "Maintenance is a financial obligation, not punishment. Work with your lawyer to ensure fair assessment based on actual capacity to pay."
  },
  "custody": {
    summary: "Child custody in India prioritizes the child's welfare. Both parents have equal rights, but courts often favor mothers by default.",
    riskLevel: "High",
    relevantLaws: [
      "Guardianship and Wardship Act 1890 - Section 6-7",
      "Hindu Marriage Act 1955 - Section 26 (Custody)",
      "Indian Divorce Act 1869 - Section 41 (Custody of children)",
      "Juvenile Justice Act 2015 - Child's best interest principle"
    ],
    legalRights: [
      "Right to shared/joint custody (increasingly granted)",
      "Right to fair assessment of child's welfare",
      "Right to visitation if not granted primary custody",
      "Right to decision-making in child's education and health",
      "Right to challenge custody on child's best interest grounds"
    ],
    donts: [
      "Do NOT abduct or unlawfully retain the child",
      "Do NOT prevent other parent's access without court order",
      "Do NOT involve child in parental disputes",
      "Do NOT make unilateral decisions about child's major matters"
    ],
    lawfulSteps: [
      "1. Consult family law attorney specializing in custody",
      "2. File for custody petition with emphasis on child's welfare",
      "3. Provide evidence of father's involvement in child's life",
      "4. Request home study report from court-appointed officer",
      "5. Propose joint custody or equal visitation rights",
      "6. Pursue custody modification if mother is unfit",
      "7. Seek grandparent/family support affidavits"
    ],
    lawyerGuidance: "Custody battles are emotionally taxing. Focus on the child's welfare. Courts increasingly award shared custody to both parents.",
    mentalHealthReminder: "Your child needs both parents. Co-parenting is in the child's best interest. Seek counseling to handle custody process emotionally."
  },
  "harassment": {
    summary: "Harassment includes repeated unwanted contact, threats, or intimidation. Multiple laws protect against it.",
    riskLevel: "Medium",
    relevantLaws: [
      "IPC Section 503 - Intentional insult",
      "IPC Section 504 - Intentional insult provoking breach of peace",
      "IPC Section 506 - Criminal intimidation",
      "IPC Section 509 - Word, gesture or act intending to insult modesty",
      "IT Act Section 66 - Computer-related offenses",
      "Protection of Women from Domestic Violence Act 2005"
    ],
    legalRights: [
      "Right to file FIR for harassment",
      "Right to obtain restraining order",
      "Right to claim damages",
      "Right to change contact number and address",
      "Right to workplace harassment complaint (if applicable)"
    ],
    donts: [
      "Do NOT engage or respond to harasser",
      "Do NOT make counter-threats",
      "Do NOT isolate yourself completely",
      "Do NOT delete harassment evidence"
    ],
    lawfulSteps: [
      "1. Stop all contact with harasser",
      "2. Document all harassment incidents (dates, times, nature)",
      "3. Inform police and file FIR",
      "4. Apply for restraining order through court",
      "5. Inform family, friends, and workplace if necessary",
      "6. Change contact numbers if repeated calls",
      "7. Seek police protection order if threats escalate"
    ],
    lawyerGuidance: "Persistent harassment can be prosecuted. Evidence documentation is key. A lawyer will help obtain restraining orders.",
    mentalHealthReminder: "Harassment causes anxiety and trauma. Reach out to trusted people. Remember: you have legal recourse."
  },
  "threat": {
    summary: "Criminal threats or intimidation are serious offenses under Indian law, punishable with imprisonment.",
    riskLevel: "High",
    relevantLaws: [
      "IPC Section 503 - Intentional insult",
      "IPC Section 504 - Intentional insult provoking breach of peace",
      "IPC Section 505 - Statements conducing to public mischief",
      "IPC Section 506 - Criminal intimidation",
      "IPC Section 507 - Criminal intimidation by anonymous communication",
      "IPC Section 509 - Word, gesture or act intending to insult modesty"
    ],
    legalRights: [
      "Right to file FIR for threats",
      "Right to immediate police protection",
      "Right to restraining order against threatener",
      "Right to compensation for emotional distress",
      "Right to seek police security (if serious threat)"
    ],
    donts: [
      "Do NOT ignore threats (report immediately)",
      "Do NOT respond to threats with counter-threats",
      "Do NOT confront threatener alone",
      "Do NOT delete threat evidence"
    ],
    lawfulSteps: [
      "1. Immediately inform police about threats",
      "2. File FIR with detailed description",
      "3. Preserve all threat communications (messages, calls, letters)",
      "4. Request police protection if threatened",
      "5. Apply for restraining/protection order",
      "6. Inform family and workplace of potential danger",
      "7. Seek anticipatory action if threat is imminent"
    ],
    lawyerGuidance: "Threats are criminal offenses. Early reporting and evidence preservation are critical. Police protection may be necessary.",
    mentalHealthReminder: "Threats can be terrifying. Take them seriously and seek help. Your safety is paramount."
  },
  "dowry": {
    summary: "Dowry-related harassment is illegal under Indian law. Demands for dowry or harassment based on dowry are criminal offenses.",
    riskLevel: "High",
    relevantLaws: [
      "Dowry Prohibition Act 1961 - Sections 2-5",
      "IPC Section 498A - Cruelty (often linked with dowry harassment)",
      "IPC Section 304B - Dowry death",
      "IPC Section 406 - Criminal breach of trust (dowry)",
      "IPC Section 498A - Protection for women"
    ],
    legalRights: [
      "Right to file FIR for dowry demands",
      "Right to recover dowry through civil suit",
      "Right to claim harassment compensation",
      "Right to seek police intervention",
      "Right to protection order"
    ],
    donts: [
      "Do NOT pay illegal dowry demands",
      "Do NOT accept dowry without documentation",
      "Do NOT engage in dowry negotiation",
      "Do NOT threaten or harass for dowry"
    ],
    lawfulSteps: [
      "1. Document all dowry demands (written or recorded)",
      "2. Refuse to pay and inform in writing",
      "3. File FIR under Dowry Prohibition Act",
      "4. File civil suit for dowry recovery",
      "5. Request police protection from harassment",
      "6. Maintain detailed records of all communications",
      "7. Seek legal counsel to file counter-cases if falsely accused"
    ],
    lawyerGuidance: "Dowry is illegal. Report demands immediately. A lawyer will help file FIR and recover paid dowry.",
    mentalHealthReminder: "Dowry-related pressure is a form of abuse. Stand firm against demands and seek support."
  },
  "sexual harassment": {
    summary: "Sexual harassment accusations against men are serious and can destroy careers. False allegations require immediate legal action.",
    riskLevel: "High",
    relevantLaws: [
      "IPC Section 509 - Word, gesture or act intending to insult modesty",
      "IPC Section 354 - Assault or criminal force with intent to outrage modesty",
      "IPC Section 375-376 - Rape and punishment",
      "Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act 2013",
      "CrPC Section 155 - Police complaints and investigations"
    ],
    legalRights: [
      "Right to immediate legal representation",
      "Right to file counter-case for false allegations",
      "Right to claim damages for reputation loss",
      "Right to anticipatory bail",
      "Right to cross-examine accuser",
      "Right to workplace exoneration"
    ],
    donts: [
      "Do NOT contact or communicate with accuser",
      "Do NOT destroy any evidence or messages",
      "Do NOT make informal apologies or admissions",
      "Do NOT continue in workplace harassment investigation without lawyer",
      "Do NOT resign immediately (affects your legal position)"
    ],
    lawfulSteps: [
      "1. Consult criminal lawyer immediately",
      "2. File anticipatory bail application",
      "3. Gather all evidence (emails, messages, witnesses, timestamps)",
      "4. Request detailed allegations in writing from employer",
      "5. Provide written response with evidence of innocence",
      "6. File counter-complaint if false accusation",
      "7. Pursue appeal through all available channels"
    ],
    lawyerGuidance: "Sexual harassment allegations are career-threatening. Engage a criminal lawyer immediately. Anticipatory bail is crucial.",
    mentalHealthReminder: "False sexual harassment allegations are devastating. Seek mental health support. Clear your name through legal processes."
  },
  "property dispute": {
    summary: "Property disputes involve ownership, partition, boundary issues, or title disputes. Resolution requires legal documentation and proof of ownership.",
    riskLevel: "High",
    relevantLaws: [
      "Transfer of Property Act 1882",
      "Registration Act 1908 - Property registration and title",
      "Indian Succession Act 1925 - Inheritance rights",
      "Specific Relief Act 1963 - Injunctions and possession",
      "CrPC Section 145 - Disputes between landlord and tenant"
    ],
    legalRights: [
      "Right to equal partition if co-owner",
      "Right to legal title documentation",
      "Right to possession of property",
      "Right to claim damages for trespass",
      "Right to injunction against unlawful occupation"
    ],
    donts: [
      "Do NOT take physical action or force",
      "Do NOT destroy boundary markers or documents",
      "Do NOT occupy disputed property without legal order",
      "Do NOT harass other claimants"
    ],
    lawfulSteps: [
      "1. Collect all property documents (deed, registration, tax receipts)",
      "2. File partition suit in civil court",
      "3. Request preliminary inquiry for boundary survey",
      "4. Hire surveyor to establish exact boundaries",
      "5. Provide evidence of possession and improvements",
      "6. Seek interim injunction to prevent trespass",
      "7. File execution application for court orders"
    ],
    lawyerGuidance: "Property disputes are complex. Hire a property law specialist to document ownership and pursue partition or possession.",
    mentalHealthReminder: "Property disputes can strain relationships. Focus on legal resolution and documented proof."
  },
  "workplace discrimination": {
    summary: "Workplace discrimination based on caste, religion, gender, or other grounds is illegal. Men can also be victims of reverse discrimination.",
    riskLevel: "Medium",
    relevantLaws: [
      "Constitution of India Article 15 - Prohibition of discrimination",
      "Constitution of India Article 16 - Equality in employment",
      "The Scheduled Castes and Scheduled Tribes (Prevention of Atrocities) Act 1989",
      "Equal Remuneration Act 1976",
      "Industrial Disputes Act 1947"
    ],
    legalRights: [
      "Right to equal treatment and opportunities",
      "Right to fair compensation",
      "Right to file grievance with employer",
      "Right to approach labor court",
      "Right to claim damages and back wages"
    ],
    donts: [
      "Do NOT resign without proper documentation",
      "Do NOT make public statements without facts",
      "Do NOT interfere with workplace harmony",
      "Do NOT take any adverse action on your own"
    ],
    lawfulSteps: [
      "1. Document all instances of discrimination (dates, witnesses, impact)",
      "2. File formal written complaint with HR/management",
      "3. Request acknowledgment and timeline for resolution",
      "4. If unresolved, file labor dispute petition",
      "5. Approach labor commissioner for investigation",
      "6. File civil suit for damages if necessary",
      "7. Pursue appeal through labor appellate tribunal"
    ],
    lawyerGuidance: "Workplace discrimination requires documentation. A labor lawyer will help file grievances and pursue compensation.",
    mentalHealthReminder: "Workplace discrimination is unjust. Document everything and pursue legal remedy through proper channels."
  },
  "contract breach": {
    summary: "Contract breach occurs when one party fails to fulfill agreed obligations. Recovery depends on contract terms and damages.",
    riskLevel: "Medium",
    relevantLaws: [
      "Indian Contract Act 1872 - Sections 70-75 (Breach and remedies)",
      "Specific Relief Act 1963 - Specific performance and damages",
      "Sale of Goods Act 1930 - Buyer-seller disputes"
    ],
    legalRights: [
      "Right to claim specific performance",
      "Right to claim damages for actual loss",
      "Right to claim consequential damages",
      "Right to seek injunction against breach",
      "Right to rescind contract"
    ],
    donts: [
      "Do NOT breach your own obligations in retaliation",
      "Do NOT take illegal action against breaching party",
      "Do NOT accept partial performance as full compliance",
      "Do NOT ignore breach claims"
    ],
    lawfulSteps: [
      "1. Review contract terms carefully",
      "2. Send formal notice to breaching party",
      "3. Allow reasonable time for compliance",
      "4. File civil suit for damages or specific performance",
      "5. Provide proof of actual losses suffered",
      "6. Claim interest on damages from breach date",
      "7. Pursue execution for payment of judgment"
    ],
    lawyerGuidance: "Contract disputes require contract analysis and damage calculation. Hire a civil lawyer to pursue recovery.",
    mentalHealthReminder: "Breach of contract is frustrating but legally remedyable. Focus on documentation and legal action."
  },
  "loan default": {
    summary: "Loan default occurs when borrower fails to repay. Banks can recover through legal proceedings, but borrower has rights.",
    riskLevel: "High",
    relevantLaws: [
      "Recovery of Debts Due to Banks and Financial Institutions Act 1993",
      "Insolvency and Bankruptcy Code 2016",
      "Reserve Bank of India guidelines on recoveries",
      "Indian Contract Act 1872 - Loan terms"
    ],
    legalRights: [
      "Right to negotiate payment terms",
      "Right to challenge recovery proceedings if illegal",
      "Right to claim relief under Bankruptcy Code",
      "Right to personal protection (no harassment)",
      "Right to file counter-claim for over-charges"
    ],
    donts: [
      "Do NOT ignore bank notices or summons",
      "Do NOT abscond or hide from bank officials",
      "Do NOT forge documents or create false claims",
      "Do NOT harass bank officials"
    ],
    lawfulSteps: [
      "1. Contact bank to discuss payment plan",
      "2. Negotiate moratorium or restructuring",
      "3. File written plea for relief if financial hardship",
      "4. If sued, file written statement in recovery proceedings",
      "5. Provide proof of repayment capability",
      "6. File insolvency petition if unable to pay",
      "7. Seek legal aid if economically weak"
    ],
    lawyerGuidance: "Bank recovery cases move quickly. Respond to notices immediately. A lawyer can help negotiate or defend recovery proceedings.",
    mentalHealthReminder: "Financial hardship is stressful. Communicate with creditors and seek legal help early to minimize consequences."
  },
  "cheating accusation": {
    summary: "Cheating accusations (fraud, business dishonesty) can result in criminal prosecution. Defense requires clear evidence of innocence.",
    riskLevel: "High",
    relevantLaws: [
      "IPC Section 415 - Definition of cheating",
      "IPC Section 417 - Punishment for cheating",
      "IPC Section 420 - Cheating and dishonestly inducing delivery of property",
      "IPC Section 468 - Forgery for cheating",
      "Indian Contract Act 1872 - Fraud and misrepresentation"
    ],
    legalRights: [
      "Right to criminal defense and cross-examination",
      "Right to file counter-case if falsely accused",
      "Right to claim damages for false accusations",
      "Right to challenge evidence as fabricated",
      "Right to bail"
    ],
    donts: [
      "Do NOT destroy business documents or records",
      "Do NOT admit guilt without legal counsel",
      "Do NOT attempt to reconcile without witnesses",
      "Do NOT interfere with complainant or witnesses"
    ],
    lawfulSteps: [
      "1. Immediately consult criminal lawyer",
      "2. Preserve all business and financial records",
      "3. Gather evidence of legitimate business conduct",
      "4. File anticipatory bail if notice received",
      "5. Prepare written statement of facts",
      "6. Request detailed allegation from police",
      "7. File counter-complaint if false accusation"
    ],
    lawyerGuidance: "Cheating cases require documentary evidence. Organize all business records and engage a criminal lawyer immediately.",
    mentalHealthReminder: "False cheating accusations damage reputation. Defend yourself vigorously through legal channels."
  },
  "theft accusation": {
    summary: "Theft accusations involve claims of stolen property. Defense requires proving lawful ownership or possession.",
    riskLevel: "High",
    relevantLaws: [
      "IPC Section 378 - Definition of theft",
      "IPC Section 379-392 - Punishment for theft and related offenses",
      "IPC Section 411 - Dishonest receipt of stolen property",
      "CrPC Section 150 - Investigation procedures for theft"
    ],
    legalRights: [
      "Right to legal representation and defense",
      "Right to bail (theft is bailable)",
      "Right to challenge arrest if illegal",
      "Right to claim compensation for false arrest",
      "Right to file counter-case for false accusation"
    ],
    donts: [
      "Do NOT make confession without legal counsel",
      "Do NOT attempt settlement without legal advice",
      "Do NOT communicate with complainant",
      "Do NOT dispose of supposedly stolen property"
    ],
    lawfulSteps: [
      "1. Consult criminal lawyer immediately",
      "2. Request bail application at first hearing",
      "3. Gather evidence of lawful possession/ownership",
      "4. File detailed written statement",
      "5. Provide witnesses to your possession",
      "6. Request police investigation of real thief",
      "7. File counter-case if falsely accused"
    ],
    lawyerGuidance: "Theft cases often involve circumstantial evidence. A criminal lawyer will help establish your lawful possession and innocence.",
    mentalHealthReminder: "Theft accusations are serious but defensible. Focus on proving your innocence through proper legal channels."
  },
  "assault charge": {
    summary: "Assault charges involve using force or causing injury. Defense depends on whether action was in self-defense or lawful.",
    riskLevel: "High",
    relevantLaws: [
      "IPC Section 351 - Definition of assault",
      "IPC Section 352 - Punishment for assault",
      "IPC Section 337-348 - Hurt and grievous injury",
      "IPC Section 96-106 - Self-defense provisions",
      "IPC Section 96 - When private defense is lawful"
    ],
    legalRights: [
      "Right to claim self-defense",
      "Right to claim defense of property",
      "Right to bail (bailable offense)",
      "Right to medical examination",
      "Right to counter-case for false injury claims"
    ],
    donts: [
      "Do NOT make confessions without lawyer",
      "Do NOT attempt to reconcile through informal settlement",
      "Do NOT communicate with victim or witnesses",
      "Do NOT engage in further confrontation"
    ],
    lawfulSteps: [
      "1. Seek medical treatment and document injuries",
      "2. Consult criminal lawyer immediately",
      "3. Request bail at first hearing",
      "4. Gather evidence of self-defense claim",
      "5. Collect witness statements supporting your version",
      "6. Request independent medical examination",
      "7. File counter-case if victim's claim is false"
    ],
    lawyerGuidance: "Assault cases often involve self-defense claims. A criminal lawyer will establish lawful provocation and proportional response.",
    mentalHealthReminder: "Assault accusations are serious. Document your injuries and circumstances. Seek legal protection immediately."
  },
  "rape accusation": {
    summary: "Rape accusations are the most serious charges. False accusations destroy lives. Immediate legal action is critical.",
    riskLevel: "High",
    relevantLaws: [
      "IPC Section 375 - Definition of rape",
      "IPC Section 376 - Punishment for rape (up to life imprisonment)",
      "IPC Section 376A - Punishment for rape by repeat offender",
      "CrPC Section 164 - Medical examination of rape complainant",
      "Criminal Law (Amendment) Act 2013 - Enhanced penalties"
    ],
    legalRights: [
      "Right to bail (even in rape cases if evidence insufficient)",
      "Right to cross-examine accuser",
      "Right to medical examination to establish innocence",
      "Right to file counter-case for false accusation",
      "Right to claim compensation for false arrest"
    ],
    donts: [
      "Do NOT contact complainant or witnesses",
      "Do NOT attempt settlement or compromise",
      "Do NOT make any statement without lawyer present",
      "Do NOT destroy any evidence",
      "Do NOT delay in seeking bail"
    ],
    lawfulSteps: [
      "1. DO NOT make any statement to police. Get lawyer immediately",
      "2. File anticipatory bail application before arrest",
      "3. Request bail at first hearing after arrest",
      "4. Request medical examination to establish innocence",
      "5. Gather alibi evidence and witnesses",
      "6. Challenge FIR if filed under false circumstances",
      "7. File counter-case for false accusation"
    ],
    lawyerGuidance: "Rape accusations are life-threatening. Immediately engage a top criminal lawyer. Bail must be obtained urgently.",
    mentalHealthReminder: "False rape accusations are catastrophic. Seek strong legal support and professional counseling to cope with trauma."
  },
  "molestatio accusation": {
    summary: "Molestation accusations involve unwanted touching or sexual contact. False accusations require aggressive legal defense.",
    riskLevel: "High",
    relevantLaws: [
      "IPC Section 354 - Assault or criminal force to outrage modesty",
      "IPC Section 354A - Sexual harassment",
      "IPC Section 509 - Word, gesture or act intending to insult modesty",
      "Criminal Law (Amendment) Act 2013 - Enhanced penalties"
    ],
    legalRights: [
      "Right to bail (molestation is generally bailable)",
      "Right to cross-examine complainant",
      "Right to medical examination",
      "Right to challenge investigation bias",
      "Right to claim compensation for false accusation"
    ],
    donts: [
      "Do NOT contact complainant",
      "Do NOT make any admission of guilt",
      "Do NOT attend police station without lawyer",
      "Do NOT engage in confrontation"
    ],
    lawfulSteps: [
      "1. Consult criminal lawyer before police statement",
      "2. File anticipatory bail if notice received",
      "3. Request bail at first hearing",
      "4. Gather evidence denying physical contact",
      "5. Collect witnesses to your whereabouts",
      "6. Request independent CCTV footage review",
      "7. File counter-case for false accusation"
    ],
    lawyerGuidance: "Molestation cases depend on victim's testimony. A criminal lawyer will cross-examine and establish your innocence.",
    mentalHealthReminder: "False molestation accusations can destroy reputation. Defend yourself vigorously through legal means."
  },
  "eve teasing": {
    summary: "Eve teasing accusations (street harassment) can result in criminal cases. Defense requires establishing lawful conduct.",
    riskLevel: "Medium",
    relevantLaws: [
      "IPC Section 509 - Word, gesture or act intending to insult modesty",
      "IPC Section 506 - Criminal intimidation",
      "Bharatiya Nyaya Sanhita 2023 - Street harassment provisions"
    ],
    legalRights: [
      "Right to bail",
      "Right to challenge witness credibility",
      "Right to claim mistaken identity",
      "Right to counter-case for false accusation"
    ],
    donts: [
      "Do NOT engage in any conduct that could be misconstrued",
      "Do NOT approach complainant after accusation",
      "Do NOT admit to gestures or comments"
    ],
    lawfulSteps: [
      "1. Consult lawyer immediately",
      "2. File anticipatory bail if summoned",
      "3. Gather evidence of your presence elsewhere",
      "4. Collect character witnesses",
      "5. Challenge complainant's identification",
      "6. Request CCTV footage review",
      "7. File counter-complaint if wrongly identified"
    ],
    lawyerGuidance: "Eve teasing cases often depend on victim identification. Establish your whereabouts and character through witnesses.",
    mentalHealthReminder: "Eve teasing accusations can be humiliating. Defend your honor through legal process."
  },
  "debt recovery": {
    summary: "Debt recovery involves creditor pursuing payment through legal channels. Borrower has rights to challenge and negotiate.",
    riskLevel: "Medium",
    relevantLaws: [
      "Recovery of Debts Due to Banks and Financial Institutions Act 1993",
      "Insolvency and Bankruptcy Code 2016",
      "Limitation Act 1963 - Time period for debt recovery"
    ],
    legalRights: [
      "Right to challenge recovery if debt is paid or time-barred",
      "Right to negotiate settlement",
      "Right to claim wrong creditor",
      "Right to file insolvency petition",
      "Right to file counter-claim for interest over-charges"
    ],
    donts: [
      "Do NOT ignore recovery notices",
      "Do NOT provide false affidavits",
      "Do NOT harass creditor officials",
      "Do NOT hide assets during recovery proceedings"
    ],
    lawfulSteps: [
      "1. Verify debt authenticity with creditor documents",
      "2. File written statement in recovery case",
      "3. Produce proof of payment if debt is settled",
      "4. Claim limitation defense if debt is time-barred",
      "5. File counter-claim for interest over-charges",
      "6. Apply for debt settlement arrangement",
      "7. File insolvency petition if debt is unmanageable"
    ],
    lawyerGuidance: "Debt recovery cases move fast. Respond to notice immediately. A lawyer can help verify debt legitimacy and negotiate settlement.",
    mentalHealthReminder: "Debt stress is serious. Communicate with creditors and pursue legal options like settlement or insolvency."
  },
  "forgery accusation": {
    summary: "Forgery accusations involve creating or altering false documents. Serious criminal charge requiring documentary defense.",
    riskLevel: "High",
    relevantLaws: [
      "IPC Section 463 - Definition of forgery",
      "IPC Section 465 - Punishment for forgery",
      "IPC Section 466-474 - Forgery of valuable security and documents",
      "Indian Evidence Act 1872 - Document examination"
    ],
    legalRights: [
      "Right to forensic document examination",
      "Right to expert testimony",
      "Right to bail (generally granted)",
      "Right to challenge evidence collection",
      "Right to claim mistaken identity of signature"
    ],
    donts: [
      "Do NOT admit to creating forged documents",
      "Do NOT destroy documents",
      "Do NOT attempt to create more false evidence",
      "Do NOT flee from investigation"
    ],
    lawfulSteps: [
      "1. Hire forensic document examiner immediately",
      "2. File anticipatory bail application",
      "3. Provide independent expert opinion",
      "4. Gather evidence of legitimate document handling",
      "5. Challenge government forensic report",
      "6. File counter-case if wrongly framed",
      "7. Request technical examination by unbiased expert"
    ],
    lawyerGuidance: "Forgery cases depend on document examination. Hire independent forensic expert to establish authenticity.",
    mentalHealthReminder: "Forgery accusations are serious but defensible with proper expert evidence. Build strong documentary defense."
  },
  "child custody battle": {
    summary: "Child custody involves competing parental rights. Courts prioritize child's best interest but often default to mothers.",
    riskLevel: "High",
    relevantLaws: [
      "Guardianship and Wardship Act 1890",
      "Hindu Marriage Act 1955 - Section 26",
      "Indian Divorce Act 1869 - Section 41",
      "Juvenile Justice Act 2015 - Child welfare"
    ],
    legalRights: [
      "Right to joint custody",
      "Right to equal consideration of father's role",
      "Right to visitation rights",
      "Right to participate in child's education decisions",
      "Right to claim custody change if mother is unfit"
    ],
    donts: [
      "Do NOT prevent mother's access without court order",
      "Do NOT make unilateral decisions about child's future",
      "Do NOT involve child in parental conflict",
      "Do NOT miss visitation appointments"
    ],
    lawfulSteps: [
      "1. File custody petition emphasizing father's role",
      "2. Document involvement in child's upbringing",
      "3. Provide educational and medical records",
      "4. Request home study report",
      "5. Present witnesses to your parenting ability",
      "6. Seek joint custody arrangement",
      "7. Appeal for custody modification if circumstances change"
    ],
    lawyerGuidance: "Custody battles require proving parental capability and child's welfare. A family lawyer will argue for equal or joint custody.",
    mentalHealthReminder: "Custody battles are emotionally exhausting. Prioritize child's well-being and pursue co-parenting arrangements."
  },
  "paternity dispute": {
    summary: "Paternity disputes involve establishing or denying biological relationship. DNA tests provide conclusive evidence.",
    riskLevel: "High",
    relevantLaws: [
      "Indian Succession Act 1925 - Legitimacy and inheritance",
      "Hindu Marriage Act 1955 - Legitimacy of children",
      "Family Courts Act 1984",
      "Indian Evidence Act 1872 - DNA evidence admissibility"
    ],
    legalRights: [
      "Right to DNA testing",
      "Right to challenge paternity claim",
      "Right to deny support obligation if not biological father",
      "Right to claim inheritance if biological child",
      "Right to claim maintenance if biological parent"
    ],
    donts: [
      "Do NOT deny paternity without DNA testing",
      "Do NOT refuse DNA testing if requested",
      "Do NOT stop supporting child pending resolution",
      "Do NOT make public accusations without proof"
    ],
    lawfulSteps: [
      "1. Consult family lawyer immediately",
      "2. Request DNA testing through court",
      "3. File paternity challenge petition",
      "4. Provide evidence of non-biological relationship",
      "5. Pursue court-ordered DNA test",
      "6. Based on test results, claim relief",
      "7. Appeal if dissatisfied with DNA results"
    ],
    lawyerGuidance: "DNA tests are conclusive in paternity cases. File for testing immediately to resolve dispute scientifically.",
    mentalHealthReminder: "Paternity disputes are emotionally charged. Focus on scientific evidence and legal resolution for child's welfare."
  },
  "inheritance dispute": {
    summary: "Inheritance disputes involve competing claims to ancestral property or succession rights.",
    riskLevel: "High",
    relevantLaws: [
      "Indian Succession Act 1925",
      "Hindu Succession Act 1956 - Intestate succession",
      "Will Act 1837 - Will validity",
      "Transfer of Property Act 1882"
    ],
    legalRights: [
      "Right to challenge will authenticity",
      "Right to claim inheritance under intestate succession",
      "Right to claim maintenance from estate",
      "Right to partition inherited property",
      "Right to challenge undue influence in will-making"
    ],
    donts: [
      "Do NOT destroy will or succession documents",
      "Do NOT threaten other heirs",
      "Do NOT occupy inherited property unlawfully",
      "Do NOT make false claims without evidence"
    ],
    lawfulSteps: [
      "1. Gather birth certificate and relationship proof",
      "2. File succession petition in family court",
      "3. Provide evidence of relationship to deceased",
      "4. Challenge will if forged or made under undue influence",
      "5. Request probate court examination of will",
      "6. Claim intestate succession rights if no will",
      "7. Partition inherited property through court"
    ],
    lawyerGuidance: "Succession cases require genealogical proof. A succession lawyer will help establish your inheritance rights.",
    mentalHealthReminder: "Inheritance disputes often strain family relationships. Seek fair distribution through legal means."
  },
  "will forgery": {
    summary: "Will forgery involves creating false wills to disinherit rightful heirs. Serious criminal and civil matter.",
    riskLevel: "High",
    relevantLaws: [
      "IPC Section 463-474 - Forgery of documents",
      "Indian Succession Act 1925 - Will validity",
      "Indian Evidence Act 1872 - Document examination"
    ],
    legalRights: [
      "Right to challenge will through civil suit",
      "Right to file criminal case for forgery",
      "Right to forensic examination",
      "Right to claim rightful inheritance",
      "Right to claim damages from forger"
    ],
    donts: [
      "Do NOT destroy original will",
      "Do NOT make threats against forger",
      "Do NOT attempt self-help recovery",
      "Do NOT delay legal action (limitation applies)"
    ],
    lawfulSteps: [
      "1. Preserve original will and documents",
      "2. File civil suit challenging will",
      "3. Hire forensic document expert",
      "4. File criminal case for forgery",
      "5. Request police investigation",
      "6. Present expert testimony in court",
      "7. Claim rightful inheritance upon case success"
    ],
    lawyerGuidance: "Will forgery requires forensic evidence and succession law expertise. Hire specialized lawyers for civil and criminal aspects.",
    mentalHealthReminder: "Will disputes are emotionally charged family matters. Pursue legal resolution to protect inheritance rights."
  },
  "tenant harassment": {
    summary: "Tenant harassment by landlord involves illegal eviction, denial of utilities, or intimidation. Tenants have legal protection.",
    riskLevel: "Medium",
    relevantLaws: [
      "Indian Penal Code Section 426 - Mischief",
      "State Rent Control Acts - Tenant protection",
      "Prevention of Landlord and Tenant Disputes Act",
      "CrPC Section 150 - Procedure for eviction cases"
    ],
    legalRights: [
      "Right to quiet enjoyment of property",
      "Right to challenge eviction without notice",
      "Right to seek damages for illegal eviction",
      "Right to claim refund of wrongfully taken security deposit",
      "Right to protection from harassment"
    ],
    donts: [
      "Do NOT vacate without proper notice and court order",
      "Do NOT withhold rent without legal justification",
      "Do NOT damage property in retaliation",
      "Do NOT engage in confrontation with landlord"
    ],
    lawfulSteps: [
      "1. Document all harassment incidents (dates, witnesses)",
      "2. File written complaint with landlord",
      "3. Request written response within 30 days",
      "4. If unresolved, file tenant dispute in rent control",
      "5. Request court protection from eviction",
      "6. Seek damages for illegal actions",
      "7. File criminal case if threatened or assaulted"
    ],
    lawyerGuidance: "Tenant harassment cases often violate rent control laws. A lawyer will help establish protection rights and seek relief.",
    mentalHealthReminder: "Tenant harassment is stressful. Know your rights and pursue legal protection from unlawful eviction."
  },
  "landlord rights": {
    summary: "Landlords have rights to collect rent, evict non-paying tenants, and recover property through legal process.",
    riskLevel: "Medium",
    relevantLaws: [
      "State Rent Control Acts",
      "Transfer of Property Act 1882",
      "Civil Procedure Code - Eviction proceedings",
      "Specific Relief Act 1963"
    ],
    legalRights: [
      "Right to collect timely rent",
      "Right to legal eviction of non-paying tenants",
      "Right to recover property without tenant damage",
      "Right to retain security deposit for rent arrears",
      "Right to sue for unpaid rent and damages"
    ],
    donts: [
      "Do NOT evict without following legal procedures",
      "Do NOT shut off utilities as eviction tactic",
      "Do NOT harass or intimidate tenants",
      "Do NOT refuse to provide rent receipts"
    ],
    lawfulSteps: [
      "1. Issue notice for non-payment of rent (legal requirement)",
      "2. Allow grace period before legal action",
      "3. File eviction petition in rent control court",
      "4. Attend court hearings regularly",
      "5. Prove non-payment of rent through evidence",
      "6. Obtain eviction order from court",
      "7. File execution application for physical recovery"
    ],
    lawyerGuidance: "Evictions must follow rent control procedures. A lawyer will ensure legal compliance and swift property recovery.",
    mentalHealthReminder: "Rent collection disputes are common. Pursue legal remedies rather than self-help actions."
  },
  "boundary dispute": {
    summary: "Boundary disputes involve disagreement over property borders. Resolution requires survey, documentation, and court intervention.",
    riskLevel: "Medium",
    relevantLaws: [
      "Transfer of Property Act 1882",
      "Registration Act 1908",
      "Specific Relief Act 1963 - Injunctions",
      "Indian Penal Code Section 426 - Mischief"
    ],
    legalRights: [
      "Right to legal boundary as per registered deed",
      "Right to prevent encroachment",
      "Right to seek injunction",
      "Right to claim damages for trespass",
      "Right to force fence removal if illegal"
    ],
    donts: [
      "Do NOT take physical action against encroacher",
      "Do NOT destroy boundary markers",
      "Do NOT occupy neighbor's property",
      "Do NOT threaten or assault neighbor"
    ],
    lawfulSteps: [
      "1. Review property deed and registration",
      "2. Request written clarification from neighbor",
      "3. Hire surveyor to establish exact boundary",
      "4. File civil suit for declaration of boundary",
      "5. Seek interim injunction to prevent encroachment",
      "6. Provide survey evidence in court",
      "7. Execute judgment for boundary restoration"
    ],
    lawyerGuidance: "Boundary disputes require professional survey. A property lawyer will establish legal boundary and pursue injunction.",
    mentalHealthReminder: "Boundary disputes strain neighborhood relationships. Pursue legal resolution through proper survey and court order."
  },
  "neighbor noise complaint": {
    summary: "Excessive noise from neighbors violates right to peaceful enjoyment. Legal remedies include complaints and nuisance suits.",
    riskLevel: "Low",
    relevantLaws: [
      "Indian Penal Code Section 268 - Public nuisance",
      "Environment Protection Act 1986 - Noise pollution",
      "State Noise Pollution Rules",
      "Municipal Corporation Act - Noise regulation"
    ],
    legalRights: [
      "Right to quiet enjoyment of property",
      "Right to file noise pollution complaint",
      "Right to seek injunction against noise-making",
      "Right to claim damages for disturbance",
      "Right to request municipal intervention"
    ],
    donts: [
      "Do NOT create nuisance in retaliation",
      "Do NOT threaten or harass neighbor",
      "Do NOT engage in confrontation",
      "Do NOT make false noise complaints"
    ],
    lawfulSteps: [
      "1. Document noise incidents (dates, times, duration)",
      "2. File complaint with local police",
      "3. Request municipal noise measurement",
      "4. Communicate concerns to neighbor in writing",
      "5. File civil suit for nuisance damages",
      "6. Seek injunction against noise-making",
      "7. Request municipal fine for persistent violation"
    ],
    lawyerGuidance: "Noise complaints require documentation. A lawyer can help file nuisance suit and obtain injunction against persistent noise.",
    mentalHealthReminder: "Neighborhood noise disputes are frustrating. Pursue legal remedies through police and court intervention."
  },
  "traffic violation": {
    summary: "Traffic violations include speeding, rash driving, and traffic rule breaches. Penalties depend on violation severity.",
    riskLevel: "Low",
    relevantLaws: [
      "Motor Vehicles Act 1988 - Traffic rules and penalties",
      "Bharatiya Nyaya Sanhita 2023 - Updated traffic provisions",
      "Road Safety Rules - Vehicle operation standards"
    ],
    legalRights: [
      "Right to challenge challan if issued incorrectly",
      "Right to file plea in traffic court",
      "Right to appeal fine decision",
      "Right to request dash-cam evidence",
      "Right to claim wrong identity"
    ],
    donts: [
      "Do NOT pay challan without understanding charge",
      "Do NOT attempt to bribe traffic police",
      "Do NOT flee from traffic stop",
      "Do NOT create further traffic violations"
    ],
    lawfulSteps: [
      "1. Note challan number and details",
      "2. Review violation charges carefully",
      "3. File written plea in traffic court if disputable",
      "4. Request video footage evidence",
      "5. Challenge challan if error in registration or facts",
      "6. Pay fine if violation is clear",
      "7. Appeal to higher authority if dissatisfied"
    ],
    lawyerGuidance: "Traffic violation fines can be challenged if improperly issued. A traffic lawyer can help file plea if evidence is unclear.",
    mentalHealthReminder: "Traffic violations are common. Pay fines promptly and follow traffic rules to avoid serious charges."
  },
  "driving under influence": {
    summary: "Driving under influence (alcohol/drugs) is serious criminal offense. Conviction results in license suspension and imprisonment.",
    riskLevel: "High",
    relevantLaws: [
      "Motor Vehicles Act 1988 - Section 185 (DUI penalties)",
      "Indian Penal Code Section 336-338 - Rash/negligent driving",
      "Bharatiya Nyaya Sanhita 2023 - Updated DUI provisions"
    ],
    legalRights: [
      "Right to refuse breathalyzer test (request blood test)",
      "Right to medical examination",
      "Right to bail before conviction",
      "Right to challenge blood test results",
      "Right to plead first-time offender"
    ],
    donts: [
      "Do NOT take breathalyzer test without legal advice",
      "Do NOT admit to alcohol consumption",
      "Do NOT make statements to police without lawyer",
      "Do NOT drive if impaired"
    ],
    lawfulSteps: [
      "1. Consult criminal lawyer immediately",
      "2. Request blood test instead of breathalyzer",
      "3. File bail application at first hearing",
      "4. Challenge sobriety test procedure",
      "5. Request independent medical examination",
      "6. File plea for first-time offender mitigation",
      "7. Appeal if convicted with harsh sentence"
    ],
    lawyerGuidance: "DUI cases involve scientific evidence. Challenge test procedure and accuracy. Bail is critical before conviction.",
    mentalHealthReminder: "DUI conviction has serious consequences. Pursue legal defense while addressing substance issues."
  },
  "business partnership dispute": {
    summary: "Partnership disputes involve disagreement over profits, roles, or partnership dissolution. Contract terms determine resolution.",
    riskLevel: "High",
    relevantLaws: [
      "Indian Partnership Act 1932",
      "Limited Liability Partnership Act 2008",
      "Companies Act 2013 (if incorporated)",
      "Specific Relief Act 1963 - Partnership injunctions"
    ],
    legalRights: [
      "Right to equal partnership benefits (unless agreed otherwise)",
      "Right to access partnership accounts",
      "Right to dissolve partnership with notice",
      "Right to claim damages for breach",
      "Right to seek accounting of partnership assets"
    ],
    donts: [
      "Do NOT unilaterally dissolve partnership",
      "Do NOT misappropriate partnership funds",
      "Do NOT make major decisions without partner consent",
      "Do NOT hide partnership assets"
    ],
    lawfulSteps: [
      "1. Review partnership agreement carefully",
      "2. Document grievances and communications",
      "3. Request partnership accounting",
      "4. Send written notice for dissolution if intended",
      "5. File suit for partnership accounting",
      "6. Seek injunction if partner acts unlawfully",
      "7. Pursue partition of partnership assets"
    ],
    lawyerGuidance: "Partnership disputes require contract analysis. A business lawyer will help pursue accounting and dissolution relief.",
    mentalHealthReminder: "Partnership disputes damage business and relationships. Seek amicable resolution or legal partition."
  },
  "employment termination": {
    summary: "Wrongful termination occurs when employer dismisses employee without valid cause or legal procedure.",
    riskLevel: "Medium",
    relevantLaws: [
      "Industrial Disputes Act 1947 - Section 25 (Dismissal procedure)",
      "Labor Law - Termination rules",
      "Shops and Establishments Act - Employment protection"
    ],
    legalRights: [
      "Right to notice period or payment",
      "Right to final salary and benefits",
      "Right to file industrial dispute",
      "Right to claim wrongful termination damages",
      "Right to severance pay"
    ],
    donts: [
      "Do NOT resign immediately (affects your legal position)",
      "Do NOT accept settlement without legal advice",
      "Do NOT destroy employment documents",
      "Do NOT make threats or create disturbance"
    ],
    lawfulSteps: [
      "1. Consult labor lawyer immediately",
      "2. Demand written reason for termination",
      "3. File industrial dispute petition",
      "4. Claim notice period payment or notice period salary",
      "5. Claim final dues and benefits",
      "6. Seek reinstatement if termination was unlawful",
      "7. Pursue damages for wrongful dismissal"
    ],
    lawyerGuidance: "Wrongful termination cases require labor law expertise. A lawyer will help pursue full dues and possible reinstatement.",
    mentalHealthReminder: "Job loss is stressful. Pursue legal remedies for full benefits and consider alternative employment."
  },
  "salary non-payment": {
    summary: "Employer non-payment of salary is violation of employment contract and labor law. Recovery possible through legal action.",
    riskLevel: "Medium",
    relevantLaws: [
      "Payment of Wages Act 1936",
      "Minimum Wages Act 1948",
      "Industrial Disputes Act 1947",
      "Code on Wages 2019"
    ],
    legalRights: [
      "Right to timely and full salary payment",
      "Right to claim arrears with interest",
      "Right to claim minimum wages if applicable",
      "Right to file labor department complaint",
      "Right to seek injunction for immediate payment"
    ],
    donts: [
      "Do NOT absent yourself or refuse work",
      "Do NOT damage employer's property",
      "Do NOT make public accusations without proof",
      "Do NOT engage in unlawful protest"
    ],
    lawfulSteps: [
      "1. Demand written salary statement",
      "2. Send formal notice for payment",
      "3. File complaint with labor department",
      "4. File court petition for salary recovery",
      "5. Provide salary evidence (bank statements, contracts)",
      "6. Claim interest on outstanding salary",
      "7. Pursue legal attachment of employer assets"
    ],
    lawyerGuidance: "Salary recovery cases are straightforward. A labor lawyer will help file complaint and pursue full arrears recovery.",
    mentalHealthReminder: "Salary issues are serious financial hardship. Pursue legal remedies for timely recovery."
  },
  "workplace sexual harassment complaint": {
    summary: "As an accused in workplace sexual harassment, defend with evidence of lawful conduct and proper investigation.",
    riskLevel: "High",
    relevantLaws: [
      "Sexual Harassment of Women at Workplace Act 2013",
      "IPC Section 509 - Insult to modesty",
      "IPC Section 354 - Criminal force to outrage modesty",
      "Bharatiya Nyaya Sanhita 2023"
    ],
    legalRights: [
      "Right to fair investigation",
      "Right to cross-examine complainant",
      "Right to present evidence of innocence",
      "Right to challenge biased investigation",
      "Right to claim damages for false accusation"
    ],
    donts: [
      "Do NOT contact complainant or witnesses",
      "Do NOT make threats or intimidating statements",
      "Do NOT resign immediately",
      "Do NOT destroy evidence or communications"
    ],
    lawfulSteps: [
      "1. Consult labor lawyer immediately",
      "2. Provide written response to complaint",
      "3. Present evidence of professional conduct",
      "4. Identify witnesses supporting your innocence",
      "5. Request fair investigation by unbiased committee",
      "6. File counter-complaint if accusation is malicious",
      "7. Appeal internal order to higher authority"
    ],
    lawyerGuidance: "Workplace harassment investigations are serious. Ensure fair procedure and present all exculpatory evidence.",
    mentalHealthReminder: "False workplace harassment accusations are damaging. Defend your reputation through proper investigation response."
  },
  "non-compete clause": {
    summary: "Non-compete agreements restrict employment with competitors. Validity depends on reasonableness of restriction.",
    riskLevel: "Medium",
    relevantLaws: [
      "Indian Contract Act 1872 - Section 27 (Restraint of trade)",
      "Indian Partnership Act 1932 - Non-compete",
      "Employment law principles"
    ],
    legalRights: [
      "Right to challenge unreasonable non-compete",
      "Right to seek injunction waiver if clause is excessive",
      "Right to claim damages if wrongful restraint",
      "Right to refuse penalty enforcement"
    ],
    donts: [
      "Do NOT violate non-compete without legal advice",
      "Do NOT solicit employer's customers immediately",
      "Do NOT disclose trade secrets",
      "Do NOT accept job if clearly violates agreement"
    ],
    lawfulSteps: [
      "1. Review non-compete clause carefully",
      "2. Consult employment lawyer on reasonableness",
      "3. Challenge clause if period/scope is excessive",
      "4. File suit for declaration of invalidity",
      "5. Seek injunction against enforcement",
      "6. Challenge restraint damages if imposed",
      "7. Pursue employment alternative"
    ],
    lawyerGuidance: "Non-compete enforceability depends on reasonableness. Challenge excessive restrictions through court action.",
    mentalHealthReminder: "Non-compete restrictions can limit career opportunities. Pursue legal challenge if clause is unreasonable."
  },
  "intellectual property theft": {
    summary: "IP theft involves unauthorized use of patents, trademarks, or copyrights. Civil and criminal remedies available.",
    riskLevel: "High",
    relevantLaws: [
      "Patents Act 1970 - Patent infringement",
      "Trademarks Act 1999 - Trademark infringement",
      "Copyright Act 1957 - Copyright infringement",
      "Designs Act 2000 - Design protection"
    ],
    legalRights: [
      "Right to file infringement suit",
      "Right to seek injunction against infringer",
      "Right to claim damages for lost sales",
      "Right to file criminal complaint",
      "Right to seek seizure of infringing goods"
    ],
    donts: [
      "Do NOT threaten IP owner without legal basis",
      "Do NOT continue infringing use after notice",
      "Do NOT destroy evidence of ownership",
      "Do NOT engage in counter-infringement"
    ],
    lawfulSteps: [
      "1. Register IP rights (patent/trademark/copyright)",
      "2. Document infringement with evidence",
      "3. Send cease and desist notice",
      "4. File suit for infringement damages",
      "5. Seek interim injunction against infringer",
      "6. File criminal complaint if flagrant",
      "7. Request customs seizure of infringing imports"
    ],
    lawyerGuidance: "IP infringement cases require registration and evidence. An IP lawyer will pursue injunction and damages against infringer.",
    mentalHealthReminder: "IP theft damages business and innovation. Pursue aggressive legal action to protect intellectual property."
  },
  "trade secret misappropriation": {
    summary: "Trade secret misappropriation involves unauthorized disclosure of confidential business information.",
    riskLevel: "High",
    relevantLaws: [
      "Indian Contract Act 1872 - Breach of confidentiality",
      "Indian Penal Code Section 408 - Criminal breach of trust",
      "Indian Penal Code Section 405-406 - Dishonest appropriation",
      "Trade Secrets Act principles"
    ],
    legalRights: [
      "Right to claim damages for disclosure",
      "Right to seek injunction against further disclosure",
      "Right to claim profits earned through misuse",
      "Right to file criminal complaint",
      "Right to claim punitive damages"
    ],
    donts: [
      "Do NOT disclose trade secrets to anyone",
      "Do NOT use company information after leaving",
      "Do NOT share with competitors or others",
      "Do NOT copy confidential documents"
    ],
    lawfulSteps: [
      "1. Document trade secret status and secrecy measures",
      "2. File cease and desist notice for disclosure",
      "3. File civil suit for damages",
      "4. Seek emergency injunction against further disclosure",
      "5. File criminal complaint for breach of trust",
      "6. Claim profits made through misuse",
      "7. Pursue injunction against competing business use"
    ],
    lawyerGuidance: "Trade secret cases require proving confidentiality and damages. A corporate lawyer will pursue injunction and damages recovery.",
    mentalHealthReminder: "Trade secret disclosure damages business. Pursue legal action immediately to prevent further harm."
  },
  "tax evasion accusation": {
    summary: "Tax evasion accusations are serious. Cooperation with tax authorities is crucial while maintaining legal rights.",
    riskLevel: "High",
    relevantLaws: [
      "Income Tax Act 1961 - Sections 271-276 (Penalties and prosecution)",
      "Goods and Services Tax Act 2017 - Tax evasion provisions",
      "Black Money (Undisclosed Foreign Income and Assets) and Imposition of Tax Act 2015"
    ],
    legalRights: [
      "Right to legal representation in tax proceedings",
      "Right to challenge assessment",
      "Right to appeal to tax appellate authority",
      "Right to file response to show-cause notice",
      "Right to claim relief for inadvertent errors"
    ],
    donts: [
      "Do NOT ignore tax department notices",
      "Do NOT destroy tax documents or records",
      "Do NOT make false declarations",
      "Do NOT attempt to hide income sources"
    ],
    lawfulSteps: [
      "1. Consult tax lawyer immediately upon notice",
      "2. Organize all financial records and documents",
      "3. File detailed written response to show-cause notice",
      "4. Cooperate with tax department investigation",
      "5. File appeal before appellate authority if unfavorable",
      "6. Claim relief for inadvertent errors",
      "7. Pursue higher appeal if necessary"
    ],
    lawyerGuidance: "Tax evasion cases require detailed financial documentation. A tax lawyer will negotiate with authorities and file appeals.",
    mentalHealthReminder: "Tax disputes cause financial stress. Cooperate with authorities while protecting your legal rights through proper channels."
  },
  "GST fraud": {
    summary: "GST fraud includes claiming false input credits or hiding sales. Investigation can result in fines and prosecution.",
    riskLevel: "High",
    relevantLaws: [
      "Goods and Services Tax Act 2017 - Sections 122-123 (Audit and penalty)",
      "GST Council guidelines on fraud detection",
      "Indian Penal Code - Tax fraud provisions"
    ],
    legalRights: [
      "Right to respond to show-cause notice",
      "Right to appeal GST officer's order",
      "Right to appeal to GST appellate tribunal",
      "Right to request cross-examination",
      "Right to claim relief for inadvertent errors"
    ],
    donts: [
      "Do NOT ignore GST department notice",
      "Do NOT continue fraudulent practices",
      "Do NOT destroy invoices or documents",
      "Do NOT attempt bribery of officials"
    ],
    lawfulSteps: [
      "1. Consult GST compliance lawyer immediately",
      "2. Organize all GST returns and invoices",
      "3. File detailed response to show-cause notice",
      "4. Provide explanation for credit discrepancies",
      "5. File appeal before GST appellate tribunal",
      "6. Request cross-examination of tax officer",
      "7. Pursue higher appeal if order is unfavorable"
    ],
    lawyerGuidance: "GST fraud cases require accounting expertise. A GST lawyer will respond to audit and file appeals against penalties.",
    mentalHealthReminder: "GST disputes affect business operations. Seek legal help early to minimize penalties and maintain compliance."
  },
  "bank fraud": {
    summary: "Bank fraud accusations include unauthorized transactions, check fraud, or account manipulation. Defense requires documentation.",
    riskLevel: "High",
    relevantLaws: [
      "Indian Penal Code Section 420 - Cheating by personation",
      "Negotiable Instruments Act 1881 - Check fraud",
      "Banking Regulation Act 1949",
      "Prevention of Money Laundering Act 2002"
    ],
    legalRights: [
      "Right to obtain transaction records from bank",
      "Right to challenge unauthorized transaction claim",
      "Right to file police complaint if victim of fraud",
      "Right to claim bank liability for negligence",
      "Right to criminal defense against accusations"
    ],
    donts: [
      "Do NOT admit to unauthorized transactions",
      "Do NOT continue suspicious banking activities",
      "Do NOT destroy bank statements or documents",
      "Do NOT attempt to reconcile without legal help"
    ],
    lawfulSteps: [
      "1. Request full transaction history from bank",
      "2. Verify all transactions with bank records",
      "3. File dispute with bank if unauthorized",
      "4. Consult criminal lawyer if accused",
      "5. File police complaint if victim of fraud",
      "6. Claim bank liability for negligence",
      "7. Appeal unfavorable bank decisions"
    ],
    lawyerGuidance: "Bank fraud cases require detailed transaction analysis. A lawyer will establish your innocence or bank's liability.",
    mentalHealthReminder: "Bank fraud allegations are serious. Maintain calm and pursue legal resolution through proper channels."
  },
  "default": {
    summary: "This is a general legal awareness response for men in India. You can ask about false accusations, blackmail, harassment, custody, maintenance, and other legal issues.",
    riskLevel: "Medium",
    relevantLaws: [
      "Indian Penal Code (IPC) - Sections 499-509 (Defamation and insults)",
      "Code of Criminal Procedure (CrPC) - Sections 125-126 (Maintenance)",
      "Information Technology Act 2000 - Cyber harassment and offenses",
      "Protection of Women from Domestic Violence Act 2005",
      "Guardianship and Wardship Act 1890 - Child custody"
    ],
    legalRights: [
      "Right to fair trial and due process",
      "Right to legal representation",
      "Right to evidence presentation",
      "Right to cross-examine witnesses",
      "Right to appeal adverse orders"
    ],
    donts: [
      "Do NOT engage in any illegal activity",
      "Do NOT threaten, harass, or abuse anyone",
      "Do NOT destroy evidence or documents",
      "Do NOT lie to court or police",
      "Do NOT delay seeking legal help"
    ],
    lawfulSteps: [
      "1. Understand your legal rights and responsibilities",
      "2. Consult a qualified lawyer immediately for any legal issue",
      "3. Document all relevant facts and evidence",
      "4. File complaints or petitions through proper legal channels",
      "5. Maintain respectful communication",
      "6. Follow court orders and legal procedures",
      "7. Pursue appeals if necessary through proper channels"
    ],
    lawyerGuidance: "Consult a lawyer for any legal issue. Legal advice is crucial to protect your rights under Indian law.",
    mentalHealthReminder: "Legal disputes are stressful. Seek emotional support from family, friends, or a counselor while pursuing legal remedies."
  }
};

function findRelevantResponse(prompt: string): LegalAnalysis {
  const lowerPrompt = prompt.toLowerCase();
  
  // Check for keywords in the prompt
  for (const [key, response] of Object.entries(legalResponses)) {
    if (key !== "default" && lowerPrompt.includes(key)) {
      return response;
    }
  }
  
  // Check for related keywords
  const keywords: { [key: string]: string } = {
    "accused": "false accusation",
    "allegation": "false accusation",
    "extortion": "blackmail",
    "money demand": "blackmail",
    "online abuse": "cyber harassment",
    "trolling": "cyber harassment",
    "abuse": "cyber harassment",
    "bad reputation": "defamation",
    "slander": "defamation",
    "false claim": "defamation",
    "spouse": "relationship dispute",
    "husband": "relationship dispute",
    "wife": "relationship dispute",
    "marriage": "relationship dispute",
    "divorce": "relationship dispute",
    "violence": "domestic violence",
    "alimony": "maintenance",
    "support": "maintenance",
    "child": "custody",
    "kid": "custody",
    "repeated contact": "harassment",
    "unwanted call": "harassment",
    "threat": "threat",
    "demand money": "dowry",
    "bride price": "dowry",
    "sexual": "sexual harassment",
    "touch": "sexual harassment",
    "indecent": "sexual harassment",
    "property": "property dispute",
    "land": "property dispute",
    "discrimination": "workplace discrimination",
    "caste": "workplace discrimination",
    "contract": "contract breach",
    "agreement": "contract breach",
    "loan": "loan default",
    "bank": "loan default",
    "cheat": "cheating accusation",
    "fraud": "cheating accusation",
    "steal": "theft accusation",
    "fight": "assault charge",
    "hit": "assault charge",
    "rape": "rape accusation",
    "molest": "molestatio accusation",
    "eve tease": "eve teasing",
    "debt": "debt recovery",
    "forge": "forgery accusation",
    "document": "forgery accusation",
    "custody battle": "child custody battle",
    "paternity": "paternity dispute",
    "biological": "paternity dispute",
    "inheritance": "inheritance dispute",
    "succession": "inheritance dispute",
    "will": "will forgery",
    "tenant": "tenant harassment",
    "rent": "landlord rights",
    "landlord": "landlord rights",
    "boundary": "boundary dispute",
    "neighbor": "neighbor noise complaint",
    "noise": "neighbor noise complaint",
    "traffic": "traffic violation",
    "speed": "traffic violation",
    "drunk": "driving under influence",
    "alcohol": "driving under influence",
    "dui": "driving under influence",
    "business": "business partnership dispute",
    "partner": "business partnership dispute",
    "employment": "employment termination",
    "job": "employment termination",
    "salary": "salary non-payment",
    "wage": "salary non-payment",
    "payment": "salary non-payment",
    "harassment at work": "workplace sexual harassment complaint",
    "compete": "non-compete clause",
    "restriction": "non-compete clause",
    "patent": "intellectual property theft",
    "trademark": "intellectual property theft",
    "copyright": "intellectual property theft",
    "secret": "trade secret misappropriation",
    "confidential": "trade secret misappropriation",
    "tax": "tax evasion accusation",
    "gst": "GST fraud",
    "invoice": "GST fraud",
    "bank fraud": "bank fraud",
    "transaction": "bank fraud"
  };
  
  for (const [keyword, category] of Object.entries(keywords)) {
    if (lowerPrompt.includes(keyword)) {
      return legalResponses[category] || legalResponses["default"];
    }
  }
  
  return legalResponses["default"];
}

export async function analyzeSituation(prompt: string): Promise<LegalAnalysis> {
  // Return predefined legal response based on user input
  return findRelevantResponse(prompt);
}
