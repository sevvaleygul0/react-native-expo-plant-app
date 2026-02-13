import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function DiagnoseScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diagnose</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
});
