import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type LangCode = "en" | "bn" | "ar";

export const LANGUAGES: { code: LangCode; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
  { code: "bn", label: "Bangla", native: "বাংলা" },
  { code: "ar", label: "Arabic", native: "العربية" },
];

type Dict = Record<string, string>;

const en: Dict = {
  "nav.home": "Home",
  "nav.live": "Live Location",
  "nav.buses": "Buses",
  "nav.schedule": "Time Schedule",
  "nav.routes": "Routes",
  "nav.how": "How it works",
  "nav.login": "Login",
  "nav.signup": "Sign Up",
  "hero.badge": "Pundra University",
  "hero.title1": "Your Ride to",
  "hero.title2": "Campus,",
  "hero.title3": "On Time",
  "hero.subtitle":
    "Track your university bus in real-time — buses, routes, and schedules in one place.",
  "hero.cta": "Get Started",
  "hero.download": "Download PUB Bus Track App",
  "hero.appstore.small": "Download on the",
  "hero.appstore": "App Store",
  "hero.play.small": "Get it on",
  "hero.play": "Google Play",
  "map.open": "Open Live Location",
  "map.gps": "GPS Not Connected — Default Location",
};

const bn: Dict = {
  "nav.home": "হোম",
  "nav.live": "লাইভ লোকেশন",
  "nav.buses": "বাসসমূহ",
  "nav.schedule": "সময়সূচি",
  "nav.routes": "রুট",
  "nav.how": "কীভাবে কাজ করে",
  "nav.login": "লগইন",
  "nav.signup": "সাইন আপ",
  "hero.badge": "পুন্ড্র ইউনিভার্সিটি",
  "hero.title1": "ক্যাম্পাসে আপনার যাত্রা,",
  "hero.title2": "সময়মতো",
  "hero.title3": "প্রতিদিন",
  "hero.subtitle":
    "রিয়েল-টাইমে আপনার বিশ্ববিদ্যালয়ের বাস ট্র্যাক করুন — বাস, রুট ও সময়সূচি এক জায়গায়।",
  "hero.cta": "শুরু করুন",
  "hero.download": "পিইউবি বাস ট্র্যাক অ্যাপ ডাউনলোড করুন",
  "hero.appstore.small": "ডাউনলোড করুন",
  "hero.appstore": "অ্যাপ স্টোর",
  "hero.play.small": "পাওয়া যাচ্ছে",
  "hero.play": "গুগল প্লে",
  "map.open": "লাইভ লোকেশন দেখুন",
  "map.gps": "জিপিএস সংযুক্ত নয় — ডিফল্ট অবস্থান",
};

const ar: Dict = {
  "nav.home": "الرئيسية",
  "nav.live": "الموقع المباشر",
  "nav.buses": "الحافلات",
  "nav.schedule": "الجدول الزمني",
  "nav.routes": "المسارات",
  "nav.how": "كيف يعمل",
  "nav.login": "تسجيل الدخول",
  "nav.signup": "إنشاء حساب",
  "hero.badge": "جامعة بوندرا",
  "hero.title1": "رحلتك إلى",
  "hero.title2": "الحرم الجامعي،",
  "hero.title3": "في الوقت المحدد",
  "hero.subtitle":
    "تتبّع حافلة جامعتك في الوقت الفعلي — الحافلات والمسارات والجداول في مكان واحد.",
  "hero.cta": "ابدأ الآن",
  "hero.download": "حمّل تطبيق PUB Bus Track",
  "hero.appstore.small": "حمّله من",
  "hero.appstore": "آب ستور",
  "hero.play.small": "احصل عليه من",
  "hero.play": "غوغل بلاي",
  "map.open": "افتح الموقع المباشر",
  "map.gps": "نظام تحديد المواقع غير متصل — الموقع الافتراضي",
};

const DICTS: Record<LangCode, Dict> = { en, bn, ar };

type Ctx = {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
};

const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "pub-bus-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as LangCode | null;
    if (saved && saved in DICTS) setLangState(saved);
  }, []);

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      setLang: (l) => {
        setLangState(l);
        try {
          window.localStorage.setItem(STORAGE_KEY, l);
        } catch {
          /* ignore */
        }
      },
      t: (key) => DICTS[lang][key] ?? en[key] ?? key,
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return { lang: "en", dir: "ltr", setLang: () => {}, t: (k) => en[k] ?? k };
  }
  return ctx;
}
