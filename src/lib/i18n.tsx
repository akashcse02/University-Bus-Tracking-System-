import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

export type LangCode = "en" | "bn" | "ar";

export const LANGUAGES: { code: LangCode; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
  { code: "bn", label: "Bangla", native: "বাংলা" },
  { code: "ar", label: "Arabic", native: "العربية" },
];

type Dict = Record<string, string>;

const en: Dict = {
  // Nav
  "nav.home": "Home",
  "nav.live": "Live Location",
  "nav.buses": "Buses",
  "nav.schedule": "Time Schedule",
  "nav.routes": "Routes",
  "nav.how": "How it works",
  "nav.login": "Login",
  "nav.signup": "Sign Up",
  "nav.language": "Language",
  "nav.dashboard": "Dashboard",

  // Hero
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

  // Stats
  "stats.routes": "Routes",
  "stats.buses": "Buses",
  "stats.students": "Students",
  "stats.coverage": "Routes across Bogura",

  // How it works
  "how.title": "How PUB Bus Track Works",
  "how.subtitle": "From your home to campus — track every step of the way.",
  "how.step1.title": "Enter Your Location",
  "how.step1.desc":
    "Students enter their home/pickup location once. The app saves it so the nearest bus route is automatically matched.",
  "how.step2.title": "Select Your Bus",
  "how.step2.desc":
    "Choose your assigned bus number and route from the list — Gobindaganj, Sherpur, Sathmatha, or Gabtoli.",
  "how.step3.title": "Track in Real-Time",
  "how.step3.desc":
    "See your bus moving live on the map, with accurate ETA so you know exactly when to head to your stop.",
  "how.step4.title": "Get Notified",
  "how.step4.desc":
    "Receive instant alerts for arrival time, delays, or route changes — never miss your bus again.",

  // Reviews
  "reviews.title1": "Loved by",
  "reviews.title2": "Users",
  "reviews.subtitle": "What our daily commuters, faculty, and staff have to say about PUB Bus Track.",
  "reviews.empty.title": "Be the first to share your experience!",
  "reviews.empty.body": "Sign in as a student and post a review from your dashboard.",
  "reviews.loading": "Loading reviews…",

  // Vision
  "vision.title1": "Our",
  "vision.title2": "Vision",
  "vision.p1":
    "We believe that university transit should be seamless, predictable, and stress-free. By providing real-time data to every student, we're reducing wasted waiting time at bus stops and helping our community start their academic day on the right foot.",
  "vision.p2":
    "Our goal is to build a connected, punctual campus commute that prioritizes student safety and convenience through innovative tracking technology.",
  "vision.cta": "Learn More",

  // Newsletter
  "news.title": "Stay Updated",
  "news.subtitle": "Get notified about new routes, schedule changes, and pickup alerts.",
  "news.placeholder": "Enter your email",
  "news.cta": "Subscribe",
  "news.thanks": "Thanks for subscribing!",

  // Footer
  "footer.about": "About",
  "footer.support": "Support",
  "footer.contact": "Contact",
  "footer.vision": "Our Vision",
  "footer.team": "Team",
  "footer.privacy": "Privacy Policy",
  "footer.terms": "Terms of Use",
  "footer.help": "Help Center",
  "footer.contactUs": "Contact Us",
  "footer.report": "Report an Issue",

  // Auth
  "auth.welcome": "Welcome Back",
  "auth.welcome.sub": "Log in to track your bus in real-time.",
  "auth.admin": "Admin Access",
  "auth.admin.sub": "Restricted administrative login.",
  "auth.email": "Email Address",
  "auth.password": "Password",
  "auth.forgot": "Forgot Password?",
  "auth.login": "Login",
  "auth.loggingIn": "Logging in...",
  "auth.or": "Or continue with",
  "auth.google": "Google Account",
  "auth.noAccount": "Don't have an account?",
  "auth.haveAccount": "Already have an account?",
  "auth.signup": "Sign Up",
  "auth.student": "Student",
  "auth.teacher": "Teacher",
  "auth.driver": "Driver",
  "auth.back": "Back to Home",

  // Dashboard shared
  "dash.welcome": "Welcome back",
  "dash.subtitle": "Here's what's happening with PUB Bus Track today.",
  "dash.liveBus": "Live Bus Location",
  "dash.yourBus": "Your Bus",
  "dash.noBus": "No bus assigned",
  "dash.route": "Route",
  "dash.notify": "Departure reminders",
  "dash.notify.on": "Reminders enabled",
  "dash.notify.off": "Reminders disabled",
  "dash.eta": "Estimated arrival",
  "dash.occupancy": "Occupancy",
  "dash.announcements": "Announcements",
  "dash.noAnnouncements": "No announcements yet.",
  "dash.schedule": "Today's schedule",
  "dash.quickLinks": "Quick links",
  "dash.viewMap": "Open live map",
  "dash.viewSchedule": "View time schedule",
  "dash.viewBuses": "Browse buses",

  // Review form
  "review.title": "Share your experience",
  "review.subtitle": "Your review appears on the public 'Loved by Users' section.",
  "review.rating": "Your rating",
  "review.placeholder": "Write a short review about PUB Bus Track…",
  "review.submit": "Post review",
  "review.posting": "Posting…",
  "review.success": "Thanks! Your review is live.",
  "review.error": "Could not post your review.",
  "review.yours": "Your review",
  "review.delete": "Delete",

  // Driver
  "driver.trip": "Trip control",
  "driver.start": "Start trip",
  "driver.end": "End trip",
  "driver.sos": "Send SOS alert",
  "driver.occupancy": "Passenger occupancy",
  "driver.low": "Low",
  "driver.medium": "Medium",
  "driver.high": "High",

  // Teacher
  "teacher.notice": "Notice board",
  "teacher.post": "Post announcement",
  "teacher.title": "Title",
  "teacher.message": "Message",
  "teacher.posted": "Announcement posted",

  // Admin
  "admin.overview": "Fleet overview",
  "admin.users": "Users",
  "admin.fleet": "Fleet status",
  "admin.logs": "System logs",

  // Sidebar
  "side.dashboard": "Dashboard",
  "side.map": "Live Map",
  "side.myBus": "My Bus",
  "side.schedule": "Schedule",
  "side.notifications": "Notifications",
  "side.settings": "Settings",
  "side.logout": "Logout",
  "side.myTrip": "My Trip",
  "side.sos": "SOS Report",

  // Pages
  "buses.title": "Our Buses",
  "buses.subtitle": "All buses grouped by route across Bogura.",
  "schedule.title": "Time Schedule",
  "schedule.subtitle": "Class and exam bus timings for every route.",
  "live.title": "Live Location",
  "live.subtitle": "Follow every PUB bus in real-time.",
  "common.loading": "Loading…",
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
  "nav.language": "ভাষা",
  "nav.dashboard": "ড্যাশবোর্ড",

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

  "stats.routes": "রুট",
  "stats.buses": "বাস",
  "stats.students": "শিক্ষার্থী",
  "stats.coverage": "বগুড়াজুড়ে রুট",

  "how.title": "পিইউবি বাস ট্র্যাক যেভাবে কাজ করে",
  "how.subtitle": "বাসা থেকে ক্যাম্পাস — প্রতিটি ধাপ ট্র্যাক করুন।",
  "how.step1.title": "আপনার অবস্থান দিন",
  "how.step1.desc":
    "শিক্ষার্থীরা একবার তাদের বাসা/পিকআপ পয়েন্ট দিলেই অ্যাপ নিকটতম রুট স্বয়ংক্রিয়ভাবে মিলিয়ে নেয়।",
  "how.step2.title": "আপনার বাস নির্বাচন করুন",
  "how.step2.desc":
    "তালিকা থেকে আপনার বাস নম্বর ও রুট বেছে নিন — গোবিন্দগঞ্জ, শেরপুর, সাতমাথা বা গাবতলী।",
  "how.step3.title": "রিয়েল-টাইমে ট্র্যাক করুন",
  "how.step3.desc":
    "মানচিত্রে বাস চলাচল সরাসরি দেখুন এবং সঠিক ইটিএ জেনে সময়মতো স্টপে পৌঁছান।",
  "how.step4.title": "নোটিফিকেশন পান",
  "how.step4.desc":
    "আগমনের সময়, বিলম্ব বা রুট পরিবর্তনের তাৎক্ষণিক অ্যালার্ট পান — আর কখনো বাস মিস নয়।",

  "reviews.title1": "ব্যবহারকারীদের",
  "reviews.title2": "প্রিয়",
  "reviews.subtitle": "প্রতিদিনের যাত্রী, শিক্ষক ও কর্মীরা পিইউবি বাস ট্র্যাক নিয়ে যা বলেন।",
  "reviews.empty.title": "আপনার অভিজ্ঞতা প্রথম শেয়ার করুন!",
  "reviews.empty.body": "শিক্ষার্থী হিসেবে লগইন করে ড্যাশবোর্ড থেকে রিভিউ দিন।",
  "reviews.loading": "রিভিউ লোড হচ্ছে…",

  "vision.title1": "আমাদের",
  "vision.title2": "লক্ষ্য",
  "vision.p1":
    "আমরা বিশ্বাস করি বিশ্ববিদ্যালয়ের যাতায়াত হওয়া উচিত সহজ, অনুমানযোগ্য ও চাপমুক্ত। প্রতিটি শিক্ষার্থীর কাছে রিয়েল-টাইম তথ্য পৌঁছে দিয়ে আমরা অপেক্ষার সময় কমিয়ে আনছি।",
  "vision.p2":
    "আমাদের লক্ষ্য হলো উদ্ভাবনী ট্র্যাকিং প্রযুক্তির মাধ্যমে নিরাপদ ও সময়ানুবর্তী ক্যাম্পাস যাতায়াত গড়ে তোলা।",
  "vision.cta": "আরও জানুন",

  "news.title": "আপডেট থাকুন",
  "news.subtitle": "নতুন রুট, সময়সূচি পরিবর্তন ও পিকআপ অ্যালার্ট সম্পর্কে জানুন।",
  "news.placeholder": "আপনার ইমেইল দিন",
  "news.cta": "সাবস্ক্রাইব",
  "news.thanks": "সাবস্ক্রাইব করার জন্য ধন্যবাদ!",

  "footer.about": "সম্পর্কে",
  "footer.support": "সহায়তা",
  "footer.contact": "যোগাযোগ",
  "footer.vision": "আমাদের লক্ষ্য",
  "footer.team": "টিম",
  "footer.privacy": "গোপনীয়তা নীতি",
  "footer.terms": "ব্যবহারের শর্ত",
  "footer.help": "হেল্প সেন্টার",
  "footer.contactUs": "যোগাযোগ করুন",
  "footer.report": "সমস্যা জানান",

  "auth.welcome": "স্বাগতম",
  "auth.welcome.sub": "রিয়েল-টাইমে বাস ট্র্যাক করতে লগইন করুন।",
  "auth.admin": "অ্যাডমিন প্রবেশ",
  "auth.admin.sub": "সীমিত প্রশাসনিক লগইন।",
  "auth.email": "ইমেইল ঠিকানা",
  "auth.password": "পাসওয়ার্ড",
  "auth.forgot": "পাসওয়ার্ড ভুলে গেছেন?",
  "auth.login": "লগইন",
  "auth.loggingIn": "লগইন হচ্ছে...",
  "auth.or": "অথবা চালিয়ে যান",
  "auth.google": "গুগল অ্যাকাউন্ট",
  "auth.noAccount": "অ্যাকাউন্ট নেই?",
  "auth.haveAccount": "ইতিমধ্যে অ্যাকাউন্ট আছে?",
  "auth.signup": "সাইন আপ",
  "auth.student": "শিক্ষার্থী",
  "auth.teacher": "শিক্ষক",
  "auth.driver": "ড্রাইভার",
  "auth.back": "হোমে ফিরুন",

  "dash.welcome": "আবার স্বাগতম",
  "dash.subtitle": "আজ পিইউবি বাস ট্র্যাকে যা ঘটছে।",
  "dash.liveBus": "লাইভ বাস অবস্থান",
  "dash.yourBus": "আপনার বাস",
  "dash.noBus": "কোনো বাস নির্ধারিত নেই",
  "dash.route": "রুট",
  "dash.notify": "ছাড়ার রিমাইন্ডার",
  "dash.notify.on": "রিমাইন্ডার চালু",
  "dash.notify.off": "রিমাইন্ডার বন্ধ",
  "dash.eta": "সম্ভাব্য আগমন",
  "dash.occupancy": "যাত্রীসংখ্যা",
  "dash.announcements": "ঘোষণা",
  "dash.noAnnouncements": "এখনো কোনো ঘোষণা নেই।",
  "dash.schedule": "আজকের সময়সূচি",
  "dash.quickLinks": "দ্রুত লিংক",
  "dash.viewMap": "লাইভ ম্যাপ দেখুন",
  "dash.viewSchedule": "সময়সূচি দেখুন",
  "dash.viewBuses": "বাস দেখুন",

  "review.title": "আপনার অভিজ্ঞতা শেয়ার করুন",
  "review.subtitle": "আপনার রিভিউ পাবলিক 'ব্যবহারকারীদের প্রিয়' অংশে দেখা যাবে।",
  "review.rating": "আপনার রেটিং",
  "review.placeholder": "পিইউবি বাস ট্র্যাক নিয়ে সংক্ষেপে লিখুন…",
  "review.submit": "রিভিউ দিন",
  "review.posting": "পোস্ট হচ্ছে…",
  "review.success": "ধন্যবাদ! আপনার রিভিউ প্রকাশিত হয়েছে।",
  "review.error": "রিভিউ পোস্ট করা যায়নি।",
  "review.yours": "আপনার রিভিউ",
  "review.delete": "মুছুন",

  "driver.trip": "ট্রিপ নিয়ন্ত্রণ",
  "driver.start": "ট্রিপ শুরু",
  "driver.end": "ট্রিপ শেষ",
  "driver.sos": "এসওএস পাঠান",
  "driver.occupancy": "যাত্রী ধারণ",
  "driver.low": "কম",
  "driver.medium": "মাঝারি",
  "driver.high": "বেশি",

  "teacher.notice": "নোটিশ বোর্ড",
  "teacher.post": "ঘোষণা দিন",
  "teacher.title": "শিরোনাম",
  "teacher.message": "বার্তা",
  "teacher.posted": "ঘোষণা প্রকাশিত হয়েছে",

  "admin.overview": "ফ্লিট ওভারভিউ",
  "admin.users": "ব্যবহারকারী",
  "admin.fleet": "ফ্লিট অবস্থা",
  "admin.logs": "সিস্টেম লগ",

  "side.dashboard": "ড্যাশবোর্ড",
  "side.map": "লাইভ ম্যাপ",
  "side.myBus": "আমার বাস",
  "side.schedule": "সময়সূচি",
  "side.notifications": "নোটিফিকেশন",
  "side.settings": "সেটিংস",
  "side.logout": "লগআউট",
  "side.myTrip": "আমার ট্রিপ",
  "side.sos": "এসওএস রিপোর্ট",

  "buses.title": "আমাদের বাসসমূহ",
  "buses.subtitle": "বগুড়াজুড়ে রুট অনুযায়ী সব বাস।",
  "schedule.title": "সময়সূচি",
  "schedule.subtitle": "প্রতিটি রুটের ক্লাস ও পরীক্ষার বাস সময়।",
  "live.title": "লাইভ লোকেশন",
  "live.subtitle": "প্রতিটি পিইউবি বাস রিয়েল-টাইমে দেখুন।",
  "common.loading": "লোড হচ্ছে…",
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
  "nav.language": "اللغة",
  "nav.dashboard": "لوحة التحكم",

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

  "stats.routes": "المسارات",
  "stats.buses": "الحافلات",
  "stats.students": "الطلاب",
  "stats.coverage": "مسارات في بوغرا",

  "how.title": "كيف يعمل PUB Bus Track",
  "how.subtitle": "من منزلك إلى الحرم الجامعي — تتبّع كل خطوة.",
  "how.step1.title": "أدخل موقعك",
  "how.step1.desc": "يُدخل الطالب موقع الالتقاط مرة واحدة ليطابق التطبيق أقرب مسار تلقائياً.",
  "how.step2.title": "اختر حافلتك",
  "how.step2.desc": "اختر رقم حافلتك ومسارها من القائمة — غوبيندغانج، شيربور، ساتماثا أو غابتولي.",
  "how.step3.title": "تتبّع مباشر",
  "how.step3.desc": "شاهد حافلتك تتحرك على الخريطة مع وقت وصول دقيق.",
  "how.step4.title": "تنبيهات فورية",
  "how.step4.desc": "استقبل تنبيهات الوصول والتأخير وتغيير المسار — لن تفوتك الحافلة.",

  "reviews.title1": "محبوب لدى",
  "reviews.title2": "المستخدمين",
  "reviews.subtitle": "ما يقوله الركاب وأعضاء هيئة التدريس والموظفون عن التطبيق.",
  "reviews.empty.title": "كن أول من يشارك تجربته!",
  "reviews.empty.body": "سجّل الدخول كطالب وأضف مراجعتك من لوحة التحكم.",
  "reviews.loading": "جارٍ تحميل المراجعات…",

  "vision.title1": "رؤيتنا",
  "vision.title2": "",
  "vision.p1":
    "نؤمن بأن التنقل الجامعي يجب أن يكون سلساً ويمكن التنبؤ به وخالياً من التوتر عبر توفير بيانات لحظية لكل طالب.",
  "vision.p2": "هدفنا بناء تنقل جامعي منضبط يعطي الأولوية لسلامة الطلاب وراحتهم.",
  "vision.cta": "اعرف المزيد",

  "news.title": "ابقَ على اطلاع",
  "news.subtitle": "احصل على إشعارات المسارات الجديدة وتغييرات الجدول.",
  "news.placeholder": "أدخل بريدك الإلكتروني",
  "news.cta": "اشترك",
  "news.thanks": "شكراً لاشتراكك!",

  "footer.about": "من نحن",
  "footer.support": "الدعم",
  "footer.contact": "اتصل بنا",
  "footer.vision": "رؤيتنا",
  "footer.team": "الفريق",
  "footer.privacy": "سياسة الخصوصية",
  "footer.terms": "شروط الاستخدام",
  "footer.help": "مركز المساعدة",
  "footer.contactUs": "تواصل معنا",
  "footer.report": "أبلغ عن مشكلة",

  "auth.welcome": "مرحباً بعودتك",
  "auth.welcome.sub": "سجّل الدخول لتتبع حافلتك مباشرة.",
  "auth.admin": "دخول المشرف",
  "auth.admin.sub": "دخول إداري مقيّد.",
  "auth.email": "البريد الإلكتروني",
  "auth.password": "كلمة المرور",
  "auth.forgot": "نسيت كلمة المرور؟",
  "auth.login": "تسجيل الدخول",
  "auth.loggingIn": "جارٍ الدخول...",
  "auth.or": "أو تابع عبر",
  "auth.google": "حساب غوغل",
  "auth.noAccount": "ليس لديك حساب؟",
  "auth.haveAccount": "لديك حساب بالفعل؟",
  "auth.signup": "إنشاء حساب",
  "auth.student": "طالب",
  "auth.teacher": "مدرّس",
  "auth.driver": "سائق",
  "auth.back": "العودة للرئيسية",

  "dash.welcome": "مرحباً بعودتك",
  "dash.subtitle": "إليك ما يحدث اليوم.",
  "dash.liveBus": "موقع الحافلة المباشر",
  "dash.yourBus": "حافلتك",
  "dash.noBus": "لا توجد حافلة مخصصة",
  "dash.route": "المسار",
  "dash.notify": "تذكيرات المغادرة",
  "dash.notify.on": "التذكيرات مفعّلة",
  "dash.notify.off": "التذكيرات متوقفة",
  "dash.eta": "وقت الوصول المتوقع",
  "dash.occupancy": "الإشغال",
  "dash.announcements": "الإعلانات",
  "dash.noAnnouncements": "لا توجد إعلانات بعد.",
  "dash.schedule": "جدول اليوم",
  "dash.quickLinks": "روابط سريعة",
  "dash.viewMap": "فتح الخريطة",
  "dash.viewSchedule": "عرض الجدول",
  "dash.viewBuses": "تصفح الحافلات",

  "review.title": "شارك تجربتك",
  "review.subtitle": "ستظهر مراجعتك في قسم 'محبوب لدى المستخدمين'.",
  "review.rating": "تقييمك",
  "review.placeholder": "اكتب مراجعة قصيرة…",
  "review.submit": "نشر المراجعة",
  "review.posting": "جارٍ النشر…",
  "review.success": "شكراً! تم نشر مراجعتك.",
  "review.error": "تعذّر نشر المراجعة.",
  "review.yours": "مراجعتك",
  "review.delete": "حذف",

  "driver.trip": "التحكم بالرحلة",
  "driver.start": "بدء الرحلة",
  "driver.end": "إنهاء الرحلة",
  "driver.sos": "إرسال استغاثة",
  "driver.occupancy": "إشغال الركاب",
  "driver.low": "منخفض",
  "driver.medium": "متوسط",
  "driver.high": "مرتفع",

  "teacher.notice": "لوحة الإعلانات",
  "teacher.post": "نشر إعلان",
  "teacher.title": "العنوان",
  "teacher.message": "الرسالة",
  "teacher.posted": "تم نشر الإعلان",

  "admin.overview": "نظرة على الأسطول",
  "admin.users": "المستخدمون",
  "admin.fleet": "حالة الأسطول",
  "admin.logs": "سجلات النظام",

  "side.dashboard": "لوحة التحكم",
  "side.map": "الخريطة المباشرة",
  "side.myBus": "حافلتي",
  "side.schedule": "الجدول",
  "side.notifications": "الإشعارات",
  "side.settings": "الإعدادات",
  "side.logout": "تسجيل الخروج",
  "side.myTrip": "رحلتي",
  "side.sos": "بلاغ استغاثة",

  "buses.title": "حافلاتنا",
  "buses.subtitle": "جميع الحافلات مرتبة حسب المسار.",
  "schedule.title": "الجدول الزمني",
  "schedule.subtitle": "مواعيد حافلات المحاضرات والامتحانات لكل مسار.",
  "live.title": "الموقع المباشر",
  "live.subtitle": "تابع كل حافلة في الوقت الفعلي.",
  "common.loading": "جارٍ التحميل…",
};

