import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgProps } from "react-native-svg";

import DiagnoseIcon from "@/src/assets/svgs/diagnose";
import GardenIcon from "@/src/assets/svgs/garden";
import HomeIcon from "@/src/assets/svgs/home";
import ProfileIcon from "@/src/assets/svgs/profile";
import ScanIcon from "@/src/assets/svgs/scan";
import Text from "@/src/components/Text";
import { INTERNAL_TAB_ROUTES } from "@/src/navigation/routeNames";
import { COLORS } from "@/src/theme/colors";

const TABBAR_HEIGHT = 50;

type TabRouteName =
  | typeof INTERNAL_TAB_ROUTES.HOME
  | typeof INTERNAL_TAB_ROUTES.DIAGNOSE
  | typeof INTERNAL_TAB_ROUTES.MY_GARDEN
  | typeof INTERNAL_TAB_ROUTES.PROFILE;

type SvgIconComponent = (props: SvgProps) => React.JSX.Element;

type TabbarItem = {
  label: string;
  Icon: SvgIconComponent;
};

const TABBAR_ITEMS: Record<TabRouteName, TabbarItem> = {
  [INTERNAL_TAB_ROUTES.HOME]: { Icon: HomeIcon, label: "Home" },
  [INTERNAL_TAB_ROUTES.DIAGNOSE]: { Icon: DiagnoseIcon, label: "Diagnose" },
  [INTERNAL_TAB_ROUTES.MY_GARDEN]: { Icon: GardenIcon, label: "My Garden" },
  [INTERNAL_TAB_ROUTES.PROFILE]: { Icon: ProfileIcon, label: "Profile" },
};

const TAB_ORDER: TabRouteName[] = [
  INTERNAL_TAB_ROUTES.HOME,
  INTERNAL_TAB_ROUTES.DIAGNOSE,
  INTERNAL_TAB_ROUTES.MY_GARDEN,
  INTERNAL_TAB_ROUTES.PROFILE,
];

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps): React.JSX.Element {
  const { bottom: bottomInset } = useSafeAreaInsets();

  const isCreateFocused =
    state.routes[state.index]?.name === INTERNAL_TAB_ROUTES.CREATE;

  const onCreatePress = (): void => {
    const createRoute = state.routes.find(
      (route) => route.name === INTERNAL_TAB_ROUTES.CREATE,
    );

    if (!createRoute) {
      return;
    }

    const event = navigation.emit({
      type: "tabPress",
      target: createRoute.key,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      navigation.navigate(createRoute.name, createRoute.params);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: bottomInset, height: TABBAR_HEIGHT + bottomInset },
      ]}
    >
      {TAB_ORDER.map((routeName, index) => {
        const route = state.routes.find((item) => item.name === routeName);
        if (!route) {
          return null;
        }

        const isFocused = state.routes[state.index]?.key === route.key;
        const color = isFocused ? COLORS.MAIN_COLOR : COLORS.GRAY_74;
        const { Icon, label } = TABBAR_ITEMS[routeName];
        const shouldRenderCenterButton = index === 1;

        const onPress = (): void => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = (): void => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <React.Fragment key={`tabbar-tab-${route.key}`}>
            <TouchableOpacity
              accessibilityLabel={
                descriptors[route.key].options.tabBarAccessibilityLabel
              }
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              activeOpacity={0.9}
              onLongPress={onLongPress}
              onPress={onPress}
              style={styles.tabContainer}
              testID={descriptors[route.key].options.tabBarButtonTestID}
            >
              <Icon color={color} />
              <Text
                color={color}
                size="xsmall"
                style={styles.labelText}
                variant="RubikRegular"
              >
                {label}
              </Text>
            </TouchableOpacity>
            {shouldRenderCenterButton ? (
              <View style={styles.tabContainer}>
                <TouchableOpacity
                  accessibilityRole="button"
                  activeOpacity={0.9}
                  onPress={onCreatePress}
                  style={styles.tabbarButton}
                >
                  <ScanIcon opacity={isCreateFocused ? 1 : 0.92} />
                </TouchableOpacity>
              </View>
            ) : null}
          </React.Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: COLORS.WHITE,
  },
  tabContainer: {
    flex: 1,
    justifyContent: "flex-end",
    rowGap: 4.87,
    alignItems: "center",
  },
  labelText: {},
  tabbarButton: {
    marginBottom: 9,
  },
});
