// Single source for identity and links. Leave a link empty to hide it everywhere.
export const site = {
  name: "Sohel Ahmed",
  role: "Software Developer · Full-Stack Engineer · Backend & IoT Systems Engineer",
  shortRole: "Software Developer — Backend & IoT Systems",
  location: "Bangladesh",
  description:
    "Software developer focused on real-time systems, GPS tracking, IoT, backend infrastructure, and scalable web applications.",
  // Set NEXT_PUBLIC_SITE_URL once a custom domain exists; Vercel's production URL is used until then.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  email: "sohel.ahmed2178@gmail.com",
  github: "",
} as const;

export const nav = [
  { href: "#work", label: "Work" },
  { href: "#architecture", label: "Architecture" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
] as const;
