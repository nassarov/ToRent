import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Button } from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import CalendarPicker from "react-native-calendar-picker";
import {
  MaterialCommunityIcons,
} from "@expo/vector-icons/";

export default function CarRentingDetails({ startDate, endDate }) {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false); // State variable to control calendar visibility
  const [selectedstartDateEndDate, setSelectedEndDate] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");

  const minDate = new Date(); // Today
  const maxDate = new Date(2025, 6, 3);

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const onDateChange = (date, type) => {
    if (type === "END_DATE") {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  };

  formatedStartDate = startDate
    ? startDate.getFullYear() +
      "/" +
      startDate.getMonth() +
      "/" +
      startDate.getDate()
    : "";
  formatedEndDate = endDate
    ? endDate.getFullYear() +
      "/" +
      (endDate.getMonth() + 1) +
      "/" +
      endDate.getDate()
    : "";

  const handleApply = () => {
    // Handle applying selected dates
    // For example, you can set the selected dates to the state of the parent component
    // or perform any other action you need
    // Here, I'm just closing the modal
    setIsCalendarVisible(false);
  };

  const handleClear = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

  return (
    <View className="bg-violet-300  rounded-lg  w-11/12  m-auto mt-2 py-2">
      <View className="flex-row  justify-around">
        <View style={{ width: "45%" }}>
          {/* Pick-up date */}
          <Text className="font-bold mb-2 text-white">Pick-up date</Text>
          <TouchableOpacity onPress={toggleCalendar} className="flex-row rounded-lg bg-violet-600 p-2 items-center ">
            <FontAwesome5 name="calendar" size={20} color="white" />
            <Text className="text-white ml-2">{formatedStartDate}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "45%" }}>
          {/* Drop-off date */}
          <Text className="font-bold mb-2 text-white">Drop-off date</Text>
          <TouchableOpacity className="flex-row rounded-lg bg-violet-600 p-2 items-center">
            <FontAwesome5 name="calendar" size={20} color="white" />
            <Text className="text-white ml-2">{formatedEndDate}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="p-2">
        <View className="flex-row justify-between border-b-[1px] border-white mb-2">
          <Text className="text-white">Price</Text>
          <Text className="text-white">22$/day</Text>
        </View>
        <View className="flex-row justify-between border-b-[1px] border-white mb-2">
          <Text className="text-white">Total time</Text>
          <Text className="text-white">
            {formatedStartDate && formatedEndDate
              ? daysDifference + " days"
              : "0 days"}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <View >
            <Text className="text-xl font-bold text-white">
              Total Price: {formatedStartDate&&formatedEndDate?daysDifference * 22:"0"}$
            </Text>
          </View>
          {/* Done */}
          {/* <View className="items-end mb-4">
            <TouchableOpacity
              className="bg-violet-600 mr-5 p-4 rounded-xl "
              style={{ width: widthPercentageToDP(30) }}
            >
              <Text className="text-white text-center font-bold">Done</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
       {/* Modal for displaying the calendar */}
       <Modal
        visible={isCalendarVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleCalendar}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ width: "100%", height: heightPercentageToDP(46), backgroundColor: '#FFFFFF', borderRadius: 10 }}>
            <Text className='text-lg font-bold text-center'>Calendar</Text>
            {/* CalendarPicker component */}
            <View
        className="border-2 border-violet-600 rounded-lg p-2 m-1 "
        style={{ height: heightPercentageToDP(37) }}
      >
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          minDate={minDate}
          maxDate={maxDate}
          todayBackgroundColor="#f2e6ff"
          selectedDayColor="#7300e6"
          selectedDayTextColor="#FFFFFF"
          onDateChange={onDateChange}
          dayLabelsWrapper={{
            borderTopWidth: 2,
            borderBottomWidth: 2,
            borderColor: "#7F5AF0",
          }}
          nextComponent={
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="car-door"
                size={24}
                color="#7300e6"
                style={{ transform: [{ scaleX: -1 }] }}
              />
            </View>
          }
          previousComponent={
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="car-door"
                size={24}
                color="#7300e6"
                style={{ transform: [{ scaleX: 1 }] }}
              />
            </View>
          }
          style={{
            width: "100%", // Use 100% of the container's width
            height: "100%", // Use 100% of the container's height
          }}
        />
       </View>
       {/* Button to apply selected dates */}
       <TouchableOpacity onPress={handleApply} style={{ position: 'absolute', bottom: 20, right: 20 }}>
          <Text style={{ color: 'blue' }}>Apply</Text>
        </TouchableOpacity>
       {/* Button to clear selected dates */}
       <TouchableOpacity onPress={handleClear} style={{ position: 'absolute', bottom: 20, left: 20 }}>
          <Text style={{ color: 'blue' }}>Clear</Text>
        </TouchableOpacity>
        </View>
        </View>
      </Modal>
    </View>
  );
}
