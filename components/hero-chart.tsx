"use client";

import { m, useReducedMotion } from "framer-motion";

// The pipeline drawn as a course on a chart: each waypoint is a stage a GPS fix passes through.
const waypoints = [
  { x: 40, y: 262, label: "Tracker", dx: 0, dy: 22, anchor: "start" },
  { x: 98, y: 198, label: "4G", dx: -8, dy: -14, anchor: "end" },
  { x: 176, y: 214, label: "Nginx TCP", dx: 0, dy: 24, anchor: "middle" },
  { x: 228, y: 140, label: "Node.js", dx: -12, dy: -2, anchor: "end" },
  { x: 300, y: 122, label: "Redis + MongoDB", dx: 0, dy: 26, anchor: "middle" },
  { x: 356, y: 58, label: "Dashboard", dx: -14, dy: 4, anchor: "end" },
] as const;

const route =
  "M40 262 C 62 236, 74 204, 98 198 S 150 222, 176 214 S 208 160, 228 140 S 274 116, 300 122 S 342 88, 356 58";

const DRAW_DELAY = 0.7;
const DRAW_DURATION = 1.8;
const ease = [0.45, 0, 0.2, 1] as const;

export function HeroChart() {
  const reduce = useReducedMotion();
  const label = {
    fontSize: 11,
    fill: "var(--fg)",
    stroke: "var(--surface)",
    strokeWidth: 4,
    paintOrder: "stroke",
    strokeLinejoin: "round",
  } as const;

  return (
    <figure className="relative">
      <div className="graticule relative overflow-hidden rounded-[10px] border border-line bg-surface/70">
        <svg viewBox="0 0 400 320" className="block h-auto w-full" role="img" aria-labelledby="hero-chart-cap">
          {/* Rivers: the delta this was built in */}
          <g fill="none" stroke="var(--water)" strokeLinecap="round">
            <path
              d="M-10 70 C 60 90, 90 150, 150 160 S 250 210, 270 270 S 300 330, 330 340"
              strokeWidth="14"
              opacity="0.12"
            />
            <path d="M150 160 C 130 200, 90 230, 60 330" strokeWidth="6" opacity="0.1" />
            <path d="M410 150 C 360 170, 320 200, 270 270" strokeWidth="5" opacity="0.1" />
          </g>
          {/* Roads */}
          <g fill="none" stroke="var(--line-strong)" strokeWidth="1.5">
            <path d="M-10 230 L 420 120" />
            <path d="M120 -10 C 140 100, 210 160, 200 330" />
            <path d="M-10 300 C 120 280, 260 300, 410 240" strokeDasharray="1 4" strokeLinecap="round" />
          </g>

          {/* Commands travel back to the device */}
          <m.path
            d={route}
            fill="none"
            stroke="var(--water)"
            strokeWidth="1.5"
            strokeDasharray="3 5"
            transform="translate(7 7)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: DRAW_DELAY + DRAW_DURATION, duration: 0.6 }}
          />

          {/* Telemetry course */}
          <m.path
            d={route}
            fill="none"
            stroke="var(--route)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: DRAW_DELAY, duration: DRAW_DURATION, ease }}
          />

          {waypoints.map((w, i) => {
            const at = DRAW_DELAY + (DRAW_DURATION * i) / (waypoints.length - 1);
            const last = i === waypoints.length - 1;
            return (
              <m.g
                key={w.label}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: at, type: "spring", stiffness: 420, damping: 22 }}
                style={{ transformOrigin: `${w.x}px ${w.y}px`, transformBox: "view-box" }}
              >
                {last && !reduce && (
                  <m.circle
                    cx={w.x}
                    cy={w.y}
                    r="9"
                    fill="var(--route)"
                    initial={{ opacity: 0.35, scale: 1 }}
                    animate={{ opacity: 0, scale: 2.4 }}
                    transition={{ delay: at + 0.3, duration: 2, repeat: Infinity, ease: "easeOut" }}
                    style={{ transformOrigin: `${w.x}px ${w.y}px`, transformBox: "view-box" }}
                  />
                )}
                <circle
                  cx={w.x}
                  cy={w.y}
                  r={last ? 6 : 4.5}
                  fill={last ? "var(--route)" : "var(--surface)"}
                  stroke="var(--route)"
                  strokeWidth="2"
                />
                <text x={w.x + w.dx} y={w.y + w.dy} textAnchor={w.anchor} {...label}>
                  {w.label}
                </text>
              </m.g>
            );
          })}

          {/* A position report riding the course once it is drawn */}
          {!reduce && (
            <circle r="3" fill="var(--fg)">
              <animateMotion
                path={route}
                dur="3.2s"
                begin={`${DRAW_DELAY + DRAW_DURATION + 0.4}s`}
                repeatCount="indefinite"
                keyPoints="0;1"
                keyTimes="0;1"
                calcMode="linear"
              />
            </circle>
          )}

          {/* North arrow and position */}
          <g fill="var(--muted)" fontSize="10" style={{ fontVariantNumeric: "tabular-nums" }}>
            <path d="M24 18 L 29 34 L 24 30 L 19 34 Z" />
            <text x="24" y="46" textAnchor="middle">
              N
            </text>
            <text x="388" y="306" textAnchor="end">
              23.7°N 90.4°E
            </text>
          </g>
        </svg>
      </div>
      <figcaption
        id="hero-chart-cap"
        className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-[13px] text-muted"
      >
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="h-0.5 w-5 rounded-full bg-route" />
          Telemetry, tracker to dashboard
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="w-5 border-t-[1.5px] border-dashed border-water" />
          Commands back to the device
        </span>
      </figcaption>
    </figure>
  );
}
