import Text from "@/src/components/Text";
import { PaywallProduct } from "@/src/screens/paywall/constants";
import { COLORS } from "@/src/theme/colors";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

type ProductItemProps = {
  item: PaywallProduct;
  isSelected: boolean;
  onPress: () => void;
  disabled?: boolean;
};

export default function ProductItem({
  item,
  isSelected,
  onPress,
  disabled = false,
}: ProductItemProps): React.JSX.Element {
  const renderContent = (
    <>
      {item.isSaveTag ? (
        <View style={styles.saveTagContainer}>
          <Text variant="RubikMedium" size="small" style={styles.saveTagText}>
            Save 50%
          </Text>
        </View>
      ) : null}
      <View
        style={[
          styles.productInnerContent,
          isSelected ? styles.productInnerContentSelected : undefined,
        ]}
      >
        <View
          style={[
            styles.radioButton,
            isSelected ? styles.radioButtonSelected : undefined,
          ]}
        >
          {isSelected ? <View style={styles.radioInnerDot} /> : null}
        </View>
        <View style={styles.productTextContainer}>
          <Text variant="RubikMedium" size="medium" style={styles.productTitle}>
            {item.title}
          </Text>
          <Text
            variant="RubikRegular"
            size="small"
            style={styles.productDescription}
          >
            {item.description}
          </Text>
        </View>
      </View>
    </>
  );

  return (
    <Pressable
      onPress={onPress}
      style={styles.productPressable}
      disabled={disabled}
    >
      {isSelected ? (
        <LinearGradient
          colors={["rgba(40, 175, 110, 0.168)", "rgba(40, 175, 110, 0)"]}
          locations={[0, 0.6851]}
          start={{ x: 1, y: 0.5 }}
          end={{ x: 0, y: 0.5 }}
          style={[styles.productCard, styles.productCardSelected]}
        >
          {renderContent}
        </LinearGradient>
      ) : (
        <View style={styles.productCard}>{renderContent}</View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  productPressable: {
    width: "100%",
  },
  productCard: {
    width: "100%",
    minHeight: 70,
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: "#FFFFFF70",
    overflow: "hidden",
    justifyContent: "center",
  },
  productCardSelected: {
    borderWidth: 1.5,
    borderColor: COLORS.MAIN_COLOR,
  },
  productInnerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14.5,
    paddingVertical: 12.5,
  },
  productInnerContentSelected: {
    paddingHorizontal: 13.5,
    paddingVertical: 11.5,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#FFFFFFAA",
    marginRight: 12,
    backgroundColor: "transparent",
  },
  radioButtonSelected: {
    backgroundColor: COLORS.MAIN_COLOR,
    borderColor: COLORS.MAIN_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInnerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },
  productTextContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  productTitle: {
    color: "#FFFFFF",
  },
  productDescription: {
    marginTop: 1,
    color: "#FFFFFFCC",
  },
  saveTagContainer: {
    position: "absolute",
    top: -0.2,
    right: 0,
    minWidth: 77,
    backgroundColor: COLORS.MAIN_COLOR,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  saveTagText: {
    color: "#FFFFFF",
  },
});
