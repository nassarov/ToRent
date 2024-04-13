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
      <View style={{ width: hp(5), height: hp(5) }} className="bg-zinc-900 ">
        <Text>Abdo was here</Text>
      </View>
    </View>
  );
}
