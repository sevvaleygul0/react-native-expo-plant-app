import Text from "@/src/components/Text";
import { assets } from "@/src/screens/onboarding/assets";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";

export default function OnboardingFirstTab(): React.JSX.Element {
  const renderTitle = () => (
    <View style={styles.titleContainer}>
      <View style={styles.titleLine}>
        <Text variant="RubikMedium" size="xlarge">
          Take a photo to{" "}
        </Text>
        <View style={styles.highlightWordContainer}>
          <Text variant="RubikExtraBold" size="xlarge">
            identify
          </Text>
          <Image source={assets.images.brush} style={styles.identifyBrush} />
        </View>
      </View>
      <Text variant="RubikMedium" size="xlarge">
        the plant!
      </Text>
    </View>
  );

  const renderContent = () => (
    <View style={styles.contentContainer}>
      <Image
        source={assets.images.firstTabContent}
        resizeMode="stretch"
        style={styles.contentImage}
      />
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
    justifyContent: "flex-end",
    width: "100%",
  },
  contentImage: {
    flex: 1,
    aspectRatio: 375 / 683,
    justifyContent: "flex-end",
    maxWidth: Dimensions.get("window").width,
    width: Dimensions.get("window").width,
  },
});