/* ---------- Additional keys (teacher tools, admin console, weekdays) ---------- */

const extraEn: Dict = {
  "day.0": "Sunday",
  "day.1": "Monday",
  "day.2": "Tuesday",
  "day.3": "Wednesday",
  "day.4": "Thursday",
  "day.5": "Friday",
  "day.6": "Saturday",

  "teacher.classes": "Class schedule",
  "teacher.noClasses": "No classes added yet.",
  "teacher.addClass": "Add class",
  "teacher.classSaved": "Class added",
  "teacher.deleteClass": "Delete class",
  "teacher.course": "Course name",
  "teacher.section": "Section",
  "teacher.room": "Room",
  "teacher.day": "Day",
  "teacher.start": "Start time",
  "teacher.end": "End time",
  "teacher.attendance": "Attendance",
  "teacher.today": "Today",
  "teacher.selectClass": "Select class",
  "teacher.studentName": "Student name",
  "teacher.status": "Status",
  "teacher.mark": "Mark attendance",
  "teacher.saved": "Attendance saved",
  "teacher.noAttendance": "No attendance marked today.",
  "teacher.present": "Present",
  "teacher.late": "Late",
  "teacher.absent": "Absent",
  "teacher.pending": "Awaiting admin approval",
  "teacher.approved": "Approved",

  "admin.tab.overview": "Overview",
  "admin.tab.users": "User management",
  "admin.tab.reviews": "Review moderation",
  "admin.tab.schedules": "Schedule approval",
  "admin.tab.config": "Configuration",
  "admin.users.title": "All users",
  "admin.users.sub": "Change a person's role across the whole system.",
  "admin.users.name": "Name",
  "admin.users.dept": "Department",
  "admin.users.role": "Role",
  "admin.users.none": "No users found.",
  "admin.users.updated": "Role updated",
  "admin.reviews.title": "Reviews",
  "admin.reviews.sub": "Approve, hide or delete what appears in 'Loved by Users'.",
  "admin.reviews.none": "No reviews submitted yet.",
  "admin.reviews.approve": "Approve",
  "admin.reviews.hide": "Hide",
  "admin.reviews.delete": "Delete",
  "admin.reviews.published": "Published",
  "admin.reviews.hidden": "Hidden",
  "admin.schedules.title": "Class schedules",
  "admin.schedules.sub": "Approve schedules submitted by teachers.",
  "admin.schedules.none": "No schedules submitted yet.",
  "admin.schedules.approve": "Approve",
  "admin.schedules.revoke": "Revoke",
  "admin.schedules.pending": "Pending",
  "admin.updated": "Updated",
  "admin.failed": "Something went wrong",

  "side.student": "Student dashboard",
  "side.teacher": "Teacher dashboard",
  "side.driver": "Driver dashboard",
  "side.admin": "Admin dashboard",
};

