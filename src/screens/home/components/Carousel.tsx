import Text from "@/src/components/Text";
import { Article, getArticles } from "@/src/services";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

export default function Carousel(): React.JSX.Element {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isMountedRef = useRef<boolean>(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const preloadArticleImages = useCallback(async (nextArticles: Article[]) => {
    await Promise.allSettled(
      nextArticles.map((article) => Image.prefetch(article.imageUri)),
    );
  }, []);

  const fetchArticles = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    const response = await getArticles();

    if (!isMountedRef.current) {
      return;
    }

    if (!response.isSuccess) {
      setErrorMessage(response.error);
      setArticles([]);
      setIsLoading(false);
      return;
    }

    await preloadArticleImages(response.data);

    if (!isMountedRef.current) {
      return;
    }

    setArticles(response.data);
    setIsLoading(false);
  }, [preloadArticleImages]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const handlePress = useCallback(async (uri: string) => {
    const canOpen = await Linking.canOpenURL(uri);

    if (!canOpen) {
      return;
    }

    await Linking.openURL(uri);
  }, []);

  return (
    <View style={styles.container}>
      <Text variant="RubikMedium" style={styles.title}>
        Get Started
      </Text>

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
          <Pressable onPress={fetchArticles}>
            <Text variant="RubikMedium" style={styles.retryText}>
              Retry
            </Text>
          </Pressable>
        </View>
      )}

      {!isLoading && !errorMessage && articles.length === 0 && (
        <View style={styles.feedbackContainer}>
          <Text variant="RubikRegular" style={styles.feedbackText}>
            No articles found.
          </Text>
        </View>
      )}

      {!isLoading && !errorMessage && articles.length > 0 && (
        <FlatList
          data={articles}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
              ]}
              onPress={() => void handlePress(item.uri)}
            >
              <Image source={{ uri: item.imageUri }} style={styles.cardImage} />
              <View style={styles.cardTitleContainer}>
                <Text variant="RubikMedium" style={styles.cardTitle}>
                  {item.title}
                </Text>
              </View>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
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
  listContent: {
    paddingHorizontal: 24,
  },
  separator: {
    width: 10,
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
  card: {
    width: 240,
    aspectRatio: 240 / 164,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },
  cardPressed: {
    opacity: 0.8,
  },
  cardImage: {
    ...StyleSheet.absoluteFillObject,
  },
  cardTitleContainer: {
    position: "absolute",
    bottom: 13,
    left: 14,
    right: 14,
    minHeight: 40,
    justifyContent: "center",
  },
  cardTitle: {
    color: "#FFFFFF",
  },
});
