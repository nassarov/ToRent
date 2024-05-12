import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Formik } from "formik";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { app, auth } from "../../../firebaseConfig";
import {
  doc,
  getFirestore,
  updateDoc,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

export default function AddressScreen() {
  const navigation = useNavigation();
  const db = getFirestore(app); // Make sure you have initialized your app
  const [isFocus, setIsFocus] = useState(false);
  const [valuesList, setValuesList] = useState([]);
  const [yourAdd, setYourAdd] = useState("");
  const [addAnotherAdd, setAddAnotherAdd] = useState("");
  const [lebaneseCities, setLebaneseCities] = useState(null); // Define state to hold dropdown data
  const [loading, setLoading] = useState(false);

  // get cities from firestore
  const fetchLebaneseCities = async () => {
    setLoading(true);
    const citiesCollection = collection(db, "lebaneseCities");
    const citiesQuery = query(citiesCollection, orderBy("label"));
    try {
      const querySnapshot = await getDocs(citiesQuery);
      const cityList = querySnapshot.docs.map((doc) => ({
        label: doc.data().label,
        value: doc.data().value,
      }));
      setLebaneseCities(cityList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch Lebanese cities data only when the dropdown is not yet loaded
    if (!lebaneseCities) {
      fetchLebaneseCities();
    }
    const backAction = () => {
      Alert.alert(
        "You will not be able to have addresses!",
        "Are you sure you want to leave this screen?",
        [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              // Here, you can navigate away from the screen or take any other action
              navigation.goBack(); // This example goes back, but you can navigate to another screen or perform another action
            },
          },
        ]
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [lebaneseCities, navigation]);

  const handleAddValue = (values, resetForm) => {
    setValuesList([
      ...valuesList,
      { label: values.City, value: values.GoogleMapLink },
    ]);
    resetForm();
  };

  const confirmAndSendAddresses = async () => {
    try {
      // Get the current user from Firebase Auth
      const user = auth.currentUser;

      // Update the Firestore document for the current user with all addresses
      await updateDoc(doc(db, "users", user.uid), {
        addresses: valuesList,
      });

      // Show success message
      Alert.alert(
        "Addresses Added",
        "Your addresses have been successfully added!",
        [{ text: "OK", onPress: () => navigation.replace("LoginScreen") }]
      );
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  useEffect(() => {
    // Update the state outside the rendering process
    if (valuesList.length > 0) {
      setYourAdd("Your Addresses");
      setAddAnotherAdd(" + Add Another Address");
    }
  }, [valuesList]);

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
        } else if (
          !values.GoogleMapLink.startsWith("https://maps.app.goo.gl/")
        ) {
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={{ height: heightPercentageToDP(33), marginBottom: 2 }}>
              <View style={{ height: heightPercentageToDP(12) }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    marginLeft: 15,
                    color: "#7F5AF0",
                  }}
                >
                  {addAnotherAdd}
                </Text>
                {lebaneseCities && (
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isFocus && { borderColor: "#7F5AF0" },
                    ]}
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
                )}
                {errors.City && (
                  <Text style={styles.errorText}>{errors.City}</Text>
                )}
              </View>
              {values.City && (
                <View style={{ height: heightPercentageToDP(11) }}>
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
                <View className="items-center text-center justify-center">
                  <TouchableOpacity
                    style={styles.DoneButton}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.signupButtonText}>Done</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Addresses */}
            <View className="mt-2">
              <Text
                style={{ fontSize: 18, fontWeight: "bold", marginLeft: 15 }}
              >
                {yourAdd}
              </Text>
            </View>
            {valuesList.map((item, index) => (
              <View key={index} style={styles.AddressContainer}>
                <View style={styles.rectangle}>
                  <Text>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                      City:
                    </Text>{" "}
                    {item.label}{" "}
                  </Text>
                  <Text>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                      Google Maps Link:
                    </Text>{" "}
                    <TouchableOpacity>
                      <Text className="text-blue-500">{item.value}</Text>
                    </TouchableOpacity>
                  </Text>
                </View>
              </View>
            ))}
            {valuesList.length > 0 && (
              <View className="items-center text-center justify-center">
                <TouchableOpacity
                  onPress={confirmAndSendAddresses}
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
    marginBottom: 0,
    padding: 18,
    paddingRight: 10,
    width: heightPercentageToDP(42),
    height: widthPercentageToDP(15),
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
  DoneButton: {
    backgroundColor: "#7F5AF0",
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    marginTop: 9,
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
  AddressContainer: {
    marginTop: 15,
  },
  rectangle: {
    borderWidth: 1,
    borderColor: "#7F5AF0",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 19,
  },
});
