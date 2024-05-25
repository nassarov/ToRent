import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import PostCardTrips from '../../Components/HomeComponents/PostCard2';

export default function ClientTripsScreen({route}) {
  const {userData} = route.params;
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      const db = getFirestore();
      const reservationsRef = collection(db, 'Reservation');
      const q = query(reservationsRef, where('ownerId', '==', userData.id), where('status', '==', 'accepted'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newData = [];
        snapshot.forEach((doc) => {
          const reservationData = doc.data();
          newData.push(reservationData);
        });
        setReservations(newData);
        setLoading(false);
      });
      return unsubscribe;
    };
    fetchReservations();
  }, [userData.id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ flex: 1, padding: 4 }}>
      {reservations.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: 'gray' }}>No Clients Have Reserved a Trip Yet</Text>
        </View>
      ) : (
      <FlatList
        data={reservations}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => (
          <View style={{ flex: 1, margin: 2 }}>
            <PostCardTrips
              car={item.carData}
              imageUrls={item.images}
              ownerId={item.ownerId}
              ownerData={item.ownerData || {}}
              horizontal={false}
              postId={item.postId}
              reservationData={item}
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
