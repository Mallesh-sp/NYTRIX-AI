import React, { useState, useEffect } from 'react';
import { Search, Filter, Sun, Moon, Globe, ChevronDown, BookOpen, Shield, Lightbulb, Scale, FileCheck, X, ChevronRight, AlertTriangle, CheckCircle2 } from 'lucide-react';

// Language translations for knowledge cards
const translations: Record<string, Record<string, any>> = {
  en: {
    pageTitle: "Men's Rights Knowledge Base",
    pageSubtitle: "Comprehensive information about legal rights for men in India",
    searchPlaceholder: "Search knowledge cards...",
    categoryLabel: "Category",
    languageLabel: "Language",
    allCategories: "All",
    protection: "Protection",
    awareness: "Awareness",
    rights: "Rights",
    documentation: "Documentation",
    foundCards: "Found",
    cardsText: "knowledge cards",
    noCardsFound: "No knowledge cards found",
    tryAdjusting: "Try adjusting your search or filters",
    keyPoints: "Key Points",
    redFlags: "Red Flags to Watch For",
    relatedLaws: "Related Laws & Sections",
    practicalSteps: "Practical Steps",
    readMore: "Read More",
    collapse: "Collapse",
    themeToggle: "Toggle Theme",
    shareCard: "Share",
    bookmarkCard: "Bookmark"
  },
  hi: {
    pageTitle: "पुरुष अधिकार ज्ञान आधार",
    pageSubtitle: "भारत में पुरुषों के कानूनी अधिकारों के बारे में व्यापक जानकारी",
    searchPlaceholder: "ज्ञान कार्ड खोजें...",
    categoryLabel: "श्रेणी",
    languageLabel: "भाषा",
    allCategories: "सभी",
    protection: "संरक्षण",
    awareness: "जागरूकता",
    rights: "अधिकार",
    documentation: "दस्तावेज़ीकरण",
    foundCards: "मिले",
    cardsText: "ज्ञान कार्ड",
    noCardsFound: "कोई ज्ञान कार्ड नहीं मिला",
    tryAdjusting: "अपनी खोज या फ़िल्टर समायोजित करें",
    keyPoints: "मुख्य बिंदु",
    redFlags: "देखने के लिए लाल झंडे",
    relatedLaws: "संबंधित कानून और धाराएं",
    practicalSteps: "व्यावहारिक कदम",
    readMore: "और पढ़ें",
    collapse: "संक्षिप्त करें",
    themeToggle: "थीम बदलें",
    shareCard: "साझा करें",
    bookmarkCard: "बुकमार्क"
  },
  ta: {
    pageTitle: "ஆண்கள் உரிமைகள் அறிவுத் தளம்",
    pageSubtitle: "இந்தியாவில் ஆண்களுக்கான சட்ட உரிமைகள் பற்றிய விரிவான தகவல்",
    searchPlaceholder: "அறிவு அட்டைகளைத் தேடுங்கள்...",
    categoryLabel: "வகை",
    languageLabel: "மொழி",
    allCategories: "அனைத்தும்",
    protection: "பாதுகாப்பு",
    awareness: "விழிப்புணர்வு",
    rights: "உரிமைகள்",
    documentation: "ஆவணப்படுத்தல்",
    foundCards: "கண்டறியப்பட்டது",
    cardsText: "அறிவு அட்டைகள்",
    noCardsFound: "அறிவு அட்டைகள் இல்லை",
    tryAdjusting: "உங்கள் தேடலை மாற்றவும்",
    keyPoints: "முக்கிய குறிப்புகள்",
    redFlags: "எச்சரிக்கை அறிகுறிகள்",
    relatedLaws: "தொடர்புடைய சட்டங்கள்",
    practicalSteps: "நடைமுறை படிகள்",
    readMore: "மேலும் படிக்க",
    collapse: "சுருக்கு",
    themeToggle: "தீம் மாற்று",
    shareCard: "பகிர்",
    bookmarkCard: "புக்மார்க்"
  },
  te: {
    pageTitle: "పురుషుల హక్కుల జ్ఞాన స్థావరం",
    pageSubtitle: "భారతదేశంలో పురుషులకు చట్టపరమైన హక్కుల గురించి సమగ్ర సమాచారం",
    searchPlaceholder: "జ్ఞాన కార్డులను వెతకండి...",
    categoryLabel: "వర్గం",
    languageLabel: "భాష",
    allCategories: "అన్నీ",
    protection: "రక్షణ",
    awareness: "అవగాహన",
    rights: "హక్కులు",
    documentation: "డాక్యుమెంటేషన్",
    foundCards: "కనుగొనబడింది",
    cardsText: "జ్ఞాన కార్డులు",
    noCardsFound: "జ్ఞాన కార్డులు కనుగొనబడలేదు",
    tryAdjusting: "మీ శోధనను సర్దుబాటు చేయండి",
    keyPoints: "ముఖ్య అంశాలు",
    redFlags: "హెచ్చరిక సంకేతాలు",
    relatedLaws: "సంబంధిత చట్టాలు",
    practicalSteps: "ఆచరణాత్మక దశలు",
    readMore: "మరింత చదవండి",
    collapse: "కుదించు",
    themeToggle: "థీమ్ మార్చు",
    shareCard: "షేర్",
    bookmarkCard: "బుక్‌మార్క్"
  },
  bn: {
    pageTitle: "পুরুষদের অধিকার জ্ঞান ভান্ডার",
    pageSubtitle: "ভারতে পুরুষদের আইনি অধিকার সম্পর্কে বিস্তারিত তথ্য",
    searchPlaceholder: "জ্ঞান কার্ড খুঁজুন...",
    categoryLabel: "বিভাগ",
    languageLabel: "ভাষা",
    allCategories: "সব",
    protection: "সুরক্ষা",
    awareness: "সচেতনতা",
    rights: "অধিকার",
    documentation: "নথিপত্র",
    foundCards: "পাওয়া গেছে",
    cardsText: "জ্ঞান কার্ড",
    noCardsFound: "কোনো জ্ঞান কার্ড পাওয়া যায়নি",
    tryAdjusting: "আপনার অনুসন্ধান পরিবর্তন করুন",
    keyPoints: "মূল বিষয়",
    redFlags: "সতর্কতা চিহ্ন",
    relatedLaws: "সম্পর্কিত আইন",
    practicalSteps: "ব্যবহারিক পদক্ষেপ",
    readMore: "আরও পড়ুন",
    collapse: "সংকুচিত করুন",
    themeToggle: "থিম পরিবর্তন",
    shareCard: "শেয়ার",
    bookmarkCard: "বুকমার্ক"
  },
  mr: {
    pageTitle: "पुरुष हक्क ज्ञान भांडार",
    pageSubtitle: "भारतातील पुरुषांच्या कायदेशीर हक्कांबद्दल सर्वसमावेशक माहिती",
    searchPlaceholder: "ज्ञान कार्ड शोधा...",
    categoryLabel: "श्रेणी",
    languageLabel: "भाषा",
    allCategories: "सर्व",
    protection: "संरक्षण",
    awareness: "जागरूकता",
    rights: "हक्क",
    documentation: "दस्तऐवज",
    foundCards: "सापडले",
    cardsText: "ज्ञान कार्ड",
    noCardsFound: "ज्ञान कार्ड सापडले नाहीत",
    tryAdjusting: "शोध बदला",
    keyPoints: "मुख्य मुद्दे",
    redFlags: "चेतावणी चिन्हे",
    relatedLaws: "संबंधित कायदे",
    practicalSteps: "व्यावहारिक पावले",
    readMore: "अधिक वाचा",
    collapse: "लहान करा",
    themeToggle: "थीम बदला",
    shareCard: "शेअर",
    bookmarkCard: "बुकमार्क"
  },
  gu: {
    pageTitle: "પુરુષ અધિકાર જ્ઞાન આધાર",
    pageSubtitle: "ભારતમાં પુરુષોના કાનૂની અધિકારો વિશે વ્યાપક માહિતી",
    searchPlaceholder: "જ્ઞાન કાર્ડ શોધો...",
    categoryLabel: "શ્રેણી",
    languageLabel: "ભાષા",
    allCategories: "બધા",
    protection: "સુરક્ષા",
    awareness: "જાગૃતિ",
    rights: "અધિકાર",
    documentation: "દસ્તાવેજ",
    foundCards: "મળ્યા",
    cardsText: "જ્ઞાન કાર્ડ",
    noCardsFound: "કોઈ જ્ઞાન કાર્ડ મળ્યું નથી",
    tryAdjusting: "શોધ બદલો",
    keyPoints: "મુખ્ય મુદ્દા",
    redFlags: "ચેતવણી સંકેતો",
    relatedLaws: "સંબંધિત કાયદા",
    practicalSteps: "વ્યવહારુ પગલાં",
    readMore: "વધુ વાંચો",
    collapse: "સંકુચિત કરો",
    themeToggle: "થીમ બદલો",
    shareCard: "શેર",
    bookmarkCard: "બુકમાર્ક"
  },
  kn: {
    pageTitle: "ಪುರುಷರ ಹಕ್ಕುಗಳ ಜ್ಞಾನ ಆಧಾರ",
    pageSubtitle: "ಭಾರತದಲ್ಲಿ ಪುರುಷರ ಕಾನೂನು ಹಕ್ಕುಗಳ ಬಗ್ಗೆ ಸಮಗ್ರ ಮಾಹಿತಿ",
    searchPlaceholder: "ಜ್ಞಾನ ಕಾರ್ಡ್‌ಗಳನ್ನು ಹುಡುಕಿ...",
    categoryLabel: "ವರ್ಗ",
    languageLabel: "ಭಾಷೆ",
    allCategories: "ಎಲ್ಲಾ",
    protection: "ರಕ್ಷಣೆ",
    awareness: "ಜಾಗೃತಿ",
    rights: "ಹಕ್ಕುಗಳು",
    documentation: "ದಾಖಲೀಕರಣ",
    foundCards: "ಕಂಡುಬಂದಿದೆ",
    cardsText: "ಜ್ಞಾನ ಕಾರ್ಡ್‌ಗಳು",
    noCardsFound: "ಯಾವುದೇ ಜ್ಞಾನ ಕಾರ್ಡ್‌ಗಳು ಕಂಡುಬಂದಿಲ್ಲ",
    tryAdjusting: "ನಿಮ್ಮ ಹುಡುಕಾಟವನ್ನು ಬದಲಾಯಿಸಿ",
    keyPoints: "ಪ್ರಮುಖ ಅಂಶಗಳು",
    redFlags: "ಎಚ್ಚರಿಕೆ ಚಿಹ್ನೆಗಳು",
    relatedLaws: "ಸಂಬಂಧಿತ ಕಾನೂನುಗಳು",
    practicalSteps: "ಪ್ರಾಯೋಗಿಕ ಹಂತಗಳು",
    readMore: "ಇನ್ನಷ್ಟು ಓದಿ",
    collapse: "ಕುಗ್ಗಿಸಿ",
    themeToggle: "ಥೀಮ್ ಬದಲಾಯಿಸಿ",
    shareCard: "ಹಂಚಿಕೊಳ್ಳಿ",
    bookmarkCard: "ಬುಕ್‌ಮಾರ್ಕ್"
  },
  ml: {
    pageTitle: "പുരുഷാവകാശ വിജ്ഞാന കേന്ദ്രം",
    pageSubtitle: "ഇന്ത്യയിലെ പുരുഷന്മാരുടെ നിയമപരമായ അവകാശങ്ങളെക്കുറിച്ചുള്ള സമഗ്ര വിവരങ്ങൾ",
    searchPlaceholder: "വിജ്ഞാന കാർഡുകൾ തിരയുക...",
    categoryLabel: "വിഭാഗം",
    languageLabel: "ഭാഷ",
    allCategories: "എല്ലാം",
    protection: "സംരക്ഷണം",
    awareness: "ബോധവൽക്കരണം",
    rights: "അവകാശങ്ങൾ",
    documentation: "രേഖപ്പെടുത്തൽ",
    foundCards: "കണ്ടെത്തി",
    cardsText: "വിജ്ഞാന കാർഡുകൾ",
    noCardsFound: "വിജ്ഞാന കാർഡുകൾ കണ്ടെത്തിയില്ല",
    tryAdjusting: "നിങ്ങളുടെ തിരയൽ മാറ്റുക",
    keyPoints: "പ്രധാന പോയിന്റുകൾ",
    redFlags: "മുന്നറിയിപ്പ് അടയാളങ്ങൾ",
    relatedLaws: "ബന്ധപ്പെട്ട നിയമങ്ങൾ",
    practicalSteps: "പ്രായോഗിക ഘട്ടങ്ങൾ",
    readMore: "കൂടുതൽ വായിക്കുക",
    collapse: "ചുരുക്കുക",
    themeToggle: "തീം മാറ്റുക",
    shareCard: "പങ്കിടുക",
    bookmarkCard: "ബുക്ക്മാർക്ക്"
  },
  pa: {
    pageTitle: "ਮਰਦਾਂ ਦੇ ਅਧਿਕਾਰ ਗਿਆਨ ਅਧਾਰ",
    pageSubtitle: "ਭਾਰਤ ਵਿੱਚ ਮਰਦਾਂ ਦੇ ਕਾਨੂੰਨੀ ਅਧਿਕਾਰਾਂ ਬਾਰੇ ਵਿਆਪਕ ਜਾਣਕਾਰੀ",
    searchPlaceholder: "ਗਿਆਨ ਕਾਰਡ ਖੋਜੋ...",
    categoryLabel: "ਸ਼੍ਰੇਣੀ",
    languageLabel: "ਭਾਸ਼ਾ",
    allCategories: "ਸਾਰੇ",
    protection: "ਸੁਰੱਖਿਆ",
    awareness: "ਜਾਗਰੂਕਤਾ",
    rights: "ਅਧਿਕਾਰ",
    documentation: "ਦਸਤਾਵੇਜ਼",
    foundCards: "ਮਿਲੇ",
    cardsText: "ਗਿਆਨ ਕਾਰਡ",
    noCardsFound: "ਕੋਈ ਗਿਆਨ ਕਾਰਡ ਨਹੀਂ ਮਿਲੇ",
    tryAdjusting: "ਆਪਣੀ ਖੋਜ ਬਦਲੋ",
    keyPoints: "ਮੁੱਖ ਨੁਕਤੇ",
    redFlags: "ਚੇਤਾਵਨੀ ਸੰਕੇਤ",
    relatedLaws: "ਸੰਬੰਧਿਤ ਕਾਨੂੰਨ",
    practicalSteps: "ਵਿਹਾਰਕ ਕਦਮ",
    readMore: "ਹੋਰ ਪੜ੍ਹੋ",
    collapse: "ਸੰਖੇਪ ਕਰੋ",
    themeToggle: "ਥੀਮ ਬਦਲੋ",
    shareCard: "ਸਾਂਝਾ ਕਰੋ",
    bookmarkCard: "ਬੁੱਕਮਾਰਕ"
  }
};

