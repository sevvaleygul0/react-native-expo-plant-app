import Text from "@/src/components/Text";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

type PlantCategoryCardProps = {
  title: string;
  imageUrl: string;
  onPress?: () => void;
};

export default function PlantCategoryCard({
  title,
  imageUrl,
  onPress,
}: PlantCategoryCardProps): React.JSX.Element {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.container}
    >
      <View style={styles.titleWrap}>
        <Text variant="RubikMedium" size="medium" style={styles.title}>
          {title}
        </Text>
      </View>
      {imageUrl.length > 0 && (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 152,
    borderWidth: 1,
    borderColor: "#EEF0EF",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-start",
  },
  titleWrap: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 12,
    zIndex: 1,
  },
  title: {
    lineHeight: 21,
    letterSpacing: -0.32,
    color: "#13231B",
  },
  image: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: "70%",
    height: "90%",
  },
});
