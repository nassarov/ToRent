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
console.log(userData.role)
  useEffect(() => {
    if (userData[0].role === '2') {
      Alert.alert(
        'Sign Up Required',
        'Please sign up first to access this feature.',
        [
          { text: 'OK', onPress: () => navigation.navigate('SignUpForRent') }, 
        ],
        { cancelable: false }
      );
    }
  }, [userData.role, navigation]);


  if (userData[0].role === '2') {
    return null;
  }

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
