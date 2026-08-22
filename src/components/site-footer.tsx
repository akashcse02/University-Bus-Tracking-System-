import { useState } from "react";
import { Bus, Mail, Phone, MapPin, Send, CheckCircle2, Instagram, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function SiteFooter() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <footer id="footer" className="relative z-10 border-t border-border/70 bg-card/70 px-5 pt-20 pb-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 pb-16 lg:grid-cols-4">
          {/* Column 1: PUB Bus Track */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                <Bus className="h-5 w-5" />
              </span>
              <span className="font-display text-xl font-extrabold text-ink">PUB Bus Track</span>
            </div>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm font-medium text-ink/70 hover:text-primary">Home</a></li>
              <li><a href="#live-location" className="text-sm font-medium text-ink/70 hover:text-primary">Live Location</a></li>
              <li><a href="#buses" className="text-sm font-medium text-ink/70 hover:text-primary">Buses</a></li>
              <li><a href="#schedule" className="text-sm font-medium text-ink/70 hover:text-primary">Time Schedule</a></li>
            </ul>
          </div>

          {/* Column 2: About */}
          <div className="space-y-6">
            <h3 className="font-display text-sm font-black uppercase tracking-widest text-ink">About</h3>
            <ul className="space-y-3">
              <li><a href="#vision" className="text-sm font-medium text-ink/70 hover:text-primary">Our Vision</a></li>
              <li><a href="#" className="text-sm font-medium text-ink/70 hover:text-primary">Team</a></li>
              <li><a href="#routes" className="text-sm font-medium text-ink/70 hover:text-primary">Routes</a></li>
              <li><a href="#" className="text-sm font-medium text-ink/70 hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="text-sm font-medium text-ink/70 hover:text-primary">Terms of Use</a></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="space-y-6">
            <h3 className="font-display text-sm font-black uppercase tracking-widest text-ink">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm font-medium text-ink/70 hover:text-primary">Help Center</a></li>
              <li><a href="#footer" className="text-sm font-medium text-ink/70 hover:text-primary">Contact Us</a></li>
              <li><a href="#" className="text-sm font-medium text-ink/70 hover:text-primary">Report an Issue</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div className="space-y-6">
            <h3 className="font-display text-sm font-black uppercase tracking-widest text-ink">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-ink/70">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@pub.ac.bd</span>
              </div>
              <div className="flex gap-4">
                <a href="#" className="rounded-full bg-white p-2 shadow-sm transition-transform hover:scale-110"><Instagram className="h-4 w-4 text-pink-600" /></a>
                <a href="#" className="rounded-full bg-white p-2 shadow-sm transition-transform hover:scale-110"><Twitter className="h-4 w-4 text-blue-400" /></a>
                <a href="#" className="rounded-full bg-white p-2 shadow-sm transition-transform hover:scale-110"><Facebook className="h-4 w-4 text-blue-700" /></a>
              </div>
              <Button className="w-full rounded-full bg-primary py-6 font-display font-bold shadow-md transition-all hover:scale-105">
                Download the App
              </Button>
            </div>
          </div>
        </div>

        {/* Nested Contact Form */}
        <div className="mt-8 border-t border-border/50 pt-12">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 text-center">
              <h3 className="font-display text-2xl font-extrabold text-ink">Have a Question?</h3>
              <p className="mt-2 text-ink/70">Drop us a message and we'll get back to you shortly.</p>
            </div>
            
            {submitted ? (
              <div className="flex items-center gap-3 rounded-2xl bg-primary/10 p-8 text-primary animate-rise">
                <CheckCircle2 className="h-8 w-8" />
                <div>
                  <p className="text-lg font-bold">Message Sent Successfully!</p>
                  <p className="text-sm opacity-90">Thank you for reaching out. Our team will contact you soon.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input placeholder="Name" required className="h-12 rounded-2xl bg-white/50 border-none shadow-sm focus:ring-2 focus:ring-primary" />
                  <Input type="email" placeholder="Email" required className="h-12 rounded-2xl bg-white/50 border-none shadow-sm focus:ring-2 focus:ring-primary" />
                </div>
                <Textarea placeholder="Your message..." required className="min-h-[120px] rounded-2xl bg-white/50 border-none shadow-sm focus:ring-2 focus:ring-primary" />
                <Button type="submit" className="w-full rounded-2xl bg-primary py-7 font-display text-lg font-bold shadow-xl transition-all hover:translate-y-[-2px]">
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-16 border-t border-border/30 pt-8 text-center">
          <p className="text-xs font-medium text-ink/50">
            © {new Date().getFullYear()} PUB Bus Track · Pundra University of Science &amp; Technology. 
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> · </span>
            Bogura, Bangladesh.
          </p>
        </div>
      </div>
    </footer>
  );
}