const extraBn: Dict = {
  "day.0": "রবিবার",
  "day.1": "সোমবার",
  "day.2": "মঙ্গলবার",
  "day.3": "বুধবার",
  "day.4": "বৃহস্পতিবার",
  "day.5": "শুক্রবার",
  "day.6": "শনিবার",

  "teacher.classes": "ক্লাস সময়সূচি",
  "teacher.noClasses": "এখনো কোনো ক্লাস যোগ করা হয়নি।",
  "teacher.addClass": "ক্লাস যোগ করুন",
  "teacher.classSaved": "ক্লাস যোগ হয়েছে",
  "teacher.deleteClass": "ক্লাস মুছুন",
  "teacher.course": "কোর্সের নাম",
  "teacher.section": "সেকশন",
  "teacher.room": "রুম",
  "teacher.day": "দিন",
  "teacher.start": "শুরুর সময়",
  "teacher.end": "শেষের সময়",
  "teacher.attendance": "উপস্থিতি",
  "teacher.today": "আজ",
  "teacher.selectClass": "ক্লাস নির্বাচন করুন",
  "teacher.studentName": "শিক্ষার্থীর নাম",
  "teacher.status": "অবস্থা",
  "teacher.mark": "উপস্থিতি নিন",
  "teacher.saved": "উপস্থিতি সংরক্ষিত",
  "teacher.noAttendance": "আজ কোনো উপস্থিতি নেওয়া হয়নি।",
  "teacher.present": "উপস্থিত",
  "teacher.late": "দেরিতে",
  "teacher.absent": "অনুপস্থিত",
  "teacher.pending": "অ্যাডমিন অনুমোদনের অপেক্ষায়",
  "teacher.approved": "অনুমোদিত",

  "admin.tab.overview": "ওভারভিউ",
  "admin.tab.users": "ব্যবহারকারী ব্যবস্থাপনা",
  "admin.tab.reviews": "রিভিউ মডারেশন",
  "admin.tab.schedules": "সময়সূচি অনুমোদন",
  "admin.tab.config": "কনফিগারেশন",
  "admin.users.title": "সব ব্যবহারকারী",
  "admin.users.sub": "যেকোনো ব্যক্তির ভূমিকা পরিবর্তন করুন।",
  "admin.users.name": "নাম",
  "admin.users.dept": "বিভাগ",
  "admin.users.role": "ভূমিকা",
  "admin.users.none": "কোনো ব্যবহারকারী পাওয়া যায়নি।",
  "admin.users.updated": "ভূমিকা হালনাগাদ হয়েছে",
  "admin.reviews.title": "রিভিউসমূহ",
  "admin.reviews.sub": "‘ব্যবহারকারীদের প্রিয়’ অংশে কী দেখা যাবে তা নিয়ন্ত্রণ করুন।",
  "admin.reviews.none": "এখনো কোনো রিভিউ জমা পড়েনি।",
  "admin.reviews.approve": "অনুমোদন",
  "admin.reviews.hide": "লুকান",
  "admin.reviews.delete": "মুছুন",
  "admin.reviews.published": "প্রকাশিত",
  "admin.reviews.hidden": "লুকানো",
  "admin.schedules.title": "ক্লাস সময়সূচি",
  "admin.schedules.sub": "শিক্ষকদের জমা দেওয়া সময়সূচি অনুমোদন করুন।",
  "admin.schedules.none": "এখনো কোনো সময়সূচি জমা পড়েনি।",
  "admin.schedules.approve": "অনুমোদন",
  "admin.schedules.revoke": "বাতিল",
  "admin.schedules.pending": "অপেক্ষমাণ",
  "admin.updated": "হালনাগাদ হয়েছে",
  "admin.failed": "কিছু একটা ভুল হয়েছে",

  "side.student": "শিক্ষার্থী ড্যাশবোর্ড",
  "side.teacher": "শিক্ষক ড্যাশবোর্ড",
  "side.driver": "চালক ড্যাশবোর্ড",
  "side.admin": "অ্যাডমিন ড্যাশবোর্ড",
};

