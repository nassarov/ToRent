import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function SignUpScreens() {
  const navigation = useNavigation();
  const route = useRoute();
  const values = route.params?.values;
  return (
    <View>
      <View>
        <Text>Sign Up</Text>
      </View>

      <View>
        <TextInput placeholder="Name" />

        <TextInput placeholder="Email" />

        <TextInput placeholder="Password" />

        <TextInput placeholder="Confirm Password" />

        <TouchableOpacity onPress={{}}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50,
  },

  title: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
});
