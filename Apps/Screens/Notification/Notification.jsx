import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import NotificationItem from '../../Components/Notification/NotificationItem'; 
export default function NotificationPage({ route }) {

  const {userData }= route.params;
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(userData.id)
  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      const db = getFirestore();
      const reservationsRef = collection(db, 'Reservation');
      const q = query(reservationsRef, where('ownerId', '==', userData.id));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newData = [];
        snapshot.forEach((doc) => {
          newData.push(doc.data());
        });
        setReservations(newData);
        console.log("Data of not",newData)
        setLoading(false);
      });
      return unsubscribe;
    };
    fetchReservations();
  }, []);

  return (
    <View>
      <FlatList
      style={{marginBottom:50}}
        data={reservations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotificationItem
            clientName={item.clientData.name}
            clientprofileImage = {item.clientData.profileImage}
            clientPhone = {item.clientData.phoneNumber}
            carBrand = {item.carData.brand}
            carModel = {item.carData.model}
            carYear = {item.carData.year}
            carPhoto = {item.images[0]}
            TotalDays = {item.daysDifference}
            TotalPrice = {item.totalPrice}
            Status = {item.status}
            StartDate = {item.startDate}
            EndDate = {item.endDate}
          />
        )}
      />
    </View>
  );
}