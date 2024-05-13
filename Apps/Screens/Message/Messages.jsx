import React, { useState, useEffect } from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { View, Text } from "react-native";
import {
  getFirestore,
  doc,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { app } from "../../../firebaseConfig";

export default function Message({ route, navigation }) {
  const { userData, ownerId, ownerData } = route.params;
  const [messages, setMessages] = useState([]);
  const db = getFirestore(app);

  const chatId = [userData.id, ownerId].sort().join("-");
  const chatDocRef = doc(db, "chats", chatId);
  const messagesCollectionRef = collection(chatDocRef, "messages");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      messagesCollectionRef,
      { orderBy: ["createdAt", "desc"] },
      (querySnapshot) => {
        const chatMessages = querySnapshot.docs.map((doc) => {
          const messageData = doc.data();
          return {
            _id: doc.id,
            text: messageData.text,
            createdAt: messageData.createdAt,
            user: messageData.user,
          };
        });
        chatMessages.sort((a, b) => b.createdAt - a.createdAt);
        setMessages(chatMessages);
      }
    );

    return () => unsubscribe();
  }, []);

  const ChatHeader = () => (
    <View style={{ padding: 10, alignItems: "center" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Chatting with {ownerData.name}
      </Text>
    </View>
  );

  const onSend = async (newMessages = []) => {
    const message = newMessages[0];
    try {
      await addDoc(messagesCollectionRef, {
        text: message.text,
        createdAt: new Date().getTime(),
        user: {
          _id: userData.id,
          name: userData.name,
        },
      });
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#7F5AF0",
        },
        left: {
          backgroundColor: "#E5E5EA",
        },
      }}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <ChatHeader />
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: userData.id,
        }}
        renderBubble={renderBubble}
      />
    </View>
  );
}
