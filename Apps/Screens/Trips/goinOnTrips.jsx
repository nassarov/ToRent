import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import PostCard from '../../Components/HomeComponents/PostCard';

export default function OnGoingTrips({ route }) {
  const { userData } = route.params;
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      const db = getFirestore();
      const reservationsRef = collection(db, 'Reservation');
      const q = query(reservationsRef, where('clientId', '==', userData.id), where('status', '==', 'accepted'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newData = [];
        snapshot.forEach((doc) => {
          const reservationData = doc.data();
          console.log("Car Data: ", reservationData);
          // Check if current time is less than end date
          const endDateInSeconds = reservationData.endDate.seconds;
          if (Date.now() < endDateInSeconds * 1000) {
            console.log(endDateInSeconds * 1000);
            newData.push(reservationData);
          }
        });
        setReservations(newData);
        setLoading(false);
      });
      return unsubscribe;
    };
    if (userData.role !== undefined) {

    fetchReservations();}
  }, [userData.id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ flex: 1, padding: 4 }}>
      {reservations.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: 'gray' }}>No Ongoing Trips</Text>
        </View>
      ) : (
      <FlatList
        data={reservations}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => (
          <View style={{ flex: 1, margin: 2 }}>
            <PostCard
              car={item.carData}
              imageUrls={item.images}
              ownerId={item.ownerId}
              ownerData={item.ownerData || {}}
              horizontal={false}
              postId={item.reservationId}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    )}
    </View>
  );
}
