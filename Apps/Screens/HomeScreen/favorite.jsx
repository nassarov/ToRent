import React, { useState, useEffect } from "react";
import { TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { updateDoc, doc, getFirestore, getDoc } from "firebase/firestore";

const FavoriteButton = ({ userId, postId, userData }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const db = getFirestore();

  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const userRef = doc(db, "users", userId);
        const userSnapshot = await getDoc(userRef);
        const userData = userSnapshot.data();
        // Check if postId is in favorites
        setIsFavorite(userData?.favorites?.includes(postId) || false);
      } catch (error) {
        console.error("Error checking favorites:", error);
      }
    };
    checkIfFavorite();
  }, [userId, postId, db]);

  const handleFavorite = async () => {
    try {
      setLoading(true); // Set loading to true when starting the operation
      const userRef = doc(db, "users", userId);
      const userSnapshot = await getDoc(userRef);
      const userData = userSnapshot.data();
      
      if (isFavorite) {
        // Remove postId from favorites
        const updatedFavorites = userData.favorites.filter(id => id !== postId);
        await updateDoc(userRef, {
          favorites: updatedFavorites
        });
        setIsFavorite(false);
      } else {
        // Add postId to favorites
        const updatedFavorites = [...userData.favorites, postId];
        await updateDoc(userRef, {
          favorites: updatedFavorites
        });
        setIsFavorite(true);
        // Show a confirmation message
        // Alert.alert("Post added to favorites");
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
      // Show an error message to the user
      Alert.alert("Error", "Failed to update favorites. Please try again.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <TouchableOpacity onPress={handleFavorite} >
      {loading ? (
        <ActivityIndicator size="small" color="#7F5AF0"  />
      ) : (
        <FontAwesome
          name={isFavorite ? "bookmark" : "bookmark-o"}
          size={28}
          color={isFavorite ? "#7F5AF0" : "#7F5AF0"}
        />
      )}
    </TouchableOpacity>
  );
};

export default FavoriteButton;
