import { sleep } from "@/src/hooks/sleep";
import { ROOT_ROUTES } from "@/src/navigation/routeNames";
import { RootStackParamList } from "@/src/navigation/types";
import {
  DEFAULT_SELECTED_PRODUCT_ID,
  PRODUCT_IDS,
} from "@/src/screens/paywall/constants";
import { useAppDispatch } from "@/src/store/hooks";
import {
  setIsSubscriber,
  setOnboardingCompleted,
} from "@/src/store/slices/userStatusSlice";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useMemo, useState } from "react";
import { Alert } from "react-native";

export default function usePaywallScreen() {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route =
    useRoute<RouteProp<RootStackParamList, typeof ROOT_ROUTES.PAYWALL>>();

  const [selectedProductId, setSelectedProductId] = useState<string>(
    DEFAULT_SELECTED_PRODUCT_ID,
  );
  const [isInteractionDisabled, setIsInteractionDisabled] =
    useState<boolean>(false);

  const ctaText = useMemo(
    () =>
      selectedProductId === PRODUCT_IDS.monthly
        ? "$2.99/month"
        : "Try free for 3 days",
    [selectedProductId],
  );

  const onSelectProduct = useCallback(
    (productId: string) => {
      if (isInteractionDisabled) {
        return;
      }
      setSelectedProductId(productId);
    },
    [isInteractionDisabled],
  );

  const onClosePress = useCallback(() => {
    if (isInteractionDisabled) {
      return;
    }

    if (route.params?.source === "onboarding") {
      dispatch(setOnboardingCompleted(true));
      navigation.reset({
        index: 0,
        routes: [{ name: ROOT_ROUTES.INTERNAL_SCREENS }],
      });
      return;
    }

    navigation.goBack();
  }, [dispatch, isInteractionDisabled, navigation, route.params?.source]);

  const onTermsPress = useCallback(() => {
    if (isInteractionDisabled) {
      return;
    }
    Alert.alert("Terms", "Terms of use opened.");
  }, [isInteractionDisabled]);

  const onPrivacyPress = useCallback(() => {
    if (isInteractionDisabled) {
      return;
    }
    Alert.alert("Privacy", "Privacy policy opened.");
  }, [isInteractionDisabled]);

  const onRestorePress = useCallback(() => {
    if (isInteractionDisabled) {
      return;
    }
    Alert.alert("Restore", "Restore purchase started.");
  }, [isInteractionDisabled]);

  const onCtaPress = useCallback(async () => {
    if (isInteractionDisabled) {
      return;
    }

    try {
      setIsInteractionDisabled(true);
      //? For testing purposes
      await sleep(2000);
      dispatch(setIsSubscriber(true));

      if (route.params?.source === "onboarding") {
        dispatch(setOnboardingCompleted(true));
      }

      Alert.alert(
        "Purchase successful",
        "Your purchase has been completed successfully.",
      );

      if (route.params?.source === "onboarding") {
        navigation.reset({
          index: 0,
          routes: [{ name: ROOT_ROUTES.INTERNAL_SCREENS }],
        });
        return;
      }

      navigation.goBack();
    } finally {
      setIsInteractionDisabled(false);
    }
  }, [dispatch, isInteractionDisabled, navigation, route.params?.source]);

  return {
    selectedProductId,
    isInteractionDisabled,
    ctaText,
    onSelectProduct,
    onClosePress,
    onTermsPress,
    onPrivacyPress,
    onRestorePress,
    onCtaPress,
  };
}
