import { Bus, Mail, Phone, MapPin } from "lucide-react";

const quickLinks = ["Home", "Live Location", "Buses", "Time Schedule", "Routes"];

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-border/70 bg-card/70">
      <div className="mx-auto grid max-w-6xl gap-9 px-5 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
              <Bus className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-extrabold text-ink">PUB Bus Track</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            The official bus tracking system of Pundra University of Science &amp; Technology,
            Bogura.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-extrabold uppercase tracking-widest text-ink">
            Quick links
          </h3>
          <ul className="mt-4 space-y-2">
            {quickLinks.map((l) => (
              <li key={l}>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-extrabold uppercase tracking-widest text-ink">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Gokul, Rangpur Road, Bogura 5800
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-primary" />
              +880 1700-000000
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-primary" />
              transport@pub.ac.bd
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/70 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} PUB Bus Track · Pundra University of Science &amp; Technology
      </div>
    </footer>
  );
}
