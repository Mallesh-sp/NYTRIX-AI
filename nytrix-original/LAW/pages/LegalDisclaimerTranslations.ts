/**
 * ============================================================
 * NYTRIX AI - LEGAL DISCLAIMER TRANSLATIONS
 * Multi-language support for Indian languages
 * ============================================================
 */

export interface DisclaimerTranslation {
  title: string;
  subtitle: string;
  effectiveDate: string;
  hero: {
    title: string;
    description: string;
  };
  sections: {
    importantNotice: { heading: string; content: string };
    informationalPurpose: { heading: string; content: string };
    noLegalAdvice: { heading: string; content: string };
    noAttorneyClient: { heading: string; content: string };
    liabilityLimitation: { heading: string; content: string };
    lawyerDirectory: { heading: string; content: string };
    consultAdvocate: { heading: string; content: string };
    additionalNotices: { heading: string; list: string[] };
    userAcknowledgment: { heading: string; content: string };
    contact: { heading: string; subtitle: string; email: string };
  };
  footer: string;
}

export const disclaimerTranslations: Record<string, DisclaimerTranslation> = {
  english: {
    title: "Legal Disclaimer",
    subtitle: "Please read this disclaimer carefully before using NYTRIX AI",
    effectiveDate: "Effective Date: February 15, 2026",
    hero: {
      title: "Legal Disclaimer",
      description: "NYTRIX AI is an AI-powered legal awareness platform. It is NOT a law firm, does NOT provide legal advice, and should NOT be used as a substitute for consultation with a qualified, licensed advocate. Always seek professional legal counsel for your specific legal matters."
    },
    sections: {
      importantNotice: {
        heading: "Important Notice",
        content: "NYTRIX AI is an AI-powered legal awareness platform. It is NOT a law firm, does NOT provide legal advice, and should NOT be used as a substitute for consultation with a qualified, licensed advocate. Always seek professional legal counsel for your specific legal matters."
      },
      informationalPurpose: {
        heading: "Informational Purpose Only",
        content: "NYTRIX AI provides general legal information and educational content for awareness purposes. The information presented on this platform is intended to help users understand basic legal concepts, rights, and procedures under Indian law. This information should not be construed as legal advice specific to your situation."
      },
      noLegalAdvice: {
        heading: "Not a Substitute for Professional Legal Advice",
        content: "The AI-powered analysis, legal insights, and information provided by NYTRIX AI are generated using artificial intelligence and pre-defined legal databases. While we strive for accuracy, this content cannot replace the personalized advice of a qualified, licensed advocate who can evaluate your specific circumstances, review relevant documents, and provide tailored legal guidance."
      },
      noAttorneyClient: {
        heading: "No Attorney-Client Relationship",
        content: "Your use of NYTRIX AI does not create an attorney-client relationship between you and the platform, its owners, developers, or any lawyers listed in our directory. An attorney-client relationship can only be established through direct engagement with a licensed advocate who agrees to represent you."
      },
      liabilityLimitation: {
        heading: "Platform Liability Limitation",
        content: "NYTRIX AI, its creators, owners, and developers shall not be held liable for any decisions made, actions taken, or outcomes resulting from the use of information provided on this platform. Users acknowledge that legal matters can be complex and fact-specific, and outcomes may vary based on individual circumstances."
      },
      lawyerDirectory: {
        heading: "Lawyer Directory Disclaimer",
        content: "Lawyers listed in our directory are independent legal professionals. NYTRIX AI does not endorse, guarantee, or warrant the quality, competence, or suitability of any lawyer. The listing of a lawyer on our platform does not constitute a recommendation."
      },
      consultAdvocate: {
        heading: "Consult Licensed Advocates",
        content: "We strongly encourage all users to consult with qualified, licensed advocates for any legal matters. A licensed advocate can provide personalized advice, represent you in legal proceedings, and protect your rights effectively. For urgent legal matters, please contact a lawyer immediately."
      },
      additionalNotices: {
        heading: "Additional Important Notices",
        list: [
          "Legal information on this platform is based on Indian laws and may not apply to other jurisdictions.",
          "Laws and legal procedures may change. Always verify current legal provisions with official sources.",
          "AI-generated analysis is based on pattern recognition and may not account for recent legal developments.",
          "Case outcomes depend on many factors including evidence, jurisdiction, and individual circumstances.",
          "Time-sensitive legal matters require immediate professional attention - do not rely solely on this platform."
        ]
      },
      userAcknowledgment: {
        heading: "User Acknowledgment",
        content: "By using NYTRIX AI, you acknowledge that you have read, understood, and agree to this Legal Disclaimer. You understand that the platform provides general legal information only, and you accept full responsibility for any decisions made based on information obtained from this platform."
      },
      contact: {
        heading: "Need Clarification?",
        subtitle: "If you have questions about this disclaimer or need to report concerns, contact us.",
        email: "nytrixaiindia@gmail.com"
      }
    },
    footer: "© 2026 NYTRIX AI. Created & Owned by MALLESH SP"
  },

  hindi: {
    title: "कानूनी अस्वीकरण",
    subtitle: "कृपया NYTRIX AI का उपयोग करने से पहले इस अस्वीकरण को ध्यान से पढ़ें",
    effectiveDate: "प्रभावी तिथि: 15 फरवरी, 2026",
    hero: {
      title: "कानूनी अस्वीकरण",
      description: "NYTRIX AI एक AI-संचालित कानूनी जागरूकता मंच है। यह कोई कानूनी फर्म नहीं है, कानूनी सलाह प्रदान नहीं करता है, और इसका उपयोग किसी योग्य, लाइसेंस प्राप्त वकील से परामर्श के विकल्प के रूप में नहीं किया जाना चाहिए। अपने विशिष्ट कानूनी मामलों के लिए हमेशा पेशेवर कानूनी परामर्श लें।"
    },
    sections: {
      importantNotice: {
        heading: "महत्वपूर्ण सूचना",
        content: "NYTRIX AI एक AI-संचालित कानूनी जागरूकता मंच है। यह कोई कानूनी फर्म नहीं है, कानूनी सलाह प्रदान नहीं करता है, और इसका उपयोग किसी योग्य, लाइसेंस प्राप्त वकील से परामर्श के विकल्प के रूप में नहीं किया जाना चाहिए। अपने विशिष्ट कानूनी मामलों के लिए हमेशा पेशेवर कानूनी परामर्श लें।"
      },
      informationalPurpose: {
        heading: "केवल सूचनात्मक उद्देश्य के लिए",
        content: "NYTRIX AI जागरूकता उद्देश्यों के लिए सामान्य कानूनी जानकारी और शैक्षिक सामग्री प्रदान करता है। इस मंच पर प्रस्तुत जानकारी का उद्देश्य उपयोगकर्ताओं को भारतीय कानून के तहत बुनियादी कानूनी अवधारणाओं, अधिकारों और प्रक्रियाओं को समझने में मदद करना है। इस जानकारी को आपकी स्थिति के लिए विशिष्ट कानूनी सलाह के रूप में नहीं समझा जाना चाहिए।"
      },
      noLegalAdvice: {
        heading: "पेशेवर कानूनी सलाह का विकल्प नहीं",
        content: "NYTRIX AI द्वारा प्रदान किया गया AI-संचालित विश्लेषण, कानूनी अंतर्दृष्टि और जानकारी कृत्रिम बुद्धिमत्ता और पूर्व-निर्धारित कानूनी डेटाबेस का उपयोग करके उत्पन्न होती है। जबकि हम सटीकता के लिए प्रयास करते हैं, यह सामग्री एक योग्य, लाइसेंस प्राप्त वकील की व्यक्तिगत सलाह का स्थान नहीं ले सकती।"
      },
      noAttorneyClient: {
        heading: "कोई वकील-मुवक्किल संबंध नहीं",
        content: "NYTRIX AI का आपका उपयोग आपके और मंच, उसके मालिकों, डेवलपर्स, या हमारी निर्देशिका में सूचीबद्ध किसी भी वकील के बीच वकील-मुवक्किल संबंध नहीं बनाता है। वकील-मुवक्किल संबंध केवल एक लाइसेंस प्राप्त वकील के साथ सीधे जुड़ाव के माध्यम से स्थापित किया जा सकता है।"
      },
      liabilityLimitation: {
        heading: "मंच दायित्व सीमा",
        content: "NYTRIX AI, इसके निर्माता, मालिक और डेवलपर्स इस मंच पर प्रदान की गई जानकारी के उपयोग से होने वाले किसी भी निर्णय, कार्यों या परिणामों के लिए उत्तरदायी नहीं होंगे। उपयोगकर्ता स्वीकार करते हैं कि कानूनी मामले जटिल और तथ्य-विशिष्ट हो सकते हैं।"
      },
      lawyerDirectory: {
        heading: "वकील निर्देशिका अस्वीकरण",
        content: "हमारी निर्देशिका में सूचीबद्ध वकील स्वतंत्र कानूनी पेशेवर हैं। NYTRIX AI किसी भी वकील की गुणवत्ता, क्षमता या उपयुक्तता का समर्थन, गारंटी या वारंटी नहीं देता है। हमारे मंच पर किसी वकील की सूची एक सिफारिश नहीं है।"
      },
      consultAdvocate: {
        heading: "लाइसेंस प्राप्त वकीलों से परामर्श करें",
        content: "हम सभी उपयोगकर्ताओं को किसी भी कानूनी मामले के लिए योग्य, लाइसेंस प्राप्त वकीलों से परामर्श करने के लिए दृढ़ता से प्रोत्साहित करते हैं। एक लाइसेंस प्राप्त वकील व्यक्तिगत सलाह प्रदान कर सकता है, कानूनी कार्यवाही में आपका प्रतिनिधित्व कर सकता है।"
      },
      additionalNotices: {
        heading: "अतिरिक्त महत्वपूर्ण सूचनाएं",
        list: [
          "इस मंच पर कानूनी जानकारी भारतीय कानूनों पर आधारित है और अन्य क्षेत्राधिकारों पर लागू नहीं हो सकती।",
          "कानून और कानूनी प्रक्रियाएं बदल सकती हैं। हमेशा आधिकारिक स्रोतों से वर्तमान कानूनी प्रावधानों को सत्यापित करें।",
          "AI-जनित विश्लेषण पैटर्न पहचान पर आधारित है और हाल के कानूनी विकास के लिए जिम्मेदार नहीं हो सकता।",
          "मामले के परिणाम कई कारकों पर निर्भर करते हैं जिनमें साक्ष्य, क्षेत्राधिकार और व्यक्तिगत परिस्थितियां शामिल हैं।",
          "समय-संवेदनशील कानूनी मामलों के लिए तत्काल पेशेवर ध्यान की आवश्यकता होती है।"
        ]
      },
      userAcknowledgment: {
        heading: "उपयोगकर्ता स्वीकृति",
        content: "NYTRIX AI का उपयोग करके, आप स्वीकार करते हैं कि आपने इस कानूनी अस्वीकरण को पढ़ा, समझा और इससे सहमत हैं। आप समझते हैं कि मंच केवल सामान्य कानूनी जानकारी प्रदान करता है, और आप इस मंच से प्राप्त जानकारी के आधार पर किए गए किसी भी निर्णय की पूर्ण जिम्मेदारी स्वीकार करते हैं।"
      },
      contact: {
        heading: "स्पष्टीकरण चाहिए?",
        subtitle: "यदि आपके पास इस अस्वीकरण के बारे में प्रश्न हैं या चिंताओं की रिपोर्ट करना चाहते हैं, तो हमसे संपर्क करें।",
        email: "nytrixaiindia@gmail.com"
      }
    },
    footer: "© 2026 NYTRIX AI। MALLESH SP द्वारा निर्मित और स्वामित्व"
  },

  tamil: {
    title: "சட்ட மறுப்பு",
    subtitle: "NYTRIX AI ஐ பயன்படுத்துவதற்கு முன் இந்த மறுப்பை கவனமாக படிக்கவும்",
    effectiveDate: "நடைமுறை தேதி: பிப்ரவரி 15, 2026",
    hero: {
      title: "சட்ட மறுப்பு",
      description: "NYTRIX AI என்பது AI-இயக்கப்படும் சட்ட விழிப்புணர்வு தளமாகும். இது ஒரு சட்ட நிறுவனம் அல்ல, சட்ட ஆலோசனை வழங்குவதில்லை, மேலும் தகுதியான, உரிமம் பெற்ற வழக்கறிஞரிடம் ஆலோசனை பெறுவதற்கு மாற்றாக பயன்படுத்தக்கூடாது."
    },
    sections: {
      importantNotice: {
        heading: "முக்கிய அறிவிப்பு",
        content: "NYTRIX AI என்பது AI-இயக்கப்படும் சட்ட விழிப்புணர்வு தளமாகும். இது ஒரு சட்ட நிறுவனம் அல்ல, சட்ட ஆலோசனை வழங்குவதில்லை, மேலும் தகுதியான, உரிமம் பெற்ற வழக்கறிஞரிடம் ஆலோசனை பெறுவதற்கு மாற்றாக பயன்படுத்தக்கூடாது। உங்கள் குறிப்பிட்ட சட்ட விவகாரங்களுக்கு எப்போதும் தொழில்முறை சட்ட ஆலோசனை பெறுங்கள்."
      },
      informationalPurpose: {
        heading: "தகவல் நோக்கத்திற்காக மட்டுமே",
        content: "NYTRIX AI விழிப்புணர்வு நோக்கங்களுக்காக பொதுவான சட்ட தகவல்களையும் கல்வி உள்ளடக்கத்தையும் வழங்குகிறது। இந்த தளத்தில் வழங்கப்படும் தகவல்கள் பயனர்களுக்கு இந்திய சட்டத்தின் கீழ் அடிப்படை சட்ட கருத்துக்கள், உரிமைகள் மற்றும் நடைமுறைகளைப் புரிந்துகொள்ள உதவும் நோக்கத்துடன் வழங்கப்படுகின்றன."
      },
      noLegalAdvice: {
        heading: "தொழில்முறை சட்ட ஆலோசனைக்கு மாற்று அல்ல",
        content: "NYTRIX AI வழங்கும் AI-இயக்கப்படும் பகுப்பாய்வு, சட்ட நுண்ணறிவுகள் மற்றும் தகவல்கள் செயற்கை நுண்ணறிவு மற்றும் முன் வரையறுக்கப்பட்ட சட்ட தரவுத்தளங்களைப் பயன்படுத்தி உருவாக்கப்படுகின்றன. நாங்கள் துல்லியத்திற்காக முயற்சிக்கும் அதே வேளையில், உங்கள் குறிப்பிட்ட சூழ்நிலைகளை மதிப்பிடக்கூடிய தகுதியான உரிமம் பெற்ற வழக்கறிஞரின் தனிப்பட்ட ஆலோசனையை இந்த உள்ளடக்கம் மாற்ற முடியாது."
      },
      noAttorneyClient: {
        heading: "வழக்கறிஞர்-வாடிக்கையாளர் உறவு இல்லை",
        content: "NYTRIX AI ஐ நீங்கள் பயன்படுத்துவது உங்களுக்கும் தளத்திற்கும், அதன் உரிமையாளர்கள், டெவலப்பர்கள் அல்லது எங்கள் அடைவில் பட்டியலிடப்பட்ட வழக்கறிஞர்களுக்கும் இடையே வழக்கறிஞர்-வாடிக்கையாளர் உறவை உருவாக்காது।"
      },
      liabilityLimitation: {
        heading: "தள பொறுப்பு வரம்பு",
        content: "இந்த தளத்தில் வழங்கப்பட்ட தகவல்களின் பயன்பாட்டிலிருந்து எடுக்கப்பட்ட முடிவுகள், நடவடிக்கைகள் அல்லது விளைவுகளுக்கு NYTRIX AI, அதன் படைப்பாளர்கள், உரிமையாளர்கள் மற்றும் டெவலப்பர்கள் பொறுப்பேற்க மாட்டார்கள்."
      },
      lawyerDirectory: {
        heading: "வழக்கறிஞர் அடைவு மறுப்பு",
        content: "எங்கள் அடைவில் பட்டியலிடப்பட்ட வழக்கறிஞர்கள் சுதந்திரமான சட்ட நிபுணர்கள். NYTRIX AI எந்த வழக்கறிஞரின் தரம், திறன் அல்லது பொருத்தத்தை ஆதரிக்கவோ, உத்தரவாதம் அளிக்கவோ அல்லது காப்பீடு செய்யவோ இல்லை."
      },
      consultAdvocate: {
        heading: "உரிமம் பெற்ற வழக்கறிஞர்களை அணுகுங்கள்",
        content: "எந்த சட்ட விவகாரங்களுக்கும் தகுதியான, உரிமம் பெற்ற வழக்கறிஞர்களை ஆலோசிக்க அனைத்து பயனர்களையும் நாங்கள் வலுவாக ஊக்குவிக்கிறோம். ஒரு உரிமம் பெற்ற வழக்கறிஞர் தனிப்பட்ட ஆலோசனை வழங்க முடியும், சட்ட நடவடிக்கைகளில் உங்களைப் பிரதிநிதித்துவப்படுத்த முடியும்."
      },
      additionalNotices: {
        heading: "கூடுதல் முக்கிய அறிவிப்புகள்",
        list: [
          "இந்த தளத்தில் உள்ள சட்ட தகவல்கள் இந்திய சட்டங்களை அடிப்படையாகக் கொண்டவை மற்றும் பிற அதிகார வரம்புகளுக்கு பொருந்தாது.",
          "சட்டங்களும் சட்ட நடைமுறைகளும் மாறலாம். அதிகாரப்பூர்வ ஆதாரங்களிலிருந்து தற்போதைய சட்ட விதிகளை எப்போதும் சரிபார்க்கவும்.",
          "AI-உருவாக்கப்பட்ட பகுப்பாய்வு பேட்டர்ன் அங்கீகாரத்தை அடிப்படையாகக் கொண்டது மற்றும் சமீபத்திய சட்ட மேம்பாடுகளுக்கு காரணமாக இருக்காது.",
          "வழக்கு முடிவுகள் சாட்சியம், அதிகார வரம்பு மற்றும் தனிப்பட்ட சூழ்நிலைகள் உட்பட பல காரணிகளைப் பொறுத்தது.",
          "நேரம் உணர்திறன் சட்ட விவகாரங்களுக்கு உடனடி தொழில்முறை கவனம் தேவை."
        ]
      },
      userAcknowledgment: {
        heading: "பயனர் ஒப்புதல்",
        content: "NYTRIX AI ஐ பயன்படுத்துவதன் மூலம், இந்த சட்ட மறுப்பை நீங்கள் படித்து, புரிந்துகொண்டு, ஒப்புக்கொள்கிறீர்கள் என்பதை ஒப்புக்கொள்கிறீர்கள். தளம் பொதுவான சட்ட தகவல்களை மட்டுமே வழங்குகிறது என்பதை நீங்கள் புரிந்துகொள்கிறீர்கள்."
      },
      contact: {
        heading: "தெளிவுபடுத்த வேண்டுமா?",
        subtitle: "இந்த மறுப்பு குறித்து உங்களுக்கு கேள்விகள் இருந்தால் அல்லது கவலைகளைப் புகாரளிக்க வேண்டும் என்றால், எங்களைத் தொடர்பு கொள்ளுங்கள்.",
        email: "nytrixaiindia@gmail.com"
      }
    },
    footer: "© 2026 NYTRIX AI. MALLESH SP உருவாக்கியது & உரிமையானது"
  },

  telugu: {
    title: "చట్టపరమైన నిరాకరణ",
    subtitle: "NYTRIX AI ఉపయోగించే ముందు ఈ నిరాకరణను జాగ్రత్తగా చదవండి",
    effectiveDate: "అమలు తేదీ: ఫిబ్రవరి 15, 2026",
    hero: {
      title: "చట్టపరమైన నిరాకరణ",
      description: "NYTRIX AI అనేది AI-ఆధారిత చట్టపరమైన అవగాహన వేదిక. ఇది లా ఫర్మ్ కాదు, చట్టపరమైన సలహా అందించదు, మరియు అర్హత కలిగిన, లైసెన్స్ పొందిన న్యాయవాదితో సంప్రదింపునకు ప్రత్యామ్నాయంగా ఉపయోగించకూడదు."
    },
    sections: {
      importantNotice: {
        heading: "ముఖ్యమైన నోటీసు",
        content: "NYTRIX AI అనేది AI-ఆధారిత చట్టపరమైన అవగాహన వేదిక. ఇది లా ఫర్మ్ కాదు, చట్టపరమైన సలహా అందించదు, మరియు అర్హత కలిగిన, లైసెన్స్ పొందిన న్యాయవాదితో సంప్రదింపునకు ప్రత్యామ్నాయంగా ఉపయోగించకూడదు. మీ నిర్దిష్ట చట్టపరమైన విషయాలకు ఎల్లప్పుడూ వృత్తిపరమైన చట్టపరమైన సలహా తీసుకోండి."
      },
      informationalPurpose: {
        heading: "సమాచార ప్రయోజనం మాత్రమే",
        content: "NYTRIX AI అవగాహన ప్రయోజనాల కోసం సాధారణ చట్టపరమైన సమాచారం మరియు విద్యా కంటెంట్‌ను అందిస్తుంది. ఈ వేదికపై అందించబడిన సమాచారం భారతీయ చట్టం క్రింద ప్రాథమిక చట్టపరమైన భావనలు, హక్కులు మరియు విధానాలను అర్థం చేసుకోవడంలో వినియోగదారులకు సహాయం చేయడానికి ఉద్దేశించబడింది."
      },
      noLegalAdvice: {
        heading: "వృత్తిపరమైన చట్టపరమైన సలహాకు ప్రత్యామ్నాయం కాదు",
        content: "NYTRIX AI అందించే AI-ఆధారిత విశ్లేషణ, చట్టపరమైన అంతర్దృష్టులు మరియు సమాచారం కృత్రిమ మేధస్సు మరియు ముందుగా నిర్వచించబడిన చట్టపరమైన డేటాబేస్‌లను ఉపయోగించి రూపొందించబడ్డాయి."
      },
      noAttorneyClient: {
        heading: "అటార్నీ-క్లయింట్ సంబంధం లేదు",
        content: "NYTRIX AI యొక్క మీ ఉపయోగం మీకు మరియు వేదికకు, దాని యజమానులు, డెవలపర్లు లేదా మా డైరెక్టరీలో జాబితా చేయబడిన న్యాయవాదులకు మధ్య అటార్నీ-క్లయింట్ సంబంధాన్ని సృష్టించదు."
      },
      liabilityLimitation: {
        heading: "వేదిక బాధ్యత పరిమితి",
        content: "ఈ వేదికపై అందించబడిన సమాచారాన్ని ఉపయోగించడం వల్ల తీసుకున్న నిర్ణయాలు, చర్యలు లేదా ఫలితాలకు NYTRIX AI, దాని సృష్టికర్తలు, యజమానులు మరియు డెవలపర్లు బాధ్యత వహించరు."
      },
      lawyerDirectory: {
        heading: "న్యాయవాది డైరెక్టరీ నిరాకరణ",
        content: "మా డైరెక్టరీలో జాబితా చేయబడిన న్యాయవాదులు స్వతంత్ర చట్టపరమైన నిపుణులు. NYTRIX AI ఏ న్యాయవాది యొక్క నాణ్యత, సమర్థత లేదా అనుకూలతను ఆమోదించదు, హామీ ఇవ్వదు లేదా వారంటీ ఇవ్వదు."
      },
      consultAdvocate: {
        heading: "లైసెన్స్ పొందిన న్యాయవాదులను సంప్రదించండి",
        content: "ఏదైనా చట్టపరమైన విషయాలకు అర్హత కలిగిన, లైసెన్స్ పొందిన న్యాయవాదులను సంప్రదించమని మేము అన్ని వినియోగదారులను బలంగా ప్రోత్సహిస్తాము."
      },
      additionalNotices: {
        heading: "అదనపు ముఖ్యమైన నోటీసులు",
        list: [
          "ఈ వేదికపై చట్టపరమైన సమాచారం భారతీయ చట్టాలపై ఆధారపడి ఉంటుంది మరియు ఇతర అధికార పరిధులకు వర్తించకపోవచ్చు.",
          "చట్టాలు మరియు చట్టపరమైన విధానాలు మారవచ్చు. అధికారిక మూలాల నుండి ప్రస్తుత చట్టపరమైన నిబంధనలను ఎల్లప్పుడూ ధృవీకరించండి.",
          "AI-ఉత్పత్తి చేసిన విశ్లేషణ నమూనా గుర్తింపుపై ఆధారపడి ఉంటుంది.",
          "కేసు ఫలితాలు సాక్ష్యం, అధికార పరిధి మరియు వ్యక్తిగత పరిస్థితులతో సహా అనేక కారకాలపై ఆధారపడి ఉంటాయి.",
          "సమయ-సున్నితమైన చట్టపరమైన విషయాలకు తక్షణ వృత్తిపరమైన శ్రద్ధ అవసరం."
        ]
      },
      userAcknowledgment: {
        heading: "వినియోగదారు అంగీకారం",
        content: "NYTRIX AIని ఉపయోగించడం ద్వారా, మీరు ఈ చట్టపరమైన నిరాకరణను చదివి, అర్థం చేసుకుని, అంగీకరిస్తున్నారని మీరు అంగీకరిస్తున్నారు."
      },
      contact: {
        heading: "స్పష్టత కావాలా?",
        subtitle: "ఈ నిరాకరణ గురించి మీకు ప్రశ్నలు ఉంటే లేదా ఆందోళనలను నివేదించాలనుకుంటే, మమ్మల్ని సంప్రదించండి.",
        email: "nytrixaiindia@gmail.com"
      }
    },
    footer: "© 2026 NYTRIX AI. MALLESH SP సృష్టించారు & యజమాని"
  },

  malayalam: {
    title: "നിയമ നിരാകരണം",
    subtitle: "NYTRIX AI ഉപയോഗിക്കുന്നതിന് മുമ്പ് ഈ നിരാകരണം ശ്രദ്ധാപൂർവ്വം വായിക്കുക",
    effectiveDate: "പ്രാബല്യ തീയതി: ഫെബ്രുവരി 15, 2026",
    hero: {
      title: "നിയമ നിരാകരണം",
      description: "NYTRIX AI ഒരു AI-പവർഡ് നിയമ അവബോധ പ്ലാറ്റ്‌ഫോമാണ്. ഇത് ഒരു ലോ ഫേം അല്ല, നിയമ ഉപദേശം നൽകുന്നില്ല, കൂടാതെ യോഗ്യതയുള്ള, ലൈസൻസുള്ള അഭിഭാഷകനുമായുള്ള കൺസൾട്ടേഷന് പകരമായി ഉപയോഗിക്കരുത്."
    },
    sections: {
      importantNotice: {
        heading: "പ്രധാന അറിയിപ്പ്",
        content: "NYTRIX AI ഒരു AI-പവർഡ് നിയമ അവബോധ പ്ലാറ്റ്‌ഫോമാണ്. ഇത് ഒരു ലോ ഫേം അല്ല, നിയമ ഉപദേശം നൽകുന്നില്ല, കൂടാതെ യോഗ്യതയുള്ള, ലൈസൻസുള്ള അഭിഭാഷകനുമായുള്ള കൺസൾട്ടേഷന് പകരമായി ഉപയോഗിക്കരുത്. നിങ്ങളുടെ പ്രത്യേക നിയമ കാര്യങ്ങൾക്കായി എല്ലായ്പ്പോഴും പ്രൊഫഷണൽ നിയമ ഉപദേശം തേടുക."
      },
      informationalPurpose: {
        heading: "വിവര ആവശ്യങ്ങൾക്ക് മാത്രം",
        content: "NYTRIX AI അവബോധ ആവശ്യങ്ങൾക്കായി പൊതുവായ നിയമ വിവരങ്ങളും വിദ്യാഭ്യാസ ഉള്ളടക്കവും നൽകുന്നു. ഈ പ്ലാറ്റ്‌ഫോമിൽ അവതരിപ്പിക്കുന്ന വിവരങ്ങൾ ഇന്ത്യൻ നിയമപ്രകാരം അടിസ്ഥാന നിയമ ആശയങ്ങൾ, അവകാശങ്ങൾ, നടപടിക്രമങ്ങൾ എന്നിവ മനസ്സിലാക്കാൻ ഉപയോക്താക്കളെ സഹായിക്കാൻ ഉദ്ദേശിച്ചുള്ളതാണ്."
      },
      noLegalAdvice: {
        heading: "പ്രൊഫഷണൽ നിയമ ഉപദേശത്തിന് പകരമല്ല",
        content: "NYTRIX AI നൽകുന്ന AI-പവർഡ് വിശകലനം, നിയമ ഉൾക്കാഴ്ചകൾ, വിവരങ്ങൾ എന്നിവ ആർട്ടിഫിഷ്യൽ ഇന്റലിജൻസും മുൻകൂട്ടി നിർവചിച്ച നിയമ ഡാറ്റാബേസുകളും ഉപയോഗിച്ചാണ് സൃഷ്ടിക്കുന്നത്."
      },
      noAttorneyClient: {
        heading: "അറ്റോർണി-ക്ലയന്റ് ബന്ധമില്ല",
        content: "NYTRIX AI-യുടെ നിങ്ങളുടെ ഉപയോഗം നിങ്ങൾക്കും പ്ലാറ്റ്‌ഫോമിനും, അതിന്റെ ഉടമകൾ, ഡെവലപ്പർമാർ അല്ലെങ്കിൽ ഞങ്ങളുടെ ഡയറക്ടറിയിൽ ലിസ്റ്റ് ചെയ്തിരിക്കുന്ന ഏതെങ്കിലും അഭിഭാഷകർക്കുമിടയിൽ അറ്റോർണി-ക്ലയന്റ് ബന്ധം സൃഷ്ടിക്കുന്നില്ല."
      },
      liabilityLimitation: {
        heading: "പ്ലാറ്റ്‌ഫോം ബാധ്യതാ പരിമിതി",
        content: "ഈ പ്ലാറ്റ്‌ഫോമിൽ നൽകിയ വിവരങ്ങൾ ഉപയോഗിച്ചതിൽ നിന്ന് എടുത്ത തീരുമാനങ്ങൾ, പ്രവർത്തനങ്ങൾ അല്ലെങ്കിൽ ഫലങ്ങൾക്ക് NYTRIX AI, അതിന്റെ സ്രഷ്ടാക്കൾ, ഉടമകൾ, ഡെവലപ്പർമാർ എന്നിവർ ഉത്തരവാദികളായിരിക്കില്ല."
      },
      lawyerDirectory: {
        heading: "അഭിഭാഷക ഡയറക്ടറി നിരാകരണം",
        content: "ഞങ്ങളുടെ ഡയറക്ടറിയിൽ ലിസ്റ്റ് ചെയ്തിരിക്കുന്ന അഭിഭാഷകർ സ്വതന്ത്ര നിയമ പ്രൊഫഷണലുകളാണ്. NYTRIX AI ഏതെങ്കിലും അഭിഭാഷകന്റെ ഗുണനിലവാരം, കഴിവ് അല്ലെങ്കിൽ അനുയോജ്യത എന്നിവ അംഗീകരിക്കുകയോ ഉറപ്പ് നൽകുകയോ വാറന്റ് നൽകുകയോ ചെയ്യുന്നില്ല."
      },
      consultAdvocate: {
        heading: "ലൈസൻസുള്ള അഭിഭാഷകരുമായി ബന്ധപ്പെടുക",
        content: "ഏതെങ്കിലും നിയമ കാര്യങ്ങൾക്കായി യോഗ്യതയുള്ള, ലൈസൻസുള്ള അഭിഭാഷകരുമായി കൺസൾട്ട് ചെയ്യാൻ എല്ലാ ഉപയോക്താക്കളെയും ഞങ്ങൾ ശക്തമായി പ്രോത്സാഹിപ്പിക്കുന്നു."
      },
      additionalNotices: {
        heading: "അധിക പ്രധാന അറിയിപ്പുകൾ",
        list: [
          "ഈ പ്ലാറ്റ്‌ഫോമിലെ നിയമ വിവരങ്ങൾ ഇന്ത്യൻ നിയമങ്ങളെ അടിസ്ഥാനമാക്കിയുള്ളതാണ്, മറ്റ് അധികാരപരിധികളിൽ ബാധകമാകണമെന്നില്ല.",
          "നിയമങ്ങളും നിയമ നടപടിക്രമങ്ങളും മാറിയേക്കാം. ഔദ്യോഗിക സ്രോതസ്സുകളിൽ നിന്ന് നിലവിലെ നിയമ വ്യവസ്ഥകൾ എല്ലായ്പ്പോഴും പരിശോധിക്കുക.",
          "AI-ജനറേറ്റഡ് വിശകലനം പാറ്റേൺ തിരിച്ചറിയലിനെ അടിസ്ഥാനമാക്കിയുള്ളതാണ്.",
          "കേസ് ഫലങ്ങൾ തെളിവ്, അധികാരപരിധി, വ്യക്തിഗത സാഹചര്യങ്ങൾ എന്നിവ ഉൾപ്പെടെ നിരവധി ഘടകങ്ങളെ ആശ്രയിച്ചിരിക്കുന്നു.",
          "സമയ-സെൻസിറ്റീവ് നിയമ കാര്യങ്ങൾക്ക് ഉടൻ പ്രൊഫഷണൽ ശ്രദ്ധ ആവശ്യമാണ്."
        ]
      },
      userAcknowledgment: {
        heading: "ഉപയോക്താവിന്റെ അംഗീകാരം",
        content: "NYTRIX AI ഉപയോഗിക്കുന്നതിലൂടെ, ഈ നിയമ നിരാകരണം നിങ്ങൾ വായിച്ചു, മനസ്സിലാക്കി, അംഗീകരിക്കുന്നു എന്ന് നിങ്ങൾ അംഗീകരിക്കുന്നു."
      },
      contact: {
        heading: "വ്യക്തത വേണോ?",
        subtitle: "ഈ നിരാകരണത്തെക്കുറിച്ച് നിങ്ങൾക്ക് ചോദ്യങ്ങളുണ്ടെങ്കിൽ അല്ലെങ്കിൽ ആശങ്കകൾ റിപ്പോർട്ട് ചെയ്യണമെങ്കിൽ, ഞങ്ങളെ ബന്ധപ്പെടുക.",
        email: "nytrixaiindia@gmail.com"
      }
    },
    footer: "© 2026 NYTRIX AI. MALLESH SP സൃഷ്ടിച്ചതും ഉടമസ്ഥതയിലുള്ളതുമാണ്"
  },

  kannada: {
    title: "ಕಾನೂನು ಹಕ್ಕುನಿರಾಕರಣೆ",
    subtitle: "NYTRIX AI ಬಳಸುವ ಮೊದಲು ಈ ಹಕ್ಕುನಿರಾಕರಣೆಯನ್ನು ಎಚ್ಚರಿಕೆಯಿಂದ ಓದಿ",
    effectiveDate: "ಜಾರಿ ದಿನಾಂಕ: ಫೆಬ್ರವರಿ 15, 2026",
    hero: {
      title: "ಕಾನೂನು ಹಕ್ಕುನಿರಾಕರಣೆ",
      description: "NYTRIX AI ಒಂದು AI-ಶಕ್ತಿಯ ಕಾನೂನು ಅರಿವು ವೇದಿಕೆಯಾಗಿದೆ. ಇದು ಕಾನೂನು ಸಂಸ್ಥೆಯಲ್ಲ, ಕಾನೂನು ಸಲಹೆ ನೀಡುವುದಿಲ್ಲ, ಮತ್ತು ಅರ್ಹ, ಪರವಾನಗಿ ಪಡೆದ ವಕೀಲರೊಂದಿಗೆ ಸಮಾಲೋಚನೆಗೆ ಬದಲಿಯಾಗಿ ಬಳಸಬಾರದು."
    },
    sections: {
      importantNotice: {
        heading: "ಪ್ರಮುಖ ಸೂಚನೆ",
        content: "NYTRIX AI ಒಂದು AI-ಶಕ್ತಿಯ ಕಾನೂನು ಅರಿವು ವೇದಿಕೆಯಾಗಿದೆ. ಇದು ಕಾನೂನು ಸಂಸ್ಥೆಯಲ್ಲ, ಕಾನೂನು ಸಲಹೆ ನೀಡುವುದಿಲ್ಲ, ಮತ್ತು ಅರ್ಹ, ಪರವಾನಗಿ ಪಡೆದ ವಕೀಲರೊಂದಿಗೆ ಸಮಾಲೋಚನೆಗೆ ಬದಲಿಯಾಗಿ ಬಳಸಬಾರದು. ನಿಮ್ಮ ನಿರ್ದಿಷ್ಟ ಕಾನೂನು ವಿಷಯಗಳಿಗೆ ಯಾವಾಗಲೂ ವೃತ್ತಿಪರ ಕಾನೂನು ಸಲಹೆಯನ್ನು ಪಡೆಯಿರಿ."
      },
      informationalPurpose: {
        heading: "ಮಾಹಿತಿ ಉದ್ದೇಶಕ್ಕೆ ಮಾತ್ರ",
        content: "NYTRIX AI ಅರಿವು ಉದ್ದೇಶಗಳಿಗಾಗಿ ಸಾಮಾನ್ಯ ಕಾನೂನು ಮಾಹಿತಿ ಮತ್ತು ಶೈಕ್ಷಣಿಕ ವಿಷಯವನ್ನು ಒದಗಿಸುತ್ತದೆ."
      },
      noLegalAdvice: {
        heading: "ವೃತ್ತಿಪರ ಕಾನೂನು ಸಲಹೆಗೆ ಬದಲಿಯಲ್ಲ",
        content: "NYTRIX AI ಒದಗಿಸುವ AI-ಶಕ್ತಿಯ ವಿಶ್ಲೇಷಣೆ, ಕಾನೂನು ಒಳನೋಟಗಳು ಮತ್ತು ಮಾಹಿತಿಯು ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ಮತ್ತು ಪೂರ್ವ-ನಿರ್ಧರಿತ ಕಾನೂನು ಡೇಟಾಬೇಸ್‌ಗಳನ್ನು ಬಳಸಿ ರಚಿಸಲಾಗಿದೆ."
      },
      noAttorneyClient: {
        heading: "ಅಟಾರ್ನಿ-ಕ್ಲೈಂಟ್ ಸಂಬಂಧವಿಲ್ಲ",
        content: "NYTRIX AI ನಿಮ್ಮ ಬಳಕೆಯು ನಿಮ್ಮ ಮತ್ತು ವೇದಿಕೆ, ಅದರ ಮಾಲೀಕರು, ಡೆವಲಪರ್‌ಗಳು ಅಥವಾ ನಮ್ಮ ಡೈರೆಕ್ಟರಿಯಲ್ಲಿ ಪಟ್ಟಿ ಮಾಡಲಾದ ವಕೀಲರ ನಡುವೆ ಅಟಾರ್ನಿ-ಕ್ಲೈಂಟ್ ಸಂಬಂಧವನ್ನು ರಚಿಸುವುದಿಲ್ಲ."
      },
      liabilityLimitation: {
        heading: "ವೇದಿಕೆ ಹೊಣೆಗಾರಿಕೆ ಮಿತಿ",
        content: "ಈ ವೇದಿಕೆಯಲ್ಲಿ ಒದಗಿಸಿದ ಮಾಹಿತಿಯ ಬಳಕೆಯಿಂದ ಉಂಟಾಗುವ ನಿರ್ಧಾರಗಳು, ಕ್ರಮಗಳು ಅಥವಾ ಫಲಿತಾಂಶಗಳಿಗೆ NYTRIX AI, ಅದರ ಸೃಷ್ಟಿಕರ್ತರು, ಮಾಲೀಕರು ಮತ್ತು ಡೆವಲಪರ್‌ಗಳು ಜವಾಬ್ದಾರರಾಗುವುದಿಲ್ಲ."
      },
      lawyerDirectory: {
        heading: "ವಕೀಲ ಡೈರೆಕ್ಟರಿ ಹಕ್ಕುನಿರಾಕರಣೆ",
        content: "ನಮ್ಮ ಡೈರೆಕ್ಟರಿಯಲ್ಲಿ ಪಟ್ಟಿ ಮಾಡಲಾದ ವಕೀಲರು ಸ್ವತಂತ್ರ ಕಾನೂನು ವೃತ್ತಿಪರರು. NYTRIX AI ಯಾವುದೇ ವಕೀಲರ ಗುಣಮಟ್ಟ, ಸಾಮರ್ಥ್ಯ ಅಥವಾ ಸೂಕ್ತತೆಯನ್ನು ಅನುಮೋದಿಸುವುದಿಲ್ಲ."
      },
      consultAdvocate: {
        heading: "ಪರವಾನಗಿ ಪಡೆದ ವಕೀಲರನ್ನು ಸಂಪರ್ಕಿಸಿ",
        content: "ಯಾವುದೇ ಕಾನೂನು ವಿಷಯಗಳಿಗೆ ಅರ್ಹ, ಪರವಾನಗಿ ಪಡೆದ ವಕೀಲರೊಂದಿಗೆ ಸಮಾಲೋಚಿಸಲು ನಾವು ಎಲ್ಲಾ ಬಳಕೆದಾರರನ್ನು ಬಲವಾಗಿ ಪ್ರೋತ್ಸಾಹಿಸುತ್ತೇವೆ."
      },
      additionalNotices: {
        heading: "ಹೆಚ್ಚುವರಿ ಪ್ರಮುಖ ಸೂಚನೆಗಳು",
        list: [
          "ಈ ವೇದಿಕೆಯಲ್ಲಿನ ಕಾನೂನು ಮಾಹಿತಿಯು ಭಾರತೀಯ ಕಾನೂನುಗಳನ್ನು ಆಧರಿಸಿದೆ ಮತ್ತು ಇತರ ನ್ಯಾಯಾಧಿಕಾರಗಳಿಗೆ ಅನ್ವಯವಾಗದಿರಬಹುದು.",
          "ಕಾನೂನುಗಳು ಮತ್ತು ಕಾನೂನು ಕಾರ್ಯವಿಧಾನಗಳು ಬದಲಾಗಬಹುದು.",
          "AI-ಉತ್ಪಾದಿತ ವಿಶ್ಲೇಷಣೆಯು ಮಾದರಿ ಗುರುತಿಸುವಿಕೆಯನ್ನು ಆಧರಿಸಿದೆ.",
          "ಪ್ರಕರಣದ ಫಲಿತಾಂಶಗಳು ಸಾಕ್ಷ್ಯ, ನ್ಯಾಯಾಧಿಕಾರ ಮತ್ತು ವೈಯಕ್ತಿಕ ಸಂದರ್ಭಗಳು ಸೇರಿದಂತೆ ಅನೇಕ ಅಂಶಗಳನ್ನು ಅವಲಂಬಿಸಿರುತ್ತದೆ.",
          "ಸಮಯ-ಸೂಕ್ಷ್ಮ ಕಾನೂನು ವಿಷಯಗಳಿಗೆ ತಕ್ಷಣದ ವೃತ್ತಿಪರ ಗಮನ ಅಗತ್ಯವಿದೆ."
        ]
      },
      userAcknowledgment: {
        heading: "ಬಳಕೆದಾರ ಒಪ್ಪಿಗೆ",
        content: "NYTRIX AI ಬಳಸುವ ಮೂಲಕ, ಈ ಕಾನೂನು ಹಕ್ಕುನಿರಾಕರಣೆಯನ್ನು ನೀವು ಓದಿದ್ದೀರಿ, ಅರ್ಥಮಾಡಿಕೊಂಡಿದ್ದೀರಿ ಮತ್ತು ಒಪ್ಪುತ್ತೀರಿ ಎಂದು ನೀವು ಒಪ್ಪಿಕೊಳ್ಳುತ್ತೀರಿ."
      },
      contact: {
        heading: "ಸ್ಪಷ್ಟೀಕರಣ ಬೇಕೇ?",
        subtitle: "ಈ ಹಕ್ಕುನಿರಾಕರಣೆಯ ಕುರಿತು ನಿಮಗೆ ಪ್ರಶ್ನೆಗಳಿದ್ದರೆ ಅಥವಾ ಕಾಳಜಿಗಳನ್ನು ವರದಿ ಮಾಡಲು ಬಯಸಿದರೆ, ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ.",
        email: "nytrixaiindia@gmail.com"
      }
    },
    footer: "© 2026 NYTRIX AI. MALLESH SP ರಚಿಸಿದ್ದಾರೆ & ಮಾಲೀಕರು"
  },

  bengali: {
    title: "আইনি দাবিত্যাগ",
    subtitle: "NYTRIX AI ব্যবহার করার আগে এই দাবিত্যাগ সাবধানে পড়ুন",
    effectiveDate: "কার্যকর তারিখ: ফেব্রুয়ারি 15, 2026",
    hero: {
      title: "আইনি দাবিত্যাগ",
      description: "NYTRIX AI একটি AI-চালিত আইনি সচেতনতা প্ল্যাটফর্ম। এটি কোনো আইন সংস্থা নয়, আইনি পরামর্শ প্রদান করে না, এবং যোগ্য, লাইসেন্সপ্রাপ্ত উকিলের সাথে পরামর্শের বিকল্প হিসাবে ব্যবহার করা উচিত নয়।"
    },
    sections: {
      importantNotice: {
        heading: "গুরুত্বপূর্ণ নোটিশ",
        content: "NYTRIX AI একটি AI-চালিত আইনি সচেতনতা প্ল্যাটফর্ম। এটি কোনো আইন সংস্থা নয়, আইনি পরামর্শ প্রদান করে না, এবং যোগ্য, লাইসেন্সপ্রাপ্ত উকিলের সাথে পরামর্শের বিকল্প হিসাবে ব্যবহার করা উচিত নয়। আপনার নির্দিষ্ট আইনি বিষয়গুলির জন্য সর্বদা পেশাদার আইনি পরামর্শ নিন।"
      },
      informationalPurpose: {
        heading: "শুধুমাত্র তথ্যমূলক উদ্দেশ্যে",
        content: "NYTRIX AI সচেতনতার উদ্দেশ্যে সাধারণ আইনি তথ্য এবং শিক্ষামূলক বিষয়বস্তু প্রদান করে।"
      },
      noLegalAdvice: {
        heading: "পেশাদার আইনি পরামর্শের বিকল্প নয়",
        content: "NYTRIX AI দ্বারা প্রদত্ত AI-চালিত বিশ্লেষণ, আইনি অন্তর্দৃষ্টি এবং তথ্য কৃত্রিম বুদ্ধিমত্তা এবং পূর্ব-নির্ধারিত আইনি ডাটাবেস ব্যবহার করে তৈরি করা হয়।"
      },
      noAttorneyClient: {
        heading: "কোনো অ্যাটর্নি-ক্লায়েন্ট সম্পর্ক নেই",
        content: "NYTRIX AI-এর আপনার ব্যবহার আপনার এবং প্ল্যাটফর্ম, এর মালিক, ডেভেলপার বা আমাদের ডিরেক্টরিতে তালিকাভুক্ত কোনো উকিলের মধ্যে অ্যাটর্নি-ক্লায়েন্ট সম্পর্ক তৈরি করে না।"
      },
      liabilityLimitation: {
        heading: "প্ল্যাটফর্ম দায়বদ্ধতা সীমাবদ্ধতা",
        content: "এই প্ল্যাটফর্মে প্রদত্ত তথ্যের ব্যবহার থেকে উদ্ভূত কোনো সিদ্ধান্ত, পদক্ষেপ বা ফলাফলের জন্য NYTRIX AI, এর নির্মাতা, মালিক এবং ডেভেলপাররা দায়ী থাকবে না।"
      },
      lawyerDirectory: {
        heading: "উকিল ডিরেক্টরি দাবিত্যাগ",
        content: "আমাদের ডিরেক্টরিতে তালিকাভুক্ত উকিলরা স্বাধীন আইনি পেশাদার। NYTRIX AI কোনো উকিলের গুণমান, দক্ষতা বা উপযুক্ততা অনুমোদন, গ্যারান্টি বা ওয়ারেন্ট দেয় না।"
      },
      consultAdvocate: {
        heading: "লাইসেন্সপ্রাপ্ত উকিলদের সাথে পরামর্শ করুন",
        content: "আমরা সমস্ত ব্যবহারকারীদের যেকোনো আইনি বিষয়ের জন্য যোগ্য, লাইসেন্সপ্রাপ্ত উকিলদের সাথে পরামর্শ করতে দৃঢ়ভাবে উৎসাহিত করি।"
      },
      additionalNotices: {
        heading: "অতিরিক্ত গুরুত্বপূর্ণ নোটিশ",
        list: [
          "এই প্ল্যাটফর্মে আইনি তথ্য ভারতীয় আইনের উপর ভিত্তি করে এবং অন্যান্য এখতিয়ারে প্রযোজ্য নাও হতে পারে।",
          "আইন এবং আইনি পদ্ধতি পরিবর্তন হতে পারে।",
          "AI-জেনারেটেড বিশ্লেষণ প্যাটার্ন স্বীকৃতির উপর ভিত্তি করে।",
          "মামলার ফলাফল প্রমাণ, এখতিয়ার এবং পৃথক পরিস্থিতি সহ অনেক কারণের উপর নির্ভর করে।",
          "সময়-সংবেদনশীল আইনি বিষয়গুলির জন্য অবিলম্বে পেশাদার মনোযোগ প্রয়োজন।"
        ]
      },
      userAcknowledgment: {
        heading: "ব্যবহারকারীর স্বীকৃতি",
        content: "NYTRIX AI ব্যবহার করে, আপনি স্বীকার করছেন যে আপনি এই আইনি দাবিত্যাগ পড়েছেন, বুঝেছেন এবং সম্মত হয়েছেন।"
      },
      contact: {
        heading: "স্পষ্টীকরণ দরকার?",
        subtitle: "এই দাবিত্যাগ সম্পর্কে আপনার প্রশ্ন থাকলে বা উদ্বেগ জানাতে চাইলে, আমাদের সাথে যোগাযোগ করুন।",
        email: "nytrixaiindia@gmail.com"
      }
    },
    footer: "© 2026 NYTRIX AI। MALLESH SP তৈরি এবং মালিকানাধীন"
  },

  marathi: {
    title: "कायदेशीर अस्वीकरण",
    subtitle: "NYTRIX AI वापरण्यापूर्वी हे अस्वीकरण काळजीपूर्वक वाचा",
    effectiveDate: "प्रभावी तारीख: फेब्रुवारी 15, 2026",
    hero: {
      title: "कायदेशीर अस्वीकरण",
      description: "NYTRIX AI हे AI-संचालित कायदेशीर जागरूकता व्यासपीठ आहे. हे कायदा फर्म नाही, कायदेशीर सल्ला देत नाही आणि पात्र, परवानाधारक वकिलाशी सल्लामसलत करण्यासाठी पर्याय म्हणून वापरले जाऊ नये."
    },
    sections: {
      importantNotice: {
        heading: "महत्त्वाची सूचना",
        content: "NYTRIX AI हे AI-संचालित कायदेशीर जागरूकता व्यासपीठ आहे. हे कायदा फर्म नाही, कायदेशीर सल्ला देत नाही आणि पात्र, परवानाधारक वकिलाशी सल्लामसलत करण्यासाठी पर्याय म्हणून वापरले जाऊ नये. तुमच्या विशिष्ट कायदेशीर बाबींसाठी नेहमी व्यावसायिक कायदेशीर सल्ला घ्या."
      },
      informationalPurpose: {
        heading: "केवळ माहितीसाठी",
        content: "NYTRIX AI जागरूकतेच्या उद्देशाने सामान्य कायदेशीर माहिती आणि शैक्षणिक सामग्री प्रदान करते."
      },
      noLegalAdvice: {
        heading: "व्यावसायिक कायदेशीर सल्ल्याचा पर्याय नाही",
        content: "NYTRIX AI द्वारे प्रदान केलेले AI-संचालित विश्लेषण, कायदेशीर अंतर्दृष्टी आणि माहिती कृत्रिम बुद्धिमत्ता आणि पूर्व-निर्धारित कायदेशीर डेटाबेस वापरून तयार केली जाते."
      },
      noAttorneyClient: {
        heading: "वकील-मुवक्किल संबंध नाही",
        content: "NYTRIX AI चा तुमचा वापर तुमच्या आणि व्यासपीठ, त्याचे मालक, डेव्हलपर किंवा आमच्या निर्देशिकेत सूचीबद्ध कोणत्याही वकिलांमध्ये वकील-मुवक्किल संबंध निर्माण करत नाही."
      },
      liabilityLimitation: {
        heading: "व्यासपीठ दायित्व मर्यादा",
        content: "या व्यासपीठावर प्रदान केलेल्या माहितीच्या वापरामुळे घेतलेल्या निर्णयांसाठी, कृतींसाठी किंवा परिणामांसाठी NYTRIX AI, त्याचे निर्माते, मालक आणि डेव्हलपर जबाबदार राहणार नाहीत."
      },
      lawyerDirectory: {
        heading: "वकील निर्देशिका अस्वीकरण",
        content: "आमच्या निर्देशिकेत सूचीबद्ध वकील स्वतंत्र कायदेशीर व्यावसायिक आहेत. NYTRIX AI कोणत्याही वकिलाच्या गुणवत्तेचे, क्षमतेचे किंवा योग्यतेचे समर्थन, हमी किंवा वॉरंटी देत नाही."
      },
      consultAdvocate: {
        heading: "परवानाधारक वकिलांशी संपर्क साधा",
        content: "कोणत्याही कायदेशीर बाबींसाठी पात्र, परवानाधारक वकिलांशी सल्लामसलत करण्यासाठी आम्ही सर्व वापरकर्त्यांना जोरदार प्रोत्साहन देतो."
      },
      additionalNotices: {
        heading: "अतिरिक्त महत्त्वाच्या सूचना",
        list: [
          "या व्यासपीठावरील कायदेशीर माहिती भारतीय कायद्यांवर आधारित आहे आणि इतर अधिकार क्षेत्रांना लागू होऊ शकत नाही.",
          "कायदे आणि कायदेशीर कार्यपद्धती बदलू शकतात.",
          "AI-निर्मित विश्लेषण पॅटर्न ओळखीवर आधारित आहे.",
          "केस परिणाम पुरावे, अधिकार क्षेत्र आणि वैयक्तिक परिस्थितींसह अनेक घटकांवर अवलंबून असतात.",
          "वेळ-संवेदनशील कायदेशीर बाबींसाठी त्वरित व्यावसायिक लक्ष आवश्यक आहे."
        ]
      },
      userAcknowledgment: {
        heading: "वापरकर्ता मान्यता",
        content: "NYTRIX AI वापरून, तुम्ही हे कायदेशीर अस्वीकरण वाचले, समजले आणि मान्य केले आहे हे तुम्ही मान्य करता."
      },
      contact: {
        heading: "स्पष्टीकरण हवे आहे?",
        subtitle: "या अस्वीकरणाबद्दल तुम्हाला प्रश्न असल्यास किंवा चिंता नोंदवायची असल्यास, आमच्याशी संपर्क साधा.",
        email: "nytrixaiindia@gmail.com"
      }
    },
    footer: "© 2026 NYTRIX AI. MALLESH SP यांनी तयार केलेले आणि मालकीचे"
  }
};
