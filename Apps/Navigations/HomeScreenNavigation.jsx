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
import Message from "../Screens/Message/Messages";
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
        name="TabNavigation"
        component={TabNavigation}
        initialParams={{ userData: userData }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Filter"
        component={Filter}
        options={{ header: () => <CustomHeader2 /> }}
      />
      <Stack.Screen
        name="PickImagesScreen"
        component={PickImagesScreen}
        initialParams={{ userData: userData }}
      />
      <Stack.Screen
        name="CarTextInput"
        component={CarTextInput}
        initialParams={{ userData: userData }}
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
        name="Message"
        component={Message}
        options={{ headerShown: true,
          header: () => <CustomHeader2 />
         }}
        initialParams={{ userData: userData }}
      />
    </Stack.Navigator>
  );
}
