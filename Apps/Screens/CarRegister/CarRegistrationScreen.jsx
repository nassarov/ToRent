import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, Dimensions, Image, Alert, TextInput, Keyboard, TouchableWithoutFeedback, ScrollView, KeyboardAvoidingView , Platform } from 'react-native';
import bmw from '../../../assets/carslogo/BMW.jpg';
import mercedes from '../../../assets/carslogo/Mercedes.jpg'; 
import nissan from '../../../assets/carslogo/Nissan.jpg';
import toyota from '../../../assets/carslogo/Toyota.png'; 
import { Dropdown } from "react-native-element-dropdown";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from 'react';
import { app, auth } from "../../../firebaseConfig";
import { doc, getFirestore, updateDoc, collection, getDocs,query, orderBy, } from "firebase/firestore";  

const { height } = Dimensions.get('window');

const carBrands = [
  { id: '1', name: 'BMW', image: bmw, models: ['X1', 'X3', 'X5'], types: ['SUV', 'Sedan', 'Hatchback'] },
  { id: '2', name: 'Mercedes', image: mercedes, models: ['A-Class', 'C-Class', 'E-Class'], types: ['Sedan', 'Coupe', 'Convertible'] },
  { id: '3', name: 'Nissan', image: nissan, models: ['Altima', 'Maxima', 'Sentra'], types: ['Sedan', 'SUV', 'Coupe'] },
  { id: '4', name: 'Toyota', image: toyota, models: ['Camry', 'Corolla', 'Rav4'], types: ['Sedan', 'SUV', 'Hybrid'] },
];
const colorOptions = [
  { id: '1', name: 'Red' },
  { id: '2', name: 'Blue' },
  { id: '3', name: 'Green' },
  { id: '4', name: 'Yellow' },
];

const gearTypeOptions = [
  { id: '1', name: 'Automatic' },
  { id: '2', name: 'Manual' },
];

const fuelTypeOptions = [
  { id: '1', name: 'Gasoline' },
  { id: '2', name: 'Diesel' },
  { id: '3', name: 'Electric' },
];
const addressOptions = [
  { id: '1', street: '123 Main St', city: 'New York', state: 'NY', postalCode: '10001' },
  { id: '2', street: '456 Elm St', city: 'Los Angeles', state: 'CA', postalCode: '90001' },
  { id: '3', street: '789 Oak St', city: 'Chicago', state: 'IL', postalCode: '60601' },
];


const yearOptions = Array.from({ length: 50 }, (_, index) => `${new Date().getFullYear() - index}`);

export default function CarRegistrationScreen  ()  {
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
  const [selectedYear, setSelectedYear] = useState('');
  const [carseat , setCarseat]= useState('');
  const [MinDays, setMinDay] = useState('');
  const [MaxDays, setMaxDay] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [filteredBrands, setFilteredBrands] = useState(carBrands);
  const [searchInput, setSearchInput] = useState('');
  const [filteredTypes, setFilteredTypes] = useState([]); 
const [typeSearchInput, setTypeSearchInput] = useState(''); 
const [filteredModels, setFilteredModels] = useState([]);
const [modelSearchInput, setModelSearchInput] = useState('');
const [filteredColors, setFilteredColors] = useState([]);
const [colorSearchInput, setColorSearchInput] = useState('');


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
      tabBarStyle: { display: 'none' },
    });
  }, [navigation]); 
  const db = getFirestore(app); 



  const toggleBrandModal = () => {
    setBrandModalVisible(!brandModalVisible);
    setFilteredBrands(carBrands); 
  };

  const toggleModelModal = () => {
    if (selectedBrand) {
      setModelModalVisible(!modelModalVisible);
      setFilteredModels(selectedBrand.models); 
    } else {
      Alert.alert('Select Brand', 'Please select a Brand first');
    }
  };

  const toggleTypeModal = () => {
    if (selectedModel) {
      setTypeModalVisible(!typeModalVisible);
      setFilteredTypes(selectedBrand.types); 
    } else {
      Alert.alert('Select Model', 'Please select a Model first');
    }
  };
  const toggleColorModal = () => {
    setColorModalVisible(!colorModalVisible);
    setFilteredColors(colorOptions); 
  };

  const toggleGearTypeModal = () => {
    setGearTypeModalVisible(!gearTypeModalVisible);
  };

  const toggleFuelTypeModal = () => {
    setFuelTypeModalVisible(!fuelTypeModalVisible);
  };

  const toggleYearModal = () => {
    setYearModalVisible(!yearModalVisible);
  };
  const toggleAddressModal = () => {
    setAddressModalVisible(!addressModalVisible);
  };

  const handleColorSearch = (text) => {
    const filteredColors = colorOptions.filter((color) =>
      color.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredColors(filteredColors);
  };
  
  const handleTypeSearch = (text) => {
    const filteredTypes = selectedBrand.types.filter((type) =>
      type.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredTypes(filteredTypes);
  };
  const handleModelSearch = (text) => {
    const filteredModels = selectedBrand.models.filter((model) =>
      model.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredModels(filteredModels);
  };
  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    toggleAddressModal();
  };
  const handleBrandSearch = (text) => {
    const filteredBrands = carBrands.filter((brand) =>
      brand.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredBrands(filteredBrands);
  };
  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
    setSelectedType(null);
  };

  const handleModelSelect = (model) => {
    if (!selectedBrand) {
  
      Alert.alert('Select Brand', 'Please select a brand first');
    } else {
      setSelectedModel(model);
      setSelectedType(null); 
      toggleModelModal();
    }
  };

  const handleTypeSelect = (type) => {
    if (!selectedBrand) {

      Alert.alert('Select Brand', 'Please select a brand first');
    } else {
      setSelectedType(type);
      toggleTypeModal();
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    toggleColorModal();
  };

  const handleGearTypeSelect = (gearType) => {
    setSelectedGearType(gearType);
    toggleGearTypeModal();
  };

  const handleFuelTypeSelect = (fuelType) => {
    setSelectedFuelType(fuelType);
    toggleFuelTypeModal();
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    toggleYearModal();
  };

  const handleMinDayChange = (text) => {

    const regex = /^[1-9][0-9]*$/;
    if (regex.test(text) || text === '') {
      setMinDay(text);
    }
  };
  const handleMaxDayChange = (text) => {

    const regex = /^[1-9][0-9]*$/;
    if (regex.test(text) || text === '') {
      setMaxDay(text);
    }
  };

  const handlecarseatChange = (text) => {
 
    const regex = /^[1-9][0-9]*$/;
    if (regex.test(text) || text === '') {
      setCarseat(text);
    }
  };
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };


  const OptionItem = ({ item, onPress, isSelected }) => (
    <TouchableOpacity onPress={() => onPress(item)} style={styles.optionContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {item.name !== "Brand" && <RadioButton selected={isSelected} />}
        <Text style={styles.optionText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
       <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : null} keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}>
      <View style={styles.container}>
        <ScrollView className='mb-24' showsVerticalScrollIndicator={false}>
            
          <View style={styles.carListContainer}>
            <FlatList
              horizontal
              data={carBrands}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.brandItem,
                    selectedBrand && selectedBrand.id === item.id && { borderColor: "#7F5AF0", borderWidth: 1 } // Adjust borderWidth as needed
                  ]}
                  onPress={() => handleBrandSelect(item)}
                >
                  <Image source={item.image} style={styles.image} />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.flatListContent}
            />
          </View>
          <Text style={styles.dropdownTitle}>Address</Text>
