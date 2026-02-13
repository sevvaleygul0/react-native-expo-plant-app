import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import RootNavigator from '@/src/navigation/rootNavigator';

export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