const languageNames: Record<string, string> = {
  en: 'English',
  hi: 'हिंदी',
  ta: 'தமிழ்',
  te: 'తెలుగు',
  bn: 'বাংলা',
  mr: 'मराठी',
  gu: 'ગુજરાતી',
  kn: 'ಕನ್ನಡ',
  ml: 'മലയാളം',
  pa: 'ਪੰਜਾਬੀ'
};

// Knowledge Card Data
export interface KnowledgeCardData {
  id: string;
  title: string;
  category: 'rights' | 'awareness' | 'protection' | 'documentation';
  summary: string;
  content: string;
  keyPoints: string[];
  relatedLaws?: string[];
  practicalSteps?: string[];
  redFlags?: string[];
}

const mensRightsKnowledge: KnowledgeCardData[] = [
  {
    id: 'false-accusation',
    title: 'False Accusations - Know Your Rights',
    category: 'protection',
    summary: 'Understanding how to respond to and defend against false criminal accusations',
    content: `False accusations are serious matters that can harm your reputation and freedom. Under Indian law, filing false accusations is itself a criminal offense. You have the right to defend yourself and seek legal remedies.`,
    keyPoints: [
      'Presumption of innocence - you are innocent until proven guilty',
      'Right to remain silent - do not admit to anything without a lawyer',
      'Burden of proof - prosecution must prove guilt beyond reasonable doubt',
      'Right to legal representation - get a lawyer immediately',
      'Can file counter-case under Section 166A, IPC for false accusations'
    ],
    relatedLaws: ['Section 166A, IPC', 'Section 182, IPC', 'Section 229, IPC'],
    practicalSteps: [
      'Do not speak to police without a lawyer present',
      'Document all evidence supporting your innocence',
      'Gather witness statements and supporting documents',
      'File a counter-FIR if the accusation is proven false',
      'Work with your lawyer to build a strong defense'
    ],
    redFlags: [
      'Being pressured to admit guilt',
      'Police refusing access to a lawyer',
      'Fabricated evidence being presented',
      'Biased investigation by police'
    ]
  },
  {
    id: 'cyber-harassment',
    title: 'Cyber Harassment & Online Abuse',
    category: 'protection',
    summary: 'How to identify, report, and take legal action against cyber harassment',
    content: `Cyber harassment includes threatening messages, defamatory posts, harassment through social media, and creation of fake profiles. These are criminal offenses under Indian law with severe penalties.`,
    keyPoints: [
      'Cyber harassment is a criminal offense (Section 354D, IPC)',
      'Online defamation can be addressed under Section 499-500, IPC',
      'IT Act, 2000 provides protections against online abuse',
      'Screenshots and digital evidence are admissible in court',
      'You can file FIR with Cyber Cell of police'
    ],
    relatedLaws: ['Section 354D, IPC', 'Section 505, IPC', 'IT Act Section 66A-66D'],
    practicalSteps: [
      'Take screenshots of harassment with date/time stamps',
      'Report to platform (Twitter, Facebook, Instagram, etc.)',
      'File a complaint with local Cyber Cell',
      'Preserve all digital evidence (don\'t delete anything)',
      'Consult a lawyer about legal action'
    ],
    redFlags: [
      'Repeated threatening messages',
      'Impersonation through fake profiles',
      'Sharing intimate content without consent',
      'Coordinated harassment campaigns'
    ]
  },
  {
    id: 'domestic-violence',
    title: 'Male Domestic Violence Victims',
    category: 'awareness',
    summary: 'Understanding domestic violence against men and available legal protections',
    content: `While commonly associated with women, men can also be victims of domestic violence. Indian law provides protection for all domestic violence victims, regardless of gender. Men often don't report due to stigma, but legal protections exist.`,
    keyPoints: [
      'Men can be victims of domestic violence',
      'Physical, emotional, and financial abuse are all forms of domestic violence',
      'Protection Orders are available for all victims',
      'Police must register complaints of domestic violence',
      'Compensation can be sought from the abuser'
    ],
    relatedLaws: ['Protection of Women from Domestic Violence Act', 'Section 498A, IPC (amended)', 'Section 125, CrPC'],
    practicalSteps: [
      'Document all incidents of violence with dates and photos',
      'Seek medical attention and get doctor\'s report',
      'File complaint with local police',
      'Apply for Protection Order from family court',
      'Seek legal aid if needed'
    ],
    redFlags: [
      'Repeated threats of false accusations',
      'Isolation from family and friends',
      'Control over finances and personal freedom',
      'Physical injuries or emotional trauma'
    ]
  },
  {
    id: 'inheritance-rights',
    title: 'Male Inheritance and Succession Rights',
    category: 'rights',
    summary: 'Understanding equal succession rights for men under Indian law',
    content: `Under the Hindu Succession Act, 1956, men have equal rights to inherit and own property. However, recent amendments have granted daughters equal rights to ancestral property, which men must be aware of.`,
    keyPoints: [
      'Men have equal right to inherit from parents',
      'Daughters now have equal rights to ancestral property (from 2005)',
      'Valid will supersedes succession laws',
      'Property ownership is gender-neutral',
      'Legal remedies available for disputed inheritance'
    ],
    relatedLaws: ['Hindu Succession Act, 1956', 'Section 15-16, HSA (amended)'],
    practicalSteps: [
      'Get property documents and title deeds',
      'Understand the succession chain',
      'File partition suit if needed',
      'Register property in your name',
      'Get legal advice on inheritance matters'
    ]
  },
  {
    id: 'joint-custody',
    title: 'Fathers Rights in Child Custody',
    category: 'rights',
    summary: 'Understanding equal custody rights for fathers under Indian law',
    content: `Indian courts increasingly recognize that both parents have equal rights to custody of children. The focus is on the best interests of the child, not the gender of the parent. Fathers can and do obtain full or joint custody.`,
    keyPoints: [
      'Fathers have equal legal rights to custody',
      'Courts decide based on best interests of child, not parent\'s gender',
      'Joint custody is increasingly awarded',
      'Visitation rights are protected by law',
      'Child support can be enforced fairly'
    ],
    relatedLaws: ['Guardianship and Wards Act, 1890', 'Section 125, CrPC', 'Section 24, Hindu Marriage Act'],
    practicalSteps: [
      'Prepare evidence of your ability to care for child',
      'Gather character references and stability proof',
      'Document your relationship with the child',
      'Work with lawyer on custody petition',
      'Attend all court hearings'
    ],
    redFlags: [
      'Being denied access to children without court order',
      'Bias against father in custody decisions',
      'False accusations to prevent custody',
      'Non-payment of maintenance by custodial parent'
    ]
  },
  {
    id: 'maintenance-rights',
    title: 'Spousal and Child Maintenance Rights',
    category: 'rights',
    summary: 'Understanding maintenance obligations and rights for men',
    content: `Under Section 125 of CrPC, men can be ordered to pay maintenance to spouse and children. However, recent cases recognize that men can also claim maintenance from wives in certain circumstances.`,
    keyPoints: [
      'Men have obligation to maintain wife and children',
      'Amount is based on income and needs',
      'Can be modified if circumstances change',
      'Men can claim maintenance from wife in certain cases',
      'Non-payment can lead to jail'
    ],
    relatedLaws: ['Section 125, CrPC', 'Section 24, Hindu Marriage Act', 'Section 27, Special Marriage Act'],
    practicalSteps: [
      'Provide clear financial statements',
      'Determine fair maintenance amount',
      'File maintenance petition if applicable',
      'Attend hearings regularly',
      'Comply with maintenance orders'
    ]
  },
  {
    id: 'workplace-protection',
    title: 'Workplace Anti-Harassment and Discrimination',
    category: 'protection',
    summary: 'Protections against workplace harassment, discrimination, and false allegations',
    content: `Men also have rights against workplace harassment, discrimination, and false allegations. The law protects all employees from sexual harassment and unfair treatment, regardless of gender.`,
    keyPoints: [
      'Right to safe and non-discriminatory workplace',
      'Men can be sexual harassment victims',
      'Wrongful termination is illegal',
      'False allegations must be investigated fairly',
      'Grievance committees must be impartial'
    ],
    relatedLaws: ['Sexual Harassment of Women at Workplace Act, 2013', 'Industrial Disputes Act, 1947'],
    practicalSteps: [
      'Report harassment through official channels',
      'Document all incidents and communications',
      'File formal complaint with HR',
      'Request fair investigation',
      'Escalate if not resolved satisfactorily'
    ],
    redFlags: [
      'Rapid wrongful termination after false allegations',
      'Biased investigation process',
      'Retaliation after filing complaint',
      'Denial of due process'
    ]
  },
  {
    id: 'police-harassment',
    title: 'Police Harassment and Misconduct',
    category: 'protection',
    summary: 'Your rights when police harass, threaten, or abuse you',
    content: `Police harassment is illegal. If police scold you, threaten you, demand money, or use excessive force, you have legal recourse. You can file complaints against police misconduct and claim compensation.`,
    keyPoints: [
      'Police have authority but NOT power to abuse or harass citizens',
      'No police officer can demand money (bribery is a crime)',
      'Excessive force or threats are illegal',
      'You can file complaint against police misconduct',
      'Compensation is available for harassment',
      'You have right to respectful treatment'
    ],
    relatedLaws: ['Section 154, CrPC (FIR)', 'Section 41, CrPC (Arrest)', 'Section 330, IPC (Hurt)', 'Article 21, Constitution (Right to Life)'],
    practicalSteps: [
      'Remain calm and polite during police interaction',
      'Do not engage in arguments or show aggression',
      'Ask for police officer\'s name, badge number, and station name',
      'Document the date, time, location, and what happened',
      'Take photos of any injuries (if harassed physically)',
      'File FIR against police misconduct at higher station or police headquarters',
      'Get medical certificate if physically harmed',
      'Write complaint to police commissioner or superintendent',
      'Consult lawyer about civil compensation suit'
    ],
    redFlags: [
      'Police demanding money or favors',
      'Physical violence or threats',
      'Refusing to identify themselves',
      'Using abusive language',
      'Illegal detention without proper procedure',
      'Pressuring you to sign statements'
    ]
  },
  {
    id: 'police-arrest',
    title: 'Your Rights During Police Arrest',
    category: 'protection',
    summary: 'Know your constitutional and legal rights when arrested by police',
    content: `When arrested, you have specific legal rights that police MUST follow. These rights are protected by the Constitution and Indian criminal law. Police cannot violate these rights.`,
    keyPoints: [
      'Police must tell you the reason for arrest immediately',
      'You have right to remain silent - use it wisely',
      'You have right to lawyer - demand a lawyer immediately',
      'You cannot be detained for more than 24 hours without court approval',
      'You cannot be tortured or abused',
      'Your family must be informed within 12 hours',
      'You can ask for police custody or judicial custody'
    ],
    relatedLaws: ['Article 20(3), Constitution', 'Article 22, Constitution', 'Section 41, CrPC (Arrest)', 'Section 50, CrPC', 'Section 157, CrPC'],
    practicalSteps: [
      'Ask why you are being arrested - demand reason',
      'Say: "I want a lawyer" - repeat this clearly',
      'Do not answer questions without lawyer present',
      'Note time, place, and police officer names',
      'Refuse to sign anything without lawyer reading it',
      'Demand medical examination before police custody',
      'Ask for water, food, and bathroom access',
      'Contact family or trusted person through lawyer',
      'Do not accept false confessions - your silence is protection'
    ],
    redFlags: [
      'Police refusing to tell you why you\'re arrested',
      'Police refusing you a lawyer',
      'Threats to harm you or family',
      'Pressure to confess or sign statements',
      'Detention beyond 24 hours without court order',
      'Denial of basic needs (food, water, bathroom)'
    ]
  },
  {
    id: 'fir-false',
    title: 'False FIR (First Information Report)',
    category: 'protection',
    summary: 'What to do when someone files a false FIR against you',
    content: `A False FIR is when someone deliberately files a false police report to harass you. This is a serious crime. You have strong legal remedies and can file counter-cases.`,
    keyPoints: [
      'False FIR is a serious criminal offense (Section 182, IPC)',
      'Anyone can file FIR, but making false allegations is itself a crime',
      'You can file counter-FIR against person who filed false report',
      'You can claim compensation for harassment and damage',
      'Police must investigate fairly - bias is illegal',
      'Court can dismiss false cases when evidence is weak'
    ],
    relatedLaws: ['Section 182, IPC (False Info)', 'Section 166A, IPC (Misleading Police)', 'Section 212, IPC (Harboring Offender)', 'Section 468, IPC (Forgery)'],
    practicalSteps: [
      'Get a copy of the FIR from police (your right under RTI)',
      'Carefully read the allegations in the FIR',
      'Gather evidence proving the allegations are false',
      'Get witness statements supporting your innocence',
      'File counter-case under Section 182 & 166A, IPC',
      'Apply for anticipatory bail to avoid arrest',
      'Keep all communications and proof safe',
      'Work with lawyer on strong defense strategy'
    ],
    redFlags: [
      'Allegations that sound exaggerated or fabricated',
      'Timing of FIR (right after a dispute)',
      'No credible evidence supporting allegations',
      'Multiple contradictions in the FIR',
      'Known pattern of person filing false cases'
    ]
  },
  {
    id: 'marital-property',
    title: 'Marital Property Rights',
    category: 'rights',
    summary: 'Understanding property rights in marriage and divorce',
    content: `Both husbands and wives have equal rights in marital property. In divorce, property is divided based on contribution and fairness, not gender. Men have equal rights to claim their share of marital assets.`,
    keyPoints: [
      'Both spouses have equal rights in marital property',
      'Property earned during marriage is marital property',
      'Division is based on contribution, not gender',
      'Men can seek alimony in certain circumstances',
      'Self-acquired property remains personal'
    ],
    relatedLaws: ['Section 27, Special Marriage Act', 'Section 24, Hindu Marriage Act'],
    practicalSteps: [
      'Maintain clear records of personal property',
      'Document contributions to marital property',
      'Get property valuations for division',
      'Work with lawyer on divorce settlement',
      'Negotiate fair division'
    ]
  },
  {
    id: 'defamation-protection',
    title: 'Protection Against Defamation',
    category: 'protection',
    summary: 'How to address and legally challenge false statements that damage reputation',
    content: `Defamation is making false statements that damage someone's reputation. Both men and women can file civil and criminal cases against defamation. The law provides strong protections.`,
    keyPoints: [
      'Defamation requires false statement that damages reputation',
      'Can be addressed through civil suits (for damages)',
      'Criminal prosecution for defamatory statements (Section 499-500)',
      'Online defamation has same legal status as offline',
      'Apology and retraction can be demanded'
    ],
    relatedLaws: ['Section 499-500, IPC', 'IT Act Section 66D'],
    practicalSteps: [
      'Document all defamatory statements',
      'Send legal notice demanding retraction and apology',
      'File civil suit for damages if not complied',
      'File criminal case if severe',
      'Seek court order for removal of content'
    ],
    redFlags: [
      'Repeated false accusations',
      'Public defamation campaigns',
      'Refusal to retract after notice',
      'Spread of defamatory content through media'
    ]
  }
];