const extraAr: Dict = {
  "day.0": "الأحد",
  "day.1": "الاثنين",
  "day.2": "الثلاثاء",
  "day.3": "الأربعاء",
  "day.4": "الخميس",
  "day.5": "الجمعة",
  "day.6": "السبت",

  "teacher.classes": "جدول المحاضرات",
  "teacher.noClasses": "لم تتم إضافة محاضرات بعد.",
  "teacher.addClass": "إضافة محاضرة",
  "teacher.classSaved": "تمت إضافة المحاضرة",
  "teacher.deleteClass": "حذف المحاضرة",
  "teacher.course": "اسم المقرر",
  "teacher.section": "الشعبة",
  "teacher.room": "القاعة",
  "teacher.day": "اليوم",
  "teacher.start": "وقت البدء",
  "teacher.end": "وقت الانتهاء",
  "teacher.attendance": "الحضور",
  "teacher.today": "اليوم",
  "teacher.selectClass": "اختر المحاضرة",
  "teacher.studentName": "اسم الطالب",
  "teacher.status": "الحالة",
  "teacher.mark": "تسجيل الحضور",
  "teacher.saved": "تم حفظ الحضور",
  "teacher.noAttendance": "لم يُسجَّل حضور اليوم.",
  "teacher.present": "حاضر",
  "teacher.late": "متأخر",
  "teacher.absent": "غائب",
  "teacher.pending": "بانتظار موافقة المشرف",
  "teacher.approved": "معتمد",

  "admin.tab.overview": "نظرة عامة",
  "admin.tab.users": "إدارة المستخدمين",
  "admin.tab.reviews": "مراجعة التقييمات",
  "admin.tab.schedules": "اعتماد الجداول",
  "admin.tab.config": "الإعدادات",
  "admin.users.title": "جميع المستخدمين",
  "admin.users.sub": "غيّر دور أي شخص في النظام.",
  "admin.users.name": "الاسم",
  "admin.users.dept": "القسم",
  "admin.users.role": "الدور",
  "admin.users.none": "لا يوجد مستخدمون.",
  "admin.users.updated": "تم تحديث الدور",
  "admin.reviews.title": "التقييمات",
  "admin.reviews.sub": "تحكّم بما يظهر في قسم 'محبوب لدى المستخدمين'.",
  "admin.reviews.none": "لا توجد تقييمات بعد.",
  "admin.reviews.approve": "اعتماد",
  "admin.reviews.hide": "إخفاء",
  "admin.reviews.delete": "حذف",
  "admin.reviews.published": "منشور",
  "admin.reviews.hidden": "مخفي",
  "admin.schedules.title": "جداول المحاضرات",
  "admin.schedules.sub": "اعتمد الجداول المقدمة من المدرّسين.",
  "admin.schedules.none": "لا توجد جداول مقدَّمة بعد.",
  "admin.schedules.approve": "اعتماد",
  "admin.schedules.revoke": "إلغاء",
  "admin.schedules.pending": "قيد الانتظار",
  "admin.updated": "تم التحديث",
  "admin.failed": "حدث خطأ ما",

  "side.student": "لوحة الطالب",
  "side.teacher": "لوحة المدرّس",
  "side.driver": "لوحة السائق",
  "side.admin": "لوحة المشرف",
};

const DICTS: Record<LangCode, Dict> = {
  en: { ...en, ...extraEn },
  bn: { ...bn, ...extraBn },
  ar: { ...ar, ...extraAr },
};

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
        // Best-effort sync to the signed-in user's profile.
        void (async () => {
          try {
            const { data } = await supabase.auth.getSession();
            const userId = data.session?.user.id;
            if (!userId) return;
            await supabase.from("profiles").update({ preferred_language: l }).eq("id", userId);
          } catch {
            /* ignore */
          }
        })();
      },
      t: (key) => DICTS[lang][key] ?? DICTS.en[key] ?? key,
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
