import { View, Text } from "react-native";
import React from "react";
import CarRentingScreen from "../Screens/HomeScreen/CarRentingScreen";
import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import Filter from "../Components/HomeComponents/Filter";
import CustomHeader2 from "../Components/CustomHeader2";
import TabNavigation from "./TabNavigation";
import PickImagesScreen from "../Screens/CarRegister/PickImagesScreen";
import EditProfile from "../Screens/Profile/EditProfile";
import CarTextInput from "../Screens/CarRegister/CarTextInput";
import ProfileScreen from "../Screens/Profile/ProfileScreen";
import Trips from "../Screens/Trips/Trips";
import FilterResult from "../Screens/FilterResult/FilterResult";
import showRoom from "../Screens/HomeScreen/showRoom";
import SignUpForToRent from "../Screens/Registration/SignUpForToRent";
import EditCarRegistrationScreen from "../Screens/HomeScreen/EditCarRegistrationScreen";
const Stack = createStackNavigator();
export default function HomeScreenNavigation({ route }) {
  const { userData } = route.params;
  return (
    <Stack.Navigator initialRouteName="TabNavigation">
      <Stack.Screen
        name="CarRentingScreen"
        component={CarRentingScreen}
        options={{ headerShown: false }}
        initialParams={{ userData: userData}}
      />
      <Stack.Screen
        name="EditCarRegistrationScreen"
        component={EditCarRegistrationScreen}
        options={{ headerShown: false }}
        initialParams={{ userData: userData}}
      />
      <Stack.Screen
        name="TabNavigation"
        component={TabNavigation}
        initialParams={{ userData: userData }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Filter"
        component={Filter}
        options={{ header: () => <CustomHeader2 /> }}
        initialParams={{ userData: userData }}
      />
      <Stack.Screen
        name="Explore"
        component={showRoom}
        options={{ header: () => <CustomHeader2 text={"Explore"}/> }}
        initialParams={{ userData: userData }}
      />
      <Stack.Screen
        name="PickImagesScreen"
        component={PickImagesScreen}
        initialParams={{ userData: userData }}
        options={{ header: () => <CustomHeader2 text={"Choose Images"}/> }}

      />
      <Stack.Screen
        name="CarTextInput"
        component={CarTextInput}
        initialParams={{ userData: userData }}
        options={{ header: () => <CustomHeader2 text={"More Details"}/> }}
      />
      
        <Stack.Screen
        name="SignUpForRent"
        component={SignUpForToRent}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
        initialParams={{ userData: userData }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
        initialParams={{ visitorData: userData }}
      />
         <Stack.Screen
        name="FilterResult"
        component={FilterResult}
        options={{ header: () => <CustomHeader2 /> }}
      />
    </Stack.Navigator>
  );
}
