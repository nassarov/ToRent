import { View, Text } from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
export default function OnBoardScreen() {
  return (
    <View>
      <Text>OnBoardScreen</Text>
      <View style={{ width: hp(9), height: hp(9) }} className="bg-zinc-900 ">
        <Text className='text-white'>Abdo was here</Text>
      </View>
    </View>
  );
}
