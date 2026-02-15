import Button from "@/src/components/Button";
import { ROOT_ROUTES } from "@/src/navigation/routeNames";
import { RootStackParamList } from "@/src/navigation/types";
import { useAppDispatch } from "@/src/store/hooks";
import { resetUserStatus } from "@/src/store/slices/userStatusSlice";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ProfileScreen(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onLogoutPress = () => {
    dispatch(resetUserStatus());
    navigation.reset({
      index: 0,
      routes: [{ name: ROOT_ROUTES.ONBOARDING_WELCOME }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Button
        text="Logout"
        onPress={onLogoutPress}
        style={styles.logoutButton}
        bgColor="#E65B5B"
      />
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
  logoutButton: {
    marginTop: 24,
    width: 200,
  },
});
