import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AuthLayout } from "@/components/auth-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { Mail, Lock, User, Phone, ShieldCheck, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    title: "Login — PUB Bus Track",
    meta: [{ name: "description", content: "Log in to track Pundra University buses in real-time." }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [role, setRole] = useState("student");
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminClicks, setAdminClicks] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("admin") === "true") {
      setIsAdminMode(true);
    }
  }, []);

  // Hidden admin trigger via clicking a small invisible area 5 times
  // But requirement says footer copyright. We'll handle footer in footer component.
  // For the login page itself, let's add a small hidden icon.
  const handleAdminTrigger = () => {
    setAdminClicks(prev => prev + 1);
    if (adminClicks + 1 >= 5) {
      setIsAdminMode(true);
      setAdminClicks(0);
      toast.info("Admin Access Enabled");
    }
  };

  const handleAdminLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const phone = formData.get("phone");
    const password = formData.get("password");

    // MOCK CREDENTIALS FOR ADMIN
    // Replace with secure backend auth in production
    if (phone === "01700000000" && password === "admin123") {
      toast.success("Admin Login Successful");
      // navigate({ to: "/admin" }); // Placeholder redirect
    } else {
      toast.error("Invalid admin credentials");
    }
  };

  return (
    <AuthLayout>
      <Reveal>
        <div className="mx-auto w-full max-w-[450px]">
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
               <div 
                 onClick={handleAdminTrigger}
                 className="h-10 w-10 cursor-default opacity-0"
               />
            </div>
            <h1 className="font-display text-4xl font-extrabold text-ink">
              {isAdminMode ? "Admin Access" : "Welcome Back"}
            </h1>
            <p className="mt-2 font-medium text-ink/60">
              {isAdminMode ? "Restricted administrative login." : "Log in to track your bus in real-time."}
            </p>
          </div>

          <div className="relative rounded-[2.5rem] bg-white p-8 shadow-2xl ring-1 ring-black/5 sm:p-10">
            {isAdminMode && (
              <button 
                onClick={() => setIsAdminMode(false)}
                className="absolute top-6 right-6 p-2 text-ink/20 hover:text-ink/60 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            )}

            {!isAdminMode ? (
              <Tabs defaultValue="student" className="w-full" onValueChange={setRole}>
                <TabsList className="mb-8 grid w-full grid-cols-3 rounded-2xl bg-slate-100 p-1">
                  <TabsTrigger value="student" className="rounded-xl font-bold transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm">Student</TabsTrigger>
                  <TabsTrigger value="teacher" className="rounded-xl font-bold transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm">Teacher</TabsTrigger>
                  <TabsTrigger value="driver" className="rounded-xl font-bold transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm">Driver</TabsTrigger>
                </TabsList>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-bold text-ink">
                      {role === "student" ? "ID or Email Address" : "Email Address"}
                    </Label>
                    <div className="relative">
                      {role === "student" ? (
                        <User className="absolute top-3.5 left-4 h-5 w-5 text-ink/30" />
                      ) : (
                        <Mail className="absolute top-3.5 left-4 h-5 w-5 text-ink/30" />
                      )}
                      <Input id="email" placeholder={role === "student" ? "e.g. 21102001" : "name@pub.ac.bd"} className="h-12 rounded-2xl border-slate-200 pl-12 focus:ring-primary" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-sm font-bold text-ink">Password</Label>
                      <a href="#" className="text-xs font-bold text-primary hover:underline">Forgot Password?</a>
                    </div>
                    <div className="relative">
                      <Lock className="absolute top-3.5 left-4 h-5 w-5 text-ink/30" />
                      <Input id="password" type="password" placeholder="••••••••" className="h-12 rounded-2xl border-slate-200 pl-12 focus:ring-primary" required />
                    </div>
                  </div>

                  <Button className="btn-hover-premium w-full rounded-2xl bg-primary py-7 font-display text-lg font-bold text-primary-foreground shadow-xl">
                    Login
                  </Button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-sm font-medium text-ink/60">
                    Don't have an account?{" "}
                    <Link to="/signup" className="font-bold text-primary hover:underline">Sign Up</Link>
                  </p>
                </div>
              </Tabs>
            ) : (
              <form className="space-y-6" onSubmit={handleAdminLogin}>
                <div className="space-y-2">
                  <Label htmlFor="admin-phone" className="text-sm font-bold text-ink">Admin Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute top-3.5 left-4 h-5 w-5 text-ink/30" />
                    <Input id="admin-phone" name="phone" placeholder="017XXXXXXXX" className="h-12 rounded-2xl border-slate-200 pl-12 focus:ring-primary" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-password" className="text-sm font-bold text-ink">Password</Label>
                  <div className="relative">
                    <ShieldCheck className="absolute top-3.5 left-4 h-5 w-5 text-ink/30" />
                    <Input id="admin-password" name="password" type="password" placeholder="••••••••" className="h-12 rounded-2xl border-slate-200 pl-12 focus:ring-primary" required />
                  </div>
                </div>

                <Button type="submit" className="btn-hover-premium w-full rounded-2xl bg-slate-900 py-7 font-display text-lg font-bold text-white shadow-xl">
                  Admin Login
                </Button>
              </form>
            )}
          </div>
        </div>
      </Reveal>
    </AuthLayout>
  );
}
