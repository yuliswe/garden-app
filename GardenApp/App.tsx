/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SuccessScreen} from './components/SuccessScreen';
import {WateringScreen} from './components/WateringScreen';

import {Provider} from 'react-redux';
import {store} from './store';

export type RootStackParamList = {
  WateringScreen: undefined;
  SuccessScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="WateringScreen"
            component={WateringScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SuccessScreen"
            component={SuccessScreen}
            options={{
              headerLargeTitle: true,
              title: 'Completed',
              headerBackTitle: 'Back',
              headerTransparent: true,
              presentation: 'card',
              fullScreenGestureEnabled: true,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
