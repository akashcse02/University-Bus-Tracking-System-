import { useState, useEffect } from "react";
import { Bell, Smartphone, Clock, Save, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface NotificationSettingsProps {
  trigger?: React.ReactNode;
}

export function NotificationSettings({ trigger }: NotificationSettingsProps) {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [leadTime, setLeadTime] = useState(10);
  const [open, setOpen] = useState(false);

  // Load preferences from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("pub-bus-notifications");
    if (saved) {
      const parsed = JSON.parse(saved);
      setPushEnabled(parsed.pushEnabled);
      setSmsEnabled(parsed.smsEnabled);
      setLeadTime(parsed.leadTime);
    }
  }, []);

  const handleSave = () => {
    const preferences = { pushEnabled, smsEnabled, leadTime };
    localStorage.setItem("pub-bus-notifications", JSON.stringify(preferences));
    toast.success("Notification preferences saved successfully!");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="icon" className="rounded-full">
            <Bell className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-[2rem] p-8 border-none shadow-2xl">
        <DialogHeader>
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Bell className="h-6 w-6" />
          </div>
          <DialogTitle className="text-center font-display text-2xl font-black text-ink">
            Alert Preferences
          </DialogTitle>
          <DialogDescription className="text-center font-bold text-ink/40">
            Choose how and when you want to be alerted before your bus arrives.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-8 space-y-6">
          <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
            <div className="flex items-center gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-blue-100 text-blue-600">
                <Bell className="h-4 w-4" />
              </div>
              <div>
                <Label className="text-sm font-black text-ink">Push Notifications</Label>
                <p className="text-[10px] font-bold text-ink/40 uppercase tracking-wider">Browser & App Alerts</p>
              </div>
            </div>
            <Switch 
              checked={pushEnabled}
              onCheckedChange={setPushEnabled}
              className="data-[state=checked]:bg-primary"
            />
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
            <div className="flex items-center gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-100 text-emerald-600">
                <Smartphone className="h-4 w-4" />
              </div>
              <div>
                <Label className="text-sm font-black text-ink">SMS Reminders</Label>
                <p className="text-[10px] font-bold text-ink/40 uppercase tracking-wider">Direct to Phone</p>
              </div>
            </div>
            <Switch 
              checked={smsEnabled}
              onCheckedChange={setSmsEnabled}
              className="data-[state=checked]:bg-primary"
            />
          </div>

          <div className="space-y-4 rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-ink/40" />
                <Label className="text-sm font-black text-ink">Alert Lead Time</Label>
              </div>
              <span className="rounded-lg bg-primary/10 px-2 py-1 text-xs font-black text-primary">
                {leadTime} min before
              </span>
            </div>
            <Slider 
              value={[leadTime]}
              onValueChange={(val) => setLeadTime(val[0] ?? 10)}
              max={30}
              min={2}
              step={1}
              className="py-4"
            />
            <p className="text-[10px] text-center font-bold text-ink/30 uppercase tracking-widest">
              Set alert timing for your departure
            </p>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <Button 
            variant="ghost" 
            className="flex-1 rounded-2xl font-black text-ink/40"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button 
            className="flex-1 rounded-2xl bg-primary font-black text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
            onClick={handleSave}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
