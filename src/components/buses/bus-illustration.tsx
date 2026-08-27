import { cn } from "@/lib/utils";

export type BusStatus = "On Route" | "Not Started" | "Delayed";

export const ROUTE_ACCENTS: Record<string, string> = {
  Gobindaganj: "#1F72C8",
  Sherpur: "#E0A03A",
  Gabtoli: "#2E8FDD",
  "Sathmatha/Bogura": "#5B6FD6",
  Dupchachia: "#3E8E5C",
};

export const PREMIUM_TRIM = "#D9A93C";

const STATUS_DOT: Record<BusStatus, string> = {
  "On Route": "bg-green-500",
  Delayed: "bg-amber-400",
  "Not Started": "bg-slate-400",
};

export function routeAccent(route: string) {
  return ROUTE_ACCENTS[route] ?? "#1F72C8";
}

/** Bus-shaped illustration with plate badge, glass shine and rolling wheels. */
export function BusIllustration({
  number,
  route,
  status,
  premium = false,
  className,
}: {
  number: string;
  route: string;
  status: BusStatus;
  premium?: boolean;
  className?: string;
}) {
  const accent = premium ? PREMIUM_TRIM : routeAccent(route);
  const plate = number.replace(/^Bus\s*/i, "");
  const uid = number.replace(/[^a-zA-Z0-9]/g, "");

  return (
    <div className={cn("group/bus relative w-full", className)}>
      {/* status corner badge */}
      <div className="absolute -top-1 right-1 z-20 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-ink/70 shadow-sm ring-1 ring-black/5">
        <span className={cn("h-2 w-2 rounded-full", STATUS_DOT[status])} />
        {status}
      </div>

      <svg viewBox="0 0 220 130" className="w-full overflow-visible" role="img" aria-label={`${number} illustration`}>
        <defs>
          <linearGradient id={`body-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2fa8ac" />
            <stop offset="100%" stopColor="#1c7f86" />
          </linearGradient>
          <linearGradient id={`shine-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.55" />
            <stop offset="45%" stopColor="white" stopOpacity="0.12" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="ground-shadow" cx="0.5" cy="0.5">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#1e293b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* grounding shadow */}
        <ellipse cx="110" cy="118" rx="88" ry="10" fill="url(#ground-shadow)" />

        {/* body */}
        <rect x="16" y="26" width="188" height="72" rx="16" fill={`url(#body-${uid})`} />
        {/* roof trim */}
        <rect x="26" y="22" width="168" height="8" rx="4" fill={accent} opacity="0.9" />

        {/* windows */}
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={32 + i * 40} y={38} width={30} height={24} rx={6} fill="#e8f4fb" opacity="0.95" />
            {/* passenger silhouettes */}
            <circle cx={41 + i * 40} cy={54} r={5} fill="#334155" opacity="0.18" />
            <circle cx={53 + i * 40} cy={56} r={4} fill="#334155" opacity="0.14" />
          </g>
        ))}

        {/* door / stripe accent */}
        <rect x="176" y="38" width="20" height="52" rx="5" fill={accent} opacity="0.85" />
        <rect x="16" y="76" width="188" height="6" fill={accent} opacity="0.55" />

        {/* glass shine overlay */}
        <rect x="16" y="22" width="188" height="58" rx="16" fill={`url(#shine-${uid})`} />

        {/* license-plate badge */}
        <g>
          <rect
            x="86"
            y="78"
            width="54"
            height="20"
            rx="5"
            fill="#ffffff"
            stroke={accent}
            strokeWidth="1.5"
          />
          <text
            x="113"
            y="92"
            textAnchor="middle"
            fontSize="12"
            fontWeight="800"
            fill="#1f2937"
            fontFamily="var(--font-display)"
          >
            {plate}
          </text>
        </g>

        {/* headlight */}
        <rect x="196" y="66" width="8" height="8" rx="3" fill={PREMIUM_TRIM} opacity="0.9" />

        {/* wheels */}
        {[58, 168].map((cx) => (
          <g key={cx} className="origin-center animate-[wheel-roll_1.6s_linear_1] group-hover/bus:animate-[wheel-roll_1.4s_linear_infinite]" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
            <circle cx={cx} cy={102} r={13} fill="#334155" />
            <circle cx={cx} cy={102} r={6} fill="#cbd5e1" />
            <rect x={cx - 1} y={94} width={2} height={16} fill="#94a3b8" />
            <rect x={cx - 8} y={101} width={16} height={2} fill="#94a3b8" />
          </g>
        ))}
      </svg>

      {/* route color underline bar */}
      <div className="mt-3 h-1.5 w-full rounded-full" style={{ backgroundColor: accent, opacity: 0.85 }} />
    </div>
  );
}

/** Soft road strip with dashed lane markings. */
export function RoadStrip({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none relative h-14 w-full overflow-hidden rounded-2xl bg-slate-200/70", className)}>
      <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 [background-image:repeating-linear-gradient(to_right,white_0_28px,transparent_28px_60px)] opacity-80" />
    </div>
  );
}

/** Low-opacity scenery: bus stop sign, trees, street lamp. */
export function Scenery() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-[0.13]">
      <svg className="absolute left-[3%] bottom-[12%] h-24 text-ink" viewBox="0 0 40 90" fill="currentColor">
        <rect x="18" y="20" width="3" height="70" />
        <rect x="6" y="6" width="28" height="18" rx="4" />
      </svg>
      <svg className="absolute right-[6%] bottom-[8%] h-32 text-ink" viewBox="0 0 40 110" fill="currentColor">
        <rect x="18" y="20" width="3" height="90" />
        <path d="M19 20 Q19 4 36 8 L36 12 Q22 10 22 20 Z" />
      </svg>
      <svg className="absolute left-[28%] top-[6%] h-20 text-ink" viewBox="0 0 40 80" fill="currentColor">
        <rect x="18" y="46" width="4" height="34" />
        <circle cx="20" cy="32" r="18" />
      </svg>
      <svg className="absolute right-[26%] top-[14%] h-16 text-ink" viewBox="0 0 40 80" fill="currentColor">
        <rect x="18" y="46" width="4" height="34" />
        <circle cx="20" cy="30" r="15" />
      </svg>
    </div>
  );
}
