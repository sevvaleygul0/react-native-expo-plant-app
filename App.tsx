import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import React from 'react';

import RootNavigator from '@/src/navigation/rootNavigator';

export default function App(): React.JSX.Element {
  const [fontsLoaded, fontError] = useFonts({
    RubikLight: require("./assets/fonts/Rubik-Light.ttf"),
    RubikRegular: require("./assets/fonts/Rubik-Regular.ttf"),
    RubikMedium: require("./assets/fonts/Rubik-Medium.ttf"),
    SFProTextBold: require("./assets/fonts/SFProText-Bold.ttf"),
  });

  React.useEffect(() => {
    void SplashScreen.preventAutoHideAsync();
  }, []);

  React.useEffect(() => {
    if (fontsLoaded || fontError) {
      void SplashScreen.hideAsync();
    }
  }, [fontError, fontsLoaded]);

  if (!fontsLoaded && !fontError) {
    return <></>;
  }

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
