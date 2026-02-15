import Close from "@/src/assets/svgs/close";
import Button from "@/src/components/Button";
import {
  HorizontalCardList,
  assets as horizontalCardListAssets,
  HorizontalCardListItem,
} from "@/src/components/horizontalCardList";
import Text from "@/src/components/Text";
import { COLORS } from "@/src/theme/colors";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { assets as paywallAssets } from "./assets";
import ProductItem from "./components/ProductItem";
import { PAYWALL_FEATURE_SEEDS, PAYWALL_PRODUCTS } from "./constants";
import usePaywallScreen from "./hooks/usePaywallScreen";

export default function PaywallScreen(): React.JSX.Element {
  const {
    selectedProductId,
    isInteractionDisabled,
    ctaText,
    onSelectProduct,
    onClosePress,
    onTermsPress,
    onPrivacyPress,
    onRestorePress,
    onCtaPress,
  } = usePaywallScreen();
  const { bottom, top } = useSafeAreaInsets();

  const FEATURES: HorizontalCardListItem[] = PAYWALL_FEATURE_SEEDS.map(
    (feature) => {
      const icon =
        feature.iconKey === "Scan" ? (
          <horizontalCardListAssets.svgs.Scan />
        ) : feature.iconKey === "Speedometer" ? (
          <horizontalCardListAssets.svgs.Speedometer />
        ) : (
          <horizontalCardListAssets.svgs.Leaf />
        );

      return {
        id: feature.id,
        icon,
        title: feature.title,
        desc: feature.desc,
      };
    },
  );

  const renderTitle = () => (
    <View style={styles.titleContainer}>
      <View style={styles.titleRow}>
        <Text
          variant="VisbyCFExtraBold"
          size="xlarge"
          style={styles.plantAppTitle}
        >
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

  const renderProductItem = ({
    item,
    index,
  }: ListRenderItemInfo<(typeof PAYWALL_PRODUCTS)[number]>) => {
    const isSelected = item.id === selectedProductId;

    return (
      <ProductItem
        item={item}
        isSelected={isSelected}
        onPress={() => onSelectProduct(item.id)}
        disabled={isInteractionDisabled}
        animationOrder={index}
      />
    );
  };

  const renderProducts = () => (
    <View style={styles.productsContainer}>
      <FlatList
        data={PAYWALL_PRODUCTS}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.productSeparator} />}
      />
    </View>
  );

  const renderProductInfoText = () => (
    <Text
      variant="RubikLight"
      size="xsmall"
      color="#FFFFFF85"
      style={styles.productInfoText}
    >
      After the 3-day free trial period you'll be charged ₺274.99 per year
      unless you cancel before the trial expires. Yearly Subscription is
      Auto-Renewable
    </Text>
  );

  const renderTermsPrivacyText = () => (
    <View style={styles.termsRow}>
      <Pressable
        onPress={onTermsPress}
        disabled={isInteractionDisabled}
        accessibilityRole="button"
      >
        <Text
          variant="RubikRegular"
          size="xsmall"
          color="#FFFFFF80"
          style={styles.termsPrivacyText}
        >
          Terms
        </Text>
      </Pressable>
      <Text variant="RubikRegular" size="xsmall" color="#FFFFFF80">
        {" • "}
      </Text>
      <Pressable
        onPress={onPrivacyPress}
        disabled={isInteractionDisabled}
        accessibilityRole="button"
      >
        <Text
          variant="RubikRegular"
          size="xsmall"
          color="#FFFFFF80"
          style={styles.termsPrivacyText}
        >
          Privacy
        </Text>
      </Pressable>
      <Text variant="RubikRegular" size="xsmall" color="#FFFFFF80">
        {" • "}
      </Text>
      <Pressable
        onPress={onRestorePress}
        disabled={isInteractionDisabled}
        accessibilityRole="button"
      >
        <Text
          variant="RubikRegular"
          size="xsmall"
          color="#FFFFFF80"
          style={styles.termsPrivacyText}
        >
          Restore
        </Text>
      </Pressable>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footerContainer}>
      {renderCta()}
      {renderProductInfoText()}
      {renderTermsPrivacyText()}
    </View>
  );

  const renderCta = () => (
    <Button
      text={ctaText}
      onPress={onCtaPress}
      disabled={isInteractionDisabled}
      loading={isInteractionDisabled}
    />
  );

  const renderBackgroundImage = () => (
    <Image
      source={paywallAssets.images.PaywallBackground}
      style={styles.backgroundImage}
    />
  );

  const renderCloseButton = () => (
    <Pressable
      onPress={onClosePress}
      style={[styles.closeButton, { top: top + 8 }]}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel="Close paywall"
      disabled={isInteractionDisabled}
    >
      <Close />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {renderBackgroundImage()}
      {renderCloseButton()}
      <View
        style={[
          styles.contentContainer,
          { paddingBottom: bottom, paddingTop: top + 8 },
        ]}
      >
        {renderTitle()}
        {renderFeatures()}
        {renderProducts()}
        {renderFooter()}
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
    alignItems: "baseline",
  },
  plantAppTitle: {
    textTransform: "capitalize",
    color: COLORS.WHITE,
    lineHeight: 32,
    includeFontPadding: false,
    textAlignVertical: "bottom",
  },
  premiumTitle: {
    textTransform: "capitalize",
    color: COLORS.WHITE,
    lineHeight: 32,
    includeFontPadding: false,
    textAlignVertical: "bottom",
  },
  description: {
    marginTop: 4,
    color: "#FFFFFFB2",
    letterSpacing: 0.38,
  },
  featuresContainer: {
    width: "100%",
    marginTop: 24,
  },
  productsContainer: {
    width: "100%",
    marginTop: 24,
    paddingHorizontal: 24,
  },
  productSeparator: {
    height: 16,
  },
  footerContainer: {
    marginTop: 26,
    width: "100%",
    paddingHorizontal: 24,
    zIndex: 1,
  },
  productInfoText: {
    textAlign: "center",
    alignSelf: "center",
    marginTop: 8,
  },
  termsPrivacyText: {
    textAlign: "center",
    alignSelf: "center",
  },
  termsRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    right: 16,
    zIndex: 2,
  },
});
