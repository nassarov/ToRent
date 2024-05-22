import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { getFirestore, collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import NotificationItem from '../../Components/Notification/NotificationItem'; 
import { ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

export default function NotificationPage({ route }) {
  const { userData, setNewNotifications } = route.params;
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (userData.role === undefined) {
      Alert.alert(
        'Alert',
        'You need to create an account to use this page.',
        [
          { text: 'OK', onPress: () => navigation.replace('SignUpForRent') } 
        ],
        { cancelable: false }
      );
    }
  }, [userData, navigation]);

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
        setLoading(false);
        if (newData.length > 0) {
          setNewNotifications(true);
        } else {
          setNewNotifications(false);
        }
      });
      return unsubscribe;
    };
    if (userData.role !== undefined) {
      fetchReservations();
    }
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

  // Sort reservations by createdAt time
  const sortedReservations = reservations.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : reservations.length === 0 ? (
        <Text className='text-center text-gray-400 text-xl mt-5'>No New Notifications</Text>
      ) : (
        <FlatList
          style={{ marginBottom: 50 }}
          data={sortedReservations}
          keyExtractor={(item) => item.reservationId}
          renderItem={({ item }) => (
            <NotificationItem
              clientName={item.clientData.name}
              clientprofileImage={item.clientData.profileImage}
              clientPhone={item.clientData.phoneNumber}
              carBrand={item.carData.brand}
              carModel={item.carData.model}
              carYear={item.carData.year}
              carPhoto={item.images[0]}
              TotalDays={item.daysDifference}
              TotalPrice={item.totalPrice}
              Status={item.status}
              StartDate={item.startDate}
              EndDate={item.endDate}
              createdAt={item.createdAt}
              onAccept={() => handleAccept(item.reservationId)}
              onReject={() => handleReject(item.reservationId)}
            />
          )}
        />
      )}
    </View>
  );
}