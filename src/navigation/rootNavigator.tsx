import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import OnboardingScreen from "@/src/screens/onboarding/OnboardingScreen";
import OnboardingWelcomeScreen from "@/src/screens/onboarding/welcome/OnboardingWelcomeScreen";
import PaywallScreen from "@/src/screens/paywall/PaywallScreen";
import { useAppSelector } from "@/src/store/hooks";

import InternalTabsNavigator from "./InternalTabsNavigator";
import { ROOT_ROUTES } from "./routeNames";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator(): React.JSX.Element {
  const onboardingCompleted = useAppSelector(
    (state) => state.userStatus.onboardingCompleted,
  );

  return (
    <Stack.Navigator
      initialRouteName={
        onboardingCompleted
          ? ROOT_ROUTES.INTERNAL_SCREENS
          : ROOT_ROUTES.ONBOARDING_WELCOME
      }
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        component={OnboardingWelcomeScreen}
        name={ROOT_ROUTES.ONBOARDING_WELCOME}
      />
      <Stack.Screen
        component={OnboardingScreen}
        name={ROOT_ROUTES.ONBOARDING}
      />
      <Stack.Screen component={PaywallScreen} name={ROOT_ROUTES.PAYWALL} />
      <Stack.Screen
        component={InternalTabsNavigator}
        name={ROOT_ROUTES.INTERNAL_SCREENS}
      />
    </Stack.Navigator>
  );
}
