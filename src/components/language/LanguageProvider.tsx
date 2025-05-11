
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "hi" | "gu";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Simple translations object
const translations: Record<Language, Record<string, string>> = {
  en: {
    dashboard: "Dashboard",
    students: "Students",
    teachers: "Teachers",
    academics: "Academics",
    attendance: "Attendance",
    timetable: "Timetable",
    fees: "Fees",
    topics: "Study Topics",
    activities: "Activities",
    reports: "Reports",
    calendar: "Calendar",
    announcements: "Announcements",
    feedback: "Feedback",
    notifications: "Notifications",
    settings: "Settings",
    profile: "Profile",
    logout: "Logout",
    welcome: "Welcome back to your dashboard",
    language: "Language",
  },
  hi: {
    dashboard: "डैशबोर्ड",
    students: "छात्र",
    teachers: "शिक्षक",
    academics: "शैक्षणिक",
    attendance: "उपस्थिति",
    timetable: "समय सारणी",
    fees: "शुल्क",
    topics: "अध्ययन विषय",
    activities: "गतिविधियाँ",
    reports: "रिपोर्ट",
    calendar: "कैलेंडर",
    announcements: "घोषणाएँ",
    feedback: "प्रतिक्रिया",
    notifications: "सूचनाएँ",
    settings: "सेटिंग्स",
    profile: "प्रोफाइल",
    logout: "लॉगआउट",
    welcome: "अपने डैशबोर्ड पर वापस आपका स्वागत है",
    language: "भाषा",
  },
  gu: {
    dashboard: "ડેશબોર્ડ",
    students: "વિદ્યાર્થીઓ",
    teachers: "શિક્ષકો",
    academics: "શૈક્ષણિક",
    attendance: "હાજરી",
    timetable: "સમયપત્રક",
    fees: "ફી",
    topics: "અભ્યાસ વિષયો",
    activities: "પ્રવૃત્તિઓ",
    reports: "રિપોર્ટ",
    calendar: "કૅલેન્ડર",
    announcements: "જાહેરાતો",
    feedback: "પ્રતિસાદ",
    notifications: "સૂચનાઓ",
    settings: "સેટિંગ્સ",
    profile: "પ્રોફાઇલ",
    logout: "લૉગઆઉટ",
    welcome: "તમારા ડેશબોર્ડ પર પાછા આવવા પર આપનું સ્વાગત છે",
    language: "ભાષા",
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("app-language");
    return (savedLanguage as Language) || "en";
  });

  useEffect(() => {
    localStorage.setItem("app-language", language);
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  
  return context;
};
