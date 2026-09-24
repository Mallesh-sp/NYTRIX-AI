// Enhanced Law Concepts Database with detailed information
export interface LawConceptDetail {
  definition: string;
  relatedLaws?: string[];
  keyPoints?: string[];
  implications?: string[];
  lawyerGuidance?: string;
  whenToConsult?: string;
  practicalTips?: string[];
}

export const lawConceptsDetailed: { [key: string]: LawConceptDetail } = {
  "law": {
    definition: "Law is a system of rules enforced by courts to regulate society.",
    keyPoints: [
      "Laws are binding rules created by the government",
      "Laws are enforced through courts and legal authorities",
      "Laws maintain order and protect rights of individuals",
      "Laws vary by country and jurisdiction"
    ],
    implications: [
      "Violation of laws can result in penalties and punishment",
      "Every citizen is subject to the laws of their country",
      "Laws protect fundamental rights of individuals"
    ],
    lawyerGuidance: "Understanding law is essential for protecting your rights. Consult a lawyer if you have legal concerns.",
    practicalTips: [
      "Keep yourself informed about basic laws affecting your life",
      "Know your rights and responsibilities",
      "Seek legal advice before signing important documents"
    ]
  },
  "constitution": {
    definition: "The Constitution of India is the supreme law of the land.",
    relatedLaws: ["Part I - Union and its Territory", "Part II - Citizenship", "Part III - Fundamental Rights"],
    keyPoints: [
      "It is the longest written constitution in the world",
      "Adopted on January 26, 1950",
      "Contains 470 articles and 12 schedules",
      "Provides the framework for Indian governance"
    ],
    implications: [
      "All laws must be in compliance with the Constitution",
      "Constitutional provisions supersede all other laws",
      "Any law violating Constitution can be struck down"
    ],
    lawyerGuidance: "For constitutional matters or if you believe a law is unconstitutional, consult a constitutional lawyer.",
    whenToConsult: "When facing violations of constitutional rights or challenging the validity of laws",
    practicalTips: [
      "Read Preamble to understand Constitution's objectives",
      "Know your fundamental rights under Part III",
      "Understand the principle of separation of powers"
    ]
  },
  "fundamental rights": {
    definition: "Fundamental Rights are given under Part III of the Constitution.",
    relatedLaws: ["Articles 12-35 of the Indian Constitution"],
    keyPoints: [
      "There are 6 fundamental rights",
      "They are enforceable in courts",
      "Cannot be taken away by the government arbitrarily",
      "Apply to all citizens and in some cases to foreigners"
    ],
    implications: [
      "Violation of fundamental rights is actionable in court",
      "Government can be sued for violating these rights",
      "Supreme Court can issue writs to protect these rights"
    ],
    lawyerGuidance: "If your fundamental rights are violated, immediately approach a lawyer to file a petition.",
    whenToConsult: "When you believe your fundamental rights have been violated",
    practicalTips: [
      "Know all 6 fundamental rights: Equality, Freedom, Right against Exploitation, Right to Freedom of Religion, Cultural and Educational Rights, and Right to Constitutional Remedies",
      "Document any violation with dates and witnesses",
      "Act quickly as there may be time limits"
    ]
  },
  "defamation": {
    definition: "Defamation harms a person's reputation.",
    relatedLaws: [
      "IPC Section 499 - Definition of defamation",
      "IPC Section 500 - Punishment for defamation (up to 2 years imprisonment or fine)",
      "IPC Section 501 - Printing or engraving matter known to be defamatory"
    ],
    keyPoints: [
      "False statement must be published",
      "Statement must harm reputation",
      "Must be identifiable to a person",
      "Intent or recklessness matters",
      "Public or private communication both count"
    ],
    implications: [
      "Can face civil liability and damages",
      "Can face criminal prosecution",
      "Victim can claim compensation",
      "Punishment up to 2 years imprisonment or fine"
    ],
    lawyerGuidance: "If you are defamed, file a complaint with FIR and consult a lawyer for damage compensation. If accused, defend immediately.",
    whenToConsult: "As soon as you know false statements about you are being spread",
    practicalTips: [
      "Collect all evidence of defamatory statements (screenshots, recordings, witnesses)",
      "Send legal notice to the defamer",
      "File FIR with police",
      "Document impact on your reputation and income"
    ]
  },
  "fir": {
    definition: "FIR means First Information Report - the first written record of a complaint to police.",
    relatedLaws: ["Section 154 CrPC - Contents of FIR", "Section 155 CrPC - Cases in which police can start investigation"],
    keyPoints: [
      "Must be filed immediately after crime is reported",
      "Police cannot refuse to file FIR for cognizable offence",
      "FIR is registered and given a number",
      "Serves as basis for police investigation"
    ],
    implications: [
      "Without FIR, no criminal investigation can start",
      "False FIR is itself a criminal offense",
      "FIR details are public record",
      "Can be used in evidence in court"
    ],
    lawyerGuidance: "If you're a victim, ensure FIR is filed correctly. If falsely accused, file FIR against false accusation.",
    whenToConsult: "Immediately after a crime, or if false FIR is filed against you",
    practicalTips: [
      "File FIR within 24 hours of crime",
      "Provide detailed, accurate information",
      "Keep copy of FIR for your records",
      "Follow up with police regularly",
      "If refused, escalate to higher police officer"
    ]
  },
  "bail": {
    definition: "Bail is the temporary release of an accused person pending trial.",
    relatedLaws: [
      "Section 436-450 CrPC - Provisions on Bail",
      "Section 41-42 CrPC - Conditions for arrest",
      "Bail is a fundamental right in bailable offences"
    ],
    keyPoints: [
      "Bail is a right in bailable offences",
      "Can be cash, property, or personal bond",
      "Conditions can be imposed",
      "Bail amount depends on crime severity"
    ],
    implications: [
      "Failure to return for trial can result in bail cancellation",
      "Violation of conditions leads to arrest",
      "Non-bailable offences require strong circumstances to release",
      "Bail does not mean innocent, just release pending trial"
    ],
    lawyerGuidance: "If arrested, immediately contact a lawyer to apply for bail. Lawyer can argue for reasonable bail amount.",
    whenToConsult: "Immediately after arrest, before police custody",
    practicalTips: [
      "Know the difference between bail and acquittal",
      "Have guarantors ready for surety",
      "Comply strictly with bail conditions",
      "Attend all court dates without fail",
      "Document your employment and fixed residence"
    ]
  },
  "arrest": {
    definition: "Arrest means taking a person into custody by police.",
    relatedLaws: [
      "Section 41-42 CrPC - Procedure for arrest",
      "Section 43 CrPC - Information to arrested person",
      "Section 44 CrPC - Search of person arrested"
    ],
    keyPoints: [
      "Police must have reasonable grounds",
      "Arrest warrant may be required",
      "Person must be informed of grounds",
      "Can be done without warrant in cognizable offences"
    ],
    implications: [
      "Illegal arrest can lead to compensation",
      "Person has right to legal representation",
      "Must be produced before magistrate in 24 hours",
      "Custody can extend up to 15 days for investigation"
    ],
    lawyerGuidance: "Know your rights during arrest. Call a lawyer immediately. Do not make statements without counsel.",
    whenToConsult: "The moment you are arrested or if someone you know is arrested",
    practicalTips: [
      "Ask for grounds of arrest",
      "Do not resist arrest",
      "Request to speak to a lawyer",
      "Note down police officer's name and badge number",
      "Do not sign any document without understanding",
      "Remember your legal rights"
    ]
  },
  "ipc": {
    definition: "IPC stands for Indian Penal Code, 1860 - the main criminal law statute.",
    relatedLaws: [
      "Section 1-511 IPC - Various criminal offences",
      "General Principles of Criminal Law",
      "Sections 149, 307, 420 - Common crimes"
    ],
    keyPoints: [
      "Contains 511 sections covering all crimes",
      "Defines offences and punishments",
      "Applies to all of India",
      "Fundamental to Indian criminal justice"
    ],
    implications: [
      "Crimes are prosecuted under IPC",
      "Punishments range from fine to life imprisonment",
      "Each crime has specific elements to prove",
      "No crime without corresponding IPC section"
    ],
    lawyerGuidance: "Understanding relevant IPC sections for your case is crucial. Your lawyer will guide you through specific sections applicable to your situation.",
    whenToConsult: "When involved in any criminal matter as accused or victim",
    practicalTips: [
      "Know common IPC sections: 149 (Rioting), 307 (Attempt to murder), 420 (Cheating)",
      "Each section has specific elements that must be proven",
      "Punishment increases with severity of crime",
      "Read the section carefully to understand charges"
    ]
  },
  "crpc": {
    definition: "CrPC deals with criminal procedure - the rules for criminal cases.",
    relatedLaws: [
      "Code of Criminal Procedure, 1973",
      "Rules for investigation, arrest, trial, conviction"
    ],
    keyPoints: [
      "Governs procedural aspects of criminal law",
      "Ensures fair trial and due process",
      "Different from IPC (which defines crimes)",
      "Essential for criminal justice administration"
    ],
    implications: [
      "Non-compliance can void criminal proceedings",
      "Ensures constitutional rights are protected",
      "Defines procedure for all criminal matters",
      "Cases can be dismissed on CrPC violations"
    ],
    lawyerGuidance: "CrPC violations can be grounds for appeal. Your lawyer should know CrPC provisions well.",
    whenToConsult: "In any criminal matter to ensure procedures are followed correctly",
    practicalTips: [
      "Know your rights at each stage: arrest, bail, trial, conviction",
      "Follow proper procedures to protect your case",
      "Document procedural violations",
      "Raise procedural objections immediately"
    ]
  },
  "justice": {
    definition: "Justice ensures fairness and equality in legal proceedings.",
    keyPoints: [
      "Justice is the core principle of legal system",
      "Must be timely and accessible",
      "Justice must be seen to be done",
      "Applies equally to all persons"
    ],
    implications: [
      "Delayed justice is justice denied",
      "Everyone deserves fair trial",
      "Rules apply equally regardless of status",
      "Unfair procedures can be challenged"
    ],
    lawyerGuidance: "If justice is delayed or denied, escalate through higher courts and seek legal remedies.",
    whenToConsult: "If you feel you are not receiving fair treatment in legal proceedings",
    practicalTips: [
      "Know your rights at every stage",
      "Document everything in writing",
      "Seek legal help promptly",
      "Use appropriate legal remedies available"
    ]
  },
  "domestic violence": {
    definition: "Domestic Violence Act protects women from abuse.",
    relatedLaws: [
      "Protection of Women from Domestic Violence Act, 2005",
      "IPC Section 498-A - Cruelty by husband or his relatives",
      "IPC Section 304-B - Dowry death"
    ],
    keyPoints: [
      "Covers physical, sexual, emotional, and economic abuse",
      "Protects women and children",
      "Can apply to live-in relationships",
      "Protection order can be obtained from courts"
    ],
    implications: [
      "Victim can file for protection order",
      "Perpetrator can face criminal charges",
      "Victim can seek damages and maintenance",
      "Residence order can protect victim's shelter"
    ],
    lawyerGuidance: "If facing domestic violence, immediately approach the police or file for protection order. A lawyer can help with compensation claims.",
    whenToConsult: "Immediately if experiencing any form of domestic abuse",
    practicalTips: [
      "Document all injuries with photos and medical reports",
      "Maintain records of all incidents with dates",
      "Save messages and emails as evidence",
      "Reach out to domestic violence helpline",
      "File complaint with police immediately"
    ]
  },
  "blackmail": {
    definition: "Blackmail is extortion under Indian law, often combined with threats or demands of money/favors.",
    relatedLaws: [
      "IPC Section 383 - Extortion",
      "IPC Section 384 - Punishment for extortion",
      "IPC Section 385 - Putting person in fear of injury to commit extortion",
      "IPC Section 506 - Criminal intimidation"
    ],
    keyPoints: [
      "Involves threat to cause injury",
      "Demands something in return",
      "Can be money, favors, or anything of value",
      "Can be done by phone, email, or in person"
    ],
    implications: [
      "Criminal offense with imprisonment up to 7 years",
      "Fine can be imposed",
      "Victim can claim damages",
      "Can be combined with extortion charges"
    ],
    lawyerGuidance: "Report blackmail to police immediately. Keep all evidence of threats. Consult a lawyer for protection and counter-case filing.",
    whenToConsult: "As soon as you receive any blackmail threat",
    practicalTips: [
      "Save all messages, emails, and call records",
      "Do not comply with blackmailer's demands",
      "Report to police immediately with evidence",
      "File FIR for extortion under IPC Section 384",
      "Consider applying for police protection if threat to life"
    ]
  },
  "cyber law": {
    definition: "Cyber law deals with internet and digital crimes.",
    relatedLaws: [
      "IT Act, 2000 - Cybercrime legislation",
      "IPC Section 505 - Public mischief through internet",
      "Section 66 - Unauthorized access to computer systems"
    ],
    keyPoints: [
      "Covers hacking, phishing, identity theft",
      "Includes cyberbullying and online harassment",
      "Data privacy and unauthorized access are crimes",
      "Email and social media harassment are punishable"
    ],
    implications: [
      "Imprisonment up to 10 years in serious cases",
      "Significant fines can be imposed",
      "Victim can claim damages",
      "International cooperation in investigations"
    ],
    lawyerGuidance: "For any cybercrime, preserve all digital evidence and report to Cybercrime Police Cell immediately. Consult IT law specialist.",
    whenToConsult: "When facing any form of online harassment, hacking, or cybercrime",
    practicalTips: [
      "Change passwords immediately if hacked",
      "Take screenshots of cyber harassment",
      "Report to platform moderators and police",
      "File complaint at Cybercrime Police Station",
      "Do not delete evidence"
    ]
  },
  "property": {
    definition: "Property law deals with ownership rights, transfer, and disputes over land and assets.",
    relatedLaws: [
      "Transfer of Property Act, 1882",
      "Registration Act, 1908",
      "Specific Performance Act, 1963"
    ],
    keyPoints: [
      "Covers ownership, possession, and transfer",
      "Includes sale, lease, mortgage, and gift",
      "Registration required for valid transfer",
      "Chain of title must be clear"
    ],
    implications: [
      "Invalid transfer means no ownership rights",
      "Disputes can be filed in civil court",
      "Specific performance can be enforced",
      "Trespassing can result in damages and injunction"
    ],
    lawyerGuidance: "For property matters, always verify title, get legal opinion before transaction, and ensure proper registration.",
    whenToConsult: "Before buying/selling property or in case of property dispute",
    practicalTips: [
      "Get property checked for title clear certificate",
      "Verify all documents with original records",
      "Do mutation in municipal records",
      "Get property registered in relevant name",
      "Maintain property deed safely"
    ]
  },
  "divorce": {
    definition: "Divorce legally dissolves a marriage.",
    relatedLaws: [
      "Hindu Marriage Act, 1955 (Section 13)",
      "Dissolution of Muslim Marriage Act, 1939",
      "Indian Divorce Act, 1869 (Christians)",
      "Special Marriage Act, 1954"
    ],
    keyPoints: [
      "Divorce can be contested or mutual",
      "Grounds include adultery, cruelty, desertion",
      "Mutual divorce is faster if both agree",
      "Maintenance and custody are separate matters"
    ],
    implications: [
      "Legally ends the marriage",
      "Affects property rights and maintenance claims",
      "Children custody determined by court",
      "Name changes may be required"
    ],
    lawyerGuidance: "In divorce proceedings, consult a matrimonial lawyer to protect your interests regarding alimony, custody, and property division.",
    whenToConsult: "When relationship is irretrievably broken or you want to separate legally",
    practicalTips: [
      "Understand difference between separation and divorce",
      "Document marital problems with evidence",
      "Know your rights regarding maintenance and custody",
      "File petition in appropriate family court",
      "Follow court procedures strictly"
    ]
  },
  "contract": {
    definition: "Contract is a legally binding agreement between two or more parties.",
    relatedLaws: [
      "Indian Contract Act, 1872",
      "Section 10-29 - Essentials of valid contract",
      "Section 30-70 - Rules about offer and acceptance"
    ],
    keyPoints: [
      "Must have offer, acceptance, and consideration",
      "Both parties must have capacity to contract",
      "Consideration must be lawful and valuable",
      "Terms must be clear and unambiguous"
    ],
    implications: [
      "Breach of contract is actionable",
      "Innocent party can claim damages",
      "Specific performance can be enforced",
      "Contract is binding on both parties"
    ],
    lawyerGuidance: "Before signing any contract, have a lawyer review it to protect your interests and clarify all terms.",
    whenToConsult: "Before entering into major contracts or if breach of contract occurs",
    practicalTips: [
      "Read entire contract carefully",
      "Understand all terms and conditions",
      "Keep signed copy with you",
      "Ensure all parties sign and initial",
      "Do not sign blank contracts"
    ]
  },
  "crime": {
    definition: "Crime is an act that violates law and harms society.",
    relatedLaws: [
      "Indian Penal Code - Defines all crimes",
      "Code of Criminal Procedure - Procedure for prosecution"
    ],
    keyPoints: [
      "Crimes are prosecuted by state",
      "Victim is witness, not party",
      "Burden of proof on prosecution",
      "Presumption of innocence applies"
    ],
    implications: [
      "Conviction leads to punishment",
      "Punishment varies by crime severity",
      "Victim can seek compensation through court",
      "Criminal record has lifelong impact"
    ],
    lawyerGuidance: "If accused of crime, immediately hire a criminal lawyer. If victim, report to police and get legal help for compensation.",
    whenToConsult: "If involved in any criminal matter as accused or victim",
    practicalTips: [
      "Know your rights when questioned",
      "Never admit guilt without understanding consequences",
      "Document all evidence carefully",
      "Cooperate with police while protecting rights",
      "Attend all court dates"
    ]
  },
  "evidence": {
    definition: "Evidence is information presented in court to prove or disprove a fact.",
    relatedLaws: [
      "Indian Evidence Act, 1872",
      "Sections 1-235 cover all evidence rules",
      "Admissibility rules and witness procedures"
    ],
    keyPoints: [
      "Evidence must be relevant to the case",
      "Hearsay evidence generally not admissible",
      "Original documents preferred over copies",
      "Expert testimony requires qualification"
    ],
    implications: [
      "Proper evidence presentation is critical",
      "Inadmissible evidence cannot be considered",
      "Evidence rules ensure fair trial",
      "Violation can lead to case dismissal"
    ],
    lawyerGuidance: "Proper evidence gathering and presentation is crucial for winning cases. Work with your lawyer to identify and present evidence strategically.",
    whenToConsult: "When preparing for court case or if evidence is disputed",
    practicalTips: [
      "Preserve original documents and evidence",
      "Take photos and videos of crime scene or damage",
      "Keep witness statements in writing",
      "Maintain chain of custody for evidence",
      "Label all evidence clearly with dates"
    ]
  },
  "court": {
    definition: "Court is a place where justice is administered and legal disputes are resolved.",
    relatedLaws: [
      "Judicial system has District Court, High Court, Supreme Court",
      "Civil and criminal cases handled separately"
    ],
    keyPoints: [
      "Different courts have different jurisdiction",
      "District Court handles both civil and criminal cases",
      "High Court hears appeals",
      "Supreme Court is final authority"
    ],
    implications: [
      "Court decision is binding",
      "Appeal only on points of law, not facts",
      "Non-appearance can lead to judgment against you",
      "Court orders must be obeyed"
    ],
    lawyerGuidance: "Work with a lawyer to file case in appropriate court with jurisdiction. Follow all court procedures and deadlines.",
    whenToConsult: "When filing legal case or defending against one",
    practicalTips: [
      "Identify correct court with jurisdiction",
      "File proper documents with correct procedure",
      "Attend all hearings on time",
      "Follow court orders and directions",
      "Appeal within prescribed time limit"
    ]
  },
  "right": {
    definition: "Right is a legal entitlement that is protected and enforceable in court.",
    relatedLaws: [
      "Constitutional rights under Part III",
      "Statutory rights created by various laws"
    ],
    keyPoints: [
      "Rights can be constitutional or statutory",
      "Rights are enforceable in court",
      "Every right has corresponding duty",
      "Rights protect individual freedoms"
    ],
    implications: [
      "Violation of rights can be challenged in court",
      "Court can award damages for violation",
      "Rights protect against government overreach",
      "Rights vary based on citizenship status"
    ],
    lawyerGuidance: "If your rights are violated, consult a lawyer immediately to file appropriate petition for enforcement.",
    whenToConsult: "When your legal rights are violated or restricted",
    practicalTips: [
      "Know your basic constitutional rights",
      "Document any violation in writing",
      "Report violation to appropriate authority",
      "Keep evidence of violation",
      "Act quickly as there may be time limits"
    ]
  },
  "succession": {
    definition: "Succession law governs the transfer of property and assets after death.",
    relatedLaws: [
      "Hindu Succession Act, 1956",
      "Muslim Personal Law on Inheritance",
      "Indian Succession Act, 1865"
    ],
    keyPoints: [
      "Succession can be testamentary (by will) or intestate (by law)",
      "Hindu law has specific rules for male and female heirs",
      "Muslim law follows Sharia principles",
      "Property passes to heirs or as per will"
    ],
    implications: [
      "Without will, property divided per succession law",
      "Will must be valid and properly executed",
      "Disputes over inheritance can be filed in court",
      "Succession certificate required for many transactions"
    ],
    lawyerGuidance: "For succession matters, consult a lawyer to understand applicable law and ensure proper distribution of assets.",
    whenToConsult: "When inherited property, preparing will, or disputing inheritance",
    practicalTips: [
      "Understand succession law applicable to you",
      "Prepare will to control asset distribution",
      "Obtain succession certificate if required",
      "Document all assets and liabilities",
      "Keep will in safe place with copies"
    ]
  },
  "will": {
    definition: "Will is a legal document declaring how property will be distributed after death.",
    relatedLaws: [
      "Indian Succession Act, 1865 (Sections 58-63)",
      "Testamentary Formalities"
    ],
    keyPoints: [
      "Must be in writing and signed by testator",
      "Requires two witnesses",
      "Can be made at any age after 18 years",
      "Can be revoked or amended anytime"
    ],
    implications: [
      "Invalid will means property passes per succession law",
      "Will can be challenged in court if obtained by undue influence",
      "Specific performance of bequests can be enforced",
      "Executor administers the estate per will"
    ],
    lawyerGuidance: "Have a lawyer draft your will to ensure it's valid and reflects your wishes accurately. Probate process requires legal guidance.",
    whenToConsult: "When preparing, amending, or probating a will",
    practicalTips: [
      "Prepare will while healthy and mentally sound",
      "List all assets and intended distribution",
      "Appoint executor wisely",
      "Register will with proper authorities",
      "Keep original in safe deposit"
    ]
  },
  "maintenance": {
    definition: "Maintenance is financial support provided to dependent family members after separation or divorce.",
    relatedLaws: [
      "Section 125-128 CrPC - Maintenance of wives and children",
      "Hindu Marriage Act - Permanent and temporary alimony",
      "Family Courts Act"
    ],
    keyPoints: [
      "Spouse and children are entitled to maintenance",
      "Amount depends on earning capacity and needs",
      "Can be claimed from date of claim or from separation",
      "Court can modify maintenance amount"
    ],
    implications: [
      "Non-payment of maintenance is criminal offense",
      "Maintenance continues until remarriage or independence",
      "Can be claimed for past period",
      "Wife can claim permanent alimony after divorce"
    ],
    lawyerGuidance: "For maintenance issues, consult a family lawyer to calculate fair amount and file application in family court.",
    whenToConsult: "After separation or divorce if no maintenance agreed",
    practicalTips: [
      "Gather documents showing income and expenses",
      "File application in appropriate family court",
      "Maintain records of all payments",
      "Report non-payment to court",
      "Keep all separation/divorce documents safe"
    ]
  },
  "adoption": {
    definition: "Adoption is a legal process of becoming parent of a child who is not biologically yours.",
    relatedLaws: [
      "Hindu Adoption and Maintenance Act, 1956",
      "Juvenile Justice Act, 2015",
      "Christian Personal Law"
    ],
    keyPoints: [
      "Adoptive parents get all parental rights",
      "Adopted child gets all inheritance rights",
      "Can only adopt if conditions are met",
      "Court approval is required"
    ],
    implications: [
      "Adopted child has same status as biological child",
      "Both adoptive and biological relationships end",
      "Property rights fully vested in adopted child",
      "Adoption can be challenged in court"
    ],
    lawyerGuidance: "For adoption, work with a lawyer familiar with relevant personal law and child welfare procedures.",
    whenToConsult: "When planning to adopt or if adoption is disputed",
    practicalTips: [
      "Meet age and marital status requirements",
      "Get child from recognized institution",
      "File adoption petition in court",
      "Obtain adoption certificate",
      "Update birth certificate and other documents"
    ]
  },
  "dowry": {
    definition: "Dowry is the practice of transferring gifts/money at marriage, which is illegal.",
    relatedLaws: [
      "Dowry Prohibition Act, 1961",
      "IPC Section 498-A - Cruelty related to dowry"
    ],
    keyPoints: [
      "Giving or taking dowry is illegal",
      "Applies to all religions and communities",
      "Includes direct gifts and indirect benefits",
      "Criminal and civil penalties apply"
    ],
    implications: [
      "Dowry-related cruelty is non-bailable offense",
      "Penalty up to 5 years imprisonment and fine",
      "Can claim damages from those demanding dowry",
      "Dowry deaths are treated as murder"
    ],
    lawyerGuidance: "If experiencing dowry demands or violence, file FIR under Dowry Prohibition Act and seek police protection.",
    whenToConsult: "If facing dowry demands or related violence",
    practicalTips: [
      "Document dowry demands in writing",
      "Save all messages and communications",
      "Report to police immediately",
      "Reach out to women's helpline",
      "Do not accept dowry to avoid legal liability"
    ]
  },
  "labour law": {
    definition: "Labour law protects workers' rights and regulates employer-employee relationships.",
    relatedLaws: [
      "Industrial Disputes Act, 1947",
      "Factories Act, 1948",
      "Minimum Wages Act, 1948",
      "Payment of Gratuity Act, 1972"
    ],
    keyPoints: [
      "Covers wages, working hours, safety",
      "Protects rights of organized and unorganized workers",
      "Regulates strikes and lockouts",
      "Mandates social security benefits"
    ],
    implications: [
      "Unfair labor practices can be challenged",
      "Wrongful termination claims can be filed",
      "Compensation for injuries at workplace",
      "Right to form trade unions"
    ],
    lawyerGuidance: "For labor disputes, consult a labor lawyer to protect your employment rights and negotiate settlements.",
    whenToConsult: "For wage disputes, wrongful termination, or workplace safety issues",
    practicalTips: [
      "Know minimum wage applicable in your state",
      "Keep employment contract and offer letter",
      "Document workplace injuries with photos",
      "File complaint with labor commissioner if issue",
      "Join trade union for collective bargaining"
    ]
  },
  "wages": {
    definition: "Wages are the compensation paid to workers for their labor and services.",
    relatedLaws: [
      "Minimum Wages Act, 1948",
      "Payment of Wages Act, 1936",
      "Equal Remuneration Act, 1976"
    ],
    keyPoints: [
      "Minimum wage fixed by government",
      "Must be paid regularly and on time",
      "Includes basic pay and allowances",
      "Cannot be reduced without agreement"
    ],
    implications: [
      "Non-payment of wages is criminal offense",
      "Wrongful deduction is punishable",
      "Employee can claim damages",
      "Can sue in labor court"
    ],
    lawyerGuidance: "For wage disputes, file complaint with labor department or approach labor lawyer for recovery of wages.",
    whenToConsult: "When wages are not paid or wrongly deducted",
    practicalTips: [
      "Maintain record of all wages received",
      "Report non-payment immediately",
      "File complaint with labor commissioner",
      "Keep pay slips and bank statements",
      "Document all deductions made"
    ]
  },
  "injury": {
    definition: "Personal injury law deals with compensation for injuries caused by negligence or wrongdoing.",
    relatedLaws: [
      "Tort Law principles",
      "Motor Vehicles Act - Road accidents",
      "Workmen's Compensation Act"
    ],
    keyPoints: [
      "Injured party can claim damages",
      "Must prove negligence or fault",
      "Compensation for medical expenses and lost income",
      "Can claim for pain and suffering"
    ],
    implications: [
      "Tortfeasor is liable for compensation",
      "Insurance may cover the liability",
      "Damages calculated based on injury severity",
      "Criminal charges may also apply in serious cases"
    ],
    lawyerGuidance: "After injury, document everything and consult injury lawyer immediately. Insurance claims and court proceedings require legal help.",
    whenToConsult: "Immediately after sustaining injury due to someone's negligence",
    practicalTips: [
      "Seek medical treatment immediately",
      "Document injury with photos and medical reports",
      "Collect witness statements",
      "File accident report with police if applicable",
      "Do not admit fault or settle without legal advice"
    ]
  },
  "liability": {
    definition: "Liability is the legal responsibility to pay damages for harm caused.",
    relatedLaws: [
      "Tort Law - Civil liability",
      "Criminal Law - Criminal liability",
      "Contract Law - Contractual liability"
    ],
    keyPoints: [
      "Can be civil or criminal",
      "Requires proof of causation",
      "Damages awarded by court",
      "Insurance may cover liability"
    ],
    implications: [
      "Liable person must pay compensation",
      "Can face both civil and criminal charges",
      "Insurance provides financial protection",
      "Liability can be shared between multiple parties"
    ],
    lawyerGuidance: "If liable for damages, consult lawyer to minimize liability and explore settlement options. Ensure insurance covers the liability.",
    whenToConsult: "If accused of causing harm or facing liability claim",
    practicalTips: [
      "Inform insurance company immediately",
      "Do not admit liability in writing",
      "Gather all relevant documents and evidence",
      "Cooperate with insurance investigation",
      "Seek legal representation promptly"
    ]
  },
  "negligence": {
    definition: "Negligence is failure to exercise reasonable care, resulting in harm to another.",
    relatedLaws: [
      "Tort Law principles",
      "Section 336 IPC - Act endangering life or personal safety"
    ],
    keyPoints: [
      "Must prove duty, breach, causation, and damage",
      "Reasonable person standard applies",
      "Can be gross negligence or simple negligence",
      "Contributory negligence reduces damages"
    ],
    implications: [
      "Negligent party is liable for damages",
      "Can face criminal charges for gross negligence",
      "Damages include medical and other expenses",
      "Can claim for lost income and suffering"
    ],
    lawyerGuidance: "For negligence claims, consult tort lawyer to establish negligence and claim appropriate compensation.",
    whenToConsult: "When injured due to someone's negligence",
    practicalTips: [
      "Gather evidence of negligence",
      "Obtain expert opinion if needed",
      "Document all damages and losses",
      "File claim within limitation period",
      "Negotiate or litigate for settlement"
    ]
  },
  "punishment": {
    definition: "Punishment is the penalty imposed by court for committing a crime.",
    relatedLaws: [
      "IPC Sections 53-75 - Punishments",
      "Different punishments for different crimes"
    ],
    keyPoints: [
      "Can be imprisonment, fine, or both",
      "Severity depends on crime committed",
      "Punishment is in addition to civil liability",
      "Parole and remission possible for good behavior"
    ],
    implications: [
      "Imprisonment affects livelihood and reputation",
      "Criminal record impacts future opportunities",
      "Family affected by imprisonment",
      "Rehabilitation possible through parole"
    ],
    lawyerGuidance: "If convicted, consult lawyer for parole/remission application and rehabilitation support.",
    whenToConsult: "If convicted or facing criminal charges",
    practicalTips: [
      "Understand the offense and applicable punishment",
      "Present mitigating circumstances to court",
      "Maintain good behavior for parole consideration",
      "Seek rehabilitation programs",
      "File parole application after serving term"
    ]
  },
  "consumer": {
    definition: "Consumer is a person who buys goods or services for personal use.",
    relatedLaws: [
      "Consumer Protection Act, 2019",
      "Indian Contract Act - Consumer contracts"
    ],
    keyPoints: [
      "Has rights against defective products",
      "Can claim refund or replacement",
      "Can seek compensation for defects",
      "Protected against unfair trade practices"
    ],
    implications: [
      "Seller/Service provider is liable for defects",
      "Can file complaint in consumer court",
      "Compensation awarded for loss and suffering",
      "Seller cannot deny consumer protection"
    ],
    lawyerGuidance: "For consumer disputes, file complaint in consumer court with evidence of defect or unfair practice.",
    whenToConsult: "When purchased defective product or cheated in transaction",
    practicalTips: [
      "Keep purchase receipt and warranty card",
      "Report defect to seller immediately",
      "Get defect verified by independent expert",
      "File complaint in consumer court",
      "Claim compensation for loss and inconvenience"
    ]
  },
  "fraud": {
    definition: "Fraud is deliberate deception to gain unlawful advantage or cause loss.",
    relatedLaws: [
      "IPC Section 415-420 - Cheating and fraud",
      "Section 17 Indian Contract Act - Misrepresentation"
    ],
    keyPoints: [
      "Involves false representation or misrepresentation",
      "Done with intent to deceive",
      "Results in financial or other loss",
      "Can be civil or criminal fraud"
    ],
    implications: [
      "Contract obtained by fraud is voidable",
      "Criminal punishment up to 7 years imprisonment",
      "Victim can claim damages in civil court",
      "Restitution can be ordered"
    ],
    lawyerGuidance: "If defrauded, file FIR with police and consult lawyer for civil damages claim and contract cancellation.",
    whenToConsult: "Immediately if victim of fraud or cheating",
    practicalTips: [
      "Collect evidence of fraudulent representation",
      "Keep all communications and documents",
      "File FIR with police",
      "File civil suit for damages",
      "Report to relevant authorities"
    ]
  },
  "rti": {
    definition: "RTI Act allows citizens to seek information from government agencies.",
    relatedLaws: [
      "Right to Information Act, 2005",
      "Information Commission"
    ],
    keyPoints: [
      "Can request any public information",
      "Must be provided within 30 days",
      "Nominal fees apply",
      "Refusal can be challenged"
    ],
    implications: [
      "Transparency in government operations",
      "Citizens can access government records",
      "Officials cannot arbitrarily refuse information",
      "Appeal to Information Commission possible"
    ],
    lawyerGuidance: "For RTI matters, file RTI application through proper channels. Appeal to Information Commission if refused.",
    whenToConsult: "When seeking information from government agencies",
    practicalTips: [
      "Frame RTI application clearly and specifically",
      "File through online or offline channels",
      "Follow up if not received within 30 days",
      "Appeal if information is denied",
      "File complaint with Information Commissioner"
    ]
  },
  "tort": {
    definition: "Tort is a civil wrong that causes loss or damage to another person.",
    relatedLaws: [
      "Tort Law principles",
      "General principles of liability"
    ],
    keyPoints: [
      "Includes negligence, trespass, nuisance",
      "Victim can sue for damages",
      "No criminal prosecution for tort alone",
      "Burden of proof on plaintiff"
    ],
    implications: [
      "Tortfeasor must pay compensation",
      "Damages cover actual loss and suffering",
      "Can be sued in civil court",
      "Damages calculated based on injury"
    ],
    lawyerGuidance: "For tort claims, consult lawyer to establish negligence and claim damages in civil court.",
    whenToConsult: "When suffered loss due to someone's tort or civil wrong",
    practicalTips: [
      "Document all damages and losses",
      "Gather evidence of wrongdoing",
      "File suit within limitation period",
      "Obtain expert opinion if needed",
      "Negotiate or litigate for settlement"
    ]
  },
  "appeal": {
    definition: "Appeal is a request to higher court to review decision of lower court.",
    relatedLaws: [
      "CrPC Section 401-405 - Criminal Appeal",
      "CPC Section 96-100 - Civil Appeal"
    ],
    keyPoints: [
      "Can appeal on points of law, not facts",
      "Must file within prescribed time",
      "Requires proper grounds for appeal",
      "Higher court can uphold, modify, or reverse"
    ],
    implications: [
      "Stays execution of judgment in some cases",
      "Can challenge conviction or unfavorable judgment",
      "Appeal process takes considerable time",
      "Additional legal expenses involved"
    ],
    lawyerGuidance: "If unhappy with judgment, consult lawyer immediately to file appeal within time limit with strong grounds.",
    whenToConsult: "Immediately after adverse judgment before limitation expires",
    practicalTips: [
      "File appeal within prescribed time limit",
      "Identify clear grounds for appeal",
      "Prepare strong legal arguments",
      "File memorial of appeal",
      "Follow appellate court procedures"
    ]
  },
  "conviction": {
    definition: "Conviction is the judgment finding accused guilty of committing a crime.",
    relatedLaws: [
      "CrPC Section 235-248 - Conviction and sentencing",
      "IPC - Punishment for various crimes"
    ],
    keyPoints: [
      "Based on proof beyond reasonable doubt",
      "Can appeal to higher court",
      "Criminal record is created",
      "Sentence follows conviction"
    ],
    implications: [
      "Convicted person loses certain rights",
      "Criminal record affects future opportunities",
      "Imprisonment or fine imposed",
      "Family affected by conviction"
    ],
    lawyerGuidance: "If convicted, consult lawyer for appeal options. Ensure all legal remedies are exhausted.",
    whenToConsult: "Immediately upon conviction to explore appeal options",
    practicalTips: [
      "File appeal within time limit",
      "Obtain copy of judgment immediately",
      "Consult specialized criminal lawyer",
      "Prepare grounds for appeal",
      "Explore parole/remission options"
    ]
  },
  "acquittal": {
    definition: "Acquittal is the judgment finding accused not guilty of the crime.",
    relatedLaws: [
      "CrPC Section 235 - Acquittal",
      "Presumption of innocence principle"
    ],
    keyPoints: [
      "Based on reasonable doubt standard",
      "Cannot be appealed by prosecution",
      "No criminal record created",
      "Person is free without restrictions"
    ],
    implications: [
      "Cannot be tried again for same offense",
      "Reputation restored",
      "Can claim compensation for false prosecution",
      "Employment opportunities restored"
    ],
    lawyerGuidance: "After acquittal, you can claim compensation for wrongful prosecution if evidence warrants.",
    whenToConsult: "After acquittal to claim compensation for false case",
    practicalTips: [
      "Obtain acquittal certificate",
      "Document losses suffered",
      "File claim for compensation",
      "Seek public apology if reputation harmed",
      "Update documents removing false case reference"
    ]
  },
  "trespass": {
    definition: "Trespass is unauthorized entry or use of someone else's property.",
    relatedLaws: [
      "IPC Section 441-448 - Criminal trespass",
      "Tort Law - Civil trespass"
    ],
    keyPoints: [
      "Can be on land or personal property",
      "Can be intentional or unintentional",
      "Owner can seek damages or injunction",
      "Repeated trespass is criminal offense"
    ],
    implications: [
      "Trespasser is liable for damages",
      "Can face criminal prosecution",
      "Injunction can prohibit trespass",
      "Damages awarded for loss caused"
    ],
    lawyerGuidance: "For trespass, seek injunction to prevent further trespass and claim damages in civil court.",
    whenToConsult: "When someone is trespassing on your property",
    practicalTips: [
      "Post no trespass notices",
      "Document trespass with photos and dates",
      "Request written warning to trespasser",
      "File police complaint for criminal trespass",
      "Seek civil injunction from court"
    ]
  },
  "nuisance": {
    definition: "Nuisance is unreasonable interference with use and enjoyment of property.",
    relatedLaws: [
      "IPC Section 268 - Public nuisance",
      "Tort Law - Private nuisance"
    ],
    keyPoints: [
      "Includes noise, smoke, smell, obstruction",
      "Must be unreasonable and substantial",
      "Can be public or private nuisance",
      "Victim can seek damages or injunction"
    ],
    implications: [
      "Can face criminal prosecution for public nuisance",
      "Civil damages can be claimed",
      "Injunction can stop nuisance",
      "Compensation for loss of enjoyment"
    ],
    lawyerGuidance: "For nuisance, file civil suit for injunction and damages. Report public nuisance to police.",
    whenToConsult: "When suffering unreasonable interference from neighbor or business",
    practicalTips: [
      "Document nuisance with logs and photos",
      "Send written notice to person causing nuisance",
      "Obtain medical report if health affected",
      "File complaint for public nuisance with police",
      "Seek civil injunction in court"
    ]
  },
  "rent": {
    definition: "Rent is the money paid by tenant to landlord for use of property.",
    relatedLaws: [
      "Model Tenancy Act, 2015 (varies by state)",
      "State-specific rent control laws",
      "IPC Section 406 - Criminal breach of trust"
    ],
    keyPoints: [
      "Rent must be paid on agreed date",
      "Landlord cannot arbitrarily increase rent",
      "Tenant has right to quiet enjoyment",
      "Notice period required for eviction"
    ],
    implications: [
      "Non-payment of rent leads to eviction",
      "Excessive rent increase can be challenged",
      "Security deposit must be refunded",
      "Illegal eviction is punishable"
    ],
    lawyerGuidance: "For rent disputes, understand state tenancy law and seek lawyer's help for eviction or non-payment issues.",
    whenToConsult: "When facing eviction, rent disputes, or deposit recovery issues",
    practicalTips: [
      "Keep rent payment receipts",
      "Get rental agreement in writing",
      "Pay rent on time to avoid eviction",
      "Document property condition with photos",
      "Keep separate account for security deposit"
    ]
  },
  "tenancy": {
    definition: "Tenancy is the legal agreement between landlord and tenant for property use.",
    relatedLaws: [
      "Model Tenancy Act, 2015",
      "Local rent control laws",
      "Transfer of Property Act"
    ],
    keyPoints: [
      "Can be fixed term or month-to-month",
      "Requires written agreement",
      "Security deposit commonly collected",
      "Both parties have rights and duties"
    ],
    implications: [
      "Breach of agreement can lead to eviction or legal action",
      "Dispute resolution through courts",
      "Security deposit must be refunded after vacating",
      "Landlord cannot deny basic facilities"
    ],
    lawyerGuidance: "Before signing rental agreement, have a lawyer review terms to protect your rights as tenant or landlord.",
    whenToConsult: "Before entering rental agreement or if tenant-landlord dispute arises",
    practicalTips: [
      "Get rental agreement in writing signed by both",
      "Define rent, maintenance, utilities clearly",
      "Photograph property condition before moving in",
      "Keep record of all communications",
      "Follow notice period for termination"
    ]
  },
  "eviction": {
    definition: "Eviction is the legal process of removing tenant from property.",
    relatedLaws: [
      "Model Tenancy Act, 2015",
      "State-specific eviction laws",
      "CPC - Suit for recovery of possession"
    ],
    keyPoints: [
      "Valid grounds include non-payment, breach",
      "Court order required for legal eviction",
      "Notice period must be given",
      "Self-help eviction is illegal"
    ],
    implications: [
      "Illegal eviction can lead to criminal charges",
      "Tenant can claim damages and restoration",
      "Tenant gets time to vacate after court order",
      "Forcible eviction without court is crime"
    ],
    lawyerGuidance: "For eviction issues, consult property lawyer immediately. Illegal eviction is punishable and can lead to restoration.",
    whenToConsult: "If facing eviction or if you are landlord needing to evict",
    practicalTips: [
      "Understand state-specific eviction laws",
      "As tenant, know your protections",
      "As landlord, follow legal procedure",
      "Seek court order before removing belongings",
      "Give written notice before filing suit"
    ]
  },
  "neighbor": {
    definition: "Neighbor law deals with disputes between people living next to each other.",
    relatedLaws: [
      "IPC Section 447-449 - Criminal trespass",
      "IPC Section 268 - Nuisance",
      "Tort Law - Trespass and nuisance"
    ],
    keyPoints: [
      "Common disputes include noise, boundary, water",
      "Both have duty to respect other's rights",
      "Boundary disputes must be resolved by courts",
      "Nuisance complaints can be filed"
    ],
    implications: [
      "Court can issue injunctions",
      "Damages can be claimed for losses",
      "Criminal charges for certain violations",
      "Peaceful resolution saves time and money"
    ],
    lawyerGuidance: "For neighbor disputes, try negotiation first. If unsuccessful, consult property lawyer to file appropriate suit.",
    whenToConsult: "When having boundary, noise, water, or other disputes with neighbor",
    practicalTips: [
      "Try friendly discussion first",
      "Send written notice of complaint",
      "Document dispute with photos/videos",
      "Involve local authorities if needed",
      "Seek legal help if not resolved"
    ]
  },
  "traffic": {
    definition: "Traffic law regulates use of roads and vehicles.",
    relatedLaws: [
      "Motor Vehicles Act, 1988",
      "Indian Road Rules",
      "IPC Section 336-338 - Rash or negligent driving"
    ],
    keyPoints: [
      "Requires valid license and registration",
      "Speed limits must be followed",
      "Parking rules must be obeyed",
      "Rash driving is criminal offense"
    ],
    implications: [
      "Traffic violation leads to fine",
      "Reckless driving can result in imprisonment",
      "Hit-and-run is serious criminal offense",
      "Insurance required for vehicles"
    ],
    lawyerGuidance: "For traffic violations or accidents, consult traffic/motor vehicles lawyer to handle case and insurance claims.",
    whenToConsult: "When getting traffic ticket or involved in accident",
    practicalTips: [
      "Keep driving license and vehicle documents",
      "Maintain valid insurance policy",
      "Follow traffic rules and speed limits",
      "If stopped, cooperate with police",
      "Take notes if accused of violation"
    ]
  },
  "accident": {
    definition: "Accident law deals with compensation for injuries or damages from accidents.",
    relatedLaws: [
      "Motor Vehicles Act, 1988",
      "Tort Law - Negligence",
      "Criminal Law - Causing hurt by act endangering life"
    ],
    keyPoints: [
      "Must file FIR in serious accidents",
      "Insurance covers liability",
      "Compensation includes medical expenses",
      "Lost income can be recovered"
    ],
    implications: [
      "Responsible party pays damages",
      "Criminal prosecution for rash driving",
      "Civil suit for compensation",
      "Insurance settlement process"
    ],
    lawyerGuidance: "After accident, file FIR, preserve evidence, and consult injury lawyer for compensation claim.",
    whenToConsult: "Immediately after being in accident causing injury or damage",
    practicalTips: [
      "Seek medical treatment immediately",
      "Call police and file FIR/traffic report",
      "Collect witness names and contacts",
      "Take photos of accident scene and damage",
      "Notify insurance company immediately",
      "Do not settle without legal advice"
    ]
  },
  "insurance": {
    definition: "Insurance is a contract providing financial protection against specified risks.",
    relatedLaws: [
      "Insurance Act, 1938",
      "Motor Vehicles Act - Vehicle insurance",
      "Health Insurance regulations"
    ],
    keyPoints: [
      "Must be purchased before using vehicle",
      "Covers liability and damages",
      "Premium paid to insurance company",
      "Claim process requires documentation"
    ],
    implications: [
      "Driving without insurance is criminal offense",
      "Insurance covers third party liability",
      "Claim can be rejected for misrepresentation",
      "Disputes resolved by insurance ombudsman"
    ],
    lawyerGuidance: "For insurance claims or disputes, consult insurance lawyer to navigate claim process.",
    whenToConsult: "When filing insurance claim or disputing claim rejection",
    practicalTips: [
      "Choose insurance plan carefully",
      "Keep policy document safe",
      "Pay premium on time",
      "Report claim immediately after incident",
      "Keep all supporting documents for claim"
    ]
  },
  "loan": {
    definition: "Loan is borrowed money that must be repaid with interest.",
    relatedLaws: [
      "Indian Contract Act - Loan agreement",
      "Recovery of Debts Due to Banks Act, 1993",
      "IPC Section 406 - Criminal misappropriation"
    ],
    keyPoints: [
      "Loan agreement must be in writing",
      "Interest rate must be disclosed",
      "Collateral may be required as security",
      "Repayment schedule must be agreed"
    ],
    implications: [
      "Non-payment leads to recovery action",
      "Bank can initiate legal proceedings",
      "Credit rating affected",
      "Property can be attached"
    ],
    lawyerGuidance: "For loan disputes or recovery action, consult banker's lawyer to negotiate or defend in court.",
    whenToConsult: "If unable to repay loan or facing recovery action",
    practicalTips: [
      "Read loan agreement carefully before signing",
      "Understand interest rate and repayment terms",
      "Make payments on time",
      "Keep loan documents safe",
      "Negotiate if facing payment difficulties"
    ]
  },
  "debt": {
    definition: "Debt is money owed by one person to another.",
    relatedLaws: [
      "Indian Contract Act - Debt and credit",
      "Limitation Act - Time limits for debt recovery"
    ],
    keyPoints: [
      "Can be personal or commercial",
      "Written evidence strengthens claim",
      "Debt has limitation period for recovery",
      "Interest can be claimed if agreed"
    ],
    implications: [
      "Non-payment can lead to court case",
      "Debtor's property can be attached",
      "Credit rating affected",
      "Criminal liability if fraud involved"
    ],
    lawyerGuidance: "For debt recovery or payment disputes, consult lawyer to file suit within limitation period.",
    whenToConsult: "When someone owes you money or you owe money and cannot pay",
    practicalTips: [
      "Get debt agreement in writing",
      "Keep all documents and receipts",
      "Send reminder before taking legal action",
      "File suit within limitation period",
      "Consider settlement to avoid court"
    ]
  },
  "harassment": {
    definition: "Harassment is repeated behavior that causes mental distress or fear.",
    relatedLaws: [
      "IPC Section 503-506 - Criminal intimidation",
      "IPC Section 509 - Word, gesture to outrage modesty",
      "IPC Section 294 - Obscene speech or gesture"
    ],
    keyPoints: [
      "Can be physical, verbal, or online",
      "Must be pattern of behavior",
      "Causes fear or distress to victim",
      "Can be from acquaintance or stranger"
    ],
    implications: [
      "Criminal prosecution possible",
      "Restraining order can be obtained",
      "Damages can be claimed",
      "Victim can seek police protection"
    ],
    lawyerGuidance: "If harassed, file complaint with police and seek restraining order. Document all incidents.",
    whenToConsult: "When facing repeated harassment causing fear or distress",
    practicalTips: [
      "Save all messages and communications",
      "Document each incident with date and details",
      "Keep record of witnesses",
      "Report to police immediately",
      "File FIR for criminal harassment",
      "Seek restraining order from court"
    ]
  },
  "threat": {
    definition: "Threat is a statement indicating intention to cause harm.",
    relatedLaws: [
      "IPC Section 503 - Criminal intimidation",
      "IPC Section 504 - Insult and criminal intimidation",
      "IPC Section 506 - Punishment for criminal intimidation"
    ],
    keyPoints: [
      "Can be written, verbal, or implied",
      "Must be clear and specific",
      "Causes fear of harm to person or property",
      "Can be from anyone"
    ],
    implications: [
      "Criminal prosecution up to 2 years imprisonment",
      "Victim can seek police protection",
      "Restraining order possible",
      "Civil damages can be claimed"
    ],
    lawyerGuidance: "If threatened, immediately report to police and consult lawyer for protective orders.",
    whenToConsult: "As soon as you receive any threat to safety",
    practicalTips: [
      "Save all threats (messages, emails, recordings)",
      "Report to police immediately",
      "File FIR for criminal intimidation",
      "Document witnesses to threats",
      "Apply for police protection if needed",
      "Seek restraining order from court"
    ]
  },
  "medicalneglect": {
    definition: "Medical negligence is failure of doctor to provide standard care.",
    relatedLaws: [
      "IPC Section 304A - Causing death by negligence",
      "Consumer Protection Act - Medical services",
      "Tort Law - Negligence"
    ],
    keyPoints: [
      "Doctor must follow standard medical practice",
      "Failure to diagnose properly is negligence",
      "Wrong treatment is negligence",
      "Requires expert opinion to establish"
    ],
    implications: [
      "Criminal prosecution in serious cases",
      "Compensation for damages",
      "Medical council can suspend license",
      "Civil suit for damages possible"
    ],
    lawyerGuidance: "For medical negligence, obtain expert medical opinion and file suit with damages claim.",
    whenToConsult: "If harmed due to doctor's negligence or improper treatment",
    practicalTips: [
      "Keep all medical records and prescriptions",
      "Obtain second opinion immediately",
      "Document injury or worsening condition",
      "Get medical expert to verify negligence",
      "File complaint with Medical Council",
      "File suit in consumer court"
    ]
  },
  "education": {
    definition: "Education law deals with rights and duties in educational institutions.",
    relatedLaws: [
      "Right to Free and Compulsory Education Act, 2009",
      "Indian Education Code",
      "Consumer Protection Act - Educational services"
    ],
    keyPoints: [
      "Education is fundamental right for children",
      "Schools must provide quality education",
      "Cannot discriminate based on caste, religion",
      "Fees must be reasonable and transparent"
    ],
    implications: [
      "School cannot expel without due process",
      "Can claim compensation for illegal expulsion",
      "Unfair fee increases can be challenged",
      "Disabled students have special rights"
    ],
    lawyerGuidance: "For education disputes, approach school authorities first, then seek legal help if needed.",
    whenToConsult: "For unfair expulsion, harassment in school, or education rights violation",
    practicalTips: [
      "Know right to education laws",
      "Keep school documents and records",
      "Report harassment to school authorities",
      "Follow school grievance procedure",
      "File complaint with education board if needed"
    ]
  },
  "environment": {
    definition: "Environmental law protects nature and natural resources.",
    relatedLaws: [
      "Environment Protection Act, 1986",
      "Water Pollution Act",
      "Air Pollution Act",
      "National Green Tribunal Act"
    ],
    keyPoints: [
      "Individuals have right to clean environment",
      "Polluters are liable for damages",
      "NGT handles environmental disputes",
      "Compensation for environmental harm"
    ],
    implications: [
      "Industries must follow pollution standards",
      "Violation leads to fine or imprisonment",
      "Can claim damages for pollution",
      "NGT provides fast resolution"
    ],
    lawyerGuidance: "For environmental concerns, file complaint with pollution board or petition in NGT.",
    whenToConsult: "When pollution or environmental harm affects your health or property",
    practicalTips: [
      "Gather evidence of pollution",
      "Obtain medical report if health affected",
      "File complaint with pollution board",
      "File petition in NGT",
      "Document impact on property and health"
    ]
  },
  "alimony": {
    definition: "Alimony is financial support paid by spouse to dependent after separation.",
    relatedLaws: [
      "Hindu Marriage Act - Permanent alimony",
      "CrPC Section 125 - Maintenance",
      "Family Court Act"
    ],
    keyPoints: [
      "Temporary alimony during divorce proceedings",
      "Permanent alimony after divorce",
      "Amount based on earning capacity",
      "Can be claimed by husband or wife"
    ],
    implications: [
      "Non-payment is criminal offense",
      "Can claim arrears of alimony",
      "Court can modify amount",
      "Alimony stops on remarriage"
    ],
    lawyerGuidance: "For alimony matters, consult matrimonial lawyer to calculate fair amount.",
    whenToConsult: "During or after separation/divorce for alimony claim",
    practicalTips: [
      "Calculate your actual needs and expenses",
      "Gather documents of income and assets",
      "File application in family court",
      "Document non-payment for enforcement",
      "Request modification if circumstances change"
    ]
  },
  "separation": {
    definition: "Separation is legal arrangement where spouses live apart without divorce.",
    relatedLaws: [
      "Hindu Marriage Act - Judicial separation",
      "CrPC - Maintenance orders",
      "Family Court procedures"
    ],
    keyPoints: [
      "Different from divorce - marriage still valid",
      "Maintenance and custody determined",
      "Can lead to divorce later",
      "Both parties can claim maintenance"
    ],
    implications: [
      "Property rights determined",
      "Custody and maintenance orders made",
      "Either party can convert to divorce",
      "Separation decree is binding"
    ],
    lawyerGuidance: "For separation, consult matrimonial lawyer to understand consequences and file appropriate petition.",
    whenToConsult: "When wanting to live apart but not immediately divorce",
    practicalTips: [
      "Understand separation vs. divorce",
      "File separation petition in family court",
      "Negotiate maintenance and custody",
      "Get separation decree from court",
      "Follow court orders strictly"
    ]
  },
  "forgery": {
    definition: "Forgery is making false document to deceive.",
    relatedLaws: [
      "IPC Section 463 - Forgery",
      "IPC Section 467 - Forgery of valuable security",
      "IPC Section 471 - Using as genuine forged document"
    ],
    keyPoints: [
      "Making false signature is forgery",
      "Document must be materially altered",
      "Intent to deceive required",
      "Criminal and civil liability"
    ],
    implications: [
      "Imprisonment up to 7 years for forgery",
      "Fine and compensation to victim",
      "Document can be declared void",
      "Criminal prosecution mandatory"
    ],
    lawyerGuidance: "If victim of forgery, file FIR and file suit to recover damages and void forged document.",
    whenToConsult: "If you discover forged document or documents in your name",
    practicalTips: [
      "Preserve original document",
      "Get document examined by expert",
      "File FIR with police",
      "File suit to void forged document",
      "Claim compensation for damages"
    ]
  }
};

