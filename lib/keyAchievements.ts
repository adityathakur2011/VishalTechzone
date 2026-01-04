export type KeyAchievement = {
  imagePath: string;
  brandLogoPath?: string;
  title: string;
  subtitle: string;
  description: string;
  year: string;
  category?: string;
  highlight?: string;
};

export const keyAchievements: KeyAchievement[] = [
  {
  imagePath: "/asset/img/award_binance_trading.webp",
  brandLogoPath: "/brands/binance.svg",
    title: "Outstanding Partner of the Year",
    subtitle: "Binance Affiliate Program",
    description:
      "Awarded by Binance for achieving the highest trading volume as an affiliate in the South Asia region. This recognition highlights exceptional performance, trust, and large-scale trader onboarding within the Binance ecosystem.",
    year: "2025",
    category: "Affiliate Excellence",
    highlight: "Highest Trading Volume – South Asia",
  },
  {
  imagePath: "/asset/img/award_binance_year.webp",
  brandLogoPath: "/brands/binance.svg",
    title: "Affiliate Trading Challenge Winner",
    subtitle: "Binance Campus",
    description:
      "Recognized by Binance Campus for outstanding performance in the Affiliate Trading Challenge. This award reflects strong community engagement, consistent trading activity, and leadership in crypto education initiatives.",
    year: "2024",
    category: "Trading & Community",
    highlight: "Top Affiliate Performance",
  },
  {
  imagePath: "/asset/img/award_suncrypto.webp",
  brandLogoPath: "/brands/suncrypto.svg",
    title: "Best Crypto Influencer",
    subtitle: "SunCrypto Awards",
    description:
      "Honored with the Best Crypto Influencer Award by SunCrypto for impactful content creation, audience trust, and contribution to crypto awareness and education across the community.",
    year: "2023",
    category: "Influencer Recognition",
    highlight: "Crypto Education & Impact",
  },
  {
  imagePath: "/asset/img/award_coindcx.webp",
  brandLogoPath: "/brands/coindcx.svg",
    title: "Crypto Influencer of the Year",
    subtitle: "CoinDCX",
    description:
      "Awarded by CoinDCX for exceptional influence in the crypto space, consistent value-driven content, and helping users understand digital assets, trading, and blockchain adoption.",
    year: "2023",
    category: "Industry Recognition",
    highlight: "Influencer of the Year",
  },
];

export default keyAchievements;
