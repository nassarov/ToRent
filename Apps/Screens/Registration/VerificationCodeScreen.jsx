import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import OtpTextInput from "react-native-text-input-otp";

export default function VerificationCodeScreen() {
  const [otp, setOtp] = useState("");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ marginVertical: 12 }}>Enter Verification code</Text>
        <Text>We are automatically detecting SMS</Text>

        <OtpTextInput
        
          digits={4}
          otp={otp}
          setOtp={(value) => {
            if (
              !value.includes(" ") &&
              !value.includes("-") &&
              !value.includes(".") &&
              !value.includes(",")
            ) {
              setOtp(value);
            }
          }}
          style={{ height: 50, justifyContent: "center" }}
          focusedStyle={{
            backgroundColor: "#e5d0ff",
            borderColor: "#bf8bff",
          }}
        />
      </View>
    </SafeAreaView>
  );
}
