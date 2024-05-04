import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, ScrollView } from 'react-native';
import { Dropdown } from "react-native-element-dropdown";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from 'react';
import { app, auth } from "../../../firebaseConfig";
import { doc, getFirestore, updateDoc, collection, getDocs,query, orderBy, } from "firebase/firestore";

export default function AddPost() {

    const navigation = useNavigation();
    // hide bottom tab bar
    useLayoutEffect(() => {
        navigation.setOptions({
          tabBarStyle: { display: 'none' },
        });
      }, [navigation]);

    const db = getFirestore(app); // Make sure you have initialized your app
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectBrand, setSelectBrand] = useState(null);
    const [selectType, setSelectType] = useState(null);
    const [selectPrice, setSelectPrice] = useState(null);
    const [selectColor, setSelectColor] = useState(null);
    const [selectSeats, setSelectSeats] = useState(null);
    const [selectedYear, setSelectedYear] = useState(""); 
    

    const dataAdd = [{ label: "Beirut", value: "Beirut" }, { label: "Tripoli", value: "Tripoli" }];
    const dataBrand = [{ label: "Toyota", value: "Toyota" }, { label: "Honda", value: "Honda" }];
    const dataType = [{ label: "SUV", value: "SUV" }, { label: "Sedan", value: "Sedan" }];
    const dataPrice = [{ label: "$10,000 - $20,000", value: "10-20" }, { label: "$20,000 - $30,000", value: "20-30" }];
    const dataColor = [{ label: "Red", value: "Red" }, { label: "Blue", value: "Blue" }];
    const dataSeats = [{ label: "2 Seats", value: "2" }, { label: "5 Seats", value: "5" }];
    const years = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - i).toString());
    
    const clearAllSelections = () => {
        setSelectedAddress(null);
        setSelectBrand(null);
        setSelectType(null);
        setSelectPrice(null);
        setSelectColor(null);
        setSelectSeats(null);
        setSelectedYear(""); 
    };

    return (
        <View style={styles.container}>
            
            <Text style={styles.text}>Please fill Required Information</Text>
        <ScrollView>
            <View className='mb-44'>
                {/* location */}
                <View className=''>
            <View style={styles.texts} className='flex-row items-baseline mr-5'><Text className='text-[15px] font-bold'>Location  </Text><View style={styles.line}/></View>
            <DropdownComponent
                data={dataAdd}
                value={selectedAddress}
                setValue={setSelectedAddress}
                placeholder="Address"
            /></View>
            {/* Car Details */}
            <View className=''>
            <View style={styles.text} className='flex-row items-baseline'><Text className='text-[15px] font-bold'>Car Details  </Text><View style={styles.line}/></View>
            <DropdownComponent
                data={dataType}
                value={selectType}
                setValue={setSelectType}
                placeholder="Type"
            />
             <DropdownComponent
                data={dataBrand}
                value={selectBrand}
                setValue={setSelectBrand}
                placeholder="Brand"
            />
            <DropdownComponent
                data={dataPrice}
                value={selectPrice}
                setValue={setSelectPrice}
                placeholder="Price Range"
            />
            <DropdownComponent
                data={dataColor}
                value={selectColor}
                setValue={setSelectColor}
                placeholder="Color"
            />
            <DropdownComponent
                data={dataSeats}
                value={selectSeats}
                setValue={setSelectSeats}
                placeholder="Number of Seats"
            />
             <DropdownComponent
                data={dataSeats}
                value={selectSeats}
                setValue={setSelectSeats}
                placeholder="Number of Seats"
            />
            {/* Dropdown for Year */}
            <DropdownComponent
                data={years.map(year => ({ label: year, value: year }))}
                value={selectedYear}
                setValue={setSelectedYear}
                placeholder="Year"
            />
            </View>
            </View></ScrollView>
             <View style={styles.bottomContainer} className='bg-slate-300 '>
             <TouchableOpacity onPress={clearAllSelections}>
                    <Text style={styles.clearAllText}>Clear All</Text>
                </TouchableOpacity>
            <TouchableOpacity style={styles.ApplyButton} onPress={() => navigation.push("PickImagesScreen")}>
              <Text style={styles.ApplyButtonText}>Apply</Text>
            </TouchableOpacity>
            </View>
            
        </View>
    );}

 const DropdownComponent = ({ data, value, setValue, placeholder }) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <View style={{ marginBottom: 20}}>
            {isFocused || value ? (
                <Text style={styles.labelStyle}>{placeholder}*</Text>
            ) : <Text></Text>}
            <Dropdown
                style={styles.dropdown}
                data={data}
                labelField="label"
                valueField="value"
                placeholder={!isFocused && !value ? placeholder : ''}
                value={value}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                search={true}
                searchPlaceholder='Search'
                onChange={(item) => {
                    setValue(item.value);
                    setIsFocused(false);
                }}

                containerStyle={styles.dropdownContainer}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                maxHeight={300}
            />  
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"flex-start",
        paddingTop:5,
    },
    text: {
        fontWeight: "500",
        fontSize: 16,
        margin: 20,
        marginLeft:18,
    },
    texts: {
        marginBottom:2,
        marginLeft:18,
    },
    dropdownContainer: {
        width: widthPercentageToDP('90%'),
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
        marginHorizontal:18,
    },
    placeholderStyle: {
        fontSize: 16,
        color: "black",
        fontWeight: "bold"
    },
    selectedTextStyle: {
        fontSize: 16,
        fontWeight: '400'
    },
    labelStyle: {
        fontSize: 16,
        color: '#7F5AF0',
        fontWeight: 'bold',
        marginBottom: 0,
        marginLeft: 25,
        
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingHorizontal: 15,
        alignItems:'center',
        height:heightPercentageToDP(13),
        position:'absolute',
        bottom:0,
        width: '100%'
    },
    clearAllText: {
        color: '#7F5AF0',
        fontSize: 16,
        fontWeight: '600',
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
        backgroundColor: '#7F5AF0',
        alignItems:'baseline' // Adjust line color as needed
      },
});
