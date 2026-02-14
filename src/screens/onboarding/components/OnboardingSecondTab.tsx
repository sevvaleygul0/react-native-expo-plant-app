import Text from "@/src/components/Text";
import { assets } from "@/src/screens/onboarding/assets";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";

export default function OnboardingSecondTab(): React.JSX.Element {
  const renderTitle = () => (
    <View style={styles.titleContainer}>
      <View style={styles.titleLine}>
        <Text variant="RubikMedium" size="xlarge">
          Get plant{" "}
        </Text>
        <View style={styles.highlightWordContainer}>
          <Text variant="RubikExtraBold" size="xlarge">
            care guides
          </Text>
          <Image source={assets.images.brush} style={styles.guidesBrush} />
        </View>
      </View>
    </View>
  );

  const renderContent = () => (
    <View style={styles.contentContainer}>
      <View style={styles.contentScene}>
        <Image source={assets.images.leafBlur} style={styles.leafBlurImage} />
        <Image source={assets.images.phone} style={styles.phoneImage} />
        <Image
          source={assets.images.artwork}
          resizeMode="contain"
          style={styles.artworkImage}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
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
  titleContainer: {
    marginTop: 12,
    paddingHorizontal: 24,
  },
  titleLine: {
    alignItems: "flex-end",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  highlightWordContainer: {},
  guidesBrush: {
    bottom: -16,
    height: 13,
    left: 0,
    position: "absolute",
    width: 152,
  },
  contentContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    overflow: "hidden",
    width: "100%",
  },
  contentScene: {
    flex: 1,
    borderWidth: 1,
    justifyContent: "flex-end",
    maxWidth: Dimensions.get("window").width,
    width: Dimensions.get("window").width,
  },
  leafBlurImage: {
    position: "absolute",
    top: 0,
    aspectRatio: 325 / 411,
    width: Dimensions.get("window").width,
  },
  phoneImage: {
    alignSelf: "center",
    position: "absolute",
    top: 28,
    width: 261,
    aspectRatio: 261 / 540,
  },
  artworkImage: {
    position: "absolute",
    right: -12,
    top: 0,
    width: "100%",
    aspectRatio: 167 / 185,
  },
});
