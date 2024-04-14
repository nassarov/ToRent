import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreens from "../Screens/Registration/SignUpScreens";
import LoginScreen from "../Screens/Registration/LoginScreen";
import SignUpForToRent from "../Screens/Registration/SignUpForToRent";

const Stack = createStackNavigator();

export default function Registration() {
  return (
    <Stack.Navigator initialRouteName="signupforToRent"> 
      <Stack.Screen
        name='signupforToRent'
        component={SignUpForToRent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='signup'
        component={SignUpScreens}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name='login'
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
