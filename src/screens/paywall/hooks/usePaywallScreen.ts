import { sleep } from "@/src/hooks/sleep";
import { INTERNAL_TAB_ROUTES, ROOT_ROUTES } from "@/src/navigation/routeNames";
import { RootStackParamList } from "@/src/navigation/types";
import {
    DEFAULT_SELECTED_PRODUCT_ID,
    PRODUCT_IDS,
} from "@/src/screens/paywall/constants";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useMemo, useState } from "react";
import { Alert } from "react-native";

const YEARLY_CTA_TEXT = "Try free for 3 days";
const MONTHLY_CTA_TEXT = "$2.99/month";

const PURCHASE_ALERT_TITLE = "Purchase successful";
const PURCHASE_ALERT_MESSAGE = "Your purchase has been completed successfully.";
const TERMS_ALERT_TITLE = "Terms";
const TERMS_ALERT_MESSAGE = "Terms of use opened.";
const PRIVACY_ALERT_TITLE = "Privacy";
const PRIVACY_ALERT_MESSAGE = "Privacy policy opened.";
const RESTORE_ALERT_TITLE = "Restore";
const RESTORE_ALERT_MESSAGE = "Restore purchase started.";

export default function usePaywallScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [selectedProductId, setSelectedProductId] = useState<string>(
    DEFAULT_SELECTED_PRODUCT_ID,
  );
  const [isInteractionDisabled, setIsInteractionDisabled] =
    useState<boolean>(false);

  const ctaText = useMemo(
    () =>
      selectedProductId === PRODUCT_IDS.monthly
        ? MONTHLY_CTA_TEXT
        : YEARLY_CTA_TEXT,
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
    navigation.navigate(ROOT_ROUTES.INTERNAL_SCREENS, {
      screen: INTERNAL_TAB_ROUTES.HOME,
    });
  }, [isInteractionDisabled, navigation]);

  const onTermsPress = useCallback(() => {
    if (isInteractionDisabled) {
      return;
    }
    Alert.alert(TERMS_ALERT_TITLE, TERMS_ALERT_MESSAGE);
  }, [isInteractionDisabled]);

  const onPrivacyPress = useCallback(() => {
    if (isInteractionDisabled) {
      return;
    }
    Alert.alert(PRIVACY_ALERT_TITLE, PRIVACY_ALERT_MESSAGE);
  }, [isInteractionDisabled]);

  const onRestorePress = useCallback(() => {
    if (isInteractionDisabled) {
      return;
    }
    Alert.alert(RESTORE_ALERT_TITLE, RESTORE_ALERT_MESSAGE);
  }, [isInteractionDisabled]);

  const onCtaPress = useCallback(async () => {
    if (isInteractionDisabled) {
      return;
    }

    try {
      setIsInteractionDisabled(true);
      await sleep(3000);
      Alert.alert(PURCHASE_ALERT_TITLE, PURCHASE_ALERT_MESSAGE);
    } finally {
      setIsInteractionDisabled(false);
    }
  }, [isInteractionDisabled]);

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
