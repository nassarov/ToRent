import { View, Text } from "react-native";
import React from "react";

import CarRentingScreen from "../Screens/HomeScreen/CarRentingScreen";
import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import Filter from "../Components/HomeComponents/Filter";
import FilterPage from "./FilterPage";

const Stack = createStackNavigator();
export default function HomeScreenNavigation() {
  return (
    <Stack.Navigator initialRouteName="homescreen">
      <Stack.Screen
        name="carrenting"
        component={CarRentingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="homescreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="filter"
        component={FilterPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
