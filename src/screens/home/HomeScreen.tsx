import PremiumCard from "@/src/components/PremiumCard";
import Text from "@/src/components/Text";
import { COLORS } from "@/src/theme/colors";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { assets } from "./assets";
import Carousel from "./components/Carousel";

export default function HomeScreen(): React.JSX.Element {
  const { top: topInset } = useSafeAreaInsets();

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {renderBgImage()}
      {renderTitle()}
      {renderSearchBar()}
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchBarContainer}>
      <assets.svgs.Search />
      <Text variant="RubikRegular" style={styles.searchPlaceholder}>
        Search for plants
      </Text>
    </View>
  );

  const renderBgImage = () => (
    <Image
      source={assets.images.background}
      style={[styles.headerBackgroundImage, { top: 0 }]}
    />
  );

  const renderTitle = () => (
    <View style={[styles.titleContainer, { paddingTop: topInset + 3 }]}>
      <Text variant="RubikRegular" size="large" color={COLORS.MAIN_TEXT_COLOR}>
        Hi, plant lover!
      </Text>
      <Text variant="RubikMedium" size="large" color={COLORS.MAIN_TEXT_COLOR}>
        Good Afternoon! ⛅
      </Text>
    </View>
  );

  const renderPremiumCard = () => (
    <View style={styles.premiumCard}>
      <PremiumCard
        text="Premium Available"
        desc="Tap to upgrade your account!"
        mailCount={1}
      />
    </View>
  );

  return (
    <View style={[styles.container]}>
      {renderHeader()}
      <View style={styles.content}>
        {renderPremiumCard()}
        <Carousel />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFAFA",
  },
  content: {
    flex: 1,
    marginTop: 24,
    width: "100%",
  },
  headerContainer: {
    paddingHorizontal: 24,
  },
  titleContainer: {
    gap: 6,
  },
  searchBarContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFFE0",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 0.2,
    borderColor: "#3C3C4340",
    gap: 12,
    marginTop: 14,
  },
  searchPlaceholder: {
    color: "#AFAFAF",
    fontSize: 15.5,
    lineHeight: 15.5,
    letterSpacing: 0.07,
  },
  headerBackgroundImage: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get("window").width,
    height: 200,
  },
  premiumCard: {
    marginTop: 16,
    marginHorizontal: 24,
  },
});
