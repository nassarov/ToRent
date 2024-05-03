import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnBoardScreen from "./Apps/Screens/OnBoardScreen";
import Registration from "./Apps/Navigations/Registration";
import HomeScreenNavigation from "./Apps/Navigations/HomeScreenNavigation";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnBoard">
        <Stack.Screen
          name="OnBoard"
          component={OnBoardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreenNavigation}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
