import React from "react";
import {
  FlatList,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

type GridCell<TItem> =
  | {
      type: "item";
      key: string;
      value: TItem;
      originalIndex: number;
    }
  | {
      type: "spacer";
      key: string;
    };

type TwoColumnGridProps<TItem> = {
  data: TItem[];
  keyExtractor: (item: TItem, index: number) => string;
  renderItem: (item: TItem, index: number) => React.ReactElement;
  contentContainerStyle?: StyleProp<ViewStyle>;
  columnSpacing?: number;
  rowSpacing?: number;
  scrollEnabled?: boolean;
};

export default function TwoColumnGrid<TItem>({
  data,
  keyExtractor,
  renderItem,
  contentContainerStyle,
  columnSpacing = 10,
  rowSpacing = 10,
  scrollEnabled = true,
}: TwoColumnGridProps<TItem>): React.JSX.Element {
  const cells: GridCell<TItem>[] = data.map((item, index) => ({
    type: "item",
    key: keyExtractor(item, index),
    value: item,
    originalIndex: index,
  }));

  if (cells.length % 2 !== 0) {
    cells.push({
      type: "spacer",
      key: "__grid_spacer__",
    });
  }

  return (
    <FlatList
      data={cells}
      keyExtractor={(item) => item.key}
      numColumns={2}
      scrollEnabled={scrollEnabled}
      contentContainerStyle={contentContainerStyle}
      columnWrapperStyle={[styles.row, { gap: columnSpacing }]}
      ItemSeparatorComponent={() => <View style={{ height: rowSpacing }} />}
      renderItem={({ item }) => (
        <View style={styles.cell}>
          {item.type === "spacer" ? (
            <View style={styles.spacer} />
          ) : (
            renderItem(item.value, item.originalIndex)
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: "stretch",
  },
  cell: {
    flex: 1,
  },
  spacer: {
    flex: 1,
  },
});