// Fallback to simpler database for concepts not in detailed database
export const lawConcepts: { [key: string]: string } = {
  "law": "Law is a system of rules enforced by courts to regulate society.",
  "constitution": "The Constitution of India is the supreme law of the land.",
  "fundamental rights": "Fundamental Rights are given under Part III of the Constitution.",
  "article 21": "Article 21 guarantees the Right to Life and Personal Liberty.",
  "article 14": "Equality before law is provided under Article 14.",
  "president": "The President is the constitutional head of India.",
  "supreme court": "The Supreme Court is the highest judicial authority in India.",
  "high courts": "High Courts function at the state level.",
  "ipc": "IPC stands for Indian Penal Code, 1860.",
  "crpc": "CrPC deals with criminal procedure.",
  "civil law": "Civil law deals with disputes between individuals.",
  "criminal law": "Criminal law deals with offences against the state.",
  "tort law": "Tort law deals with civil wrongs.",
  "contract law": "Contract law governs agreements enforceable by law.",
  "valid contract": "A valid contract requires offer, acceptance, and consideration.",
  "consideration": "Consideration means something in return.",
  "fir": "FIR means First Information Report.",
  "cognizable": "Cognizable offences allow police to arrest without warrant.",
  "non-cognizable": "Non-cognizable offences require court permission.",
  "bail": "Bail is the temporary release of an accused person.",
  "juvenile justice": "Juvenile Justice Act deals with children in conflict with law.",
  "pil": "PIL stands for Public Interest Litigation.",
  "lok adalat": "Lok Adalat provides alternative dispute resolution.",
  "arbitration": "Arbitration is a private dispute resolution process.",
  "consumer protection": "Consumer Protection Act protects consumer rights.",
  "consumer": "A consumer is a person who buys goods or services.",
  "rti": "RTI Act allows citizens to seek information.",
  "defamation": "Defamation harms a person's reputation.",
  "libel": "Libel is written defamation.",
  "slander": "Slander is spoken defamation.",
  "dowry": "Dowry is punishable under Dowry Prohibition Act.",
  "domestic violence": "Domestic Violence Act protects women from abuse.",
  "cyber law": "Cyber law deals with internet and digital crimes.",
  "it act": "IT Act, 2000 governs cyber offences in India.",
  "copyright": "Copyright protects creative works.",
  "patent": "Patent protects inventions.",
  "trademark": "Trademark protects brand identity.",
  "right to education": "Right to Education is a Fundamental Right.",
  "environmental law": "Environmental law protects nature and resources.",
  "ngt": "NGT stands for National Green Tribunal.",
  "writs": "Writs are issued by Supreme Court and High Courts.",
  "habeas corpus": "Habeas Corpus protects personal liberty.",
  "mandamus": "Mandamus orders a public authority to perform duty.",
  "certiorari": "Certiorari quashes illegal court orders.",
  "prohibition": "Prohibition prevents lower courts from exceeding power.",
  "quo warranto": "Quo Warranto questions illegal holding of office.",
  "legal aid": "Legal aid provides free legal services to the poor.",
  "bar council": "Bar Council regulates advocates.",
  "advocate": "Advocate is a legal professional authorized to practice law.",
  "evidence act": "Evidence Act governs admissibility of evidence.",
  "burden of proof": "Burden of proof lies on the prosecution in criminal cases.",
  "confession": "Confession must be voluntary to be valid.",
  "alibi": "Alibi means presence elsewhere during crime.",
  "mens rea": "Mens rea means guilty mind.",
  "actus reus": "Actus reus means guilty act.",
  "section 154": "FIR is filed under Section 154 CrPC.",
  "arrest": "Arrest means taking a person into custody.",
  "search warrant": "Search warrant is issued by a magistrate.",
  "summons": "Summons orders a person to appear in court.",
  "affidavit": "Affidavit is a written sworn statement.",
  "injunction": "Injunction is a court order to stop an act.",
  "appeal": "Appeal is a request to higher court for review.",
  "acquittal": "Acquittal means the accused is found not guilty.",
  "conviction": "Conviction means the accused is found guilty.",
  "sentence": "Sentence is punishment given by the court.",
  "probation": "Probation allows release without imprisonment.",
  "limitation act": "Limitation Act fixes time limits for cases.",
  "marriage laws": "Marriage laws govern legal marriage and divorce.",
  "hindu marriage": "Hindu Marriage Act applies to Hindus.",
  "muslim personal law": "Muslim personal law is based on Sharia.",
  "divorce": "Divorce legally dissolves a marriage.",
  "maintenance": "Maintenance is financial support after separation.",
  "adoption": "Adoption is legally taking a child.",
  "will": "Will is a legal declaration of property distribution.",
  "succession": "Succession law governs inheritance.",
  "property law": "Property law deals with ownership rights.",
  "lease": "Lease is transfer of property for a period.",
  "mortgage": "Mortgage is transfer of interest as security.",
  "sale": "Sale transfers ownership permanently.",
  "gift": "Gift is voluntary transfer without consideration.",
  "labour law": "Labour law protects worker rights.",
  "minimum wages": "Minimum Wages Act fixes lowest payable wages.",
  "industrial disputes": "Industrial Disputes Act resolves employer-employee disputes.",
  "trade union": "Trade union represents workers collectively.",
  "strike": "Strike is refusal to work by employees.",
  "lockout": "Lockout is closure by employer.",
  "election law": "Election law regulates elections.",
  "model code": "Model Code of Conduct guides political parties.",
  "judiciary": "Judiciary interprets and applies law.",
  "legislature": "Legislature makes laws.",
  "executive": "Executive implements laws.",
  "separation of powers": "Separation of powers ensures balance.",
  "rule of law": "Rule of law means law is supreme.",
  "natural justice": "Natural justice ensures fair hearing.",
  "presumption of innocence": "Presumption of innocence protects accused.",
  "legal rights": "Legal rights are enforceable by law.",
  "legal duties": "Legal duties are obligations imposed by law.",
  "justice": "Justice ensures fairness and equality.",
  "ignorance of law": "Ignorance of law is not an excuse."
};

