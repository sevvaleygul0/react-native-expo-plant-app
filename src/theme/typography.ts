import { TextStyle } from "react-native";

export const FONT_FAMILIES = {
  RubikLight: "RubikLight",
  RubikRegular: "RubikRegular",
  RubikMedium: "RubikMedium",
  RubikSemiBold: "RubikSemiBold",
  RubikExtraBold: "RubikExtraBold",
  SFProTextBold: "SFProTextBold",
} as const;

export type TextVariant =
  | "RubikRegular28"
  | "RubikRegular16"
  | "RubikRegular11"
  | "RubikMedium28"
  | "RubikMedium24"
  | "RubikMedium15"
  | "RubikSemiBold28"
  | "RubikExtraBold28"
  | "RubikLight28"
  | "RubikLight12";

type TypographyMap = Record<TextVariant, TextStyle>;

export const TYPOGRAPHY_VARIANTS: TypographyMap = {
  RubikRegular28: {
    fontFamily: FONT_FAMILIES.RubikRegular,
    fontWeight: "400",
    fontSize: 28,
    lineHeight: 28,
    letterSpacing: 0.07,
  },
  RubikRegular16: {
    fontFamily: FONT_FAMILIES.RubikRegular,
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.07,
  },
  RubikRegular11: {
    fontFamily: FONT_FAMILIES.RubikRegular,
    fontWeight: "400",
    fontSize: 11,
    lineHeight: 15,
    letterSpacing: 0.07,
  },
  RubikMedium28: {
    fontFamily: FONT_FAMILIES.RubikMedium,
    fontWeight: "500",
    fontSize: 28,
    lineHeight: 28,
    letterSpacing: -1,
  },
  RubikMedium24: {
    fontFamily: FONT_FAMILIES.RubikMedium,
    fontWeight: "500",
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: 0.35,
  },

  RubikMedium15: {
    fontFamily: FONT_FAMILIES.RubikMedium,
    fontWeight: "500",
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.24,
  },
  RubikSemiBold28: {
    fontFamily: FONT_FAMILIES.RubikSemiBold,
    fontWeight: "600",
    fontSize: 28,
    lineHeight: 28,
    letterSpacing: 0.07,
  },
  RubikExtraBold28: {
    fontFamily: FONT_FAMILIES.RubikExtraBold,
    fontWeight: "800",
    fontSize: 28,
    lineHeight: 28,
    letterSpacing: -1,
  },
  RubikLight28: {
    fontFamily: FONT_FAMILIES.RubikLight,
    fontWeight: "300",
    fontSize: 28,
    lineHeight: 28,
    letterSpacing: 0.07,
  },
  RubikLight12: {
    fontFamily: FONT_FAMILIES.RubikLight,
    fontWeight: "300",
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 0,
  },
};
