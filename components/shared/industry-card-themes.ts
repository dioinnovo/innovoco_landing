export type IndustryVisualThemeKey =
  | "financial"
  | "healthcare"
  | "manufacturing"
  | "retail"
  | "construction"
  /** Homepage accordion — carriers, adjusters, TPAs (distinct from FS blue). */
  | "insurance"
  /** Homepage accordion — utilities, pipelines, grid operators. */
  | "energy"
  /** Government & public sector — navy/slate with blue accent. */
  | "government"
  /** @deprecated Prefer `retail` — kept for compatibility; same indigo retail palette. */
  | "enterpriseBlue";

export type IndustryVisualTheme = {
  hoverBorder: string;
  iconGradient: string;
  iconText: string;
  metricCell: string;
  metricPrimary: string;
  footerBorder: string;
  footerBg: string;
};

/** Shared palette for homepage industry accordion cards and industry page “Get Started” cards. */
export const industryVisualThemes: Record<IndustryVisualThemeKey, IndustryVisualTheme> = {
  financial: {
    hoverBorder: "hover:border-[#0A58D0]/50",
    iconGradient: "bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]",
    iconText: "text-[#0A58D0]",
    metricCell: "bg-[#DBEAFE]/50",
    metricPrimary: "text-[#0A58D0]",
    footerBorder: "border-[#93C5FD]/20",
    footerBg: "bg-[#F8FAFC]/60",
  },
  healthcare: {
    hoverBorder: "hover:border-[#0F766E]/50",
    iconGradient: "bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]",
    iconText: "text-[#0F766E]",
    metricCell: "bg-[#D1FAE5]/50",
    metricPrimary: "text-[#0F766E]",
    footerBorder: "border-[#6EE7B7]/20",
    footerBg: "bg-[#ECFDF5]/60",
  },
  /** Aligned with /solutions/industries/manufacturing (amber/orange, not violet). */
  manufacturing: {
    hoverBorder: "hover:border-[#f59e0b]/45",
    iconGradient: "bg-gradient-to-br from-[#FFF7ED] to-[#FDBA74]",
    iconText: "text-[#d97706]",
    metricCell: "bg-[#FFEDD5]/55",
    metricPrimary: "text-[#b45309]",
    footerBorder: "border-[#FDBA74]/25",
    footerBg: "bg-[#FFF7ED]/55",
  },
  /**
   * Retail & e-commerce — indigo (#6366f1), distinct from Financial Services corporate blue (#0A58D0).
   */
  retail: {
    hoverBorder: "hover:border-[#6366f1]/50",
    iconGradient: "bg-gradient-to-br from-[#EEF2FF] to-[#C7D2FE]",
    iconText: "text-[#6366f1]",
    metricCell: "bg-[#EEF2FF]/60",
    metricPrimary: "text-[#4f46e5]",
    footerBorder: "border-[#C7D2FE]/25",
    footerBg: "bg-[#EEF2FF]/55",
  },
  construction: {
    hoverBorder: "hover:border-[#D97706]/50",
    iconGradient: "bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]",
    iconText: "text-[#D97706]",
    metricCell: "bg-[#FEF3C7]/50",
    metricPrimary: "text-[#D97706]",
    footerBorder: "border-[#FDE68A]/20",
    footerBg: "bg-[#FFFBEB]/60",
  },
  insurance: {
    hoverBorder: "hover:border-[#6d28d9]/45",
    iconGradient: "bg-gradient-to-br from-[#f5f3ff] to-[#ddd6fe]",
    iconText: "text-[#6d28d9]",
    metricCell: "bg-[#ede9fe]/55",
    metricPrimary: "text-[#5b21b6]",
    footerBorder: "border-[#c4b5fd]/25",
    footerBg: "bg-[#faf5ff]/55",
  },
  energy: {
    hoverBorder: "hover:border-[#0369a1]/45",
    iconGradient: "bg-gradient-to-br from-[#e0f2fe] to-[#7dd3fc]",
    iconText: "text-[#0369a1]",
    metricCell: "bg-[#e0f2fe]/55",
    metricPrimary: "text-[#0c4a6e]",
    footerBorder: "border-[#7dd3fc]/25",
    footerBg: "bg-[#f0f9ff]/55",
  },
  government: {
    hoverBorder: "hover:border-[#3b82f6]/45",
    iconGradient: "bg-gradient-to-br from-[#eff6ff] to-[#93c5fd]",
    iconText: "text-[#1d4ed8]",
    metricCell: "bg-[#eff6ff]/55",
    metricPrimary: "text-[#1e3a5f]",
    footerBorder: "border-[#93c5fd]/25",
    footerBg: "bg-[#eff6ff]/55",
  },
  enterpriseBlue: {
    hoverBorder: "hover:border-[#6366f1]/50",
    iconGradient: "bg-gradient-to-br from-[#EEF2FF] to-[#C7D2FE]",
    iconText: "text-[#6366f1]",
    metricCell: "bg-[#EEF2FF]/60",
    metricPrimary: "text-[#4f46e5]",
    footerBorder: "border-[#C7D2FE]/25",
    footerBg: "bg-[#EEF2FF]/55",
  },
};
