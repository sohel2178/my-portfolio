import { cn } from "@/lib/utils";

// JT808 frame layout: 0x7E flag, header (msg ID 0x0200 = location report), body, checksum, flag.
const frame = [
  { hex: "7E", label: "flag", accent: true },
  { hex: "02 00", label: "msg id" },
  { hex: "·· ··", label: "props" },
  { hex: "·· ·· ··", label: "terminal" },
  { hex: "·· ··", label: "serial" },
  { hex: "body…", label: "position", wide: true },
  { hex: "··", label: "xor" },
  { hex: "7E", label: "flag", accent: true },
];

export function Jt808Frame() {
  return (
    <figure aria-label="JT808 frame layout" className="mt-6 rounded-[10px] border border-line bg-surface p-4">
      <ol className="flex flex-wrap gap-1">
        {frame.map((f, i) => (
          <li key={i} className={cn("flex flex-col items-center gap-1", f.wide && "flex-1")}>
            <span
              className={cn(
                "w-full rounded-[2px] border px-2 py-1 text-center font-mono text-[11.5px]",
                f.accent ? "border-route/50 text-route" : "border-line-strong text-fg/80",
              )}
            >
              {f.hex}
            </span>
            <span className="text-[11px] text-subtle">{f.label}</span>
          </li>
        ))}
      </ol>
      <figcaption className="mt-3 text-[12.5px] text-muted">
        Message 0x0200, a location report, escaped and checksummed
      </figcaption>
    </figure>
  );
}

const path = ["Cells", "BMS", "ESP32", "Backend"];
export function SignalPath() {
  return (
    <figure
      aria-label="Battery monitoring signal path"
      className="mt-6 rounded-[10px] border border-line bg-surface p-4"
    >
      <ol className="flex items-start">
        {path.map((node, i) => (
          <li key={node} className="flex flex-1 items-start last:flex-none">
            <span className="rounded-[2px] border border-line-strong px-2 py-1 text-[12.5px] whitespace-nowrap text-fg/85">
              {node}
            </span>
            {i < path.length - 1 && (
              <span className="relative mx-1.5 mt-[14px] h-0.5 flex-1 bg-line-strong" aria-hidden="true">
                <span className="absolute -top-[2px] right-0 size-1.5 rounded-full bg-route" />
              </span>
            )}
          </li>
        ))}
      </ol>
      <figcaption className="mt-3 text-[12.5px] text-muted">
        BMS and ESP32 talk over UART, RS485 or CAN: telemetry up, charge control down
      </figcaption>
    </figure>
  );
}
