import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import SearchChoices from '../../Components/HomeComponents/SearchChoices'
import SearchBarCar from "../../Components/HomeComponents/SearchBar2";
import { FontAwesome6 } from '@expo/vector-icons';

export default function ShowRoom() {
  return (
    <View className='flex-1'>
      <View className="flex-row justify-between px-1 items-center">
        <SearchBarCar
         
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Filter")}
          className="mr-2 mt-1"
        >
          <FontAwesome6 name="sliders" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <SearchChoices 
        
      />
    </View>
  )
}