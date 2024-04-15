import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreens from "../Screens/Registration/SignUpScreens";
import LoginScreen from "../Screens/Registration/LoginScreen";
import SignUpForToRent from "../Screens/Registration/SignUpForToRent";

import CustomHeader from "../Components/CustomHeader";
const Stack = createStackNavigator();

export default function Registration() {
  const headers=[{id:1,title:"Sign Up",nextPage:'Login'}]
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
        options={ { header:() => <CustomHeader props={headers[0]} />,}}
      />
      <Stack.Screen
        name='login'
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
