  import React, { useState, useEffect } from "react";
  import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal,
  } from "react-native";
  import { Ionicons } from "@expo/vector-icons";

  export default function NotificationItem({
    clientName,
    clientprofileImage,
    clientPhone,
    carBrand,
    carModel,
    carYear,
    carPhoto,
    TotalDays,
    TotalPrice,
    StartDate,
    EndDate,
    onReject,
    onAccept,
    createdAt,
  }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [timeDifference, setTimeDifference] = useState("");

    useEffect(() => {
      const calculateTimeDifference = () => {
        const now = new Date();
        const created = new Date(createdAt.seconds * 1000);
        const differenceInSeconds = Math.floor((now - created) / 1000);

        if (differenceInSeconds < 60) {
          return `now`;
        } else if (differenceInSeconds < 3600) {
          return `${Math.floor(differenceInSeconds / 60)} min ago`;
        } else if (differenceInSeconds < 86400) {
          return `${Math.floor(differenceInSeconds / 3600)} hours ago`;
        } else {
          return `${Math.floor(differenceInSeconds / 86400)} days ago`;
        }
      };

      const updateDifference = () => {
        setTimeDifference(calculateTimeDifference());
      };

      updateDifference();

      const intervalId = setInterval(updateDifference, 60000);

      return () => clearInterval(intervalId);
    }, [createdAt]);

    const handleViewDetails = () => {
      setModalVisible(true);
    };

    const start = new Date(StartDate.seconds * 1000);
    const end = new Date(EndDate.seconds * 1000);

    return (
      <View className="items-end">
        <View style={styles.rightContainer}>
          <Text>{timeDifference}</Text>
          <Ionicons name="time-outline" size={24} color="gray" />
        </View>

        <TouchableOpacity
          style={styles.notificationContainer}
          onPress={handleViewDetails}
        >
          <Image source={{ uri: clientprofileImage }} style={styles.profilePic} />
          <Text style={styles.notificationText}>
            {clientName} wants to rent {carBrand}-{carModel}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.notbutton]}
              onPress={handleViewDetails}
            >
              <Ionicons
                name="information-circle-outline"
                size={20}
                color="#FFF"
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close" size={30} color="#7F5AF0" />
              </TouchableOpacity>
              <View className='mb-2 border-2 rounded-xl'><Image source={{ uri: carPhoto }} style={styles.carPhoto} /></View>
              
              <View className="flex-row mb-4 mt-1 border-2 rounded-xl p-2 border-black bg-[#7F5AF0] text-center">
                <Text className="text-white font-bold">
                  Start Date:{" "}
                  {`${start.getDate()}-${ start.getMonth() + 1 }-${start.getFullYear()}`}{" "}
                  Till{" "}
                </Text>
                <Text className="text-white font-bold">
                  End Date:{" "}
                  {`${end.getDate()}-${end.getMonth() + 1}-${end.getFullYear()}`}
                </Text>
              </View>
              <View
                style={styles.bottomInfoContainer}
                className="border-2 rounded-xl p-4 border-black bg-[#7F5AF0] "
              >
                <View
                  style={styles.clientInfo}
                  className="border-r-2 border-white pr-5"
                >
                  <View className="flex-row border-b-2 border-white w-full justify-center mb-2">
                    <Ionicons
                      name="person-circle-outline"
                      size={20}
                      color="white"
                    />
                    <Text className="text-white text-[18px] ml-2">Client</Text>
                  </View>
                  <Text className="text-white text-[16px] font-bold">
                    - Name: {clientName}
                  </Text>
                  <Text className="text-white text-[16px] mt-1 font-bold">
                    - Phone: {clientPhone}
                  </Text>
                </View>
                <View style={styles.carDetails}>
                  <View className="flex-row border-b-2 border-white w-full justify-center mb-2">
                    <Ionicons name="car-outline" size={20} color="white" />
                    <Text className="text-white text-[18px] ml-2">Car</Text>
                  </View>
                  <Text className="text-white text-[16px] font-bold">
                    - {carBrand} {carModel} ({carYear})
                  </Text>
                  <Text className="text-white text-[16px] mt-1 font-bold">
                    - Total Days: {TotalDays}
                  </Text>
                  <Text className="text-white text-[16px] mt-1 font-bold">
                    - Total Price: ${TotalPrice}
                  </Text>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.acceptButton]}
                  onPress={onAccept}
                >
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={20}
                    color="#FFF"
                  />
                  <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.rejectButton]}
                  onPress={onReject}
                >
                  <Ionicons name="close-circle-outline" size={20} color="#FFF" />
                  <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  const styles = StyleSheet.create({
    notificationContainer: {
      backgroundColor: "#FFF",
      padding: 20,
      margin: 10,
      marginBottom: 25,
      borderBottomWidth: 1,
      borderBottomColor: "#E0E0E0",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: 15,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.2,
      shadowRadius: 20,
      elevation: 15,
    },
    profilePic: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
      borderWidth: 2,
      borderColor: "#7F5AF0",
      resizeMode: "contain",
    },
    notificationText: {
      flex: 1,
      fontSize: 16,
    },
    buttonContainer: {
      flexDirection: "row",
      gap: 10,
    },
    button: {
      flexDirection: "row",
      paddingHorizontal: 12,
      paddingVertical: 5,
      marginHorizontal: 5,
      borderRadius: 5,
      alignItems: "center",
      height: 40,
      width: 150,
    },
    acceptButton: {
      backgroundColor: "#7F5AF0",
    },
    buttonText: {
      color: "#FFF",
      fontSize: 14,
      marginLeft: 5,
      fontWeight:'bold'
    },
    rightContainer: {
      flexDirection: "row",
      marginRight: 15,
      marginBottom: -9,
      justifyContent: "center",
      alignItems: "center",
    },
    timeText: {
      fontSize: 12,
      color: "gray",
      marginBottom: 5,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
      margin: 10,
      backgroundColor: "#E0E0E0",
      borderRadius: 20,
      padding: 15,
      paddingLeft: 7,
      paddingRight: 7,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      borderWidth:3,
    },
    carPhoto: {
      width: 350,
      height: 200,
      borderRadius: 10,
    },
    bottomInfoContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      marginBottom: 25,
    },
    clientInfo: {
      flex: 1,
      marginRight: 10,
      alignItems: "flex-start",
    },
    carDetails: {
      flex: 1,
      marginLeft: 10,
      alignItems: "flex-start",
    },
    closeButton: {
      position: "absolute",
      top: 10,
      right: 10,
      zIndex: 1,
      borderRadius: 50,
      borderWidth: 2,
      backgroundColor: "white",
    },
    acceptButton: {
      backgroundColor: "#4CAF50",
    },
    rejectButton: {
      backgroundColor: "#F44336",
    },
    notbutton: {
      paddingHorizontal: 12,
      paddingVertical: 5,
      marginHorizontal: 5,
      borderRadius: 5,
      alignItems: "center",
      backgroundColor: "#7F5AF0",
    },
  });