<TouchableOpacity onPress={toggleAddressModal} style={styles.dropdownButton} >
  <Text>{selectedAddress ? selectedAddress.street : 'Select an address'}</Text>
</TouchableOpacity>
<Modal visible={brandModalVisible} transparent={true} animationType="slide" onRequestClose={toggleBrandModal}>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <TextInput
        style={styles.input}
        placeholder="Search Brands"
        value={searchInput}
        onChangeText={(text) => {
          setSearchInput(text);
          handleBrandSearch(text);
        }}
      />
      <FlatList
        data={filteredBrands}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleBrandSelect(item)} style={styles.optionContainer}>
            <Image source={item.image} style={styles.optionImage} />
            <Text style={styles.optionText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity onPress={toggleBrandModal}>
        <Text style={styles.doneButton}>Done</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
          <Text style={styles.dropdownTitle}>Brands</Text>
          <TouchableOpacity onPress={toggleBrandModal} style={styles.dropdownButton} >
            <Text>{selectedBrand ? selectedBrand.name : 'Select a brand'}</Text>
          </TouchableOpacity>

          <Modal visible={brandModalVisible} transparent={true} animationType="slide" onRequestClose={toggleBrandModal}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <FlatList
                  data={carBrands}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleBrandSelect(item)} style={styles.optionContainer}>
                      <Image source={item.image} style={styles.optionImage} />
                      <Text style={styles.optionText}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.id}
                />
                <TouchableOpacity onPress={toggleBrandModal}>
                  <Text style={styles.doneButton}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          { (
            <>
              <Text style={styles.dropdownTitle}>Models</Text>
              <TouchableOpacity onPress={toggleModelModal} style={styles.dropdownButton} >
                <Text>{selectedModel ? selectedModel : 'Select a model'}</Text>
              </TouchableOpacity>
            </>
          )}

<Modal visible={modelModalVisible} transparent={true} animationType="slide" onRequestClose={toggleModelModal}>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <TextInput
        style={styles.input}
        placeholder="Search Models"
        value={modelSearchInput}
        onChangeText={(text) => {
          setModelSearchInput(text);
          handleModelSearch(text);
        }}
      />
      <FlatList
        data={filteredModels}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleModelSelect(item)} style={styles.optionContainer}>
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  </View>
</Modal>

          {(
            <>
              <Text style={styles.dropdownTitle}>Types</Text>
              <TouchableOpacity onPress={toggleTypeModal} style={styles.dropdownButton} >
                <Text>{selectedType ? selectedType : 'Select a type'}</Text>
              </TouchableOpacity>
            </>
          )}
