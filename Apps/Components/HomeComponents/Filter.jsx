import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Dropdown } from "react-native-element-dropdown";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

export default function Filter() {
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectBrand, setSelectBrand] = useState(null);
    const [selectModel, setSelectModel] = useState(null);
    const [selectPrice, setSelectPrice] = useState(null);
    const [selectColor, setSelectColor] = useState(null);
    const [selectSeats, setSelectSeats] = useState(null);

    const dataAdd = [{ label: "Beirut", value: "Beirut" }, { label: "Tripoli", value: "Tripoli" }];
    const dataBrand = [{ label: "Toyota", value: "Toyota" }, { label: "Honda", value: "Honda" }];
    const dataModel = [{ label: "Corolla", value: "Corolla" }, { label: "Civic", value: "Civic" }];
    const dataPrice = [{ label: "$10,000 - $20,000", value: "10-20" }, { label: "$20,000 - $30,000", value: "20-30" }];
    const dataColor = [{ label: "Red", value: "Red" }, { label: "Blue", value: "Blue" }];
    const dataSeats = [{ label: "2 Seats", value: "2" }, { label: "5 Seats", value: "5" }];

    const clearAllSelections = () => {
        setSelectedAddress(null);
        setSelectBrand(null);
        setSelectModel(null);
        setSelectPrice(null);
        setSelectColor(null);
        setSelectSeats(null);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Filter</Text>
            <DropdownComponent
                data={dataAdd}
                value={selectedAddress}
                setValue={setSelectedAddress}
                placeholder="Address"
            />
            <DropdownComponent
                data={dataBrand}
                value={selectBrand}
                setValue={setSelectBrand}
                placeholder="Brand"
            />
            <DropdownComponent
                data={dataModel}
                value={selectModel}
                setValue={setSelectModel}
                placeholder="Model"
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
             <View style={styles.bottomContainer} className='bg-slate-300 flex-1 w-full'>
             <TouchableOpacity onPress={clearAllSelections}>
                    <Text style={styles.clearAllText}>Clear All</Text>
                </TouchableOpacity>
            <TouchableOpacity style={styles.ApplyButton} onPress={()=>console.log('apply')}>
              <Text style={styles.ApplyButtonText}>Apply</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
}

const DropdownComponent = ({ data, value, setValue, placeholder }) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <View style={{ marginBottom: 20}}>
            {isFocused || value ? (
                <Text style={styles.labelStyle}>{placeholder}</Text>
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
        paddingTop: 2,
        paddingHorizontal:15,
    },
    text: {
        fontWeight: "bold",
        fontSize: 25,
        margin: 15,
        marginLeft:0,
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
        paddingHorizontal: 8,
        marginVertical: 5,
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
        marginLeft: 5,
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingHorizontal: 15,
        alignItems:'center',
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
});
