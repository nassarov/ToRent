import React, { useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import OnBoardScreen from "./Apps/Screens/OnBoardScreen";
import Registration from "./Apps/Navigations/Registration";
import HomeScreenNavigation from "./Apps/Navigations/HomeScreenNavigation";
import { doc, getFirestore, getDoc } from "firebase/firestore";
import { app } from './firebaseConfig';
import { LogBox } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState('');
  const [userData, setUserData] = useState('');
  const auth = getAuth();
  const db = getFirestore(app);

  useEffect(() => {
    LogBox.ignoreLogs([
      'Non-serializable values were found in the navigation state',
    ]);
    const checkFirstTimeUser = async () => {
      const isFirstTime = await AsyncStorage.getItem('alreadyLaunched');
      if (isFirstTime === null) {
        await AsyncStorage.setItem('alreadyLaunched', 'true');
        setInitialRoute('OnBoardScreen');
      } else {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnapshot = await getDoc(userDocRef);
            const userData = userDocSnapshot.data();
            setUserData(userData);
            setInitialRoute('HomeScreenStack');
          } else {
            setInitialRoute('Registration');

          }
        });
      }
    };
    checkFirstTimeUser();
  }, []);

  return initialRoute && (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="OnBoardScreen"
          component={OnBoardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreenStack"
          component={HomeScreenNavigation}
          options={{ headerShown: false }}
          initialParams={{ userData }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
