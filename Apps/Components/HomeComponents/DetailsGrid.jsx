import { View, Text } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { widthPercentageToDP } from "react-native-responsive-screen";

export default function DetailsGrid({details}) {
  return (
    <View
      className="my-4 mr-2 ml-1 border-t-2 border-l-2 border-violet-600 "
      style={{ width: widthPercentageToDP(92) }}
    >
      <FlatList
        scrollEnabled={false}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-around" }}
        data={details}
        renderItem={({ item, index }) => (
          <View
            key={index}
            className="flex-row p-3 border-r-2 border-b-2 border-violet-600 items-center  "
            style={{ width: widthPercentageToDP(46) }}
          >
            <View className="">{item.icon}</View>
            <View className="ml-3 mr-2">
              <Text className="font-bold">{item.attribute}</Text>
              <Text className="text-xs text-violet-600">{item.value}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
