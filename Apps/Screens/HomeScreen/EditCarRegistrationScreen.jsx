import {
    View,
    Text,
    TextInput,
    Alert,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
  } from "react-native";
  import React, { useState } from "react";
  import { TouchableOpacity } from "react-native-gesture-handler";
  import {
    heightPercentageToDP,
    widthPercentageToDP,
  } from "react-native-responsive-screen";
  import { updateDoc, doc, getFirestore } from "firebase/firestore";
  import { useNavigation } from "@react-navigation/native";
  import CustomHeader2 from "../../Components/CustomHeader2";
  
  export default function EditCarRegistrationScreen({ route }) {
    const { carData, postId, userData } = route.params;
    const db = getFirestore();
    const navigation = useNavigation();
  
    const [formData, setFormData] = useState({
      model: carData.model,
      brand: carData.brand,
      color: carData.color,
      carseat: carData.carseat,
      price: carData.price,
      year: carData.year,
      type:carData.type,
      gearType: carData.gearType,
      fuelType: carData.fuelType,
      description: carData.description,
      addressLabel: carData.address.label,
      addressLink: carData.address.value,
      maxdays:carData.maxdays,
      mindays:carData.mindays
    });
  
    const [loading, setLoading] = useState(false);
  
    const handleInputChange = (name, value) => {
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSave = async () => {
      setLoading(true);
      try {
        const carRef = doc(db, "car_post", postId);
        await updateDoc(carRef, {
          'carDetails.carData': {
            model: formData.model,
            brand: formData.brand,
            color: formData.color,
            carseat: formData.carseat,
            price: formData.price,
            year: formData.year,
            type:formData.type,
            gearType: formData.gearType,
            fuelType: formData.fuelType,
            description: formData.description,
            maxdays:formData.maxdays,
            mindays:formData.mindays,
            address: {
              label: formData.addressLabel,
              value: formData.addressLink,
            },
          },
        });
        setLoading(false);
        console.log("TYPE",formData.type)
        Alert.alert("Success", "Car details updated successfully.", [
          { text: "OK", onPress: () => navigation.replace("ProfileScreen",{ userData: userData }) },
        ]);
      } catch (error) {
        setLoading(false);
        console.error("Error updating car details: ", error);
        Alert.alert("Error", "Failed to update car details. Please try again.");
      }
    };
  
    return (
      <ScrollView style={styles.container}>
        <CustomHeader2 text="Edit Car Details" />
        <View style={styles.formContainer}>
          <Text style={styles.label}>Model</Text>
          <TextInput
            style={styles.input}
            value={formData.model}
            onChangeText={(text) => handleInputChange("model", text)}
          />
  
          <Text style={styles.label}>Brand</Text>
          <TextInput
            style={styles.input}
            value={formData.brand}
            onChangeText={(text) => handleInputChange("brand", text)}
          />
          <Text style={styles.label}>Type</Text>
          <TextInput
            style={styles.input}
            value={formData.type}
            onChangeText={(text) => handleInputChange("type", text)}
          />
  
          <Text style={styles.label}>Color</Text>
          <TextInput
            style={styles.input}
            value={formData.color}
            onChangeText={(text) => handleInputChange("color", text)}
          />
  
          <Text style={styles.label}>Price per Day ($)</Text>
          <TextInput
            style={styles.input}
            value={formData.price.toString()}
            keyboardType="numeric"
            onChangeText={(text) => handleInputChange("price", text)}
          />
  
          <Text style={styles.label}>Year</Text>
          <TextInput
            style={styles.input}
            value={formData.year.toString()}
            keyboardType="numeric"
            onChangeText={(text) => handleInputChange("year", text)}
          />
           <Text style={styles.label}>Number of Seats</Text>
          <TextInput
            style={styles.input}
            value={formData.carseat.toString()}
            keyboardType="numeric"
            onChangeText={(text) => handleInputChange("carseat", text)}
          />
         <Text style={styles.label}>Min Days</Text>
          <TextInput
            style={styles.input}
            value={formData.mindays}
            keyboardType="numeric"
            onChangeText={(text) => handleInputChange("mindays", text)}
          />
         <Text style={styles.label}>Max Days</Text>
          <TextInput
            style={styles.input}
            value={formData.maxdays}
            keyboardType="numeric"
            onChangeText={(text) => handleInputChange("maxdays", text)}
          />
  
  
          <Text style={styles.label}>Gear Type</Text>
          <TextInput
            style={styles.input}
            value={formData.gearType}
            onChangeText={(text) => handleInputChange("gearType", text)}
          />
  
          <Text style={styles.label}>Fuel Type</Text>
          <TextInput
            style={styles.input}
            value={formData.fuelType}
            onChangeText={(text) => handleInputChange("fuelType", text)}
          />
  
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={formData.description}
            multiline
            onChangeText={(text) => handleInputChange("description", text)}
          />
  
          <Text style={styles.label}>Address Label</Text>
          <TextInput
            style={styles.input}
            value={formData.addressLabel}
            onChangeText={(text) => handleInputChange("addressLabel", text)}
          />
  
          <Text style={styles.label}>Address Link</Text>
          <TextInput
            style={styles.input}
            value={formData.addressLink}
            onChangeText={(text) => handleInputChange("addressLink", text)}
          />
  
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={styles.saveButtonText}>Save Changes</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF",
    },
    formContainer: {
      padding: widthPercentageToDP(4),
    },
    label: {
      fontSize: widthPercentageToDP(4),
      fontWeight: "bold",
      marginTop: heightPercentageToDP(2),
    },
    input: {
      borderWidth: 1,
      borderColor: "#CCC",
      borderRadius: 5,
      padding: widthPercentageToDP(3),
      marginTop: heightPercentageToDP(1),
      fontSize: widthPercentageToDP(4),
    },
    saveButton: {
      backgroundColor: "#7F5AF0",
      padding: widthPercentageToDP(3),
      borderRadius: 10,
      alignItems: "center",
      marginTop: heightPercentageToDP(4),
    },
    saveButtonText: {
      color: "#FFF",
      fontSize: widthPercentageToDP(4.5),
      fontWeight: "bold",
    },
  });
  