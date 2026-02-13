import React, { useMemo } from "react";
import {
  StyleProp,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from "react-native";

import { TextVariant, TYPOGRAPHY_VARIANTS } from "@/src/theme/typography";

type UtilityTextProps = {
  color?: string;
  align?: TextStyle["textAlign"];
};

export type TextProps = RNTextProps &
  UtilityTextProps & {
    variant?: TextVariant;
    style?: StyleProp<TextStyle>;
  };

export default function Text({
  variant = "RubikRegular16",
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
      style={[TYPOGRAPHY_VARIANTS[variant], utilityStyle, style]}
    />
  );
}
