import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Alert } from "react-native";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import NotificationItem from "../../Components/Notification/NotificationItem";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import ClientNotification from "../../Components/Notification/ClientNotification";

export default function NotificationPage({ route }) {
  const { userData, setNewNotifications } = route.params;
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (userData.role === undefined) {
      Alert.alert(
        "Alert",
        "You need to create an account to use this page.",
        [{ text: "OK", onPress: () => navigation.replace("SignUpForRent") }],
        { cancelable: false }
      );
    }
  }, [userData, navigation]);

  useEffect(() => {
    let unsubscribeOwner;
    let unsubscribeClient;

    const fetchOwnerReservations = async () => {
      setLoading(true);
      const db = getFirestore();
      const reservationsRef = collection(db, "Reservation");
      const q = query(
        reservationsRef,
        where("ownerId", "==", userData.id),
        where("status", "==", "pending")
      );
      unsubscribeOwner = onSnapshot(q, (snapshot) => {
        const newData = snapshot.docs.map((doc) => doc.data());
        setReservations((prevReservations) => {
          const mergedData = [
            ...prevReservations.filter(
              (res) => res.ownerId !== userData.id || res.status !== "pending"
            ),
            ...newData,
          ];
          return mergedData;
        });
        setLoading(false);
      });
    };

    const fetchClientReservations = async () => {
      setLoading(true);
      const db = getFirestore();
      const reservationsRef = collection(db, "Reservation");
      const q = query(
        reservationsRef,
        where("clientId", "==", userData.id),
        where("status", "in", ["accepted", "rejected"]),
        where("deleted", "==", false)
      );
      unsubscribeClient = onSnapshot(q, (snapshot) => {
        const newData = snapshot.docs.map((doc) => doc.data());
        setReservations((prevReservations) => {
          const mergedData = [
            ...prevReservations.filter(
              (res) =>
                res.clientId !== userData.id ||
                !["accepted", "rejected"].includes(res.status)
            ),
            ...newData,
          ];
          return mergedData;
        });
        setLoading(false);
      });
    };

    if (userData.role === "1") {
      Promise.all([fetchOwnerReservations(), fetchClientReservations()]);
    } else if (userData.role === "0") {
      fetchClientReservations();
    }

    return () => {
      if (unsubscribeOwner) unsubscribeOwner();
      if (unsubscribeClient) unsubscribeClient();
    };
  }, [userData.id, userData.role, setNewNotifications]);

  const handleAccept = async (reservationId) => {
    const db = getFirestore();
    const reservationRef = doc(db, "Reservation", reservationId);
    try {
      await updateDoc(reservationRef, {
        status: "accepted",
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error accepting reservation:", error);
    }
  };

  const handleReject = async (reservationId) => {
    const db = getFirestore();
    const reservationRef = doc(db, "Reservation", reservationId);
    try {
      await updateDoc(reservationRef, {
        status: "rejected",
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error rejecting reservation:", error);
    }
  };
  const handleDelete = async (reservationId) => {
    const db = getFirestore();
    const reservationRef = doc(db, "Reservation", reservationId);
    try {
      await updateDoc(reservationRef, {
        deleted: true,
      });
    } catch (error) {
      console.error("Error rejecting reservation:", error);
    }
  };

  const [sortedReservations, setSortedReservations] = useState([]);

  useEffect(() => {
    const sorted = reservations
      .slice()
      .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
    setSortedReservations(sorted);
    
  }, [reservations]);
  useEffect(()=>{
    console.log(sortedReservations.length)
  setNewNotifications(sortedReservations.length);
  })
  
  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : sortedReservations.length === 0 ? (
        <Text className="text-center text-gray-400 text-xl mt-5">
          No New Notifications
        </Text>
      ) : (
        <FlatList
          style={{ marginBottom: 50 }}
          data={sortedReservations}
          keyExtractor={(item) => item.reservationId}
          renderItem={({ item }) =>
            userData.role === "1" ? (
              item.ownerId === userData.id ? (
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
              ) : (
                <ClientNotification
                  ownerData={item.ownerData}
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
                  onDelete={() => handleDelete(item.reservationId)}
                />
              )
            ) : (
              <ClientNotification
                ownerData={item.ownerData}
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
                onDelete={() => handleDelete(item.reservationId)}
              />
            )
          }
        />
      )}
    </View>
  );
}