/**
 * Search for matching law concepts based on user input
 * Returns detailed information if found
 */
export const searchLawConcept = (query: string): LawConceptDetail | null => {
  const lowerQuery = query.toLowerCase().trim();
  
  // Direct match in detailed database
  if (lawConceptsDetailed[lowerQuery]) {
    return lawConceptsDetailed[lowerQuery];
  }
  
  // Direct match in basic database
  if (lawConcepts[lowerQuery]) {
    return { definition: lawConcepts[lowerQuery] };
  }
  
  // Split query into words and check each word
  const words = lowerQuery.split(/\s+/).filter(word => word.length > 0);
  
  // Check each word against law concepts
  for (const word of words) {
    if (lawConceptsDetailed[word]) {
      return lawConceptsDetailed[word];
    }
    if (lawConcepts[word]) {
      return { definition: lawConcepts[word] };
    }
  }
  
  // Partial word matching
  for (const [concept, detail] of Object.entries(lawConceptsDetailed)) {
    for (const word of words) {
      if (concept.includes(word) && word.length >= 3) {
        return detail;
      }
    }
  }
  
  return null;
};

/**
 * Get multiple matching concepts from user input
 */
export const searchMultipleLawConcepts = (query: string): Array<{ concept: string; detail: LawConceptDetail }> => {
  const lowerQuery = query.toLowerCase();
  const matches: Array<{ concept: string; detail: LawConceptDetail }> = [];
  const seenConcepts = new Set<string>();
  
  const words = lowerQuery.split(/\s+/).filter(word => word.length > 0);
  
  // Exact word matches from detailed database
  for (const word of words) {
    if (lawConceptsDetailed[word] && !seenConcepts.has(word)) {
      matches.push({ concept: word, detail: lawConceptsDetailed[word] });
      seenConcepts.add(word);
    } else if (lawConcepts[word] && !seenConcepts.has(word)) {
      matches.push({ concept: word, detail: { definition: lawConcepts[word] } });
      seenConcepts.add(word);
    }
  }
  
  // Partial word matches
  for (const [concept, detail] of Object.entries(lawConceptsDetailed)) {
    if (!seenConcepts.has(concept)) {
      for (const word of words) {
        if (word.length >= 3 && concept.includes(word)) {
          matches.push({ concept, detail });
          seenConcepts.add(concept);
          break;
        }
      }
    }
  }
  
  // Reverse matching - check if words in concept match words in query
  for (const [concept, detail] of Object.entries(lawConceptsDetailed)) {
    if (!seenConcepts.has(concept)) {
      const conceptWords = concept.split(/\s+/);
      for (const conceptWord of conceptWords) {
        if (words.includes(conceptWord)) {
          matches.push({ concept, detail });
          seenConcepts.add(concept);
          break;
        }
      }
    }
  }
  
  return matches;
};
