import Button from "@/src/components/Button";
import { ROOT_ROUTES } from "@/src/navigation/routeNames";
import { RootStackParamList } from "@/src/navigation/types";
import OnboardingFirstTab from "@/src/screens/onboarding/components/OnboardingFirstTab";
import OnboardingSecondTab from "@/src/screens/onboarding/components/OnboardingSecondTab";
import { COLORS } from "@/src/theme/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo, useRef, useState } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const DOT_COUNT = 3;

const TABS = [OnboardingFirstTab, OnboardingSecondTab];

export default function OnboardingScreen(): React.JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { width } = useWindowDimensions();
  const { bottom: bottomInset, top: topInset } = useSafeAreaInsets();

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<ICarouselInstance>(null);

  const onContinuePress = () => {
    if (currentIndex < TABS.length - 1) {
      carouselRef.current?.scrollTo({
        count: currentIndex + 1,
        animated: true,
      });
      return;
    }

    navigation.navigate(ROOT_ROUTES.PAYWALL);
  };

  const dotIndexes = useMemo(
    () => Array.from({ length: DOT_COUNT }, (_, i) => i),
    [],
  );

  const renderItem = ({
    item: TabComponent,
  }: {
    item: (typeof TABS)[number];
  }) => <TabComponent />;

  const renderDotIndicators = () => (
    <View style={styles.dotRow}>
      {dotIndexes.map((dotIndex) => {
        const isActive = dotIndex === currentIndex;

        return (
          <View
            key={`onboarding-dot-${dotIndex}`}
            style={[
              styles.dot,
              isActive ? styles.dotActive : styles.dotInactive,
            ]}
          />
        );
      })}
    </View>
  );

  const renderFooter = () => (
    <View style={[styles.footerContainer, { bottom: bottomInset + 12.5 }]}>
      {currentIndex === 1 ? (
        <LinearGradient
          colors={["rgba(255, 255, 255, 0)", "#FFFFFF"]}
          locations={[0.002, 0.6723]}
          pointerEvents="none"
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.footerGradient}
        />
      ) : null}
      <View style={styles.footerContent}>
        <Button text="Continue" onPress={onContinuePress} />
        {renderDotIndicators()}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: topInset + 12 }]}>
      <View style={styles.carouselContainer}>
        <Carousel
          ref={carouselRef}
          width={width}
          data={TABS}
          loop={false}
          onSnapToItem={setCurrentIndex}
          pagingEnabled
          renderItem={renderItem}
        />
      </View>

      {renderFooter()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  carouselContainer: {
    flex: 1,
  },
  footerContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 1,
  },
  footerContent: {
    gap: 32.5,
    paddingHorizontal: 24,
    zIndex: 1,
  },
  footerGradient: {
    bottom: -12.5,
    height: 235,
    left: 0,
    position: "absolute",
    right: 0,
  },
  dotRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
  },
  dot: {
    borderRadius: 999,
  },
  dotActive: {
    backgroundColor: COLORS.MAIN_TEXT_COLOR,
    height: 10,
    width: 10,
  },
  dotInactive: {
    backgroundColor: "#13231B40",
    height: 6,
    width: 6,
  },
});
