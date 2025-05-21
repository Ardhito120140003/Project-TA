import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AeratorScreen from './screens/AeratorScreen';
import FeedScreen from './screens/FeedScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Aerator" component={AeratorScreen} />
        <Tab.Screen name="Pakan Ikan" component={FeedScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}