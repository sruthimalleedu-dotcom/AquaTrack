export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // ── Aqua Enterprise Palette ─────────────────────────────
        // Light theme
        primary:   "#0EA5E9", // Aqua Blue
        secondary: "#06B6D4", // Cyan
        accent:    "#10B981", // Emerald

        // Dark theme primaries
        "primary-dark":   "#38BDF8", // Sky 400
        "secondary-dark": "#22D3EE", // Cyan 400
        "accent-dark":    "#34D399", // Emerald 400

        // Backgrounds
        "bg-light":      "#FFFFFF",
        "bg-dark":       "#020617", // Slate 950
        "surface-light": "#F8FAFC", // Slate 50
        "surface-dark":  "#0F172A", // Slate 900
        "card-light":    "#FFFFFF",
        "card-dark":     "#1E293B", // Slate 800

        // Borders
        "border-light": "#E2E8F0", // Slate 200
        "border-dark":  "#334155", // Slate 700

        // Typography
        "title-light": "#0F172A", // Slate 900
        "title-dark":  "#F8FAFC", // Slate 50
        "body-light":  "#475569", // Slate 600
        "body-dark":   "#CBD5E1", // Slate 300

        // Semantic
        success: "#10B981", // Emerald 500
        warning: "#F59E0B", // Amber 500
        danger:  "#F43F5E", // Rose 500
        // ────────────────────────────────────────────────────────
      },
    },
  },
  plugins: [],
}