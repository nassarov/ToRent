import { View, Text } from "react-native";
import React from "react";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

export default function SearchChoices({ selected, setSelected }) {
  const searchItem = [
    { id: 1, name: "Brand", value: "brand" },
    { id: 2, name: "Company Name", value: "name" },
    { id: 3, name: "Year", value: "year" },
    { id: 4, name: "Location", value: "location" },
    { id: 5, name: "Model", value: "model" },
    { id: 6, name: "Price", value: "price" },
    { id: 7, name: "Fuel Type", value: "fuel" },
  
  ];
  const select = (value) => {
    setSelected(value);
    
  };
  return (
    <View style={{ flexDirection: "row" }}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={searchItem}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              select(item.value);
            }}
            key={item.id}
            style={{
              padding: 8,
              backgroundColor: "#D3D3D3",
              borderRadius: 10,
              marginLeft: 10,
              borderColor: item.value === selected ? "#7F5AF0" : "#D3D3D3",
              borderWidth:2
            }}
          >
            <Text>{item.name}</Text>
           
          </TouchableOpacity>
        )}
        horizontal={true}
      />
    </View>
  );
}
