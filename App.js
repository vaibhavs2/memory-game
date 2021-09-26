/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {PlayGame, StartGame} from './src/screens';

const Stack = createNativeStackNavigator();
const App: () => Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={StartGame} />
        <Stack.Screen name="Play" component={PlayGame} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
