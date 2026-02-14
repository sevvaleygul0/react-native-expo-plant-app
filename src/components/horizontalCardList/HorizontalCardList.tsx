import Text from "@/src/components/Text";
import React from "react";
import {
  FlatList,
  ImageBackground,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from "react-native";
import { assets } from "./assets";

export type HorizontalCardListItem = {
  id?: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
};

type HorizontalCardListProps = {
  list: HorizontalCardListItem[];
};

export default function HorizontalCardList({
  list,
}: HorizontalCardListProps): React.JSX.Element {
  const renderItem = ({ item }: ListRenderItemInfo<HorizontalCardListItem>) => (
    <ImageBackground
      source={assets.images.background}
      style={styles.card}
      imageStyle={styles.cardImage}
    >
      <View style={styles.iconContainer}>{item.icon}</View>
      <View style={styles.textContainer}>
        <Text variant="RubikMedium" style={styles.title}>
          {item.title}
        </Text>
        <Text variant="RubikRegular" style={styles.desc}>
          {item.desc}
        </Text>
      </View>
    </ImageBackground>
  );

  return (
    <FlatList
      horizontal
      data={list}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      keyExtractor={(item, index) => item.id ?? `${item.title}-${index}`}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 24,
  },
  separator: {
    width: 8,
  },
  card: {
    width: 156,
    height: 130,
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 16,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    overflow: "hidden",
  },
  cardImage: {
    borderRadius: 14,
  },
  iconContainer: {
    width: 36,
    height: 35,
    borderRadius: 8,
    backgroundColor: "#0000003D",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    marginTop: 16,
    alignItems: "flex-start",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 20,
    lineHeight: 24,
  },
  desc: {
    marginTop: 4,
    color: "#FFFFFF",
    fontSize: 13,
    lineHeight: 16,
  },
});
