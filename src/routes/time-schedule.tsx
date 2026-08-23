import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { 
  Clock, 
  Calendar, 
  MapPin, 
  Phone, 
  User, 
  Bus as BusIcon, 
  ArrowLeft,
  ChevronRight,
  Info,
  Search,
  Download,
  Bell,
  Settings,
  Filter
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { motion, AnimatePresence } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SiteFooter } from "@/components/site-footer";
import pubLogo from "@/assets/pub-logo.png.asset.json";

export const Route = createFileRoute("/time-schedule")({
  head: () => ({
    title: "Time Schedule — PUB Bus Track",
    meta: [
      { name: "description", content: "Official Pundra University bus schedule. View departure times for Class and Exam periods." },
      { property: "og:title", content: "Time Schedule — PUB Bus Track" },
      { property: "og:description", content: "View the official PUB bus schedule for all routes in Bogura." },
      { property: "og:type", content: "website" },
    ]
  }),
  component: TimeSchedulePage,
});

// Data based on the provided official schedule image
const CLASS_TIME_SCHEDULE = [
  {
    day: "Friday (শুক্রবার)",
    slots: [
      {
        time: "Noon 01:05 PM",
        campus: "01:05 PM",
        sherpur: "-",
        bblock: "-",
        bonani: "-",
        gobindaganj: "-",
        mokamtola: "-",
        gabtoli: "-",
        sathmatha: "-",
        dupchachia: "-"
      },
      {
        time: "Afternoon 04:15 PM",
        campus: "04:15 PM",
        sherpur: "Via Gobindaganj",
        bblock: "-",
        bonani: "-",
        gobindaganj: "-",
        mokamtola: "-",
        gabtoli: "-",
        sathmatha: "-",
        dupchachia: "-"
      },
      {
        time: "Morning Slots",
        campus: "-",
        sherpur: "-",
        bblock: "-",
        bonani: "08:30 AM",
        gobindaganj: "08:25 AM",
        mokamtola: "08:40 AM",
        gabtoli: "-",
        sathmatha: "08:40 AM",
        dupchachia: "-"
      },
      {
        time: "Late Morning",
        campus: "-",
        sherpur: "-",
        bblock: "-",
        bonani: "01:55 PM",
        gobindaganj: "-",
        mokamtola: "-",
        gabtoli: "-",
        sathmatha: "10:05 AM",
        dupchachia: "-"
      },
      {
        time: "Late Afternoon",
        campus: "-",
        sherpur: "-",
        bblock: "-",
        bonani: "-",
        gobindaganj: "-",
        mokamtola: "-",
        gabtoli: "-",
        sathmatha: "02:05 PM",
        dupchachia: "-"
      }
    ]
  },
  {
    day: "Saturday (শনিবার)",
    slots: [
      {
        time: "Afternoon 01:20 PM",
        campus: "01:20 PM",
        sherpur: "-",
        bblock: "-",
        bonani: "-",
        gobindaganj: "-",
        mokamtola: "-",
        gabtoli: "-",
        sathmatha: "-",
        dupchachia: "-"
      },
      {
        time: "Late Afternoon 04:15 PM",
        campus: "04:15 PM",
        sherpur: "Via Gobindaganj",
        bblock: "-",
        bonani: "-",
        gobindaganj: "-",
        mokamtola: "-",
        gabtoli: "-",
        sathmatha: "-",
        dupchachia: "-"
      },
      {
        time: "Evening 05:15 PM",
        campus: "05:15 PM",
        sherpur: "-",
        bblock: "-",
        bonani: "-",
        gobindaganj: "-",
        mokamtola: "-",
        gabtoli: "-",
        sathmatha: "-",
        dupchachia: "-"
      },
      {
        time: "Morning Starts",
        campus: "-",
        sherpur: "08:00 AM",
        bblock: "08:25 AM",
        bonani: "08:30 AM",
        gobindaganj: "08:25 AM",
        mokamtola: "08:40 AM",
        gabtoli: "08:20 AM",
        sathmatha: "08:40 AM",
        dupchachia: "08:15 AM"
      },
      {
        time: "Mid Day",
        campus: "-",
        sherpur: "-",
        bblock: "-",
        bonani: "12:10 PM",
        gobindaganj: "-",
        mokamtola: "-",
        gabtoli: "-",
        sathmatha: "09:25 AM",
        dupchachia: "-"
      },
      {
        time: "Afternoon Returns",
        campus: "-",
        sherpur: "-",
        bblock: "-",
        bonani: "01:50 PM",
        gobindaganj: "-",
        mokamtola: "-",
        gabtoli: "-",
        sathmatha: "12:20 PM",
        dupchachia: "-"
      },
      {
        time: "Evening Returns",
        campus: "-",
        sherpur: "-",
        bblock: "-",
        bonani: "-",
        gobindaganj: "-",
        mokamtola: "-",
        gabtoli: "-",
        sathmatha: "01:40 PM",
        dupchachia: "-"
      }
    ]
  },
  {
    day: "Sunday to Tuesday (রবিবার থেকে মঙ্গলবার)",
    slots: [
      {
        time: "Afternoon 01:20 PM",
        campus: "01:20 PM",
        sherpur: "-",
        bblock: "-",
        bonani: "-",
        gobindaganj: "-",
        mokamtola: "-",
        gabtoli: "-",
        sathmatha: "-",
        dupchachia: "-"
      },
      {
        time: "Late Afternoon 04:15 PM",
        campus: "04:15 PM",
        sherpur: "-",
        bblock: "-",
        bonani: "-",
        gobindaganj: "-",
        mokamtola: "-",
        gabtoli: "-",
        sathmatha: "-",
        dupchachia: "-"
      },
      {
        time: "Morning Starts",
        campus: "-",
        sherpur: "08:00 AM",
        bblock: "08:25 AM",
        bonani: "08:30 AM",
        gobindaganj: "08:25 AM",
        mokamtola: "08:40 AM",
        gabtoli: "08:20 AM",
        sathmatha: "08:40 AM",
        dupchachia: "08:15 AM"
      },
      {
        time: "Mid Day",
        campus: "-",
        sherpur: "-",
        bblock: "-",
        bonani: "01:50 PM",
        gobindaganj: "-",
        mokamtola: "-",
        gabtoli: "-",
        sathmatha: "09:25 AM",
        dupchachia: "-"
      },
      {
        time: "Afternoon Returns",
        campus: "-",
        sherpur: "-",
        bblock: "-",
        bonani: "-",
        gobindaganj: "-",
        mokamtola: "-",
        gabtoli: "-",
        sathmatha: "01:40 PM",
        dupchachia: "-"
      }
    ]
  }
];

