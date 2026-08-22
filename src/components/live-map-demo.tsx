const ROUTE_PATH =
  "M60 300 C 150 300, 170 190, 270 180 S 430 240, 520 150 S 680 90, 760 130";

const stops = [
  { name: "Gobindaganj", x: 60, y: 300, delay: 0 },
  { name: "Sherpur", x: 270, y: 180, delay: 2400 },
  { name: "Sathmatha", x: 520, y: 150, delay: 4800 },
  { name: "Gabtoli", x: 760, y: 130, delay: 7200 },
];

export function LiveMapDemo() {
  return (
    <div id="live-location" className="relative overflow-hidden rounded-[2rem] bg-card p-4 shadow-[0_30px_60px_-40px_var(--color-ink)] sm:p-6">
      <svg viewBox="0 0 820 360" className="w-full" role="img" aria-label="Animated map showing a PUB bus travelling from Gobindaganj to Gabtoli">
        {/* map backdrop */}
        <rect width="820" height="360" rx="24" fill="var(--color-muted)" />
        <g stroke="var(--color-background)" strokeWidth="10" opacity="0.9">
          <path d="M0 90 H820 M0 230 H820 M180 0 V360 M420 0 V360 M640 0 V360" />
        </g>
        <g fill="var(--color-secondary)">
          <rect x="30" y="20" width="120" height="55" rx="12" />
          <rect x="450" y="250" width="150" height="80" rx="12" />
          <rect x="680" y="200" width="110" height="60" rx="12" />
        </g>
        <path d="M0 300 C 200 330, 300 250, 500 300 S 760 350, 820 320" fill="none" stroke="var(--color-sky-top)" strokeWidth="22" opacity="0.5" />

        {/* route */}
        <path
          d={ROUTE_PATH}
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray="14 16"
          className="animate-dash"
          opacity="0.75"
        />

        {/* stops */}
        {stops.map((s) => (
          <g
            key={s.name}
            className="animate-pin-pop"
            style={{ animationDelay: `${s.delay}ms`, transformOrigin: `${s.x}px ${s.y}px` }}
          >
            <circle cx={s.x} cy={s.y} r="13" fill="var(--color-card)" stroke="var(--color-brand)" strokeWidth="5" />
            <g transform={`translate(${s.x - 62}, ${s.y - 62})`}>
              <rect width="124" height="34" rx="17" fill="var(--color-ink)" />
              <text
                x="62"
                y="22"
                textAnchor="middle"
                fill="var(--color-brand-foreground)"
                fontSize="15"
                fontWeight="700"
                fontFamily="var(--font-display)"
              >
                {s.name}
              </text>
            </g>
          </g>
        ))}

        {/* waiting student at stop 2 */}
        <g>
          <circle cx="270" cy="180" r="20" fill="var(--color-accent)" opacity="0.5" className="animate-ping-slow" style={{ transformOrigin: "270px 180px" }} />
          <circle cx="270" cy="222" r="17" fill="var(--color-accent)" />
          <g transform="translate(258,210) scale(0.62)" fill="var(--color-accent-foreground)">
            <circle cx="20" cy="10" r="7" />
            <path d="M20 20c-8 0-14 5-15 13h30c-1-8-7-13-15-13Z" />
          </g>
          <g transform="translate(300,205)">
            <rect width="150" height="30" rx="15" fill="var(--color-accent)" />
            <text x="75" y="20" textAnchor="middle" fill="var(--color-accent-foreground)" fontSize="14" fontWeight="700" fontFamily="var(--font-display)">
              Waiting for pickup
            </text>
          </g>
        </g>

        {/* moving bus */}
        <g
          className="animate-drive-map"
          style={{ offsetPath: `path("${ROUTE_PATH}")`, offsetRotate: "0deg" }}
        >
          <circle r="22" fill="var(--color-brand)" />
          <g transform="translate(-11,-11) scale(0.92)">
            <path
              d="M4 2h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm1 4v5h14V6H5Zm1 9a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm12 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
              fill="var(--color-brand-foreground)"
            />
          </g>
        </g>
      </svg>

      <div className="pointer-events-none absolute right-5 top-5 animate-float rounded-2xl bg-card px-4 py-3 shadow-[0_16px_30px_-16px_var(--color-ink)] sm:right-8 sm:top-8">
        <p className="font-display text-sm font-extrabold text-ink sm:text-base">Bus PUB-03</p>
        <p className="text-xs font-semibold text-primary">On the way · 12 min</p>
      </div>
    </div>
  );
}
