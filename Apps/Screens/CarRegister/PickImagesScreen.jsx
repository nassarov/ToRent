import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Constants from "expo-constants";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import ImagePickers from "../../Components/CarRegistrationComponents/ImagePickers";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export default function PickImagesScreen({route}) {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [interiorImage, setInteriorImage] = useState(null);
  const [leftSideImage, setLeftSideImage] = useState(null);
  const [rightSideImage, setRightSideImage] = useState(null);
  const [addMore, setAddMore] = useState(false);
  const [postCount, setPostCount] = useState(0);
  const { carData } = route.params;
  const {userData} =route.params;
  const userEmail =userData.email;
  console.log(carData)
  console.log(userEmail)

  const uploadImageToStorage = async (image, userEmail, postId, imageName) => {
  try {
    const resp = await fetch(image);
    const blob = await resp.blob();

    const storage = getStorage();
    const storageRef = ref(storage, `car_images/${userEmail}/${postId}/${imageName}`);
    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
    console.log("Image uploaded successfully:", downloadURL);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
  const handleSave = async () => {
    try {
      const imageUrls = [];
      const postId = `${userEmail}_${postCount + 1}`; 

      // Upload each image and get their download URLs
      if (frontImage) {
        const frontImageUrl = await uploadImageToStorage(
          frontImage,
          userEmail, 
          postId,
          "front_image.jpg"
        );
        imageUrls.push(frontImageUrl);
      }

      if (backImage) {
        const backImageUrl = await uploadImageToStorage(
          backImage,
          userEmail, 
          postId,
          "back_image.jpg"
        );
        imageUrls.push(backImageUrl);
      }

      if (interiorImage) {
        const interiorImageUrl = await uploadImageToStorage(
          interiorImage,
          userEmail, 
          postId,
          "interior_image.jpg"
        );
        imageUrls.push(interiorImageUrl);
      }

      if (leftSideImage) {
        const leftSideImageUrl = await uploadImageToStorage(
          leftSideImage,
          userEmail, 
          postId,
          "left_side_image.jpg"
        );
        imageUrls.push(leftSideImageUrl);
      }

      if (rightSideImage) {
        const rightSideImageUrl = await uploadImageToStorage(
          rightSideImage,
          userEmail, 
          postId,
          "right_side_image.jpg"
        );
        imageUrls.push(rightSideImageUrl);
      }

      // Save car data+image urls to Firestore
      const db = getFirestore();
      const carPostRef = await addDoc(collection(db, "car_posts"), {
        ...carData,
        imageUrls,
        postId
      });

      console.log("Car post added with ID: ", carPostRef.id);
      setPostCount(postCount + 1);

    } catch (error) {
      console.error("Error saving car post:", error);
    }
  };

  return (
    <ScrollView
      style={{
        paddingTop: Constants.statusBarHeight,
      }}
    >
      <Text className="font-bold text-xl p-2 flex-1">Car Images</Text>

      <View style={{ alignItems: "center", rowGap: 10 }}>
        <ImagePickers
          image={frontImage}
          setImage={setFrontImage}
          whichImage={"Front Image"}
        />
        <ImagePickers
          image={backImage}
          setImage={setBackImage}
          whichImage={"Back Image"}
        />
        <ImagePickers
          image={interiorImage}
          setImage={setInteriorImage}
          whichImage={"Interior Image"}
        />
        {addMore ? (
          <>
            <ImagePickers
              image={leftSideImage}
              setImage={setLeftSideImage}
              whichImage={"Left Side Image"}
            />
            <ImagePickers
              image={rightSideImage}
              setImage={setRightSideImage}
              whichImage={"Right Side Image"}
            />
          </>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setAddMore(!addMore);
            }}
          >
            <Text className="text-violet-600">Add More Images+</Text>
          </TouchableOpacity>
        )}
      </View>
      <View className='items-center mt-4'>
      <TouchableOpacity onPress={handleSave}
      style={{ backgroundColor: "#7F5AF0",borderRadius: 8,paddingHorizontal: 24, justifyContent: "center",
      alignItems: "center",
      marginTop:10,
      width: heightPercentageToDP(26),
      height: widthPercentageToDP(15),}}>
        <Text style={{ textAlign: "center", fontSize: 18, color: "white" }}>
          Add Post
        </Text>
      </TouchableOpacity></View>
      <View style={{ height:heightPercentageToDP(8) }} />
      
    </ScrollView>
  );
}
