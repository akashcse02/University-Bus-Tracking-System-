import { Bus, Mail, Instagram, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useLanguage();
  const [adminClicks, setAdminClicks] = useState(0);

  const handleAdminTrigger = () => {
    setAdminClicks((prev: number) => prev + 1);
    if (adminClicks + 1 >= 5) {
      window.location.href = "/login?admin=true";
    }
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
              <li><a href="/" className="text-sm font-medium text-ink/70 hover:text-primary">{t("nav.home")}</a></li>
              <li><a href="/live-location" className="text-sm font-medium text-ink/70 hover:text-primary">{t("nav.live")}</a></li>
              <li><a href="/buses" className="text-sm font-medium text-ink/70 hover:text-primary">{t("nav.buses")}</a></li>
              <li><a href="/time-schedule" className="text-sm font-medium text-ink/70 hover:text-primary">{t("nav.schedule")}</a></li>
            </ul>
          </div>

          {/* Column 2: About */}
          <div className="space-y-6">
            <h3 className="font-display text-sm font-black uppercase tracking-widest text-ink">{t("footer.about")}</h3>
            <ul className="space-y-3">
              <li><a href="#vision" className="text-sm font-medium text-ink/70 hover:text-primary">{t("footer.vision")}</a></li>
              <li><a href="#" className="text-sm font-medium text-ink/70 hover:text-primary">{t("footer.team")}</a></li>
              <li><a href="#routes" className="text-sm font-medium text-ink/70 hover:text-primary">{t("nav.routes")}</a></li>
              <li><a href="#" className="text-sm font-medium text-ink/70 hover:text-primary">{t("footer.privacy")}</a></li>
              <li><a href="#" className="text-sm font-medium text-ink/70 hover:text-primary">{t("footer.terms")}</a></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="space-y-6">
            <h3 className="font-display text-sm font-black uppercase tracking-widest text-ink">{t("footer.support")}</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm font-medium text-ink/70 hover:text-primary">{t("footer.help")}</a></li>
              <li><a href="#footer" className="text-sm font-medium text-ink/70 hover:text-primary">{t("footer.contactUs")}</a></li>
              <li><a href="#" className="text-sm font-medium text-ink/70 hover:text-primary">{t("footer.report")}</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div className="space-y-6">
            <h3 className="font-display text-sm font-black uppercase tracking-widest text-ink">{t("footer.contact")}</h3>
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
              <Button className="btn-hover-premium w-full rounded-full bg-primary py-6 font-display font-bold shadow-md">
                {t("hero.download")}
              </Button>

            </div>
          </div>
        </div>


        <div className="mt-16 border-t border-border/30 pt-8 text-center">
          <p 
            className="text-xs font-medium text-ink/50 cursor-default select-none"
            onClick={handleAdminTrigger}
          >
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
