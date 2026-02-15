import Text from "@/src/components/Text";
import { assets } from "@/src/screens/onboarding/assets";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function OnboardingSecondTab(): React.JSX.Element {
  const { top: topInset } = useSafeAreaInsets();

  const renderTitle = () => (
    <View style={[styles.titleContainer, { paddingTop: topInset + 12 }]}>
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
      <Image
        source={assets.images.secondTabContent}
        style={styles.contentImage}
        resizeMode="contain"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Image
        source={assets.images.secondTabBackground}
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
    justifyContent: "center",
  },
  contentImage: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
});
