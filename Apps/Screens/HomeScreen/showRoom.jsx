import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import SearchChoices from '../../Components/HomeComponents/SearchChoices';
import SearchBarCar from "../../Components/HomeComponents/SearchBar2";
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import PostCard from '../../Components/HomeComponents/PostCard';
import {
  collection,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";
import { app } from "../../../firebaseConfig";

export default function ShowRoom() {
  const db = getFirestore(app);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChoice, setSelectedChoice] = useState("");
  const navigation = useNavigation();

  // Update your component to include a state for sorting
  const [sortOption, setSortOption] = useState(null); // Initially no sorting

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const queryPostData = await getDocs(query(collection(db, "car_post")));
      let carPosts = [];
      queryPostData.forEach((doc) => {
        carPosts.push(doc.data());
      });
      setData(carPosts);
      setFilteredData(carPosts);
    } catch (error) {
      console.error("Error fetching car posts: ", error);
    }
  };

  useEffect(() => {
    let filteredData = [];
    if (searchQuery === "") {
      setFilteredData(data);
      return;
    }

    if (selectedChoice === "") {
      filteredData = data.filter((item) => {
        const { carData } = item.carDetails;
        const ownerName = item.ownerData?.name?.toLowerCase() || "";

        return (
          carData.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ownerName.includes(searchQuery.toLowerCase()) ||
          carData.year.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
          carData.address.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          carData.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
          carData.price.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
          carData.fuelType.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    } else {
      switch (selectedChoice) {
        case "brand":
          filteredData = data.filter((item) =>
            item.carDetails.carData.brand
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          );
          break;
        case "name":
          filteredData = data.filter((item) =>
            item.ownerData?.name?.toLowerCase().includes(searchQuery.toLowerCase())
          );
          break;
        case "year":
          filteredData = data.filter((item) =>
            item.carDetails.carData.year
              .toString()
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          );
          break;
        case "location":
          filteredData = data.filter((item) =>
            item.carDetails.carData.address.label
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          );
          break;
        case "model":
          filteredData = data.filter((item) =>
            item.carDetails.carData.model
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          );
          break;
        case "price":
          filteredData = data.filter((item) =>
            item.carDetails.carData.price
              .toString()
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          );
          break;
        case "fuel":
          filteredData = data.filter((item) =>
            item.carDetails.carData.fuelType
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          );
          break;
        default:
          filteredData = data;
          break;
      }
    }
    setFilteredData(filteredData);
  }, [searchQuery, selectedChoice, data]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBarCar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Filter")}
          style={styles.filterButton}
        >
          <FontAwesome6 name="sliders" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <SearchChoices
        selected={selectedChoice}
        setSelected={setSelectedChoice}
      />
      <FlatList
        data={filteredData}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <PostCard
              car={item.carDetails.carData}
              imageUrls={item.carDetails.imageUrls}
              ownerId={item.ownerId}
              ownerData={item.ownerData || {}}
              horizontal={false}
              postId={item.carDetails.postId}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterButton: {
    marginRight: 10,
    marginTop: 5,
  },
  flatListContainer: {
    paddingBottom: 10,
  },
  cardContainer: {
    flex: 1,
    margin: 8,
  },
});
