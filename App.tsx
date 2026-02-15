import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import React from 'react';
import { Provider } from "react-redux";

import RootNavigator from '@/src/navigation/rootNavigator';
import { store } from "@/src/store";

export default function App(): React.JSX.Element {
  const [fontsLoaded, fontError] = useFonts({
    RubikLight: require("./assets/fonts/Rubik-Light.ttf"),
    RubikRegular: require("./assets/fonts/Rubik-Regular.ttf"),
    RubikMedium: require("./assets/fonts/Rubik-Medium.ttf"),
    RubikSemiBold: require("./assets/fonts/Rubik-SemiBold.ttf"),
    RubikBold: require("./assets/fonts/Rubik-Bold.ttf"),
    RubikExtraBold: require("./assets/fonts/Rubik-ExtraBold.ttf"),
    RubikBlack: require("./assets/fonts/Rubik-Black.ttf"),
    RubikItalic: require("./assets/fonts/Rubik-Italic.ttf"),
    SFProDisplayRegular: require("./assets/fonts/SFPRODISPLAYREGULAR.OTF"),
    SFProDisplayMedium: require("./assets/fonts/SFPRODISPLAYMEDIUM.OTF"),
    SFProDisplayBold: require("./assets/fonts/SFPRODISPLAYBOLD.OTF"),
    SFProDisplayUltraLightItalic: require("./assets/fonts/SFPRODISPLAYULTRALIGHTITALIC.OTF"),
    SFProDisplayThinItalic: require("./assets/fonts/SFPRODISPLAYTHINITALIC.OTF"),
    SFProDisplayLightItalic: require("./assets/fonts/SFPRODISPLAYLIGHTITALIC.OTF"),
    SFProDisplaySemiBoldItalic: require("./assets/fonts/SFPRODISPLAYSEMIBOLDITALIC.OTF"),
    SFProDisplayHeavyItalic: require("./assets/fonts/SFPRODISPLAYHEAVYITALIC.OTF"),
    SFProDisplayBlackItalic: require("./assets/fonts/SFPRODISPLAYBLACKITALIC.OTF"),
    VisbyCFExtraBold: require("./assets/fonts/VisbyCF-ExtraBold.otf"),
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
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}