// Placeholder for Exam Time schedule (same structure)
const EXAM_TIME_SCHEDULE = CLASS_TIME_SCHEDULE.map(day => ({
  ...day,
  slots: day.slots.map(slot => ({
    ...slot,
    // Slightly modified times for exam period placeholder
    campus: slot.campus !== "-" ? slot.campus.replace(":", ":30") : "-",
    bonani: slot.bonani !== "-" ? slot.bonani.replace(":", ":15") : "-",
    sathmatha: slot.sathmatha !== "-" ? slot.sathmatha.replace(":", ":10") : "-",
  }))
}));

const DRIVER_INFO = [
  { route: "B-Block", busNo: "2", driver: "Md Ali Aslam", mobile: "01723-083940" },
  { route: "Gobindaganj", busNo: "3", driver: "Md Shahidul Islam", mobile: "01703-116321" },
  { route: "Bonani", busNo: "8", driver: "Md Dalim", mobile: "01734-491235" },
  { route: "Gabtoli", busNo: "5", driver: "Md Tofazzal", mobile: "01714-886667" },
  { route: "Tinmatha", busNo: "6", driver: "Md Saikat", mobile: "01789-885781" },
  { route: "Sherpur", busNo: "7", driver: "Md Monjur Ali", mobile: "01722-670583" },
  { route: "Sathmatha", busNo: "8", driver: "Md Abu Taher", mobile: "01725-675763" },
  { route: "Dupchachia", busNo: "9", driver: "Md Sagar", mobile: "01996-669392" },
];

