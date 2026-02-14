import React, { useMemo } from "react";
import {
  StyleProp,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from "react-native";

import {
  TextSize,
  TextVariant,
  TEXT_SIZE_STYLES,
  TEXT_VARIANT_STYLES,
} from "@/src/theme/typography";

type UtilityTextProps = {
  color?: string;
  align?: TextStyle["textAlign"];
};

export type TextProps = RNTextProps &
  UtilityTextProps & {
    variant?: TextVariant;
    size?: TextSize;
    style?: StyleProp<TextStyle>;
  };

export default function Text({
  variant = "RubikRegular",
  size = "medium",
  style,
  color,
  align,
  ...rest
}: TextProps): React.JSX.Element {
  const utilityStyle = useMemo<TextStyle>(
    () => ({
      ...(color ? { color } : {}),
      ...(align ? { textAlign: align } : {}),
    }),
    [align, color],
  );

  return (
    <RNText
      {...rest}
      style={[
        TEXT_VARIANT_STYLES[variant],
        TEXT_SIZE_STYLES[size],
        utilityStyle,
        style,
      ]}
    />
  );
}