// Category Icons and Colors
const categoryConfig = {
  rights: { 
    icon: Scale, 
    lightBg: 'bg-emerald-50', 
    lightBorder: 'border-emerald-200',
    lightText: 'text-emerald-700',
    lightBadge: 'bg-emerald-100 text-emerald-700',
    darkBg: 'bg-emerald-900/20', 
    darkBorder: 'border-emerald-500/30',
    darkText: 'text-emerald-300',
    darkBadge: 'bg-emerald-500/20 text-emerald-300',
    gradient: 'from-emerald-500 to-teal-500'
  },
  awareness: { 
    icon: Lightbulb, 
    lightBg: 'bg-amber-50', 
    lightBorder: 'border-amber-200',
    lightText: 'text-amber-700',
    lightBadge: 'bg-amber-100 text-amber-700',
    darkBg: 'bg-amber-900/20', 
    darkBorder: 'border-amber-500/30',
    darkText: 'text-amber-300',
    darkBadge: 'bg-amber-500/20 text-amber-300',
    gradient: 'from-amber-500 to-orange-500'
  },
  protection: { 
    icon: Shield, 
    lightBg: 'bg-rose-50', 
    lightBorder: 'border-rose-200',
    lightText: 'text-rose-700',
    lightBadge: 'bg-rose-100 text-rose-700',
    darkBg: 'bg-rose-900/20', 
    darkBorder: 'border-rose-500/30',
    darkText: 'text-rose-300',
    darkBadge: 'bg-rose-500/20 text-rose-300',
    gradient: 'from-rose-500 to-pink-500'
  },
  documentation: { 
    icon: FileCheck, 
    lightBg: 'bg-blue-50', 
    lightBorder: 'border-blue-200',
    lightText: 'text-blue-700',
    lightBadge: 'bg-blue-100 text-blue-700',
    darkBg: 'bg-blue-900/20', 
    darkBorder: 'border-blue-500/30',
    darkText: 'text-blue-300',
    darkBadge: 'bg-blue-500/20 text-blue-300',
    gradient: 'from-blue-500 to-cyan-500'
  }
};

