import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function AddressDropdownModal({
  title,
  selectedItem,
  setSelectedItem,
  modalVisible,
  setModalVisible,
  userData,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleSelect = (address) => {
    setSelectedItem(address);
    setModalVisible(false);
  };

  return (
    <View>
      <Text style={styles.dropdownTitle}>{title}</Text>

      {loading ? (
        <View style={styles.dropdownButton}>
          <ActivityIndicator />
        </View>
      ) : (
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.dropdownButton}>
          <Text>{selectedItem ? selectedItem.label : `Select ${title}`}</Text>
        </TouchableOpacity>
      )}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={userData}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelect(item)}
                  style={styles.optionContainer}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                  <Text>{item.value}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "100%",
    maxHeight: "80%",
  },
  optionContainer: {
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
