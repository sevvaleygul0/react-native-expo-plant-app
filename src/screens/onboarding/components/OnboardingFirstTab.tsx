import Text from "@/src/components/Text";
import { assets } from "@/src/screens/onboarding/assets";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function OnboardingFirstTab(): React.JSX.Element {
  const { top: topInset } = useSafeAreaInsets();

  const renderTitle = () => (
    <View style={[styles.titleContainer, { paddingTop: topInset + 12 }]}>
      <View style={styles.titleLine}>
        <Text
          variant="RubikMedium"
          size="xlarge"
          style={{ lineHeight: 40, letterSpacing: -1 }}
        >
          Take a photo to{" "}
        </Text>
        <View style={styles.highlightWordContainer}>
          <Text
            variant="RubikExtraBold"
            size="xlarge"
            style={{ lineHeight: 40, letterSpacing: -1 }}
          >
            identify
          </Text>
          <Image source={assets.images.brush} style={styles.identifyBrush} />
        </View>
      </View>
      <Text
        variant="RubikMedium"
        size="xlarge"
        style={{ lineHeight: 40, letterSpacing: -1 }}
      >
        the plant!
      </Text>
    </View>
  );

  const renderContent = () => (
    <View style={styles.contentContainer}>
      <Image
        source={assets.images.firstTabContent}
        resizeMode="contain"
        style={styles.contentImage}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Image
        source={assets.images.firstTabBackground}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      {renderTitle()}
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    width: "100%",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    paddingHorizontal: 24,
  },
  titleLine: {
    alignItems: "flex-end",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  highlightWordContainer: {
    position: "relative",
  },
  identifyBrush: {
    bottom: -11,
    height: 13,
    left: -14,
    position: "absolute",
    width: 136,
  },
  contentContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  contentImage: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
});
