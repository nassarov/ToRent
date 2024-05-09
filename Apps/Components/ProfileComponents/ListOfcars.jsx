import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../Components/ProfileComponents/profileStyle';
import Slider from "../../Components/HomeComponents/Slider";
import { Icon } from 'react-native-elements';


export default function ListOfcars() {
  const slide = false;
  const companyData = [
    {
      id: 1,
      name: "ABC Motors",
      cars: [
        {
          id: 1,
          image: require("./../../../assets/CarPosts/hyundai.png"),
          brand: "Hyundai",
          model: "Creta-2018",
          price: "30",
        },
        {
          id: 2,
          image: require("./../../../assets/CarPosts/mahindra.jpeg"),
          brand: "Mahindra",
          model: "Scorpion-2020",
          price: "20",
        },
        {
          id: 3,
          image: require("./../../../assets/CarPosts/suzuki.jpeg"),
          brand: "Suzuki",
          model: "Fronx-2012",
          price: "40",
        },
        {
          id: 4,
          image: require("./../../../assets/CarPosts/toyota.png"),
          brand: "Toyota",
          model: "Urban Cruiser Taysor-2010",
          price: "50",
        },
      ],
    },
  ];

  return (
    <View style={styles.infoBoxWrapper}>
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>Posts</Text>
      <View style={styles.infoBox}>
        {/* {companyData.map((company, index) => (
          <View key={index} style={{ paddingVertical: 10 }}>
            <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
              
              <TouchableOpacity>
    
              </TouchableOpacity>
            </View>
         
            <Slider  cars={company.cars}  slideway={slide}/>
           
           
          </View>
        ))} */}
      </View>
    </View>
  );
}
