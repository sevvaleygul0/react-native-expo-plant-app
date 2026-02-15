import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";

import Text from "@/src/components/Text";
import { COLORS } from "@/src/theme/colors";

const BUTTON_VARIANTS = {
  default: {
    container: {
      height: 56,
      borderRadius: 12,
      paddingTop: 14,
      paddingRight: 16,
      paddingBottom: 14,
      paddingLeft: 16,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#28AF6E",
    } as ViewStyle,
  },
} as const;

export type ButtonVariant = keyof typeof BUTTON_VARIANTS;

type ButtonProps = Omit<PressableProps, "onPress"> & {
  onPress: () => void;
  text: string;
  bgColor?: string;
  textColor?: string;
  variant?: ButtonVariant;
  loading?: boolean;
};

export default function Button({
  onPress,
  text,
  bgColor,
  textColor,
  variant = "default",
  loading = false,
  style,
  ...rest
}: ButtonProps): React.JSX.Element {
  const selectedVariant = BUTTON_VARIANTS[variant];

  return (
    <Pressable
      {...rest}
      onPress={onPress}
      style={[
        styles.baseContainer,
        selectedVariant.container,
        bgColor ? { backgroundColor: bgColor } : undefined,
        loading ? styles.loadingContainer : undefined,
        style as StyleProp<ViewStyle>,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor ?? COLORS.WHITE} />
      ) : (
        <Text
          variant="RubikMedium"
          size="medium"
          color={textColor ?? COLORS.WHITE}
          align="center"
          style={styles.buttonText}
        >
          {text}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 15,
    lineHeight: 24,
    letterSpacing: -0.24,
  },
  loadingContainer: {
    opacity: 0.9,
  },
});
