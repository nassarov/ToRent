import { View, Text } from "react-native";
import React, { useState } from "react";
import ImagePickers from "../../Components/CarRegistrationComponents/ImagePickers";
import Constants from "expo-constants";

export default function PickImagesScreen() {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [interiorImage, setInteriorImage] = useState(null);

  return (
    <View
      style={{
        alignItems: "center",
        rowGap: 15,
        paddingTop: Constants.statusBarHeight,
      }}
    >
      <Text>Car Images</Text>
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
    </View>
  );
}
