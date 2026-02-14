import Button from "@/src/components/Button";
import Text from "@/src/components/Text";
import {
  HorizontalCardList,
  assets as horizontalCardListAssets,
  HorizontalCardListItem,
} from "@/src/components/horizontalCardList";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { assets as paywallAssets } from "./assets";
import ProductItem, { PaywallProductItem } from "./components/ProductItem";

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

const PRODUCTS: PaywallProductItem[] = [
  {
    id: "monthly",
    title: "1 Month",
    description: "$2.99/month, auto renewable",
  },
  {
    id: "yearly",
    title: "1 Year",
    description: "First 3 days free, then $529,99/year",
    isSaveTag: true,
  },
];

export default function PaywallScreen(): React.JSX.Element {
  const [selectedProductId, setSelectedProductId] = useState<string>(
    PRODUCTS[1]?.id ?? "",
  );
  const { bottom, top } = useSafeAreaInsets();

  const onContinuePress = () => {};

  const renderTitle = () => (
    <View style={styles.titleContainer}>
      <View style={styles.titleRow}>
        <Text variant="RubikMedium" size="large" style={styles.plantAppTitle}>
          PlantApp{" "}
        </Text>
        <Text variant="RubikLight" size="xlarge" style={styles.premiumTitle}>
          Premium
        </Text>
      </View>
      <Text variant="RubikRegular" size="medium" style={styles.description}>
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
  }: ListRenderItemInfo<PaywallProductItem>) => {
    const isSelected = item.id === selectedProductId;

    return (
      <ProductItem
        item={item}
        isSelected={isSelected}
        onPress={() => setSelectedProductId(item.id)}
      />
    );
  };

  const renderProducts = () => (
    <View style={styles.productsContainer}>
      <FlatList
        data={PRODUCTS}
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
      After the 3-day free trial period you’ll be charged ₺274.99 per year
      unless you cancel before the trial expires. Yearly Subscription is
      Auto-Renewable
    </Text>
  );

  const renderTermsPrivacyText = () => (
    <Text
      variant="RubikRegular"
      size="xsmall"
      color="#FFFFFF80"
      style={styles.termsPrivacyText}
    >
      Terms • Privacy • Restore
    </Text>
  );

  const renderFooter = () => (
    <View style={styles.footerContainer}>
      {renderCta()}
      {renderProductInfoText()}
      {renderTermsPrivacyText()}
    </View>
  );

  const renderCta = () => (
    <Button text="Try free for 3 days" onPress={onContinuePress} />
  );

  const renderBackgroundImage = () => (
    <Image
      source={paywallAssets.images.PaywallBackground}
      style={styles.backgroundImage}
    />
  );

  return (
    <View style={styles.container}>
      {renderBackgroundImage()}
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
    marginTop: 10,
    textAlign: "center",
    alignSelf: "center",
  },
});
