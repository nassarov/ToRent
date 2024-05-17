import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OnGoinTrips from './goinOnTrips';
import PendingTrips from './pendingTrips';
import CompletedTrips from './completedTrips';

const Tab = createMaterialTopTabNavigator();

export default function CurrentTripsScreen({ route }) {
  const { userData } = route.params;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: '#7F5AF0' },
        tabBarStyle: { backgroundColor: '#f0f0f0' },
      }}
    >
      <Tab.Screen name="OnGoing Trips" component={OnGoinTrips} initialParams={{ userData }} />
      <Tab.Screen name="Pending Trips" component={PendingTrips} initialParams={{ userData }} />
      <Tab.Screen name="Completed Trips" component={CompletedTrips} initialParams={{ userData }} />
    </Tab.Navigator>
  );
}