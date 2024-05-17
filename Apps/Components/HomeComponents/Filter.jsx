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
  ActivityIndicator,
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
import AddressDropdownModal from "../../Components/CarRegistrationComponents/AddressDropDownModal";

const { height } = Dimensions.get("window");
const yearOptions = [];
const currentYear = new Date().getFullYear();
const startYear = 1990; // You can adjust the start year as needed

// Loop to generate years from startYear to currentYear
for (let year = currentYear; year >= startYear; year--) {
  yearOptions.push({ label: year.toString(), value: year });
}

export default function Filter() {
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

  const [filteredBrands, setFilteredBrands] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredTypes, setFilteredTypes] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [filteredColors, setFilteredColors] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [carBrands, setCarBrands] = useState([]);
  const [gearTypeOptions, setGearTypeOptions] = useState([]);
  const [fuelTypeOptions, setFuelTypeOptions] = useState([]);
  const [filteredYear, setFilteredYear] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [lebaneseCities, setLebaneseCities] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  // hide bottom tab bar
  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: "none" },
    });
  }, [navigation]);

  useEffect(() => {
    fetchLebaneseCities();
  }, []);

  const fetchLebaneseCities = async () => {
    setLoading(true);
    const db = getFirestore(app);
    const citiesCollection = collection(db, "lebaneseCities");
    const citiesQuery = query(citiesCollection, orderBy("label"));
    try {
      const querySnapshot = await getDocs(citiesQuery);
      const cityList = querySnapshot.docs.map((doc) => ({
        label: doc.data().label,
        value: doc.data().value,
      }));
      setLebaneseCities(cityList);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
    setLoading(false);
  };

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
    setSelectedType(null);
  };

  const onApply = async () => {
    const carData = {
      brand: selectedBrand ? selectedBrand.value : null,
      model: selectedModel ? selectedModel.value : null,
      type: selectedType ? selectedType.value : null,
      color: selectedColor ? selectedColor.value : null,
      gearType: selectedGearType ? selectedGearType.value : null,
      fuelType: selectedFuelType ? selectedFuelType.value : null,
      year: selectedYear ? selectedYear.value : null,
      address: selectedAddress ? selectedAddress.value : null,
    };

    navigation.push("FilterResult", { carData: carData });
  };

  const clearAllSelections = () => {
    setSelectedBrand(null);
    setSelectedType(null);
    setSelectedColor(null);
    setSelectedModel(null);
    setSelectedFuelType(null);
    setSelectedGearType(null);
    setSelectedYear(null);
    setSelectedAddress(null);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
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
                    <Image source={{ uri: item.image }} style={styles.image} />
                  )}
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index}
              contentContainerStyle={styles.flatListContent}
            />
          </View>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <AddressDropdownModal
              title={"Address"}
              userData={lebaneseCities}
              selectedItem={selectedAddress}
              setSelectedItem={setSelectedAddress}
              modalVisible={addressModalVisible}
              setModalVisible={setAddressModalVisible}
            />
          )}
          <DropdownModal
            title={"Brand"}
            data={carBrands}
            setData={setCarBrands}
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
            collectionName={"carBrands"}
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
            setData={setColorOptions}
            selectedItem={selectedColor}
            setSelectedItem={setSelectedColor}
            modalVisible={colorModalVisible}
            setModalVisible={setColorModalVisible}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            filteredItems={filteredColors}
            setFilteredItems={setFilteredColors}
            withColor={true}
            collectionName={"carColors"}
          />
          <DropdownModal
            title={"Gear Type"}
            data={gearTypeOptions}
            setData={setGearTypeOptions}
            selectedItem={selectedGearType}
            setSelectedItem={setSelectedGearType}
            modalVisible={gearTypeModalVisible}
            setModalVisible={setGearTypeModalVisible}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            filteredItems={gearTypeOptions}
            setFilteredItems={setGearTypeOptions}
            collectionName={"carGears"}
          />
          <DropdownModal
            title={"Fuel Type"}
            data={fuelTypeOptions}
            setData={setFuelTypeOptions}
            selectedItem={selectedFuelType}
            setSelectedItem={setSelectedFuelType}
            modalVisible={fuelTypeModalVisible}
            setModalVisible={setFuelTypeModalVisible}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            filteredItems={fuelTypeOptions}
            setFilteredItems={setFuelTypeOptions}
            collectionName={"fuelTypes"}
          />
          <DropdownModal
            title={"Year"}
            data={yearOptions}
            depends={true}
            selectedItem={selectedYear}
            setSelectedItem={setSelectedYear}
            modalVisible={yearModalVisible}
            setModalVisible={setYearModalVisible}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            filteredItems={filteredYear}
            setFilteredItems={setFilteredYear}
          />
        </ScrollView>
      </View>
      <View style={styles.bottomContainer} className="bg-slate-300 ">
        <TouchableOpacity onPress={clearAllSelections}>
          <Text style={styles.clearAllText}>Clear All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ApplyButton} onPress={() => onApply()}>
          <Text style={styles.ApplyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 89,
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
    marginTop: 50,
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
    height: 1, 
    backgroundColor: "#7F5AF0",
    alignItems: "baseline",
  },
});
