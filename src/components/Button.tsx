import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

const BUTTON_VARIANTS = {
  default: {
    container: {
      height: 56,
      borderRadius: 12,
      paddingTop: 18,
      paddingRight: 16,
      paddingBottom: 18,
      paddingLeft: 16,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#28AF6E",
    } as ViewStyle,
    text: {
      fontFamily: "SF Pro Text",
      fontWeight: "700",
      fontSize: 15,
      lineHeight: 24,
      letterSpacing: -0.24,
      textAlign: "center",
      color: "#FFFFFF",
    } as TextStyle,
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
        <ActivityIndicator color={textColor ?? "#FFFFFF"} />
      ) : (
        <Text
          style={[
            selectedVariant.text,
            styles.baseText,
            textColor ? { color: textColor } : undefined,
          ]}
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
  baseText: {
    textAlign: "center",
  },
  loadingContainer: {
    opacity: 0.9,
  },
});
