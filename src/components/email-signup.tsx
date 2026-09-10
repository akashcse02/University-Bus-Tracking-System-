import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function EmailSignup() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="mx-auto max-w-xl px-5 py-16 text-center">
      <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
        {t("news.title")}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">{t("news.subtitle")}</p>

      {submitted ? (
        <div className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-secondary px-6 py-4 text-primary">
          <CheckCircle2 className="h-5 w-5" />
          <span className="font-bold">{t("news.thanks")}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Input
            type="email"
            placeholder={t("news.placeholder")}
            required
            className="h-12 flex-1 rounded-full border-border bg-card px-5 text-sm"
          />
          <Button
            type="submit"
            className="btn-hover-premium h-12 rounded-full bg-primary px-8 font-display font-bold"
          >
            {t("news.cta")}
          </Button>
        </form>
      )}
    </section>
  );
}
