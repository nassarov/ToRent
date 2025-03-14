import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { app } from "../../../firebaseConfig";
import PostCard from "../../Components/HomeComponents/PostCard";
import * as Animatable from "react-native-animatable";

const Bubble = ({ label, value }) => {
  return (
    <View style={styles.bubble}>
      <Text style={styles.bubbleText}>
        {label}: {value}
      </Text>
    </View>
  );
};

export default function FilterResult({ route }) {
  const { carData } = route.params;
  const db = getFirestore(app);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "car_post"));
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
      const filteredItems = newData.filter((item) => {
        return Object.entries(carData).some(([key, value]) => {
          if (key === "address") {
            const address = item.favData.carDetails?.carData?.address;
            return address && address.label === value;
          }
          return item.favData.carDetails?.carData[key] === value;
        });
      });
      setFilteredData(filteredItems);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.resultsText}>Results</Text>
      <Animatable.View style={styles.bubblesContainer} animation="tada" duration={10500} delay={500} >
        {Object.entries(carData)
          .filter(([key, value]) => value) 
          .map(([key, value], index) => (
            <Bubble key={index} label={key} value={value} />
          ))}
      </Animatable.View>
      {loading ? (
        <ActivityIndicator size="large" color="#7F5AF0" />
      ) : (
        <FlatList
          data={filteredData}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatListContent}
          renderItem={({ item }) => (
            <Animatable.View style={styles.cardContainer} animation="slideInDown" 
            duration={1500} >
              <PostCard
                car={item.favData.carDetails.carData}
                imageUrls={item.favData.carDetails.imageUrls}
                ownerId={item.favData.ownerId}
                ownerData={item.ownerData }
                horizontal={false}
                postId={item.favData.carDetails.postId}
              />
            </Animatable.View>
          )}
          ListEmptyComponent={
            <Text style={styles.noResultsText}>No matching cars found</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: -50,
  },
  resultsText: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  bubblesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  bubble: {
    backgroundColor: "#7F5AF0",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginVertical: 5,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  bubbleText: {
    color: "#fff",
    fontSize: 14,
  },
  flatListContent: {
    paddingBottom: 50,
  },
  cardContainer: {
    flex: 1,
    margin: 8,
  },
  noResultsText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
});
