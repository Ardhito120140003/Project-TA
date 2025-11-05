import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AeratorScreen from '../screens/AeratorScreen';
import FeedScreen from '../screens/FeedScreen';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Aerator" component={AeratorScreen} />
      <Tab.Screen name="Pakan Ikan" component={FeedScreen} />
    </Tab.Navigator>
  );
}
