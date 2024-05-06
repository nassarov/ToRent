import {
  View,
  Text,
  Modal,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Alert } from "react-native";

const { height } = Dimensions.get("window");

export default function DropdownModal({
  title,
  selectedItem,
  setSelectedItem,
  modalVisible,
  setModalVisible,
  searchInput,
  setSearchInput,
  data,
  setData,
  filteredItems,
  setFilteredItems,
  withLogo,
  depends,
  dependingOnIt,
  withColor,
  address,
}) {
  useEffect(() => {
    setFilteredItems(data);
  }, [data]);

  const toggleModal = () => {
    if (!data && depends) {
      Alert.alert("Please fill the Brand first");
    } else {
      setModalVisible(!modalVisible);
      setSearchInput("");
    }
  };

  const handleSearch = (text) => {
    const filteredItems = data.filter((item) =>
      item.label.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredItems(filteredItems);
  };

  const handleSelect = (item) => {
    if (dependingOnIt) {
      setSelectedItem(item);
      for (var i = 0; i < dependingOnIt.length; i++) {
        dependingOnIt[i](null);
        toggleModal();
      }
    } else {
      setSelectedItem(item);
      toggleModal();
    }
  };

  return (
    <View>
      <Text style={styles.dropdownTitle}>{title}</Text>

      <TouchableOpacity onPress={toggleModal} style={styles.dropdownButton}>
        <Text>{selectedItem ? selectedItem.label : `Select a ${title}`}</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder={`Search ${title}`}
              value={searchInput}
              onChangeText={(text) => {
                setSearchInput(text);
                handleSearch(text);
              }}
            />
            <FlatList
              data={filteredItems}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelect(item)}
                  style={styles.optionContainer}
                >
                  {withLogo ? (
                    <View style={styles.modalBrandItem}>
                      <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                      />
                    </View>
                  ) : (
                    ""
                  )}
                  {withColor && data ? (
                    <View
                      style={[
                        styles.colorOption,
                        { backgroundColor: item.label.toLowerCase() },
                      ]}
                    ></View>
                  ) : (
                    ""
                  )}

                  <Text style={styles.optionText}>
                    {address ? item.city : item.label}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => item.value}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dropdownButton: {
    borderWidth: 1,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 8,

    alignItems: "center",
    marginBottom: 20,
    borderColor: "#7F5DF0",
    backgroundColor: "white",
    alignContent: "space-between",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: 300,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "100%",
    maxHeight: "80%",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    paddingVertical: 20,
  },

  optionText: {
    fontSize: 18,
  },

  input: {
    borderWidth: 1,
    borderColor: "#7F5AF0",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  colorOption: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "black",
  },

  text: {
    fontWeight: "500",
    fontSize: 16,
    margin: 20,
    marginLeft: 18,
  },
  texts: {
    marginBottom: 2,
    marginLeft: 18,
  },
  dropdownContainer: {
    width: widthPercentageToDP("90%"),
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
  },
  dropdown: {
    height: 50,
    borderColor: "#7F5AF0",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 2,
    marginHorizontal: 18,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: "400",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Align content to the bottom
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  optionText: {
    fontSize: 15,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "100%",
    maxHeight: height / 2, // Set the max height to half of the screen height
  },
  modalBrandItem: {
    width: widthPercentageToDP(12),
    height: widthPercentageToDP(12),
  },
});
