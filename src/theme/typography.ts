import { TextStyle } from "react-native";

export const FONT_FAMILIES = {
  RubikLight: "RubikLight",
  RubikRegular: "RubikRegular",
  RubikMedium: "RubikMedium",
  RubikSemiBold: "RubikSemiBold",
  RubikBold: "RubikBold",
  RubikExtraBold: "RubikExtraBold",
  RubikBlack: "RubikBlack",
  RubikItalic: "RubikItalic",
  SFProDisplayRegular: "SFProDisplayRegular",
  SFProDisplayMedium: "SFProDisplayMedium",
  SFProDisplayBold: "SFProDisplayBold",
  SFProDisplayUltraLightItalic: "SFProDisplayUltraLightItalic",
  SFProDisplayThinItalic: "SFProDisplayThinItalic",
  SFProDisplayLightItalic: "SFProDisplayLightItalic",
  SFProDisplaySemiBoldItalic: "SFProDisplaySemiBoldItalic",
  SFProDisplayHeavyItalic: "SFProDisplayHeavyItalic",
  SFProDisplayBlackItalic: "SFProDisplayBlackItalic",
  VisbyCFExtraBold: "VisbyCFExtraBold",
} as const;

export type TextVariant =
  | "RubikLight"
  | "RubikRegular"
  | "RubikMedium"
  | "RubikSemiBold"
  | "RubikBold"
  | "RubikExtraBold"
  | "RubikBlack"
  | "RubikItalic"
  | "SFProDisplayRegular"
  | "SFProDisplayMedium"
  | "SFProDisplayBold"
  | "SFProDisplayUltraLightItalic"
  | "SFProDisplayThinItalic"
  | "SFProDisplayLightItalic"
  | "SFProDisplaySemiBoldItalic"
  | "SFProDisplayHeavyItalic"
  | "SFProDisplayBlackItalic"
  | "VisbyCFExtraBold";

export type TextSize = "xsmall" | "small" | "medium" | "large" | "xlarge";

type TextVariantMap = Record<TextVariant, TextStyle>;
type TextSizeMap = Record<TextSize, TextStyle>;

export const TEXT_VARIANT_STYLES: TextVariantMap = {
  RubikLight: {
    fontFamily: FONT_FAMILIES.RubikLight,
    fontWeight: "300",
  },
  RubikRegular: {
    fontFamily: FONT_FAMILIES.RubikRegular,
    fontWeight: "400",
  },
  RubikMedium: {
    fontFamily: FONT_FAMILIES.RubikMedium,
    fontWeight: "500",
  },
  RubikSemiBold: {
    fontFamily: FONT_FAMILIES.RubikSemiBold,
    fontWeight: "600",
  },
  RubikBold: {
    fontFamily: FONT_FAMILIES.RubikBold,
    fontWeight: "700",
  },
  RubikExtraBold: {
    fontFamily: FONT_FAMILIES.RubikExtraBold,
    fontWeight: "800",
  },
  RubikBlack: {
    fontFamily: FONT_FAMILIES.RubikBlack,
    fontWeight: "900",
  },
  RubikItalic: {
    fontFamily: FONT_FAMILIES.RubikItalic,
    fontStyle: "italic",
  },
  SFProDisplayRegular: {
    fontFamily: FONT_FAMILIES.SFProDisplayRegular,
    fontWeight: "400",
  },
  SFProDisplayMedium: {
    fontFamily: FONT_FAMILIES.SFProDisplayMedium,
    fontWeight: "500",
  },
  SFProDisplayBold: {
    fontFamily: FONT_FAMILIES.SFProDisplayBold,
    fontWeight: "700",
  },
  SFProDisplayUltraLightItalic: {
    fontFamily: FONT_FAMILIES.SFProDisplayUltraLightItalic,
    fontWeight: "200",
    fontStyle: "italic",
  },
  SFProDisplayThinItalic: {
    fontFamily: FONT_FAMILIES.SFProDisplayThinItalic,
    fontWeight: "100",
    fontStyle: "italic",
  },
  SFProDisplayLightItalic: {
    fontFamily: FONT_FAMILIES.SFProDisplayLightItalic,
    fontWeight: "300",
    fontStyle: "italic",
  },
  SFProDisplaySemiBoldItalic: {
    fontFamily: FONT_FAMILIES.SFProDisplaySemiBoldItalic,
    fontWeight: "600",
    fontStyle: "italic",
  },
  SFProDisplayHeavyItalic: {
    fontFamily: FONT_FAMILIES.SFProDisplayHeavyItalic,
    fontWeight: "800",
    fontStyle: "italic",
  },
  SFProDisplayBlackItalic: {
    fontFamily: FONT_FAMILIES.SFProDisplayBlackItalic,
    fontWeight: "900",
    fontStyle: "italic",
  },
  VisbyCFExtraBold: {
    fontFamily: FONT_FAMILIES.VisbyCFExtraBold,
    fontWeight: "800",
  },
};

export const TEXT_SIZE_STYLES: TextSizeMap = {
  xsmall: {
    fontSize: 11,
    lineHeight: 15,
  },
  small: { fontSize: 12, lineHeight: 18 },

  medium: {
    fontSize: 16,
    lineHeight: 22,
  },
  large: {
    fontSize: 24,
    lineHeight: 28,
  },
  xlarge: {
    fontSize: 28,
    lineHeight: 28,
  },
};
