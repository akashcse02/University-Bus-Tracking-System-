import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthLayout } from "@/components/auth-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { User, Mail, Lock, Phone, MapPin, Bus, GraduationCap, Briefcase } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];

export const Route = createFileRoute("/signup")({
  head: () => ({
    title: "Sign Up — PUB Bus Track",
    meta: [{ name: "description", content: "Create your account to track Pundra University buses in real-time." }],
  }),
  component: SignUpPage,
});

function SignUpPage() {
  const [role, setRole] = useState<AppRole>("student");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullName = formData.get("name") as string;
    const idNumber = formData.get("id-number") as string;
    const department = formData.get("dept") as string;
    const phoneNumber = formData.get("phone") as string;

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create profile
        const { error: profileError } = await supabase
          .from("profiles")
          .insert({
            id: authData.user.id,
            full_name: fullName,
            id_number: idNumber,
            department: department,
            phone_number: phoneNumber,
          });

        if (profileError) throw profileError;

        // Create user role
        const { error: roleError } = await supabase
          .from("user_roles")
          .insert({
            user_id: authData.user.id,
            role: role,
          });

        if (roleError) throw roleError;

        toast.success("Account created! Please check your email for verification.");
        navigate({ to: "/login" });
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to sign up");
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
        <div className="mx-auto w-full max-w-[500px]">
          <div className="mb-8 text-center">
            <h1 className="font-display text-4xl font-extrabold text-ink">Create Your Account</h1>
            <p className="mt-2 font-medium text-ink/60">Join PUB Bus Track and never miss your bus.</p>
          </div>

          <div className="rounded-[2.5rem] bg-white p-8 shadow-2xl ring-1 ring-black/5 sm:p-10">
            <Tabs defaultValue="student" className="w-full" onValueChange={(v) => setRole(v as AppRole)}>
              <TabsList className="mb-8 grid w-full grid-cols-3 rounded-2xl bg-slate-100 p-1">
                <TabsTrigger value="student" className="rounded-xl font-bold transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm">Student</TabsTrigger>
                <TabsTrigger value="teacher" className="rounded-xl font-bold transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm">Teacher</TabsTrigger>
                <TabsTrigger value="driver" className="rounded-xl font-bold transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm">Driver</TabsTrigger>
              </TabsList>

              <form className="space-y-5" onSubmit={handleSignUp}>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-bold text-ink">Full Name</Label>
                  <div className="relative">
                    <User className="absolute top-3.5 left-4 h-5 w-5 text-ink/30" />
                    <Input id="name" name="name" placeholder="Md. Akash Islam" className="h-12 rounded-2xl border-slate-200 pl-12 focus:ring-primary" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="id-number" className="text-sm font-bold text-ink">
                    {role === "student" ? "Student ID" : role === "teacher" ? "Employee ID" : "ID Number"}
                  </Label>
                  <div className="relative">
                    <GraduationCap className="absolute top-3.5 left-4 h-5 w-5 text-ink/30" />
                    <Input id="id-number" name="id-number" placeholder="e.g. 21102001" className="h-12 rounded-2xl border-slate-200 pl-12 focus:ring-primary" required />
                  </div>
                </div>

                {(role === "student" || role === "teacher") && (
                  <div className="space-y-2">
                    <Label htmlFor="dept" className="text-sm font-bold text-ink">Department</Label>
                    <div className="relative">
                      <Briefcase className="absolute top-3.5 left-4 h-5 w-5 text-ink/30" />
                      <Input id="dept" name="dept" placeholder="CSE" className="h-12 rounded-2xl border-slate-200 pl-12 focus:ring-primary" required />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-bold text-ink">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute top-3.5 left-4 h-5 w-5 text-ink/30" />
                    <Input id="phone" name="phone" placeholder="017XXXXXXXX" className="h-12 rounded-2xl border-slate-200 pl-12 focus:ring-primary" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-bold text-ink">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute top-3.5 left-4 h-5 w-5 text-ink/30" />
                    <Input id="email" name="email" type="email" placeholder="name@pub.ac.bd" className="h-12 rounded-2xl border-slate-200 pl-12 focus:ring-primary" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-bold text-ink">Password</Label>
                  <div className="relative">
                    <Lock className="absolute top-3.5 left-4 h-5 w-5 text-ink/30" />
                    <Input id="password" name="password" type="password" placeholder="••••••••" className="h-12 rounded-2xl border-slate-200 pl-12 focus:ring-primary" required />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="btn-hover-premium w-full rounded-2xl bg-primary py-7 font-display text-lg font-bold text-primary-foreground shadow-xl"
                >
                  {isLoading ? "Creating Account..." : "Sign Up"}
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

