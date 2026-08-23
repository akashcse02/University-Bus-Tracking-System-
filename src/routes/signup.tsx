import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AuthLayout } from "@/components/auth-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { User, Mail, Lock, Phone, MapPin, Bus, GraduationCap, Briefcase } from "lucide-react";

export const Route = createFileRoute("/signup")({
  head: () => ({
    title: "Sign Up — PUB Bus Track",
    meta: [{ name: "description", content: "Create your account to track Pundra University buses in real-time." }],
  }),
  component: SignUpPage,
});

function SignUpPage() {
  const [role, setRole] = useState("student");

  return (
    <AuthLayout>
      <Reveal>
        <div className="mx-auto w-full max-w-[500px]">
          <div className="mb-8 text-center">
            <h1 className="font-display text-4xl font-extrabold text-ink">Create Your Account</h1>
            <p className="mt-2 font-medium text-ink/60">Join PUB Bus Track and never miss your bus.</p>
          </div>

          <div className="rounded-[2.5rem] bg-white p-8 shadow-2xl ring-1 ring-black/5 sm:p-10">
            <Tabs defaultValue="student" className="w-full" onValueChange={setRole}>
              <TabsList className="mb-8 grid w-full grid-cols-3 rounded-2xl bg-slate-100 p-1">
                <TabsTrigger value="student" className="rounded-xl font-bold transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm">Student</TabsTrigger>
                <TabsTrigger value="teacher" className="rounded-xl font-bold transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm">Teacher</TabsTrigger>
                <TabsTrigger value="driver" className="rounded-xl font-bold transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm">Driver</TabsTrigger>
              </TabsList>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                {role === "student" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="student-id" className="text-sm font-bold text-ink">Student ID</Label>
                      <div className="relative">
                        <GraduationCap className="absolute top-3.5 left-4 h-5 w-5 text-ink/30" />
                        <Input id="student-id" placeholder="e.g. 21102001" className="h-12 rounded-2xl border-slate-200 pl-12 focus:ring-primary" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="batch" className="text-sm font-bold text-ink">Batch</Label>
                      <div className="relative">
                        <GraduationCap className="absolute top-3.5 left-4 h-5 w-5 text-ink/30" />
                        <Input id="batch" placeholder="e.g. 21st" className="h-12 rounded-2xl border-slate-200 pl-12 focus:ring-primary" required />
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-bold text-ink">Full Name</Label>
                  <div className="relative">
                    <User className="absolute top-3.5 left-4 h-5 w-5 text-ink/30" />
                    <Input id="name" placeholder="Md. Akash Islam" className="h-12 rounded-2xl border-slate-200 pl-12 focus:ring-primary" required />
                  </div>
                </div>

                {(role === "student" || role === "teacher") && (
                  <div className="space-y-2">
                    <Label htmlFor="dept" className="text-sm font-bold text-ink">Department</Label>
                    <div className="relative">
                      <Briefcase className="absolute top-3.5 left-4 h-5 w-5 text-ink/30" />
                      <Input id="dept" placeholder="CSE" className="h-12 rounded-2xl border-slate-200 pl-12 focus:ring-primary" required />
                    </div>
                  </div>
                )}

                {role === "teacher" && (
                  <div className="space-y-2">
                    <Label htmlFor="profession" className="text-sm font-bold text-ink">Profession / Designation</Label>
                    <div className="relative">
                      <Briefcase className="absolute top-3.5 left-4 h-5 w-5 text-ink/30" />
                      <Input id="profession" placeholder="Lecturer" className="h-12 rounded-2xl border-slate-200 pl-12 focus:ring-primary" required />
                    </div>
                  </div>
                )}

                {role === "driver" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="route" className="text-sm font-bold text-ink">Route</Label>
                      <div className="relative">
                        <MapPin className="absolute top-3.5 left-4 h-5 w-5 text-ink/30" />
                        <Input id="route" placeholder="Gobindaganj" className="h-12 rounded-2xl border-slate-200 pl-12 focus:ring-primary" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bus-no" className="text-sm font-bold text-ink">Bus Number</Label>
                      <div className="relative">
                        <Bus className="absolute top-3.5 left-4 h-5 w-5 text-ink/30" />
                        <Input id="bus-no" placeholder="PUB-05" className="h-12 rounded-2xl border-slate-200 pl-12 focus:ring-primary" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-bold text-ink">Phone Number (Optional)</Label>
                      <div className="relative">
                        <Phone className="absolute top-3.5 left-4 h-5 w-5 text-ink/30" />
                        <Input id="phone" placeholder="017XXXXXXXX" className="h-12 rounded-2xl border-slate-200 pl-12 focus:ring-primary" />
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-bold text-ink">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute top-3.5 left-4 h-5 w-5 text-ink/30" />
                    <Input id="email" type="email" placeholder="name@pub.ac.bd" className="h-12 rounded-2xl border-slate-200 pl-12 focus:ring-primary" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-bold text-ink">Password</Label>
                  <div className="relative">
                    <Lock className="absolute top-3.5 left-4 h-5 w-5 text-ink/30" />
                    <Input id="password" type="password" placeholder="••••••••" className="h-12 rounded-2xl border-slate-200 pl-12 focus:ring-primary" required />
                  </div>
                </div>

                <Button className="btn-hover-premium w-full rounded-2xl bg-primary py-7 font-display text-lg font-bold text-primary-foreground shadow-xl">
                  Sign Up
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm font-medium text-ink/60">
                  Already have an account?{" "}
                  <Link to="/login" className="font-bold text-primary hover:underline">Login</Link>
                </p>
              </div>
            </Tabs>
          </div>
        </div>
      </Reveal>
    </AuthLayout>
  );
}
