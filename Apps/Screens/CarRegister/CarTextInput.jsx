import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";


export default function CarTextInput({route}) {
    const [carDatalist ,setCarDatalist] = useState(null)
    const { carData } = route.params;
    const { userData } = route.params;
    const navigation = useNavigation();
  const [carseat, setCarseat] = useState("");
  const [minDays, setMinDays] = useState("");
  const [maxDays, setMaxDays] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleCarseatChange = (text) => {
    setCarseat(text);
  };

  const handleMinDaysChange = (text) => {
    setMinDays(text);
  };

  const handleMaxDaysChange = (text) => {
    setMaxDays(text);
  };

  const handlePriceChange = (text) => {
    const cleanText = text.replace(/[$,]/g, '').replace(/[^\d]/g, '');
    if (cleanText.length === 1 && cleanText === "0") {
      setPrice("");
      return;
    }
    const formattedText = `$${cleanText.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    setPrice(formattedText);
  };

  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  const onApply = async () => {
    const missingParams = [];
    if (!maxDays) missingParams.push("Maximum Days");
    if (!minDays) missingParams.push("Minimum Days");
    if (!carseat) missingParams.push("Car Seats");
    if (!price) missingParams.push("Price");
  
    if (missingParams.length === 0) {
      const minDaysValue = parseInt(minDays);
      const maxDaysValue = parseInt(maxDays);
      const priceValue = parseFloat(price.replace(/[$,]/g, ''));
  
      if (minDaysValue > maxDaysValue) {
        Alert.alert(
          "Invalid Input",
          "Minimum Days cannot be greater than Maximum Days"
        );
        return;
      }
  
      const updatedCarData = {
        ...carData,
        carseat: carseat,
        mindays: minDays,
        maxdays: maxDays,
        price: priceValue,
        description: description
      };
 
      navigation.push("PickImagesScreen", { carData: updatedCarData, userData });
    } else {
      Alert.alert(
        "Required",
        `Please fill in the following data: ${missingParams.join(", ")}`
      );
    }
  };

  const clearAllSelections = () => {
    setCarseat("");
    setMinDays("");
    setMaxDays("");
    setPrice("");
    setDescription("");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View>
          <Text style={styles.dropdownTitle}>Car Seats <MaterialCommunityIcons name="car-seat" size={30} color="#7F5AF0" /></Text>
          <TextInput
          
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter number of seats"
            value={carseat}
            onChangeText={handleCarseatChange}
          />
        </View>

        <View>
          <Text style={styles.dropdownTitle}>Minimum <Text style={{color:"#7F5AF0"}}>Days</Text></Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter minimum days to rent"
            value={minDays}
            onChangeText={handleMinDaysChange}
          />
        </View>

        <View>
          <Text style={styles.dropdownTitle}>Maximum <Text style={{color:"#7F5AF0"}}>Days</Text></Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter maximum days to rent"
            value={maxDays}
            onChangeText={handleMaxDaysChange}dolldescriptio
          />
        </View>

        <View>
        <Text style={styles.dropdownTitle}>Price <Text style={{color:"#7F5AF0"}}>/day</Text><FontAwesome name="dollar" size={16} color="#7F5AF0"  /></Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter price"
            value={price}
            onChangeText={handlePriceChange}
          />
        </View>

        <View>
          <Text style={styles.dropdownTitle}>Description<MaterialIcons name="description" size={24} color="#7F5AF0" /></Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            multiline={true}
            placeholder="Enter description"
            value={description}
            onChangeText={handleDescriptionChange}
          />
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={clearAllSelections}>
            <Text style={styles.clearAllText}>Clear All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton} onPress={onApply}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#7F5AF0",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
   
  },
  descriptionInput: {
    height: 120, // Adjust the height as needed
    textAlignVertical: "top", // Align the text to the top
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  clearAllText: {
    color: "#7F5AF0",
    fontSize: 16,
    fontWeight: "600",
  },
  applyButton: {
    backgroundColor: "#7F5AF0",
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  applyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
