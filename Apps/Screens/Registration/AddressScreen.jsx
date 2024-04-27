import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity, ScrollView } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { Formik } from "formik";
import { AntDesign } from "@expo/vector-icons";
export default function AddressScreen() {
  const [selectedCity, setSelectedCity] = useState(null); 
  const [isFocus, setIsFocus] = useState(false); 
  const [valuesList, setValuesList] = useState([]); 
  const [yourAdd, setYourAdd] = useState('');

  const lebaneseCities = [
    { label: "Beirut", value: "Beirut" },
    { label: "Tripoli", value: "Tripoli" },
    { label: "Sidon", value: "Sidon" },
    { label: "Tyre", value: "Tyre" },
    { label: "Jbeil", value: "Jbeil" },
    { label: "Baalbek", value: "Baalbek" },
    { label: "Zahle", value: "Zahle" },
    { label: "Nabatieh", value: "Nabatieh" },
    { label: "Jounieh", value: "Jounieh" },
    { label: "Batroun", value: "Batroun" },
    { label: "Bint Jbeil", value: "Bint Jbeil" },
    { label: "Hermel", value: "Hermel" },
    { label: "Marjayoun", value: "Marjayoun" },
    { label: "Aley", value: "Aley" },
    { label: "Chouf", value: "Chouf" },
    { label: "Bsharri", value: "Bsharri" },
    { label: "Rashaya", value: "Rashaya" },
    { label: "Zahlé", value: "Zahlé" },
    { label: "Baabda", value: "Baabda" },
    { label: "Anjar", value: "Anjar" },
    { label: "Chekka", value: "Chekka" },
    { label: "Dahr El Ahmar", value: "Dahr El Ahmar" },
    { label: "Deir el Qamar", value: "Deir el Qamar" },
    { label: "Ebel El Saqi", value: "Ebel El Saqi" },
    { label: "Ghazir", value: "Ghazir" },
    { label: "Halba", value: "Halba" },
    { label: "Hasbaya", value: "Hasbaya" },
    { label: "Jezzine", value: "Jezzine" },
    { label: "Marjeyoun", value: "Marjeyoun" },
   
  ];

  const handleAddValue = (values, resetForm) => {
    setValuesList([...valuesList, { city: values.City, googleMapLink: values.GoogleMapLink }]);
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        City: "",
        GoogleMapLink: "",
      }}
      validate={(values) => {
        const errors = {};
        if (values.City === "") {
          errors.City = "Required: Please select your city";
        }
        if (values.GoogleMapLink === "") {
          errors.GoogleMapLink = "Required: Please enter Google Maps link";
        } else if (!values.GoogleMapLink.startsWith("https://maps.app.goo.gl/")) {
          errors.GoogleMapLink = "Invalid Google Maps link";
        }
        return errors;
      }}
      onSubmit={(values, { resetForm }) => {
        if (values.City && values.GoogleMapLink) {
          handleAddValue(values, resetForm);
        }
      }}
    >
      {({ handleChange, handleSubmit, values, errors, resetForm }) => (
        <ScrollView>
          <View style={styles.container}>
          <View style={{height:heightPercentageToDP(33), marginBottom:2}}>
            <View style={{ height: heightPercentageToDP(12)}}>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: "#7F5AF0" }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={lebaneseCities}
                search={true}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Address" : "Select one"}
                searchPlaceholder="Search..."
                value={values.City}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  handleChange("City")(item.value);
                  setIsFocus(false);
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={isFocus ? "blue" : "black"}
                    name="Safety"
                    size={20}
                  />
                )}
              />
              {errors.City && (
                <Text style={styles.errorText}>{errors.City}</Text>
              )}
            </View>
            {values.City && (
              <View style={{ height:heightPercentageToDP(11)}}>
                <TextInput
                  style={styles.input}
                  placeholder="Google Maps link(https://maps.app.goo.gl/abc)"
                  value={values.GoogleMapLink}
                  onChangeText={(text) => handleChange("GoogleMapLink")(text)}
                />
                {errors.GoogleMapLink && (
                  <Text style={styles.errorText}>{errors.GoogleMapLink}</Text>
                )}
              </View>
            )}
            {/* Done Button */}
            {values.City && (
            <View className='items-center text-center justify-center'>
              <TouchableOpacity
                style={styles.DoneButton}
                onPress={handleSubmit}
              >
                <Text style={styles.signupButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
            )}</View>


            {/* Addresses */}
           <View className='mt-2'>
            <Text style={{ fontSize: 18, fontWeight: "bold",marginLeft:15 }}>{yourAdd}</Text>
           </View>
            {valuesList.map((item, index) => (
              <View key={index} style={styles.AddressContainer}>
                <View style={styles.rectangle}>
                  <Text><Text style={{ fontSize: 15, fontWeight: "bold" }}>City:</Text> {item.city} </Text>
                  <Text><Text style={{ fontSize: 15, fontWeight: "bold" }}>Google Maps Link:</Text> <TouchableOpacity><Text className='text-blue-500'>{item.googleMapLink}</Text></TouchableOpacity></Text>
                </View>
              </View>
            ))}
            {valuesList.length > 0 && (
              setYourAdd('Your Addresses'),
              <View className='items-center text-center justify-center'>
                <TouchableOpacity
                  style={styles.signupButton}
                >
                  <Text style={styles.signupButtonText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 20,
    
  },
  input: {
    borderColor: "#7F5AF0",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    margin: 15,
    marginBottom:0,
    padding: 18,
    paddingRight:10,
    width: heightPercentageToDP(42),
    height: widthPercentageToDP(15)
  },
  passwordContainer: {
    position: "relative",
  },
  iconContainer: {
    position: "absolute",
    right: 25,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
  dropdownContainer: {
    width: heightPercentageToDP(42),
    borderColor: "#16213E",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    marginVertical: 15,
    color: "",
    margin: 15,
  },
  dropdown: {
    borderColor: "#7F5AF0",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: heightPercentageToDP(42),
    height: widthPercentageToDP(15),
    margin: 15,
    
  },
  signupButton: {
    backgroundColor: "#7F5AF0",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    width: heightPercentageToDP(16),
    height: widthPercentageToDP(18),
  },
  DoneButton:{
    backgroundColor: "#7F5AF0",
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    marginTop:9,
    width: heightPercentageToDP(16),
    height: widthPercentageToDP(18),
  },
  signupButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: 15,
  },

  icon: {
    marginRight: 5,
  },

  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  AddressContainer:{
    marginTop: 15,
   
  },
  rectangle: {
    borderWidth: 1,
    borderColor: '#7F5AF0',
    borderRadius: 5,
    padding: 10,
    marginHorizontal:19,
  },
});
