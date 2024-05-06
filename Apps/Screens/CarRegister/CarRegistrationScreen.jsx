import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
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
import DropdownModal from "../../Components/CarRegistrationComponents/DropdownModal";
import { color } from "react-native-elements/dist/helpers";
import { carBrands } from "../../Utils/query";

const { height } = Dimensions.get("window");

const addressOptions = [
  {
    id: "1",
    value: "123 Main St",
    label: "New York",
    state: "NY",
    postalCode: "10001",
  },
  {
    id: "2",
    value: "456 Elm St",
    label: "Los Angeles",
    state: "CA",
    postalCode: "90001",
  },
  {
    id: "3",
    value: "789 Oak St",
    label: "Chicago",
    state: "IL",
    postalCode: "60601",
  },
];

const yearOptions = Array.from(
  { length: 50 },
  (_, index) => `${new Date().getFullYear() - index}`
);

export default function CarRegistrationScreen({ route }) {
  const { userData } = route.params;
  const [brandModalVisible, setBrandModalVisible] = useState(false);
  const [modelModalVisible, setModelModalVisible] = useState(false);
  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const [colorModalVisible, setColorModalVisible] = useState(false);
  const [gearTypeModalVisible, setGearTypeModalVisible] = useState(false);
  const [fuelTypeModalVisible, setFuelTypeModalVisible] = useState(false);
  const [yearModalVisible, setYearModalVisible] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedGearType, setSelectedGearType] = useState(null);
  const [selectedFuelType, setSelectedFuelType] = useState(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [carseat, setCarseat] = useState("");
  const [MinDays, setMinDay] = useState("");
  const [MaxDays, setMaxDay] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [filteredBrands, setFilteredBrands] = useState(carBrands);
  const [searchInput, setSearchInput] = useState("");
  const [filteredTypes, setFilteredTypes] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [filteredColors, setFilteredColors] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [gearTypeOptions, setGearTypeOptions] = useState([]);
  const [fuelTypeOptions, setFuelTypeOptions] = useState([]);
  const [filteredAddresses, setFilteredAddresses] = useState([]);
  const [filteredYear, setFilteredYear] = useState([]);

  useEffect(() => {
    fetchColor();
    fetchFuel();
    fetchGears();
  }, []);

  const fetchColor = async () => {
    setColorOptions([]);
    const querySnapshot = await getDocs(collection(db, "carColors"));
    querySnapshot.forEach((doc) => {
      setColorOptions((colors) => [...colors, doc.data()]);
    });
  };

  const fetchGears = async () => {
    setGearTypeOptions([]);
    const querySnapshot = await getDocs(collection(db, "carGears"));
    querySnapshot.forEach((doc) => {
      setGearTypeOptions((gear) => [...gear, doc.data()]);
    });
  };
  const fetchFuel = async () => {
    setFuelTypeOptions([]);
    const querySnapshot = await getDocs(collection(db, "fuelTypes"));
    querySnapshot.forEach((doc) => {
      setFuelTypeOptions((fuel) => [...fuel, doc.data()]);
    });
  };

  const onApply = async () => {
    if (
      selectedBrand &&
      selectedColor &&
      selectedType &&
      selectedYear &&
      selectedFuelType &&
      selectedGearType &&
      selectedModel
    ) {
      const carData = [{ color: selectedColor.value, type: selectedType }];

      navigation.push("PickImagesScreen", { carData: carData });
    } else {
      Alert.alert("Required", "Please fill all the data first");
    }
  };
  const clearAllSelections = () => {
    setSelectedAddress(null);
    setSelectedBrand(null);
    setSelectedType(null);
    setSelectedColor(null);
    setSelectedModel(null);
    setSelectedFuelType(null);
    setSelectedGearType(null);
    setSelectedYear(null);
    setCarseat(null);
    setMinDay(null);
    setMaxDay(null);
  };
  const navigation = useNavigation();
  // hide bottom tab bar
  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: "none" },
    });
  }, [navigation]);
  const db = getFirestore(app);

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
    setSelectedType(null);
  };

  const handleMinDayChange = (text) => {
    const regex = /^[1-9][0-9]*$/;
    if (regex.test(text) || text === "") {
      setMinDay(text);
    }
  };
  const handleMaxDayChange = (text) => {
    const regex = /^[1-9][0-9]*$/;
    if (regex.test(text) || text === "") {
      setMaxDay(text);
    }
  };

  const handlecarseatChange = (text) => {
    const regex = /^[1-9][0-9]*$/;
    if (regex.test(text) || text === "") {
      setCarseat(text);
    }
  };
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
      >
        <View style={styles.container}>
          <ScrollView className="mb-24">
            <View style={styles.carListContainer}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={carBrands}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.brandItem,
                      selectedBrand &&
                        selectedBrand.label === item.label && {
                          borderColor: "#7F5AF0",
                          borderWidth: 2,
                          borderRadius: 10,
                        }, // Adjust borderWidth as needed
                    ]}
                    onPress={() => handleBrandSelect(item)}
                  >
                    {carBrands && (
                      <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                      />
                    )}
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index}
                contentContainerStyle={styles.flatListContent}
              />
            </View>
            <DropdownModal
              title={"Address"}
              data={userData.addresses}
              selectedItem={selectedAddress}
              setSelectedItem={setSelectedAddress}
              modalVisible={addressModalVisible}
              setModalVisible={setAddressModalVisible}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              filteredItems={filteredAddresses}
              setFilteredItems={setFilteredAddresses}
              address={true}
            />
            <DropdownModal
              title={"Brand"}
              data={carBrands}
              selectedItem={selectedBrand}
              setSelectedItem={setSelectedBrand}
              modalVisible={brandModalVisible}
              setModalVisible={setBrandModalVisible}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              filteredItems={filteredBrands}
              setFilteredItems={setFilteredBrands}
              withLogo={true}
              dependingOnIt={[setSelectedModel, setSelectedType]}
            />

            <DropdownModal
              title={"Model"}
              data={selectedBrand?.models}
              selectedItem={selectedModel}
              setSelectedItem={setSelectedModel}
              modalVisible={modelModalVisible}
              setModalVisible={setModelModalVisible}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              filteredItems={filteredModels}
              setFilteredItems={setFilteredModels}
              depends={true}
            />

            <DropdownModal
              title={"Types"}
              data={selectedBrand?.types}
              selectedItem={selectedType}
              setSelectedItem={setSelectedType}
              modalVisible={typeModalVisible}
              setModalVisible={setTypeModalVisible}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              filteredItems={filteredTypes}
              setFilteredItems={setFilteredTypes}
              depends={true}
            />
            <DropdownModal
              title={"Color"}
              data={colorOptions}
              selectedItem={selectedColor}
              setSelectedItem={setSelectedColor}
              modalVisible={colorModalVisible}
              setModalVisible={setColorModalVisible}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              filteredItems={filteredColors}
              setFilteredItems={setFilteredColors}
              withColor={true}
            />
            <DropdownModal
              title={"Gear Type"}
              data={gearTypeOptions}
              selectedItem={selectedGearType}
              setSelectedItem={setSelectedGearType}
              modalVisible={gearTypeModalVisible}
              setModalVisible={setGearTypeModalVisible}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              filteredItems={gearTypeOptions}
              setFilteredItems={setGearTypeOptions}
            />
            <DropdownModal
              title={"Fuel Type"}
              data={fuelTypeOptions}
              selectedItem={selectedFuelType}
              setSelectedItem={setSelectedFuelType}
              modalVisible={fuelTypeModalVisible}
              setModalVisible={setFuelTypeModalVisible}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              filteredItems={fuelTypeOptions}
              setFilteredItems={setFuelTypeOptions}
            />
            <DropdownModal
              title={"Year"}
              data={yearOptions}
              selectedItem={selectedYear}
              setSelectedItem={setSelectedYear}
              modalVisible={yearModalVisible}
              setModalVisible={setYearModalVisible}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              filteredItems={filteredYear}
              setFilteredItems={setFilteredYear}
            />
            <View>
              <Text style={styles.dropdownTitle}>Car Seats</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter number of the seats"
                value={carseat}
                onChangeText={handlecarseatChange}
              />
            </View>

            <View>
              <Text style={styles.dropdownTitle}>Minimum Days</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter Minimum days to rent"
                value={MinDays}
                onChangeText={handleMinDayChange}
              />
            </View>

            <View>
              <Text style={styles.dropdownTitle}>Maximum Days</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter Maximum days to rent"
                value={MaxDays}
                onChangeText={handleMaxDayChange}
              />
            </View>
          </ScrollView>
        </View>
        <View style={styles.bottomContainer} className="bg-slate-300 ">
          <TouchableOpacity onPress={clearAllSelections}>
            <Text style={styles.clearAllText}>Clear All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ApplyButton}
            onPress={() => onApply()}
          >
            <Text style={styles.ApplyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  carListContainer: {
    height: 100,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    margin: 2,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  flatListContent: {
    alignItems: "center",
    paddingRight: 20,
  },
  brandItem: {
    width: 80,
    height: 80,
    margin: 5,
  },
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

  input: {
    borderWidth: 1,
    borderColor: "#7F5AF0",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },

  text: {
    fontWeight: "500",
    fontSize: 16,
    margin: 20,
    marginLeft: 18,
  },

  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 15,
    alignItems: "center",
    height: heightPercentageToDP(13),
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  clearAllText: {
    color: "#7F5AF0",
    fontSize: 16,
    fontWeight: "600",
  },
  ApplyButton: {
    backgroundColor: "#7F5AF0",
    borderRadius: 8,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
    width: heightPercentageToDP(16),
    height: widthPercentageToDP(13),
  },
  ApplyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  line: {
    flex: 1,
    height: 1, // Adjust line height as needed
    backgroundColor: "#7F5AF0",
    alignItems: "baseline", // Adjust line color as needed
  },
});
