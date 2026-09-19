import { useCallback, useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDays, ClipboardCheck, Megaphone, Plus, Trash2, Clock, MapPin } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { useLanguage } from "@/lib/i18n";

type ClassRow = Database["public"]["Tables"]["class_schedules"]["Row"];
type AttendanceRow = Database["public"]["Tables"]["attendance_records"]["Row"];
type AnnouncementRow = Database["public"]["Tables"]["announcements"]["Row"];

const STATUSES = ["present", "late", "absent"] as const;
type Status = (typeof STATUSES)[number];

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function TeacherDashboard({ teacherId }: { teacherId: string }) {
  const { t } = useLanguage();
  const dayNames = [0, 1, 2, 3, 4, 5, 6].map((d) => t(`day.${d}`));

  const [classes, setClasses] = useState<ClassRow[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRow[]>([]);
  const [announcements, setAnnouncements] = useState<AnnouncementRow[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [studentName, setStudentName] = useState("");
  const [status, setStatus] = useState<Status>("present");
  const [busy, setBusy] = useState(false);

  const loadClasses = useCallback(async () => {
    const { data } = await supabase
      .from("class_schedules")
      .select("*")
      .eq("teacher_id", teacherId)
      .order("day_of_week")
      .order("start_time");
    setClasses(data ?? []);
    if (data && data[0]) setSelectedClass((prev) => prev || data[0]!.id);
  }, [teacherId]);

  const loadAttendance = useCallback(async () => {
    const { data } = await supabase
      .from("attendance_records")
      .select("*")
      .eq("teacher_id", teacherId)
      .eq("session_date", todayISO())
      .order("created_at", { ascending: false });
    setAttendance(data ?? []);
  }, [teacherId]);

  const loadAnnouncements = useCallback(async () => {
    const { data } = await supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);
    setAnnouncements(data ?? []);
  }, []);

  useEffect(() => {
    void loadClasses();
    void loadAttendance();
    void loadAnnouncements();
  }, [loadClasses, loadAttendance, loadAnnouncements]);

  const addClass = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setBusy(true);
    try {
      const { error } = await supabase.from("class_schedules").insert({
        teacher_id: teacherId,
        course_name: String(form.get("course") || ""),
        section: String(form.get("section") || "") || null,
        room: String(form.get("room") || "") || null,
        day_of_week: Number(form.get("day") || 0),
        start_time: String(form.get("start") || "09:00"),
        end_time: String(form.get("end") || "10:00"),
      });
      if (error) throw error;
      e.currentTarget.reset();
      toast.success(t("teacher.classSaved"));
      await loadClasses();
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const deleteClass = async (id: string) => {
    await supabase.from("class_schedules").delete().eq("id", id);
    await loadClasses();
    await loadAttendance();
  };

  const markAttendance = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClass || !studentName.trim()) return;
    setBusy(true);
    try {
      const { error } = await supabase.from("attendance_records").insert({
        class_id: selectedClass,
        teacher_id: teacherId,
        student_name: studentName.trim(),
        status,
        session_date: todayISO(),
      });
      if (error) throw error;
      setStudentName("");
      toast.success(t("teacher.saved"));
      await loadAttendance();
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const postAnnouncement = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setBusy(true);
    try {
      const { error } = await supabase.from("announcements").insert({
        author_id: teacherId,
        title: String(form.get("title") || ""),
        content: String(form.get("content") || ""),
      });
      if (error) throw error;
      e.currentTarget.reset();
      toast.success(t("teacher.posted"));
      await loadAnnouncements();
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const summary = useMemo(() => {
    const counts: Record<Status, number> = { present: 0, late: 0, absent: 0 };
    for (const rec of attendance) {
      const key = rec.status as Status;
      if (key in counts) counts[key] += 1;
    }
    return counts;
  }, [attendance]);

  const className = (id: string) => classes.find((c) => c.id === id)?.course_name ?? "—";

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Class schedules */}
        <Card className="rounded-[2rem]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CalendarDays className="h-5 w-5 text-primary" />
              {t("teacher.classes")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-3">
              {classes.length === 0 ? (
                <p className="italic text-ink/50">{t("teacher.noClasses")}</p>
              ) : (
                classes.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
                  >
                    <div>
                      <p className="font-bold text-ink">
                        {c.course_name}
                        {c.section ? ` · ${c.section}` : ""}
                      </p>
                      <p className="flex flex-wrap items-center gap-3 text-xs font-semibold text-ink/60">
                        <span>{dayNames[c.day_of_week] ?? ""}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {c.start_time.slice(0, 5)}–{c.end_time.slice(0, 5)}
                        </span>
                        {c.room && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {c.room}
                          </span>
                        )}
                      </p>
                      <span
                        className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest ${
                          (c as { approved?: boolean }).approved
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {(c as { approved?: boolean }).approved
                          ? t("teacher.approved")
                          : t("teacher.pending")}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteClass(c.id)}
                      className="text-red-500 hover:bg-red-50"
                      aria-label={t("teacher.deleteClass")}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={addClass} className="space-y-3 border-t border-slate-100 pt-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <Label htmlFor="course">{t("teacher.course")}</Label>
                  <Input id="course" name="course" required className="rounded-xl" />
                </div>
                <div>
                  <Label htmlFor="section">{t("teacher.section")}</Label>
                  <Input id="section" name="section" className="rounded-xl" />
                </div>
                <div>
                  <Label htmlFor="day">{t("teacher.day")}</Label>
                  <select
                    id="day"
                    name="day"
                    defaultValue="0"
                    className="h-10 w-full rounded-xl border border-border bg-card px-3 text-sm"
                  >
                    {dayNames.map((d, i) => (
                      <option key={i} value={i}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="room">{t("teacher.room")}</Label>
                  <Input id="room" name="room" className="rounded-xl" />
                </div>
                <div>
                  <Label htmlFor="start">{t("teacher.start")}</Label>
                  <Input
                    id="start"
                    name="start"
                    type="time"
                    defaultValue="09:00"
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="end">{t("teacher.end")}</Label>
                  <Input
                    id="end"
                    name="end"
                    type="time"
                    defaultValue="10:00"
                    required
                    className="rounded-xl"
                  />
                </div>
              </div>
              <Button
                type="submit"
                disabled={busy}
                className="btn-hover-premium rounded-full bg-primary font-display font-bold"
              >
                <Plus className="mr-1 h-4 w-4" />
                {t("teacher.addClass")}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Attendance */}
        <Card className="rounded-[2rem]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ClipboardCheck className="h-5 w-5 text-primary" />
              {t("teacher.attendance")} · {t("teacher.today")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-3 gap-3">
              {STATUSES.map((s) => (
                <div key={s} className="rounded-2xl bg-slate-50 p-4 text-center">
                  <p className="font-display text-2xl font-black text-primary">{summary[s]}</p>
                  <p className="text-xs font-bold uppercase tracking-wider text-ink/50">
                    {t(`teacher.${s}`)}
                  </p>
                </div>
              ))}
            </div>

            <form onSubmit={markAttendance} className="space-y-3">
              <div>
                <Label>{t("teacher.selectClass")}</Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder={t("teacher.selectClass")} />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.course_name}
                        {c.section ? ` · ${c.section}` : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <Label htmlFor="student">{t("teacher.studentName")}</Label>
                  <Input
                    id="student"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label>{t("teacher.status")}</Label>
                  <Select value={status} onValueChange={(v) => setStatus(v as Status)}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {t(`teacher.${s}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                type="submit"
                disabled={busy || !selectedClass}
                className="btn-hover-premium rounded-full bg-primary font-display font-bold"
              >
                {t("teacher.mark")}
              </Button>
            </form>

            <div className="space-y-2 border-t border-slate-100 pt-4">
              {attendance.length === 0 ? (
                <p className="italic text-ink/50">{t("teacher.noAttendance")}</p>
              ) : (
                attendance.slice(0, 8).map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-2 text-sm"
                  >
                    <span className="font-bold text-ink">{a.student_name}</span>
                    <span className="text-xs text-ink/50">{className(a.class_id)}</span>
                    <span
                      className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                        a.status === "present"
                          ? "bg-primary/10 text-primary"
                          : a.status === "late"
                            ? "bg-accent/15 text-accent"
                            : "bg-red-50 text-red-500"
                      }`}
                    >
                      {t(`teacher.${a.status}`)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Announcements */}
      <Card className="rounded-[2rem]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Megaphone className="h-5 w-5 text-primary" />
            {t("teacher.notice")}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 lg:grid-cols-2">
          <form onSubmit={postAnnouncement} className="space-y-3">
            <div>
              <Label htmlFor="title">{t("teacher.title")}</Label>
              <Input id="title" name="title" required className="rounded-xl" />
            </div>
            <div>
              <Label htmlFor="content">{t("teacher.message")}</Label>
              <Textarea id="content" name="content" required rows={4} className="rounded-2xl" />
            </div>
            <Button
              type="submit"
              disabled={busy}
              className="btn-hover-premium rounded-full bg-primary font-display font-bold"
            >
              {t("teacher.post")}
            </Button>
          </form>

          <div className="space-y-3">
            {announcements.length === 0 ? (
              <p className="italic text-ink/50">{t("dash.noAnnouncements")}</p>
            ) : (
              announcements.map((a) => (
                <div key={a.id} className="rounded-2xl bg-slate-50 p-4">
                  <p className="font-bold text-ink">{a.title}</p>
                  <p className="text-sm text-ink/70">{a.content}</p>
                  <p className="mt-1 text-xs text-ink/40">
                    {new Date(a.created_at).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
