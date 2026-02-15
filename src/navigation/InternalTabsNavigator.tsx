import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import CreateScreen from "@/src/screens/CreateScreen";
import DiagnoseScreen from "@/src/screens/DiagnoseScreen";
import HomeScreen from "@/src/screens/home/HomeScreen";
import MyGardenScreen from "@/src/screens/MyGardenScreen";
import ProfileScreen from "@/src/screens/ProfileScreen";

import TabBar from "./components/TabBar";
import { INTERNAL_TAB_ROUTES } from "./routeNames";
import { InternalTabParamList } from "./types";

const Tab = createBottomTabNavigator<InternalTabParamList>();

export default function InternalTabsNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      initialRouteName={INTERNAL_TAB_ROUTES.HOME}
      screenOptions={{ headerShown: false, animation: "fade" }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen component={HomeScreen} name={INTERNAL_TAB_ROUTES.HOME} />
      <Tab.Screen
        component={DiagnoseScreen}
        name={INTERNAL_TAB_ROUTES.DIAGNOSE}
      />
      <Tab.Screen component={CreateScreen} name={INTERNAL_TAB_ROUTES.CREATE} />
      <Tab.Screen
        component={MyGardenScreen}
        name={INTERNAL_TAB_ROUTES.MY_GARDEN}
      />
      <Tab.Screen
        component={ProfileScreen}
        name={INTERNAL_TAB_ROUTES.PROFILE}
      />
    </Tab.Navigator>
  );
}
