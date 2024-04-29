import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SearchBar } from "react-native-elements";
import filter from "lodash.filter";

const carData = [
  {
    id: "1",
    brand: "Toyota",
    model: "Corolla",
  },
  {
    id: "2",
    brand: "Honda",
    model: "Civic",
  },
  {
    id: "3",
    brand: "Ford",
    model: "Focus",
  },
  {
    id: "4",
    brand: "Nissan",
    model: "Altima",
  },
  {
    id: "5",
    brand: "Hyundai",
    model: "Elantra",
  }
  // Add more car data as needed
];

const CarItem = ({ brand, model }) => {
  return (
    <View className="p-4">
      <Text>
        {brand} - {model}
      </Text>
    </View>
  );
};

const renderItem = ({ item }) => (
  <CarItem brand={item.brand} model={item.model} />
);

export default class CarSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: carData,
      error: null,
      searchValue: "",
      searchBarFocused: false,
    };
    this.arrayholder = carData;
  }

  searchFunction = (text) => {
    const updatedData = this.arrayholder.filter((car) => {
      const brandData = `${car.brand.toUpperCase()}`;
      const textData = text.toUpperCase();
      return brandData.indexOf(textData) > -1;
    });
    this.setState({ data: updatedData, searchValue: text });
  };

  handleFocus = () => {
    this.setState({ searchBarFocused: true });
  };

  handleBlur = () => {
    this.setState({ searchBarFocused: false });
  };

  handlePressOutside = () => {
    this.setState({ searchBarFocused: false });
  };

  componentDidMount() {
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.handleKeyboardHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
  }

  handleKeyboardHide = () => {
    this.setState({ searchBarFocused: false });
    this.searchInput.blur(); // Add this line to blur the input
  };

  render() {
    const { searchBarFocused } = this.state;

    return (
      <TouchableWithoutFeedback onPress={this.handlePressOutside}>
        <View className="flex-1 z-10">
          <SearchBar
            ref={(ref) => (this.searchInput = ref)}
            placeholder="What are you looking for  ..."
            lightTheme
            // showLoading
            searchIcon={{ size: 26, color: "black" }}
            leftIconContainerStyle={{ marginRight: 1 }}
            round
            value={this.state.searchValue}
            onChangeText={(text) => this.searchFunction(text)}
            autoCorrect={false}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            autoFocus={false} // Remove the indicator from the text area
            inputStyle={{
              backgroundColor: "transparent",
              borderWidth: 0,
              color: "black",
            }} // Make the input background transparent
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

          {searchBarFocused && (
            <FlatList
              style={{ position: "absolute", top: 59,right:0,left:0,borderRadius:10,backgroundColor:"#fff", }}
              data={this.state.data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
