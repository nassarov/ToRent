import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CurrentTripsScreen from './currentTrips';
import ClientTripsScreen from './clientTrips';

const Tab = createMaterialTopTabNavigator();

export default function Trips({ route }) {
  const { userData } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    if (userData.role === undefined) {
      Alert.alert(
        'Alert',
        'You need to create an account to use this page.',
        [
          { text: 'OK', onPress: () => navigation.replace('SignUpForRent') } 
        ],
        { cancelable: false }
      );
    }
  }, [userData, navigation]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: '#7F5AF0' },
        tabBarStyle: { backgroundColor: '#f0f0f0' },
      }}
    >
      <Tab.Screen name="Your Trips" component={CurrentTripsScreen} initialParams={{ userData }} />
      {userData.role === '1' && (
        <Tab.Screen name="Your Clients Trips" component={ClientTripsScreen} initialParams={{ userData }} />
      )}
    </Tab.Navigator>
  );
}
