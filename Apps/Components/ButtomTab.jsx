import { View, Text } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import TabNavigation  from '../Navigations/TabNavigation'
export default function ButtomTab  ()  {
  return (
    <NavigationContainer>
        <TabNavigation/>
    </NavigationContainer>
  )
}

