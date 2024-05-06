import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ImagePickers from "../../Components/CarRegistrationComponents/ImagePickers";
import Constants from "expo-constants";
import { ScrollView } from "react-native-gesture-handler";
import { heightPercentageToDP } from "react-native-responsive-screen";

export default function PickImagesScreen({route}) {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [interiorImage, setInteriorImage] = useState(null);
  const [leftSideImage, setLeftSideImage] = useState(null);
  const [rightSideImage, setRightSideImage] = useState(null);
  const [addMore, setAddMore] = useState(false);
const {carData}=route.params;
console.log(carData)
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
      <View style={{ height:heightPercentageToDP(8) }} />
    </ScrollView>
  );
}
