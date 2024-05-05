import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Button } from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import CalendarPicker from "react-native-calendar-picker";
import {
  MaterialCommunityIcons,
} from "@expo/vector-icons/";

export default function CarRentingDetails({ startDate, endDate, onStartDateChange, onEndDateChange }) {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false); // State variable to control calendar visibility
  const [rangeColor,setRangeColor]=useState('white');
  const [rangeColorText,setRangeColorText]=useState('white');

  const minDate = new Date(); // Today
  const maxDate = new Date(2025, 6, 3);

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const onDateChange = (date, type) => {
    if (type === "END_DATE") {
      onEndDateChange(date); // Update via parent's handler
    } else {
      onStartDateChange(date); // Update via parent's handler
    }
  };

  const calculateDaysDifference = (start, end) => {
    if (!start || !end) return 0;
    return Math.round((end - start) / (1000 * 60 * 60 * 24));
  };

  const daysDifference = calculateDaysDifference(startDate, endDate);
  const formatedStartDate = startDate ? `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}` : "";
  const formatedEndDate = endDate ? `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}` : "";

  const handleApply = () => {
    onStartDateChange(startDate);
    onEndDateChange(endDate);
    setIsCalendarVisible(false);
  };

  const handleClear = () => {
    onStartDateChange(minDate);
    onEndDateChange(minDate);

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
          <View className="flex-row rounded-lg bg-violet-600 p-2 items-center">
            <FontAwesome5 name="calendar" size={20} color="white" />
            <Text className="text-white ml-2">{formatedEndDate}</Text>
          </View>
        </View>
      </View>
      <View className="p-2">
        {/* Price */}
        <View className="flex-row justify-between border-b-[1px] border-white mb-2">
          <Text className="text-white">Price</Text>
          <Text className="text-white">22$/day</Text>
        </View>
        {/* Total time */}
        <View className="flex-row justify-between border-b-[1px] border-white mb-2">
          <Text className="text-white">Total time</Text>
          <Text className="text-white">
            {formatedStartDate && formatedEndDate
              ? daysDifference + " days"
              : "0 days"}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <View> 
            <Text className="text-xl font-bold text-white">
              Total Price: {formatedStartDate&&formatedEndDate?daysDifference * 22:"0"}$
            </Text>
          </View>
          {/* Clear */}
          <View className="items-end ">
            <TouchableOpacity
              className="bg-violet-600 mr-1 text-center items-center justify-center rounded-xl"
              style={{ width: widthPercentageToDP(20) , height:widthPercentageToDP(10)}}
              onPress={handleClear}
            >
              <Text className="text-white text-center font-bold">Clear</Text>
            </TouchableOpacity>
          </View>
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
          <View style={{ width: "100%", height: heightPercentageToDP(50), backgroundColor: '#FFFFFF', borderRadius: 10 }}>
            <Text className='text-xl font-bold text-center mt-2'>Calendar</Text>
            <Text className='text-base text-center  '>Choose Pick-Up And Drop-Off Dates</Text>
            
            {/* CalendarPicker component */}
            <View className="border-2 border-violet-600 rounded-lg p-2 m-1 "
        style={{ height:heightPercentageToDP(37)}}>
        
           
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          minDate={minDate}
          maxDate={maxDate}
          todayBackgroundColor="gray"
          todayTextStyle='#7300e6'
          selectedDayColor="#7300e6"
          selectedRangeStyle={{ backgroundColor: '#7F5AF0' }} // Style for dates between start and end dates
          disabledDates={[minDate]}
          selectedDisabledDatesTextStyle="7300e6"
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
       <TouchableOpacity onPress={handleApply} style={{ position: 'absolute', bottom:12, right: 20 }}>
          <Text style={{ color: 'blue' ,fontSize:18}}>Apply</Text>
        </TouchableOpacity>
       
        </View>
        </View>
      </Modal>
    </View>
  );
}
