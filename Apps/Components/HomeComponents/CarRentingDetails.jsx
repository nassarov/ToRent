import { View, Text } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function CarRentingDetails({ startDate, endDate }) {
  formatedStartDate = startDate
    ? startDate.getFullYear() +
      "/" +
      startDate.getMonth() +
      "/" +
      startDate.getDate()
    : "";
  formatedEndDate = endDate
    ? endDate.getFullYear() +
      "/" +
      (endDate.getMonth() + 1) +
      "/" +
      endDate.getDate()
    : "";
  var oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

  var startDateMilliseconds = startDate ? startDate.getTime() : 0;
  var endDateMilliseconds = endDate ? endDate.getTime() : 0;

  var daysDifference = Math.round(
    Math.abs((endDateMilliseconds - startDateMilliseconds) / oneDay)
  )+1;


  return (
    <View className="bg-violet-300  rounded-lg  w-11/12  m-auto mt-2 py-2">
      <View className="flex-row  justify-around">
        <View style={{ width: "45%" }}>
          <Text className="font-bold mb-2 text-white">Pick-up date</Text>
          <View className="flex-row rounded-lg bg-violet-600 p-2 items-center ">
            <FontAwesome5 name="calendar" size={20} color="white" />
            <Text className="text-white ml-2">{formatedStartDate}</Text>
          </View>
        </View>
        <View style={{ width: "45%" }}>
          <Text className="font-bold mb-2 text-white">Drop-off date</Text>
          <View className="flex-row rounded-lg bg-violet-600 p-2 items-center">
            <FontAwesome5 name="calendar" size={20} color="white" />
            <Text className="text-white ml-2">{formatedEndDate}</Text>
          </View>
        </View>
      </View>
      <View className="p-2">
        <View className="flex-row justify-between border-b-[1px] border-white mb-2">
          <Text className="text-white">Price</Text>
          <Text className="text-white">22$/day</Text>
        </View>
        <View className="flex-row justify-between border-b-[1px] border-white mb-2">
          <Text className="text-white">Total time</Text>
          <Text className="text-white">
            {formatedStartDate && formatedEndDate
              ? daysDifference + " days"
              : "0 days"}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <View >
            <Text className="text-xl font-bold text-white">
              Total Price: {formatedStartDate&&formatedEndDate?daysDifference * 22:"0"}$
            </Text>
          </View>
          <View className="items-end mb-4">
            <TouchableOpacity
              className="bg-violet-600 mr-5 p-4 rounded-xl "
              style={{ width: widthPercentageToDP(30) }}
            >
              <Text className="text-white text-center font-bold">Rent</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
