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
import HomescreenNavigation from "../Navigations/HomeScreenNavigation"
import TabNavigation from "./TabNavigation";
import CustomHeader3 from "../Components/CustomHeader3";
const Stack = createStackNavigator();

export default function Registration() {
  const headers=[{id:1,title:"Sign Up",nextPage:'Login'},{id:2,title:"Login    ",}]
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
        options={ { header:() => <CustomHeader props={headers[0]} />}}
      />
      <Stack.Screen
        name='login'
        component={LoginScreen}
        options={{ header:() => <CustomHeader props={headers[1]} /> }}
      />
      <Stack.Screen
        name='forgotpassword'
        component={ForgotPasswordScreen}
        options={{ header:() => <CustomHeader2/> }}
      />
      <Stack.Screen
        name='changepassword'
        component={ChangePasswordScreen}
        options={{ header:() => <CustomHeader2/> }}
      />
      <Stack.Screen
        name='recoveraccount'
        component={VerificationCodeScreen}
        options={{ header:() => <CustomHeader2/> }}
      />
         <Stack.Screen
        name='address'
        component={AddressScreen}
        options={{ header:() => <CustomHeader3 text={'Where Your Cars Are Located'}/> }}
      />
         <Stack.Screen
        name='homescreennav'
        component={HomescreenNavigation}
        options={{ headerShown: false }}
      />

      
    </Stack.Navigator>
  );
}