<Modal visible={typeModalVisible} transparent={true} animationType="slide" onRequestClose={toggleTypeModal}>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <TextInput
        style={styles.input}
        placeholder="Search Types"
        value={typeSearchInput}
        onChangeText={(text) => {
          setTypeSearchInput(text);
          handleTypeSearch(text);
        }}
      />
      <FlatList
        data={filteredTypes}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleTypeSelect(item)} style={styles.optionContainer}>
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  </View>
</Modal>

          <Text style={styles.dropdownTitle}>Color</Text>
          <TouchableOpacity onPress={toggleColorModal} style={styles.dropdownButton} >
            <Text>{selectedColor ? selectedColor.name : 'Select a color'}</Text>
          </TouchableOpacity>

          <Modal visible={colorModalVisible} transparent={true} animationType="slide" onRequestClose={toggleColorModal}>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <TextInput
        style={styles.input}
        placeholder="Search Colors"
        value={colorSearchInput}
        onChangeText={(text) => {
          setColorSearchInput(text);
          handleColorSearch(text);
        }}
      />
      <FlatList
        data={filteredColors}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleColorSelect(item)} style={styles.optionContainer}>
            <View style={[styles.colorOption, { backgroundColor: item.name.toLowerCase() }]}></View>
            <Text style={styles.optionText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  </View>
</Modal>

          <Text style={styles.dropdownTitle}>Gear Type</Text>
          <TouchableOpacity onPress={toggleGearTypeModal} style={styles.dropdownButton} >
            <Text>{selectedGearType ? selectedGearType.name : 'Select a gear type'}</Text>
          </TouchableOpacity>

          <Modal visible={gearTypeModalVisible} transparent={true} animationType="slide" onRequestClose={toggleGearTypeModal}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <FlatList
                  data={gearTypeOptions}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleGearTypeSelect(item)} style={styles.optionContainer}>
                      <Text style={styles.optionText}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.id}
                />
              
              </View>
            </View>
          </Modal>

          <Text style={styles.dropdownTitle}>Fuel Type</Text>
          <TouchableOpacity onPress={toggleFuelTypeModal} style={styles.dropdownButton} >
            <Text>{selectedFuelType ? selectedFuelType.name : 'Select a fuel type'}</Text>
          </TouchableOpacity>

          <Modal visible={fuelTypeModalVisible} transparent={true} animationType="slide" onRequestClose={toggleFuelTypeModal}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <FlatList
                  data={fuelTypeOptions}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleFuelTypeSelect(item)} style={styles.optionContainer}>
                      <Text style={styles.optionText}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.id}
                />
              
              </View>
            </View>
          </Modal>

          <Text style={styles.dropdownTitle}>Year</Text>
          <TouchableOpacity onPress={toggleYearModal} style={styles.dropdownButton} >
            <Text>{selectedYear ? selectedYear : 'Select a year'}</Text>
          </TouchableOpacity>

          <Modal visible={yearModalVisible} transparent={true} animationType="slide" onRequestClose={toggleYearModal}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <FlatList
                  data={yearOptions}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleYearSelect(item)} style={styles.optionContainer}>
                      <Text style={styles.optionText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item}
                />
             
              </View>
            </View>
          </Modal>
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
      <View style={styles.bottomContainer} className='bg-slate-300 '>
             <TouchableOpacity onPress={clearAllSelections}>
                    <Text style={styles.clearAllText}>Clear All</Text>
                </TouchableOpacity>
            <TouchableOpacity style={styles.ApplyButton} onPress={() => navigation.push("PickImagesScreen")}>
              <Text style={styles.ApplyButtonText}>Apply</Text>
            </TouchableOpacity>
            </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    
  },
  carListContainer: {
    height: 100,
    marginBottom: 20,
  },
  flatListContent: {
    alignItems: 'center',
    paddingRight: 20,
  },
  brandItem: {
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
    margin: 10,
    
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dropdownButton: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    borderColor:"#7F5AF0",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: 300
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxHeight: "80%",
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  optionImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  optionText: {
    fontSize: 18,
  },
  doneButton: {
    fontSize: 18,
    color: 'blue',
    textAlign: 'center',
    paddingVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#7F5AF0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  colorOption: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'black',
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
  labelStyle: {
    fontSize: 16,
    color: "#7F5AF0",
    fontWeight: "bold",
    marginBottom: 0,
    marginLeft: 25,
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
  yearInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50,
    marginVertical: 2,
    marginHorizontal: 18,
    backgroundColor: "#F6F6F6",
    borderColor: "#7F5AF0",
    width: widthPercentageToDP("90%"),
  },
  picker: {
    position: "absolute",
    bottom: 52,
    left: 17,
    top:60,
    backgroundColor: "#FFFFFF", // Remove border
    width:  widthPercentageToDP("90%"),
    borderRadius: 0,
  },
  yearInputContainer: {
    marginBottom: 20,
    position: 'relative',
  },
 modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',// Align content to the bottom
},
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  optionContainer: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  optionText: {
    fontSize: 18,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxHeight: height / 2, // Set the max height to half of the screen height
  },
});
