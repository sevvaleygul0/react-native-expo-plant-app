import { NavigatorScreenParams } from "@react-navigation/native";

import { INTERNAL_TAB_ROUTES, ROOT_ROUTES } from "./routeNames";

export type InternalTabParamList = {
  [INTERNAL_TAB_ROUTES.CREATE]: undefined;
  [INTERNAL_TAB_ROUTES.DIAGNOSE]: undefined;
  [INTERNAL_TAB_ROUTES.HOME]: undefined;
  [INTERNAL_TAB_ROUTES.MY_GARDEN]: undefined;
  [INTERNAL_TAB_ROUTES.PROFILE]: undefined;
};

export type RootStackParamList = {
  [ROOT_ROUTES.INTERNAL_SCREENS]:
    | NavigatorScreenParams<InternalTabParamList>
    | undefined;
  [ROOT_ROUTES.ONBOARDING]: undefined;
  [ROOT_ROUTES.ONBOARDING_WELCOME]: undefined;
  [ROOT_ROUTES.PAYWALL]: undefined;
};
