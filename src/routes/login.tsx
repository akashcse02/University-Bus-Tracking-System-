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
import { supabase } from "@/integrations/supabase/client";

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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("admin") === "true") {
      setIsAdminMode(true);
    }
  }, []);

  const handleAdminTrigger = () => {
    setAdminClicks(prev => prev + 1);
    if (adminClicks + 1 >= 5) {
      setIsAdminMode(true);
      setAdminClicks(0);
      toast.info("Admin Access Enabled");
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Fetch role to redirect correctly
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", data.user.id)
          .single();

        const userRole = roleData?.role || "student";
        
        toast.success("Login Successful");
        
        if (userRole === "admin") {
          navigate({ to: "/admin" });
        } else {
          navigate({ to: "/live-location" });
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        }
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in with Google");
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

                <form className="space-y-6" onSubmit={handleLogin}>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-bold text-ink">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute top-3.5 left-4 h-5 w-5 text-ink/30" />
                      <Input id="email" name="email" type="email" placeholder="name@pub.ac.bd" className="h-12 rounded-2xl border-slate-200 pl-12 focus:ring-primary" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-sm font-bold text-ink">Password</Label>
                      <a href="#" className="text-xs font-bold text-primary hover:underline">Forgot Password?</a>
                    </div>
                    <div className="relative">
                      <Lock className="absolute top-3.5 left-4 h-5 w-5 text-ink/30" />
                      <Input id="password" name="password" type="password" placeholder="••••••••" className="h-12 rounded-2xl border-slate-200 pl-12 focus:ring-primary" required />
                    </div>
                  </div>

                  <Button 
                    disabled={isLoading}
                    className="btn-hover-premium w-full rounded-2xl bg-primary py-7 font-display text-lg font-bold text-primary-foreground shadow-xl"
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </form>

                <div className="mt-6 flex items-center gap-4">
                  <div className="h-px flex-1 bg-slate-100"></div>
                  <span className="text-xs font-bold text-ink/20 uppercase tracking-widest">Or continue with</span>
                  <div className="h-px flex-1 bg-slate-100"></div>
                </div>

                <Button 
                  onClick={handleGoogleSignIn}
                  variant="outline" 
                  className="mt-6 w-full h-14 rounded-2xl border-slate-200 font-bold flex items-center justify-center gap-3 hover:bg-slate-50 transition-all"
                >
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                  Google Account
                </Button>

                <div className="mt-8 text-center">
                  <p className="text-sm font-medium text-ink/60">
                    Don't have an account?{" "}
                    <Link to="/signup" className="font-bold text-primary hover:underline">Sign Up</Link>
                  </p>
                </div>
              </Tabs>
            ) : (
              <form className="space-y-6" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <Label htmlFor="admin-email" className="text-sm font-bold text-ink">Admin Email</Label>
                  <div className="relative">
                    <Mail className="absolute top-3.5 left-4 h-5 w-5 text-ink/30" />
                    <Input id="admin-email" name="email" type="email" placeholder="admin@pub.ac.bd" className="h-12 rounded-2xl border-slate-200 pl-12 focus:ring-primary" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-password" className="text-sm font-bold text-ink">Password</Label>
                  <div className="relative">
                    <Lock className="absolute top-3.5 left-4 h-5 w-5 text-ink/30" />
                    <Input id="admin-password" name="password" type="password" placeholder="••••••••" className="h-12 rounded-2xl border-slate-200 pl-12 focus:ring-primary" required />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="btn-hover-premium w-full rounded-2xl bg-slate-900 py-7 font-display text-lg font-bold text-white shadow-xl"
                >
                  {isLoading ? "Verifying..." : "Admin Login"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Reveal>
    </AuthLayout>
  );
}

