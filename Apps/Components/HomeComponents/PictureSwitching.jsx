import React, { useState } from "react";
import { View, Image, Dimensions, TouchableOpacity, Modal, StyleSheet, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { widthPercentageToDP } from "react-native-responsive-screen";
import ImageViewer from "react-native-image-zoom-viewer";

export default function PictureSwitching({ images }) {
  const screenWidth = Dimensions.get("window").width - 20;

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => openModal(selectedImage)} style={{ alignItems: "center" }}>
        <Image
          source={{ uri: selectedImage }}
          style={{
            objectFit: "cover",
            width: screenWidth,
            height: 200,
            borderRadius: 10,
          }}
        />
      </TouchableOpacity>

      <View style={{ flexDirection: "row", borderRadius: 8, marginTop: 2 }}>
        <FlatList
          scrollEnabled={false}
          data={images}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => setSelectedImage(item)}
              key={index}
              style={{
                borderWidth: 2,
                borderColor: selectedImage === item ? "#7F5AF0" : "#E5E7EB",
                borderRadius: 8,
                marginLeft: 1,
              }}
            >
              <Image
                source={{ uri: item }}
                style={{
                  width: widthPercentageToDP(86 / images.length),
                  height: widthPercentageToDP(15),
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
          horizontal
        />
      </View>

      {/* Modal for full-screen image viewer */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ImageViewer
            imageUrls={images.map((image) => ({ url: image }))}
            index={images.findIndex((image) => image === selectedImage)}
            enableSwipeDown={true}
            onSwipeDown={() => setModalVisible(false)}
            onCancel={() => setModalVisible(false)}
          />
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "black",
    fontWeight: "bold",
  },
});
