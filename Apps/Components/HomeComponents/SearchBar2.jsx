import React, { useState } from "react";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { SearchBar } from "react-native-elements";

const CarSearch = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const searchFunction = (text) => {
    setSearchValue(text);
    onSearch(text);
  };

  const handlePressOutside = () => {
    // Handle press outside the search bar
  };

  return (
    <TouchableWithoutFeedback onPress={handlePressOutside}>
      <View className="flex-1 z-10">
        <SearchBar
          placeholder="What are you looking for..."
          lightTheme
          searchIcon={{ size: 26, color: "black" }}
          round
          value={searchValue}
          onChangeText={searchFunction}
          autoCorrect={false}
          inputStyle={{
            backgroundColor: "transparent",
            borderWidth: 0,
            color: "black",
          }}
          inputContainerStyle={{
            height: 40,
            borderWidth: 1,
            borderColor: "#7F5AF0",
            borderBottomWidth: 1,
            backgroundColor: "#d3d3d3",
          }}
          containerStyle={{
            marginTop: 8,
            marginBottom: 0,
            backgroundColor: "transparent",
            borderWidth: 0,
            borderBottomWidth: 0,
            borderTopWidth: 0,
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CarSearch;
