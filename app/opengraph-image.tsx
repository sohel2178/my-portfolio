import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.shortRole}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const chain = ["Device", "Network", "TCP / JT808", "Backend", "Database", "Dashboard"];

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#0f1724",
        color: "#e4eaf2",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#95a3b8" }}>
        <div style={{ width: 14, height: 14, borderRadius: 7, border: "3px solid #ff4fae" }} />
        {site.name}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={{ fontSize: 68, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05, maxWidth: 980 }}>
          I build systems that connect software, devices, and the real world.
        </div>
        <div style={{ fontSize: 26, color: "#95a3b8" }}>{site.shortRole}</div>
      </div>
      <div style={{ display: "flex", gap: 14, fontSize: 20, color: "#95a3b8" }}>
        {chain.map((c, i) => (
          <div key={c} style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ border: "1px solid rgba(228,234,242,0.18)", borderRadius: 8, padding: "8px 14px" }}>{c}</div>
            {i < chain.length - 1 && <div style={{ width: 22, height: 3, borderRadius: 2, background: "#ff4fae" }} />}
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
