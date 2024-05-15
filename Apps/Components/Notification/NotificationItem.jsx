import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NotificationItem ({  clientName,
  clientprofileImage,
  clientPhone,
  carBrand,
  carModel,
  carYear,
  carPhoto,
  TotalDays,
  TotalPrice,
  Status,
  StartDate,
  EndDate,})  {
  return (
    <View className='items-end'>
      <View style={styles.rightContainer}>
        <Ionicons name="time-outline" size={24} color="gray" />
        {/* <Text style={styles.timeText}>{timeReceived}sec</Text> */}
      </View>
      <View style={styles.notificationContainer}>
        <Image source={{ uri: clientprofileImage }} style={styles.profilePic}/>
        <Text style={styles.notificationText}>{clientName} wants to rent your car.</Text>
        <View style={styles.buttonContainer}>
          {/* <TouchableOpacity onPress={onAccept} style={[styles.button, styles.acceptButton]}>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDecline} style={[styles.button, styles.declineButton]}>
            <Text style={styles.buttonText}>Decline</Text>
          </TouchableOpacity> */}
        </View>
      </View>
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
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
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
    flexDirection: 'column',
    gap:10,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  acceptButton: {
    backgroundColor: '#7F5AF0', 
  },
  declineButton: {
    backgroundColor: '', 
    borderColor:'#7F5DF0',
    borderWidth:1
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
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
});