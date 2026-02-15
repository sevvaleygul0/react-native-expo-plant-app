import Button from "@/src/components/Button";
import Text from "@/src/components/Text";
import { ROOT_ROUTES } from "@/src/navigation/routeNames";
import { RootStackParamList } from "@/src/navigation/types";
import { assets } from "@/src/screens/onboarding/welcome/assets";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useMemo } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function OnboardingWelcomeScreen(): React.JSX.Element {
  const { bottom: bottomInset, top: topInset } = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const dynamicStyles = useMemo(() => {
    return {
      container: {
        paddingTop: topInset,
        paddingBottom: bottomInset,
      },
    };
  }, [topInset, bottomInset]);

  const onGetStartedPress = () => {
    navigation.navigate(ROOT_ROUTES.ONBOARDING);
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.titleContainer}>
        <Text variant="RubikLight" size="xlarge" style={styles.titleText}>
          Welcome to{" "}
        </Text>
        <Text variant="RubikSemiBold" size="xlarge" style={styles.titleText}>
          PlantApp
        </Text>
      </View>
      <Text variant="RubikRegular" size="medium" style={styles.descriptionText}>
        Identify more than 3000+ plants and 88% accuracy.
      </Text>
    </View>
  );

  const renderContent = () => (
    <View style={styles.contentContainer}>
      <Image
        source={assets.images.PlantImage}
        resizeMode="contain"
        style={styles.plantImage}
      />
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footerContainer}>
      <Button text="Get Started" onPress={onGetStartedPress} />
      <Text variant="RubikRegular" size="small" style={styles.footerText}>
        By tapping next, you are agreeing to PlantID{" "}
        <Text
          variant="RubikRegular"
          size="xsmall"
          style={[styles.underlineStyle, styles.footerText]}
        >
          Terms of Use
        </Text>{" "}
        &{" "}
        <Text
          variant="RubikRegular"
          size="xsmall"
          style={[styles.underlineStyle, styles.footerText]}
        >
          Privacy Policy
        </Text>
        .
      </Text>
    </View>
  );

  return (
    <ImageBackground
      source={assets.images.BackgroundImage}
      style={[styles.container, dynamicStyles.container]}
    >
      {renderHeader()}
      {renderContent()}
      {renderFooter()}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginTop: 12,
    gap: 8,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  titleContainer: {
    flexDirection: "row",
  },
  descriptionText: {
    color: "#13231BB2",
    letterSpacing: 0.07,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  plantImage: {
    width: "100%",
    aspectRatio: 375 / 499,
  },
  footerContainer: {
    marginBottom: 8,
    gap: 17,
    paddingHorizontal: 24,
  },
  footerText: {
    textAlign: "center",
    color: "#597165B2",
    letterSpacing: 0.07,
  },
  underlineStyle: {
    textDecorationLine: "underline",
  },
  titleText: {
    letterSpacing: 0.07,
  },
});
