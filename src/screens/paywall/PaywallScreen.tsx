import Text from "@/src/components/Text";
import {
  HorizontalCardList,
  assets as horizontalCardListAssets,
  HorizontalCardListItem,
} from "@/src/components/horizontalCardList";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { assets as paywallAssets } from "./assets";

const FEATURES: HorizontalCardListItem[] = [
  {
    id: "scan",
    icon: <horizontalCardListAssets.svgs.Scan />,
    title: "Unlimited",
    desc: "Plant Identify",
  },
  {
    id: "speed",
    icon: <horizontalCardListAssets.svgs.Speedometer />,
    title: "Faster",
    desc: "Process",
  },
  {
    id: "leaf",
    icon: <horizontalCardListAssets.svgs.Leaf />,
    title: "Detailed",
    desc: "Plant care",
  },
];

export default function PaywallScreen(): React.JSX.Element {
  const renderTitle = () => (
    <View style={styles.titleContainer}>
      <View style={styles.titleRow}>
        <Text variant="RubikBold" size="large" style={styles.plantAppTitle}>
          PlantApp{" "}
        </Text>
        <Text variant="RubikLight" size="xlarge" style={styles.premiumTitle}>
          Premium
        </Text>
      </View>
      <Text variant="RubikLight" size="medium" style={styles.description}>
        Access All Features
      </Text>
    </View>
  );

  const renderFeatures = () => (
    <View style={styles.featuresContainer}>
      <HorizontalCardList list={FEATURES} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Image
        source={paywallAssets.images.PaywallBackground}
        style={styles.backgroundImage}
      />
      <View style={styles.contentContainer}>
        {renderTitle()}
        {renderFeatures()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#101E17",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get("window").width,
    aspectRatio: 375 / 490,
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  titleContainer: {
    width: "100%",
    paddingHorizontal: 24,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  plantAppTitle: {
    textTransform: "capitalize",
    color: "#FFFFFF",
  },
  premiumTitle: {
    textTransform: "capitalize",
    color: "#FFFFFF",
  },
  description: {
    marginTop: 4,
    color: "#FFFFFF",
  },
  featuresContainer: {
    width: "100%",
    marginTop: 24,
    marginBottom: 24,
  },
});
