import { assets } from "@/src/screens/onboarding/welcome/assets";
import Text from "@/src/components/Text";
import React, { useMemo } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function OnboardingWelcomeScreen(): React.JSX.Element {
  const { bottom: bottomInset, top: topInset } = useSafeAreaInsets();

  const dynamicStyles = useMemo(() => {
    return {
      container: {
        paddingTop: topInset,
        paddingBottom: bottomInset,
      },
    };
  }, [topInset, bottomInset]);
  
  return (
    <ImageBackground source={assets.images.BackgroundImage} style={[styles.container, dynamicStyles.container]}>
      <Text variant="RubikMedium24">Onboarding Welcome</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
