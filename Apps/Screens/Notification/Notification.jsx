import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';

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
        setLoading(false);
      });
      return unsubscribe;
    };
    fetchReservations();
  }, []);

  const renderReservation = ({ item }) => {
    return (
      <View style={{ margin: 8 }}>
        <Text>Client Name: {item.clientData.name}</Text>
        <Text>ID : {item.clientData.id}</Text>
        <Text>Car Details : {item.carData.brand} {item.carData.model} {item.carData.year} </Text>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        style={{ marginBottom: 50 }}
        data={reservations}
        renderItem={renderReservation}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
