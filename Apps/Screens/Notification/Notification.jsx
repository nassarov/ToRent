import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { getFirestore, collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
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
      const q = query(reservationsRef, where('ownerId', '==', userData.id),where('status','==','pending'));
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

  const handleAccept = async (reservationId) => {
    const db = getFirestore();
    const reservationRef = doc(db, 'Reservation', reservationId);
    try {
      await updateDoc(reservationRef, {
        status: 'accepted',
      });
      console.log('Reservation accepted successfully.');
    } catch (error) {
      console.error('Error accepting reservation:', error);
    }
  };

  const handleReject = async (reservationId) => {
    const db = getFirestore();
    const reservationRef = doc(db, 'Reservation', reservationId);
    try {
      await updateDoc(reservationRef, {
        status: 'rejected',
      });
      console.log('Reservation rejected successfully.');
    } catch (error) {
      console.error('Error rejecting reservation:', error);
    }
  };

  return (
    <View>
      <FlatList
        style={{marginBottom:50}}
        data={reservations}
        keyExtractor={(item) => item.reservationId}
        renderItem={({ item }) => (
          <NotificationItem
            clientName= {item.clientData.name}
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
            onAccept={() => handleAccept(item.reservationId)}
            onReject={() => handleReject(item.reservationId)}
          />
        )}
      />
    </View>
  );
}