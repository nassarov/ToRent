import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import SearchChoices from "../../Components/HomeComponents/SearchChoices";
import SearchBarCar from "../../Components/HomeComponents/SearchBar2";
import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import PostCard from "../../Components/HomeComponents/PostCard";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../../firebaseConfig";
import * as Animatable from "react-native-animatable";

export default function ShowRoom({route}) {
  const {userData}=route.params
  const db = getFirestore(app);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChoice, setSelectedChoice] = useState("");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); 
  const pageSize = 10; 

  const fetchData = async () => {
    setLoading(true);
    const q = query(collection(db, "car_post"));
    const querySnapshot = await getDocs(q);
    let newData = [];

    for (const postDoc of querySnapshot.docs) {
      const ownerSnapshot = await getDocs(
        query(
          collection(db, "users"),
          where("id", "==", postDoc.data().ownerId)
        )
      );
      ownerSnapshot.forEach((doc) => {
        newData.push({
          favData: postDoc.data(),
          ownerData: doc.data(),
        });
      });
    }

    setData(newData);
    setFilteredData(newData.slice(0, page * pageSize));
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    let filteredData = [];
    if (searchQuery === "") {
      setFilteredData(data.slice(0, page * pageSize)); 
      return;
    }
    if (selectedChoice === "") {
      filteredData = data.filter((item) => {
        const { carData } = item.favData.carDetails;
        const ownerName = item.ownerData?.name?.toLowerCase() || "";

        return (
          carData.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ownerName.includes(searchQuery.toLowerCase()) ||
          carData.year
            .toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          carData.address.label
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          carData.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
          carData.price
            .toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          carData.fuelType.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    } else {
      switch (selectedChoice) {
        case "brand":
          filteredData = data.filter((item) =>
            item.favData.carDetails.carData.brand
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          );
          break;
        case "name":
          filteredData = data.filter((item) =>
            item.ownerData?.name
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase())
          );
          break;
        case "year":
          filteredData = data.filter((item) =>
            item.favData.carDetails.carData.year
              .toString()
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          );
          break;
        case "location":
          filteredData = data.filter((item) =>
            item.favData.carDetails.carData.address.label
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          );
          break;
        case "model":
          filteredData = data.filter((item) =>
            item.favData.carDetails.carData.model
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          );
          break;
        case "price":
          filteredData = data.filter((item) =>
            item.favData.carDetails.carData.price
              .toString()
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          );
          break;
        case "fuel":
          filteredData = data.filter((item) =>
            item.favData.carDetails.carData.fuelType
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          );
          break;
        default:
          filteredData = data;
          break;
      }
    }
    setFilteredData(filteredData.slice(0, page * pageSize)); 
  }, [searchQuery, selectedChoice, data, page]);

  const handleLoadMore = () => {
    setPage(page + 1); 
  };

  return (
    <View style={styles.container}>
      <Animatable.View style={styles.searchContainer} animation="fadeInDown" 
            duration={1500} >
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
      </Animatable.View>
      <Animatable.View animation="fadeInRight"  duration={1000} >
      <SearchChoices
        selected={selectedChoice}
        setSelected={setSelectedChoice}
      /></Animatable.View>
      {data && (
        <FlatList
          data={filteredData}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
          renderItem={({ item }) => (
            <Animatable.View style={styles.cardContainer} 
            animation="bounceInDown" 
            duration={2500} 
            >
              <PostCard
                car={item.favData.carDetails.carData}
                imageUrls={item.favData.carDetails.imageUrls}
                ownerId={item.favData.ownerId}
                ownerData={item.ownerData}
                horizontal={false}
                postId={item.favData.carDetails.postId}
              />
            </Animatable.View>
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore} 
          onEndReachedThreshold={0.1} 
          ListFooterComponent={() =>
            loading ? <ActivityIndicator size="large" color="#7F5AF0"/> : null
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
