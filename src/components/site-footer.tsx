import { useState } from "react";
import { Bus, Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const quickLinks = ["Home", "Live Location", "Buses", "Time Schedule", "Routes"];

export function SiteFooter() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <footer id="footer" className="relative z-10 border-t border-border/70 bg-card/70">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
              <Bus className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-extrabold text-ink">PUB Bus Track</span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The official bus tracking system of Pundra University of Science &amp; Technology,
            Bogura. Track every ride, stay on time.
          </p>
          <div className="flex flex-col gap-3 pt-2">
             <div className="flex items-start gap-3 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>Gokul, Rangpur Road, Bogura 5800</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Phone className="h-4 w-4 shrink-0 text-primary" />
              <span>+880 1700-000000</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 shrink-0 text-primary" />
              <span>transport@pub.ac.bd</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-extrabold uppercase tracking-widest text-ink">
            Quick links
          </h3>
          <ul className="mt-6 space-y-3">
            {quickLinks.map((l) => (
              <li key={l}>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="font-display text-sm font-extrabold uppercase tracking-widest text-ink">
            Contact Us
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Have questions about live tracking or pickup notifications? Drop us a message.
          </p>
          
          {submitted ? (
            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-secondary/50 p-6 text-primary animate-rise">
              <CheckCircle2 className="h-6 w-6" />
              <div>
                <p className="font-bold">Message Sent!</p>
                <p className="text-xs opacity-90">We'll get back to you shortly.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Input placeholder="Name" required className="h-11 rounded-xl bg-background/50" />
                <Input type="email" placeholder="Email" required className="h-11 rounded-xl bg-background/50" />
              </div>
              <Textarea placeholder="Your message..." required className="min-h-[100px] rounded-xl bg-background/50" />
              <Button type="submit" className="w-full rounded-xl bg-primary py-6 font-display font-bold shadow-md transition-all hover:translate-y-[-2px] hover:shadow-lg">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          )}
        </div>
      </div>

      <div className="border-t border-border/70 py-8 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} PUB Bus Track · Pundra University of Science &amp; Technology. All rights reserved.
        </p>
      </div>
    </footer>
  );
}