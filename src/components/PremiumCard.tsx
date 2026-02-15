import Text from "@/src/components/Text";
import Mail from "@/src/screens/home/assets/svgs/mail";
import RightArrow from "@/src/screens/home/assets/svgs/rightArrow";
import { COLORS } from "@/src/theme/colors";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

const PREMIUM_CARD_ANIMATION_DURATION = 620;
const PREMIUM_CARD_ANIMATION_DELAY = 80;
const MAIL_BADGE_BOUNCE_DELAY = 500;
const MAIL_BADGE_BOUNCE_UP_DURATION = 120;
const MAIL_BADGE_BOUNCE_DOWN_DURATION = 500;
const MAIL_BADGE_BOUNCE_SCALE = 1.32;

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
  const entranceAnimation = useRef(new Animated.Value(0)).current;
  const mailBadgeScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(entranceAnimation, {
      toValue: 1,
      duration: PREMIUM_CARD_ANIMATION_DURATION,
      delay: PREMIUM_CARD_ANIMATION_DELAY,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [entranceAnimation]);

  useEffect(() => {
    Animated.sequence([
      Animated.delay(MAIL_BADGE_BOUNCE_DELAY),
      Animated.timing(mailBadgeScale, {
        toValue: MAIL_BADGE_BOUNCE_SCALE,
        duration: MAIL_BADGE_BOUNCE_UP_DURATION,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(mailBadgeScale, {
        toValue: 1,
        duration: MAIL_BADGE_BOUNCE_DOWN_DURATION,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, [mailBadgeScale]);

  const animatedStyle = {
    opacity: entranceAnimation,
    transform: [
      {
        translateY: entranceAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [10, 0],
        }),
      },
      {
        scale: entranceAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.98, 1],
        }),
      },
    ],
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        disabled={!onPress}
        onPress={onPress}
        style={[styles.container, style]}
        accessibilityRole={onPress ? "button" : undefined}
      >
        <View style={styles.leftContent}>
          <View style={styles.mailIconWrapper}>
            <Mail />
            <Animated.View
              style={[
                styles.mailCountBadge,
                { transform: [{ scale: mailBadgeScale }] },
              ]}
            >
              <Text
                variant="RubikBold"
                size="xsmall"
                style={styles.mailCountText}
              >
                {mailCount}
              </Text>
            </Animated.View>
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
            <Text
              variant="RubikRegular"
              size="small"
              style={styles.description}
            >
              {desc}
            </Text>
          </View>
        </View>

        <RightArrow color="#E4B046" width={24} height={24} />
      </Pressable>
    </Animated.View>
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
    color: COLORS.WHITE,
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