// Professional Knowledge Card Component
const ProfessionalKnowledgeCard: React.FC<{ card: KnowledgeCardData; theme: 'dark' | 'light'; t: Record<string, string> }> = ({ card, theme, t }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const config = categoryConfig[card.category];
  const IconComponent = config.icon;
  const isDark = theme === 'dark';

  return (
    <div 
      className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
        isDark 
          ? `${config.darkBg} ${config.darkBorder} hover:border-opacity-60` 
          : `${config.lightBg} ${config.lightBorder} hover:shadow-lg`
      }`}
    >
      {/* Card Header */}
      <div className={`p-6 ${isDark ? 'bg-slate-800/30' : 'bg-white/50'}`}>
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${config.gradient} shadow-lg flex-shrink-0`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                {card.title}
              </h3>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide ${
                isDark ? config.darkBadge : config.lightBadge
              }`}>
                {t[card.category] || card.category}
              </span>
            </div>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {card.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className={`px-6 pb-6 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
        {/* Main Content */}
        <div className={`p-4 rounded-xl mb-4 ${isDark ? 'bg-slate-800/50' : 'bg-white'} border ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
          <p className="leading-relaxed">{card.content}</p>
        </div>

        {/* Key Points */}
        {card.keyPoints && card.keyPoints.length > 0 && (
          <div className="mb-4">
            <h4 className={`font-semibold mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
              <CheckCircle2 className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
              {t.keyPoints}
            </h4>
            <ul className="space-y-2">
              {card.keyPoints.slice(0, isExpanded ? undefined : 3).map((point, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${isDark ? 'bg-emerald-400' : 'bg-emerald-500'}`} />
                  <span className="text-sm">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Red Flags - Collapsed by default */}
        {isExpanded && card.redFlags && card.redFlags.length > 0 && (
          <div className={`mb-4 p-4 rounded-xl ${isDark ? 'bg-rose-900/20 border border-rose-500/30' : 'bg-rose-50 border border-rose-200'}`}>
            <h4 className={`font-semibold mb-3 flex items-center gap-2 ${isDark ? 'text-rose-300' : 'text-rose-700'}`}>
              <AlertTriangle className="w-5 h-5" />
              {t.redFlags}
            </h4>
            <ul className="space-y-2">
              {card.redFlags.map((flag, idx) => (
                <li key={idx} className={`flex gap-3 items-start text-sm ${isDark ? 'text-rose-200' : 'text-rose-700'}`}>
                  <span className="text-rose-500 flex-shrink-0">⚠</span>
                  <span>{flag}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related Laws */}
        {isExpanded && card.relatedLaws && card.relatedLaws.length > 0 && (
          <div className="mb-4">
            <h4 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-800'}`}>
              {t.relatedLaws}
            </h4>
            <div className="flex flex-wrap gap-2">
              {card.relatedLaws.map((law, idx) => (
                <span key={idx} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                  isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-700'
                }`}>
                  {law}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Practical Steps */}
        {isExpanded && card.practicalSteps && card.practicalSteps.length > 0 && (
          <div className={`p-4 rounded-xl ${isDark ? 'bg-blue-900/20 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'}`}>
            <h4 className={`font-semibold mb-3 ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
              {t.practicalSteps}
            </h4>
            <ol className="space-y-2">
              {card.practicalSteps.map((step, idx) => (
                <li key={idx} className={`flex gap-3 items-start text-sm ${isDark ? 'text-blue-200' : 'text-blue-700'}`}>
                  <span className={`font-bold min-w-[24px] flex-shrink-0 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
            isDark 
              ? 'bg-slate-700/50 hover:bg-slate-700 text-slate-300' 
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          {isExpanded ? t.collapse : t.readMore}
          <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
        </button>
      </div>
    </div>
  );
};

// Language Selector Component
const LanguageSelector: React.FC<{ 
  currentLanguage: string; 
  onLanguageChange: (lang: string) => void;
  theme: 'dark' | 'light';
}> = ({ currentLanguage, onLanguageChange, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isDark = theme === 'dark';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
          isDark 
            ? 'bg-slate-800 border border-slate-700 text-white hover:bg-slate-700' 
            : 'bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 shadow-sm'
        }`}
      >
        <Globe className="w-4 h-4" />
        <span>{languageNames[currentLanguage]}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className={`absolute top-full mt-2 right-0 z-50 w-48 rounded-xl shadow-2xl overflow-hidden ${
            isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'
          }`}>
            <div className="max-h-64 overflow-y-auto">
              {Object.entries(languageNames).map(([code, name]) => (
                <button
                  key={code}
                  onClick={() => {
                    onLanguageChange(code);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left transition-all ${
                    currentLanguage === code
                      ? isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600'
                      : isDark ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Main Page Component
const KnowledgeCardsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('knowledgeCardsTheme') as 'dark' | 'light') || 'dark';
    }
    return 'dark';
  });
  const [language, setLanguage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('knowledgeCardsLanguage') || 'en';
    }
    return 'en';
  });

  const t = translations[language] || translations.en;
  const isDark = theme === 'dark';

  useEffect(() => {
    localStorage.setItem('knowledgeCardsTheme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('knowledgeCardsLanguage', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const categories = [...new Set(mensRightsKnowledge.map(k => k.category))];

  const filteredCards = mensRightsKnowledge.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || card.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`h-full flex flex-col overflow-hidden ${
      isDark ? 'bg-slate-900' : 'bg-slate-50'
    }`}>
      {/* Fixed Header */}
      <div className={`flex-shrink-0 border-b ${isDark ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'} backdrop-blur-xl`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Top Row - Title and Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {t.pageTitle}
              </h1>
              <p className={`mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {t.pageSubtitle}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Language Selector */}
              <LanguageSelector 
                currentLanguage={language} 
                onLanguageChange={setLanguage}
                theme={theme}
              />
              
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-3 rounded-xl transition-all ${
                  isDark 
                    ? 'bg-slate-800 border border-slate-700 text-yellow-400 hover:bg-slate-700' 
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
                }`}
                title={t.themeToggle}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className={`p-4 rounded-2xl ${isDark ? 'bg-slate-800/50 border border-slate-700' : 'bg-white border border-slate-200 shadow-sm'}`}>
            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-xl transition-all ${
                  isDark 
                    ? 'bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                    : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                }`}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full ${isDark ? 'hover:bg-slate-600' : 'hover:bg-slate-200'}`}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <label className={`block text-sm font-medium mb-2 flex items-center gap-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <Filter className="w-4 h-4" /> {t.categoryLabel}
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    !selectedCategory
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                      : isDark 
                        ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 border border-slate-600'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {t.allCategories}
                </button>
                {categories.map((cat) => {
                  const config = categoryConfig[cat];
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                        selectedCategory === cat
                          ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg`
                          : isDark 
                            ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 border border-slate-600'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                      }`}
                    >
                      {t[cat] || cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className={`mt-4 font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {t.foundCards} <span className={isDark ? 'text-white' : 'text-slate-900'}>{filteredCards.length}</span> {t.cardsText}
          </div>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {filteredCards.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {filteredCards.map((card) => (
                <ProfessionalKnowledgeCard key={card.id} card={card} theme={theme} t={t} />
              ))}
            </div>
          ) : (
            <div className={`text-center py-16 rounded-2xl ${isDark ? 'bg-slate-800/50 border border-slate-700' : 'bg-white border border-slate-200'}`}>
              <BookOpen className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-slate-600' : 'text-slate-300'}`} />
              <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                {t.noCardsFound}
              </p>
              <p className={`mt-2 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                {t.tryAdjusting}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeCardsPage;
