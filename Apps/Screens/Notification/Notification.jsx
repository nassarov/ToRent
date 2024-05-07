import React from 'react';
import { View, FlatList } from 'react-native';
import NotificationItem from '../../Components/Notification/NotificationItem'; 

const notifications = [
  { id: '1', userName: 'Ali Nassar', timeReceived: '5'},
  { id: '2', userName: 'Kosay Solh', timeReceived: '5'},
  { id: '3', userName: 'Abdo Mohamed', timeReceived: '5'},
  {id:'4',userName:'Ali Nass', timeReceived: '5'},
  {id:'5',userName:'kosay Solh', timeReceived: '5'},
  {id:'6',userName:'Mohamed Elsayed', timeReceived: '5'},
  {id:'7',userName:'Ahmed Mohamed', timeReceived: '5'},
  {id:'8',userName:'Mahmoud Mohamed', timeReceived: '5'},

];

export default function NotificationPage(){
  const handleAccept = (notificationId) => {
    console.log(`Accepted notification with ID ${notificationId}`);
  };

  const handleDecline = (notificationId) => {
    console.log(`Declined notification with ID ${notificationId}`);
  };

  return (
    <View>
      <FlatList
      style={{marginBottom:50}}
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotificationItem
            userName={item.userName}
            onAccept={() => handleAccept(item.id)}
            onDecline={() => handleDecline(item.id)}
          />
        )}
      />
    </View>
  );
};

