import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NotificationItem({ clientName, clientprofileImage, clientPhone, carBrand, carModel, carYear, carPhoto, TotalDays, TotalPrice, Status, StartDate, EndDate ,onReject,onAccept }) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleViewDetails = () => {
    setModalVisible(true);
  };

  return (
    <View className='items-end'>
      <View style={styles.rightContainer}>
        <Ionicons name="time-outline" size={24} color="gray" />
      </View>
      <TouchableOpacity style={styles.notificationContainer} onPress={handleViewDetails}>
        <Image source={{ uri: clientprofileImage }} style={styles.profilePic} />
        <Text style={styles.notificationText}>{clientName} wants to rent {carBrand}-{carModel}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.notbutton ]} onPress={handleViewDetails}>
            <Ionicons name="information-circle-outline" size={20} color="#FFF" />
            {/* <Text style={styles.buttonText}>View Details</Text> */}
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
      <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
        <Ionicons name="close" size={30} color="#7F5AF0" />
      </TouchableOpacity>
      <Image source={{ uri: carPhoto }} style={styles.carPhoto} />
      <View className='flex-row mb-4 mt-1 border-2 rounded-xl p-2 border-[#7F5AF0] bg-[#7F5AF0] text-center'>
        <Text className='text-white'>Start Date: 16/5/2024 Till </Text><Text className='text-white'>End Date: 17/5/2024</Text>
      </View>
      <View style={styles.bottomInfoContainer} className='border-2 rounded-xl p-4 border-[#7F5AF0] bg-[#7F5AF0] '>
        <View style={styles.clientInfo} className='border-r-2 border-white pr-5'>
          <View className='flex-row border-b-2 border-white w-full '>
          <Ionicons name="person-circle-outline" size={20} color="white"/>
          <Text className='text-white text-[16px] ml-2'>Client</Text>
          </View>
          <Text className='text-white text-[16px]'>Name: {clientName}</Text>
          <Text className='text-white text-[16px]'>Phone: {clientPhone}</Text>
        </View>
        <View style={styles.carDetails}>
        <View className='flex-row border-b-2 border-white w-full'>
          <Ionicons name="car-outline" size={20} color="white" />
          <Text className='text-white text-[16px] ml-2'>Car</Text>
          </View>
          <Text className='text-white text-[16px]'>{carBrand} {carModel} ({carYear})</Text>
          <Text className='text-white text-[16px]'>Total Days: {TotalDays}</Text>
          <Text className='text-white text-[16px]'>Total Price: ${TotalPrice}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={onAccept}>
        <Ionicons name="checkmark-circle-outline" size={20} color="#FFF" />
        <Text style={styles.buttonText}>Accept</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.rejectButton]} onPress={onReject}>
        <Ionicons name="close-circle-outline" size={20} color="#FFF" />
        <Text style={styles.buttonText}>Reject</Text>
      </TouchableOpacity>
    </View>
    </View>
  </View>
</Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    margin: 10,
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    shadowColor: '#000',
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
    borderWidth:2,
    borderColor:'#7F5AF0',
    resizeMode:'contain'
  },
  notificationText: {
    flex: 1,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap:10,
    },
  button: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
    height:40,
    width:150,
  },
  acceptButton: {
    backgroundColor: '#7F5AF0', 
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    marginLeft: 5,
  },
  rightContainer: {
    flexDirection:'row',
    marginRight:15,
    marginBottom:-9,
    justifyContent:'center',
    alignItems:'center'
  },
  timeText: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  carPhoto: {
    width: 350,
    height: 200,
    marginBottom: 5,
    borderRadius: 10,
  },
  bottomInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom:25,
  },
  clientInfo: {
    flex: 1,
    marginRight: 10,
    alignItems: 'flex-start',
  },
  carDetails: {
    flex: 1,
    marginLeft: 10,
    alignItems: 'flex-start',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    borderRadius:50,
    borderWidth:2,
    backgroundColor:'white'
  },
  acceptButton: {
  backgroundColor: '#4CAF50', 
},
rejectButton: {
  backgroundColor: '#F44336', 
},
notbutton:{
  paddingHorizontal: 12,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor:'#7F5AF0'
}
});
