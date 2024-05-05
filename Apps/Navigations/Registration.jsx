import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreens from "../Screens/Registration/SignUpScreens";
import LoginScreen from "../Screens/Registration/LoginScreen";
import SignUpForToRent from "../Screens/Registration/SignUpForToRent";
import CustomHeader from "../Components/CustomHeader";
import ForgotPasswordScreen from "../Screens/Registration/ForgotPasswordScreen";
import VerificationCodeScreen from "../Screens/Registration/VerificationCodeScreen";
import CustomHeader2 from "../Components/CustomHeader2";
import ChangePasswordScreen from "../Screens/Registration/ChangePasswordScreen";
import AddressScreen from "../Screens/Registration/AddressScreen";
import HomescreenNavigation from "../Navigations/HomeScreenNavigation";
import TabNavigation from "./TabNavigation";
const Stack = createStackNavigator();

export default function Registration() {
  const headers = [
    { id: 1, title: "Sign Up", nextPage: "Login" },
    { id: 2, title: "Login    " },
  ];
  return (
    <Stack.Navigator initialRouteName="SignUpForToRent">
      <Stack.Screen
        name="SignUpForToRent"
        component={SignUpForToRent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreens}
        options={{ header: () => <CustomHeader props={headers[0]} /> }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ header: () => <CustomHeader props={headers[1]} /> }}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{ header: () => <CustomHeader2 /> }}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{ header: () => <CustomHeader2 /> }}
      />
      <Stack.Screen
        name="VerificationCodeScreen"
        component={VerificationCodeScreen}
        options={{ header: () => <CustomHeader2 /> }}
      />
      <Stack.Screen
        name="AddressScreen"
        component={AddressScreen}
        options={{
          header: () => <CustomHeader2 text={"Where Your Cars Are Located"} />,
        }}
      />
      <Stack.Screen
        name="HomeScreenNavigation"
        component={HomescreenNavigation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
