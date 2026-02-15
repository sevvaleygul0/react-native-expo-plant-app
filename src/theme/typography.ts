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
  SFProTextBold: "SFProTextBold",
} as const;

export type TextVariant =
  | "RubikLight"
  | "RubikRegular"
  | "RubikMedium"
  | "RubikSemiBold"
  | "RubikBold"
  | "RubikExtraBold"
  | "RubikBlack"
  | "RubikItalic";

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
