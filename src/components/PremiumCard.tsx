import Text from "@/src/components/Text";
import Mail from "@/src/screens/home/assets/svgs/mail";
import RightArrow from "@/src/screens/home/assets/svgs/rightArrow";
import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

type PremiumCardProps = {
  text: string;
  desc: string;
  mailCount: number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function PremiumCard({
  text,
  desc,
  mailCount,
  onPress,
  style,
}: PremiumCardProps): React.JSX.Element {
  return (
    <Pressable
      disabled={!onPress}
      onPress={onPress}
      style={[styles.container, style]}
      accessibilityRole={onPress ? "button" : undefined}
    >
      <View style={styles.leftContent}>
        <View style={styles.mailIconWrapper}>
          <Mail />
          <View style={styles.mailCountBadge}>
            <Text
              variant="RubikBold"
              size="xsmall"
              style={styles.mailCountText}
            >
              {mailCount}
            </Text>
          </View>
        </View>

        <View style={styles.textContent}>
          <View style={styles.titleRow}>
            <Text variant="RubikBold" size="medium" style={styles.freeTitle}>
              FREE
            </Text>
            <Text
              variant="RubikSemiBold"
              size="medium"
              style={styles.premiumTitle}
            >
              {text}
            </Text>
          </View>
          <Text variant="RubikRegular" size="small" style={styles.description}>
            {desc}
          </Text>
        </View>
      </View>

      <RightArrow color="#E4B046" width={24} height={24} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#24201A",
    borderRadius: 12,
    paddingVertical: 13,
    paddingRight: 13,
    paddingLeft: 20,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flexShrink: 1,
  },
  mailIconWrapper: {
    position: "relative",
  },
  mailCountBadge: {
    position: "absolute",
    width: 15,
    height: 15,
    left: 32,
    borderRadius: 100,
    backgroundColor: "#E82C13E5",
    alignItems: "center",
    justifyContent: "center",
  },
  mailCountText: {
    fontSize: 9,
    lineHeight: 11,
    color: "#FFFFFF",
  },
  textContent: {
    gap: 4,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  freeTitle: {
    color: "#E4B046",
  },
  premiumTitle: {
    color: "#E4B046",
  },
  description: {
    color: "#F5C25B",
  },
});
