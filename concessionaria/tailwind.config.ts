import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: { extend: { colors: { ink: "#17161c", graphite: "#26252c", accent: "#6fa34f", "accent-dark": "#4f7f36" }, fontFamily: { sans: ["var(--font-manrope)", "system-ui", "sans-serif"] } } },
} satisfies Config;
