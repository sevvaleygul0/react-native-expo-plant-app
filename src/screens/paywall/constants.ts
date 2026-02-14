export type PaywallProduct = {
  id: string;
  title: string;
  description: string;
  isSaveTag?: boolean;
};

export type PaywallFeatureSeed = {
  id: string;
  iconKey: "Scan" | "Speedometer" | "Leaf";
  title: string;
  desc: string;
};

export const PRODUCT_IDS = {
  monthly: "monthly",
  yearly: "yearly",
} as const;

export const PAYWALL_FEATURE_SEEDS: PaywallFeatureSeed[] = [
  {
    id: "scan",
    iconKey: "Scan",
    title: "Unlimited",
    desc: "Plant Identify",
  },
  {
    id: "speed",
    iconKey: "Speedometer",
    title: "Faster",
    desc: "Process",
  },
  {
    id: "leaf",
    iconKey: "Leaf",
    title: "Detailed",
    desc: "Plant care",
  },
];

export const PAYWALL_PRODUCTS: PaywallProduct[] = [
  {
    id: PRODUCT_IDS.monthly,
    title: "1 Month",
    description: "$2.99/month, auto renewable",
  },
  {
    id: PRODUCT_IDS.yearly,
    title: "1 Year",
    description: "First 3 days free, then $529,99/year",
    isSaveTag: true,
  },
];

export const DEFAULT_SELECTED_PRODUCT_ID =
  PAYWALL_PRODUCTS[1]?.id ?? PAYWALL_PRODUCTS[0]?.id ?? "";
