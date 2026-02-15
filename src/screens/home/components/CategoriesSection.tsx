import Text from "@/src/components/Text";
import { PlantCategory, getPlantCategories } from "@/src/services";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import PlantCategoryCard from "./PlantCategoryCard";
import TwoColumnGrid from "./TwoColumnGrid";

const CATEGORIES_ANIMATION_DURATION = 680;
const CATEGORIES_ANIMATION_DELAY = 220;

export default function CategoriesSection(): React.JSX.Element {
  const [categories, setCategories] = useState<PlantCategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isMountedRef = useRef<boolean>(true);
  const entranceAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(entranceAnimation, {
      toValue: 1,
      duration: CATEGORIES_ANIMATION_DURATION,
      delay: CATEGORIES_ANIMATION_DELAY,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    return () => {
      isMountedRef.current = false;
    };
  }, [entranceAnimation]);

  const preloadCategoryImages = useCallback(
    async (nextItems: PlantCategory[]) => {
      await Promise.allSettled(
        nextItems
          .filter((category) => category.imageUrl.length > 0)
          .map((category) => Image.prefetch(category.imageUrl)),
      );
    },
    [],
  );

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    const response = await getPlantCategories();

    if (!isMountedRef.current) {
      return;
    }

    if (!response.isSuccess) {
      setErrorMessage(response.error);
      setCategories([]);
      setIsLoading(false);
      return;
    }

    await preloadCategoryImages(response.data);

    if (!isMountedRef.current) {
      return;
    }

    setCategories(response.data);
    setIsLoading(false);
  }, [preloadCategoryImages]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const animatedStyle = {
    opacity: entranceAnimation,
    transform: [
      {
        translateY: entranceAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [10, 0],
        }),
      },
    ],
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {isLoading && (
        <View style={styles.feedbackContainer}>
          <ActivityIndicator size="small" color="#13231B" />
        </View>
      )}

      {!isLoading && errorMessage && (
        <View style={styles.feedbackContainer}>
          <Text variant="RubikRegular" style={styles.feedbackText}>
            {errorMessage}
          </Text>
          <Pressable onPress={fetchCategories}>
            <Text variant="RubikMedium" style={styles.retryText}>
              Retry
            </Text>
          </Pressable>
        </View>
      )}

      {!isLoading && !errorMessage && categories.length === 0 && (
        <View style={styles.feedbackContainer}>
          <Text variant="RubikRegular" style={styles.feedbackText}>
            No categories found.
          </Text>
        </View>
      )}

      {!isLoading && !errorMessage && categories.length > 0 && (
        <TwoColumnGrid
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          columnSpacing={11}
          rowSpacing={10}
          contentContainerStyle={styles.gridContent}
          renderItem={(item) => (
            <PlantCategoryCard title={item.title} imageUrl={item.imageUrl} />
          )}
        />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  title: {
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.24,
    marginBottom: 14,
    paddingHorizontal: 24,
    color: "#13231B",
  },
  gridContent: {
    paddingHorizontal: 24,
  },
  feedbackContainer: {
    minHeight: 64,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    gap: 8,
  },
  feedbackText: {
    fontSize: 14,
    lineHeight: 18,
    color: "#6D6D6D",
    textAlign: "center",
  },
  retryText: {
    fontSize: 14,
    lineHeight: 18,
    color: "#13231B",
  },
});