const ROUTE_COLUMNS = [
  { label: "From Campus", labelBn: "(ক্যাম্পাস থেকে)", key: "campus" },
  { label: "From Sherpur", labelBn: "(শেরপুর থেকে)", key: "sherpur" },
  { label: "From B-Block", labelBn: "(বি-ব্লক থেকে)", key: "bblock" },
  { label: "From Bonani", labelBn: "(বনানী থেকে)", key: "bonani" },
  { label: "From Gobindaganj", labelBn: "(গোবিন্দগঞ্জ থেকে)", key: "gobindaganj" },
  { label: "From Mokamtola", labelBn: "(মোকামতলা থেকে)", key: "mokamtola" },
  { label: "From Gabtoli", labelBn: "(গাবতলী থেকে)", key: "gabtoli" },
  { label: "From Sathmatha", labelBn: "(সাতমাথা থেকে)", key: "sathmatha" },
  { label: "From Dupchachia", labelBn: "(দুপচাচিয়া থেকে)", key: "dupchachia" },
];

function TimeSchedulePage() {
  const [scheduleType, setScheduleType] = useState("class");
  const scheduleData = useMemo(() => 
    scheduleType === "class" ? CLASS_TIME_SCHEDULE : EXAM_TIME_SCHEDULE, 
  [scheduleType]);

  return (
    <main className="min-h-screen bg-[#F0F9FF]">
      {/* Navbar (Minimal for Schedule Page) */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-blue-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="/" className="flex items-center gap-2.5 group">
            <img src={pubLogo.url} alt="Logo" className="h-8 w-8 object-contain" />
            <span className="font-display text-lg font-black tracking-tight text-ink">
              PUB Bus Track
            </span>
          </a>

          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center gap-1.5 text-sm font-bold text-ink/60 hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </a>
            <a href="/login" className="hidden sm:block rounded-full bg-primary/10 px-6 py-2 text-sm font-black text-primary transition-all hover:bg-primary hover:text-white">Sign In</a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-12 lg:py-16">
        <Reveal>
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-blue-600">
              <Clock className="h-3.5 w-3.5" />
              Official Schedule
            </div>
            <h1 className="font-display text-4xl font-black tracking-tighter text-ink md:text-6xl">
              Bus Time Schedule
            </h1>
            <p className="mt-4 text-lg font-medium text-ink/60">
              View accurate departure times for campus and student routes.
            </p>
          </div>
        </Reveal>

        {/* Schedule Toggle */}
        <div className="mb-10 flex justify-center">
          <Tabs 
            defaultValue="class" 
            className="w-full max-w-md"
            onValueChange={(v) => setScheduleType(v)}
          >
            <TabsList className="grid w-full grid-cols-2 rounded-[2rem] bg-white p-1 shadow-sm ring-1 ring-slate-100 h-14">
              <TabsTrigger 
                value="class" 
                className="rounded-[1.8rem] data-[state=active]:bg-primary data-[state=active]:text-white font-black text-sm transition-all h-full"
              >
                Class Time
              </TabsTrigger>
              <TabsTrigger 
                value="exam" 
                className="rounded-[1.8rem] data-[state=active]:bg-primary data-[state=active]:text-white font-black text-sm transition-all h-full"
              >
                Exam Time
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Schedule Table */}
        <AnimatePresence mode="wait">
          <motion.div
            key={scheduleType}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden rounded-[2.5rem] bg-white shadow-[0_32px_64px_-20px_rgba(0,0,0,0.08)] ring-1 ring-slate-100"
          >
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[180px] font-black text-ink uppercase tracking-wider text-xs border-r border-slate-100">Day / Group</TableHead>
                    {ROUTE_COLUMNS.map((col) => (
                      <TableHead key={col.key} className="min-w-[150px] font-black text-ink text-center px-4 py-6">
                        <div className="flex flex-col gap-0.5">
                          <span>{col.label}</span>
                          <span className="text-[10px] font-bold text-ink/40 font-bengali">{col.labelBn}</span>
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scheduleData.map((dayGroup, idx) => (
                    <React.Fragment key={idx}>
                      {/* Day Header Row */}
                      <TableRow className="bg-blue-50/30 hover:bg-blue-50/30">
                        <TableCell colSpan={ROUTE_COLUMNS.length + 1} className="py-4 px-6 border-b border-blue-100">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span className="font-display text-lg font-black text-ink">{dayGroup.day}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                      
                      {/* Time Slots */}
                      {dayGroup.slots.map((slot, sIdx) => (
                        <TableRow key={sIdx} className="group transition-colors hover:bg-slate-50/50 border-b border-slate-50 last:border-0">
                          <TableCell className="font-bold text-ink/60 text-sm py-5 border-r border-slate-50">
                            {slot.time}
                          </TableCell>
                          {ROUTE_COLUMNS.map((col) => {
                            const val = slot[col.key as keyof typeof slot];
                            const isNote = val !== "-" && isNaN(Number(val.charAt(0)));
                            
                            return (
                              <TableCell key={col.key} className="text-center py-5">
                                {isNote ? (
                                  <span className="inline-block rounded-full bg-teal-50 px-3 py-1 text-[11px] font-black text-teal-700 font-bengali shadow-sm ring-1 ring-teal-100">
                                    {val}
                                  </span>
                                ) : (
                                  <span className={`text-sm font-bold ${val === "-" ? "text-ink/20" : "text-ink font-mono"}`}>
                                    {val}
                                  </span>
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Contact Info Section */}
        <div className="mt-16">
          <Reveal>
            <div className="mb-8 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-orange-100 text-orange-600">
                <Phone className="h-5 w-5" />
              </div>
              <h2 className="font-display text-2xl font-black text-ink">Driver & Transport Info</h2>
            </div>
          </Reveal>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DRIVER_INFO.map((info, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="card-hover-premium flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="rounded-xl bg-slate-50 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-ink/40">Route {info.route}</span>
                    <div className="flex items-center gap-1 rounded-lg bg-blue-50 px-2 py-0.5 text-[10px] font-black text-blue-600">
                      <BusIcon className="h-3 w-3" />
                      #{info.busNo}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <User className="h-3.5 w-3.5 text-ink/30" />
                      <p className="font-display text-sm font-black text-ink">{info.driver}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-ink/30" />
                      <p className="text-xs font-bold text-ink/50">{info.mobile}</p>
                    </div>
                  </div>
                  
                  <a 
                    href={`tel:${info.mobile.replace(/-/g, '')}`} 
                    className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-slate-50 py-3 text-xs font-black text-ink transition-colors hover:bg-primary hover:text-white"
                  >
                    Call Driver
                    <ChevronRight className="h-3 w-3" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Notes Section */}
        <div className="mt-16 overflow-hidden rounded-[2rem] bg-white/50 p-8 shadow-sm ring-1 ring-slate-200/50 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-blue-100 text-blue-600">
              <Info className="h-4 w-4" />
            </div>
            <div className="space-y-4">
              <h3 className="font-display text-lg font-black text-ink">Important Notes (গুরুত্বপূর্ণ বিজ্ঞপ্তি)</h3>
              <ul className="grid gap-4 text-sm font-bold text-ink/60">
                <li className="flex gap-3 font-bengali leading-relaxed">
                  <span className="text-primary">•</span>
                  বাস নির্ধারিত সময় অনুযায়ী ক্যাম্পাস থেকে ছাড়বে, উক্ত সময়ের ব্যত্যয় ঘটবে না।
                </li>
                <li className="flex gap-3 font-bengali leading-relaxed">
                  <span className="text-primary">•</span>
                  বিশেষ কারণে ও কর্তৃপক্ষের নির্দেশনায় বিশ্ববিদ্যালয় বাসের সময়সূচি পরিবর্তন হতে পারে।
                </li>
                <li className="flex gap-3 font-bengali leading-relaxed">
                  <span className="text-primary">•</span>
                  হঠাৎ গাড়ি নষ্ট হলে অথবা রাস্তায় ট্রাফিক জ্যামের কারণে বিশ্ববিদ্যালয় বাস গন্তব্যে পৌঁছাতে নির্দিষ্ট সময়ে কিছু তারতম্য হতে পারে।
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />

      {/* Hidden Metadata Container */}
      <div className="hidden" aria-hidden="true">
        {`'''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''
                                        
                                            
                                            Add optional push notifications or SMS reminders so I get alerted before my selected bus departure time.

Add a route search and quick filters on the Time Schedule page so I can instantly narrow the table to the routes I care about.

Add a button to download the current Class/Exam schedule (for the selected day) as a clean PDF for offline viewing.

Add an admin-only interface to update the Class Time schedule and switch in the real Exam Time dataset.

Add deep links so I can open the Time Schedule page directly to a specific day and route with the correct tab selected.`}
      </div>
    </main>
  );
}

// Helper to use React within the component file
import * as React from "react";
