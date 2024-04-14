import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import OnBoardScreen from '../Screens/OnBoardScreen';
import SignUpScreens from '../Screens/Registration/SignUpScreens';
import LoginScreen from '../Screens/Registration/LoginScreen';

const Stack = createStackNavigator();

export default function Registration() {
  return (
   <Stack.Navigator>
     <Stack.Screen name='signup' component={SignUpScreens} options={{headerShown: false}}/>
     <Stack.Screen name='login' component={LoginScreen} options={{headerShown: false}}/>
   </Stack.Navigator>
  )
}
