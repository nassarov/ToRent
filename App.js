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
const Stack = createStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState('');
  const [userRole,setUserRole] = useState('');
  const auth = getAuth();
  const db = getFirestore(app);
  
  useEffect(() => {
    const checkFirstTimeUser = async () => {
      const isFirstTime = await AsyncStorage.getItem('alreadyLaunched');
      if (isFirstTime === null) {
        await AsyncStorage.setItem('alreadyLaunched', 'true');
        setInitialRoute('OnBoard');
      } else {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnapshot = await getDoc(userDocRef);
            const userData = userDocSnapshot.data();
            setUserRole(userData.role);
            setInitialRoute('Home');
            console.log('home')
            console.log(user.email,"role",userRole)
          } else {
            setInitialRoute('Registration');
            console.log('reg')
          }
        });
      }
    };
    checkFirstTimeUser();
  }, []);

  return initialRoute&&(
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
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
          initialParams={{userRole}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
