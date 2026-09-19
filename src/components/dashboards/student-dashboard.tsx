import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { Map, CalendarDays, Bus as BusIcon } from "lucide-react";
import { GoogleLiveMap } from "@/components/maps/google-live-map";
import { ReviewForm } from "@/components/reviews/review-form";
import { useLanguage } from "@/lib/i18n";
import { Database } from "@/integrations/supabase/types";

type Bus = Database["public"]["Tables"]["buses"]["Row"];

export function StudentDashboard({
  userId,
  displayName,
  bus,
  routeName,
}: {
  userId: string;
  displayName: string;
  bus?: Bus;
  routeName?: string;
}) {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <Card className="h-[500px] overflow-hidden rounded-[2rem] shadow-sm">
          <CardHeader className="absolute z-10 p-6">
            <CardTitle className="font-display text-2xl font-bold">{t("dash.liveBus")}</CardTitle>
          </CardHeader>
          <div className="h-full w-full">
            <GoogleLiveMap
              buses={
                bus
                  ? [
                      {
                        id: bus.id,
                        busNumber: bus.bus_number,
                        location: { lat: 24.9223067, lng: 89.3490259 },
                      },
                    ]
                  : []
              }
            />
          </div>
        </Card>

        <ReviewForm userId={userId} displayName={displayName} roleLabel="Student" />
      </div>

      <div className="space-y-6">
        <Card className="rounded-[2rem]">
          <CardHeader>
            <CardTitle className="text-lg">{t("dash.yourBus")}</CardTitle>
          </CardHeader>
          <CardContent>
            {bus ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold">{bus.bus_number}</p>
                  {routeName && (
                    <p className="text-sm text-slate-500">
                      {t("dash.route")}: {routeName}
                    </p>
                  )}
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                  {bus.bus_number.split(" ").pop()}
                </div>
              </div>
            ) : (
              <p className="italic text-slate-500">{t("dash.noBus")}</p>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-[2rem]">
          <CardHeader>
            <CardTitle className="text-lg">{t("dash.quickLinks")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <QuickLink to="/live-location" icon={Map} label={t("dash.viewMap")} />
            <QuickLink to="/time-schedule" icon={CalendarDays} label={t("dash.viewSchedule")} />
            <QuickLink to="/buses" icon={BusIcon} label={t("dash.viewBuses")} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function QuickLink({
  to,
  icon: Icon,
  label,
}: {
  to: "/live-location" | "/time-schedule" | "/buses";
  icon: typeof Map;
  label: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 rounded-2xl px-4 py-3 font-bold text-ink/70 transition-all hover:bg-slate-50 hover:text-primary"
    >
      <Icon className="h-5 w-5" />
      {label}
    </Link>
  );
}
