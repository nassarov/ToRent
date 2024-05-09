import { View, Text } from "react-native";
import React from "react";
import CarRentingScreen from "../Screens/HomeScreen/CarRentingScreen";
import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import Filter from "../Components/HomeComponents/Filter";
import CustomHeader2 from "../Components/CustomHeader2";
import TabNavigation from "./TabNavigation";
import PickImagesScreen from "../Screens/CarRegister/PickImagesScreen";
import EditProfile from '../Screens/Profile/EditProfile';
const Stack = createStackNavigator();
export default function HomeScreenNavigation({ route }) {
  const { userData } = route.params;
  console.log("HomeNAv", userData);
  return (
    <Stack.Navigator initialRouteName="TabNavigation">
      <Stack.Screen
        name="CarRentingScreen"
        component={CarRentingScreen}
        options={{ headerShown: false }}
        initialParams={{ userData: userData }}
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
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
