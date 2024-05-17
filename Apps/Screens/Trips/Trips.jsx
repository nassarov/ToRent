import React from 'react';
import { View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

function CurrentTripsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
      <Text>Current onTrip</Text>
    </View>
  );
}

function PendingTripsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Pending</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function Trips({route}) {
  const {userData} =route.params;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: '#7F5AF0' }, 
        tabBarStyle: { backgroundColor: '#f0f0f0' }, 
      }}
    >
      
      <Tab.Screen name="Your Trips" component={CurrentTripsScreen} />
      {userData.role ==='1'&&(
      <Tab.Screen name="Your Clients Trips" component={PendingTripsScreen} />)}
    </Tab.Navigator>
  );
}
