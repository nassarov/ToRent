import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';

export default function PostCardTrips({
  car,
  imageUrls,
  ownerId,
  horizontal,
  postId,
  reservationData
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const customWidth = horizontal ? widthPercentageToDP(50) : widthPercentageToDP(45);
  const customHeight = horizontal ? widthPercentageToDP(50) : widthPercentageToDP(50);

  const start = new Date(reservationData.startDate.seconds * 1000);
  const end = new Date(reservationData.endDate.seconds * 1000);
  
  // Calculate remaining days
  const today = new Date();
  const remainingTime = end.getTime() - today.getTime();
  const remainingDays = Math.ceil(remainingTime / (1000 * 3600 * 24));

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.card,
          {
            width: customWidth,
            height: customHeight,
          },
          horizontal ? styles.horizontalSpacing : styles.verticalSpacing
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Image
          source={{ uri: imageUrls[0] }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.modelText}>{car.model}</Text>
          <Text style={styles.brandText}>{car.brand} ({car.year})</Text>
          <View style={styles.infoRow}>
            <View style={styles.addressContainer}>
              <Icon
                name="map-marker-radius"
                color="#777777"
                size={18}
              />
              <Text style={styles.addressText}>{car.address.label}</Text>
            </View>
            <Text style={styles.priceText}>${car.price}/day</Text>
          </View>
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
            <Image source={{ uri: imageUrls[0] }} style={styles.carPhoto} />
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>
                From: {`${start.getDate()}-${start.getMonth() + 1}-${start.getFullYear()}   `}
                Till: {`${end.getDate()}-${end.getMonth() + 1}-${end.getFullYear()}`}
              </Text>
            </View>
            <View style={styles.bottomInfoContainer}>
              <View style={styles.clientInfo}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="person-circle-outline" size={20} color="white" />
                  <Text style={styles.sectionHeaderText}>Client</Text>
                </View>
                <Text style={styles.clientInfoText}>- Name: {reservationData.clientData.name}</Text>
                <Text style={styles.clientInfoText}>- Phone: {reservationData.clientData.phoneNumber}</Text>
              </View>
              <View style={styles.carDetails}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="car-outline" size={20} color="white" />
                  <Text style={styles.sectionHeaderText}>Car</Text>
                </View>
                <Text style={styles.carDetailsText}>- {car.brand} {car.model} ({car.year})</Text>
                <Text style={styles.carDetailsText}>- Total Days: {reservationData.daysDifference}</Text>
                <Text style={styles.carDetailsText}>- Total Price: ${reservationData.totalPrice}</Text>
              </View>
            </View>
            <View style={styles.remainingDaysContainer}>
              <Text style={styles.remainingDaysText}>Remaining Days: {remainingDays}</Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    backgroundColor: 'white',
  },
  horizontalSpacing: {
    marginLeft: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  verticalSpacing: {
    marginLeft: 4,
    marginTop: 4,
  },
  image: {
    width: '100%',
    height: '55%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    padding: 8,
  },
  modelText: {
    fontWeight: 'bold',
    color: '#7F5AF0',
    fontSize: 18,
  },
  brandText: {
    fontSize: 12,
    color: '#555555',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    marginLeft: 4,
    color: '#7F5AF0',
  },
  priceText: {
    color: '#7F5AF0',
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
  carPhoto: {
    width: 350,
    height: 200,
    marginBottom: 5,
    borderRadius: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderRadius: 10,
    padding: 7,
    backgroundColor: '#7F5AF0',
    borderColor: '#7F5AF0',
  },
  dateText: {
    fontSize: 16,
    color: 'white',
  },
  bottomInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "100%",
    marginBottom: 25,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#7F5AF0',
    borderColor: '#7F5AF0',
  },
  clientInfo: {
    flex: 1,
    marginRight: 10,
    alignItems: 'flex-start',
    borderRightWidth: 2,
    borderRightColor: 'white',
    paddingRight: 10,
  },
  clientInfoText: {
    fontSize: 16,
    color: 'white',
  },
  carDetails: {
    flex: 1,
    marginLeft: 10,
    alignItems: 'flex-start',
  },
  carDetailsText: {
    fontSize: 16,
    color: 'white',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    width: '100%',
    marginBottom: 10,
  },
  sectionHeaderText: {
    fontSize: 18,
    color: 'white',
    marginLeft: 10,
  },
  remainingDaysContainer: {
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#7F5AF0',
    borderColor: '#7F5AF0',
  },
  remainingDaysText: {
    fontSize: 16,
    color: 'white',
  },
});
