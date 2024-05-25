import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Calendar } from "react-native-calendars";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../../firebaseConfig";

export default function CarRentingDetails({
  onStartDateChange,
  onEndDateChange,
  minDays,
  maxDays,
  price,
  onTotalPriceChange,
  onDaysDifferenceChange,
  postId,
}) {
  const db = getFirestore(app);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false); // State variable to control calendar visibility
  const [daysDifference, setdaysDifference] = useState(0); // State variable to control calendar visibility
  const currentDate = new Date();
  const minDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1 }-${currentDate.getDate()}`; // Today
    
  const maxDate = new Date(2024, 6, 11);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [disabledDatesArray, setDisbaledDatesArray] = useState([]);
  // State variable to hold the total price
  useEffect(() => {
    fetchDisabledDates();
  }, []);

  const calculateTotalPrice = () => {
    const daysDifference = calculateDaysDifference(startDate, endDate);
    const totalPrice = daysDifference * price;
    setTotalPrice(totalPrice);
    onTotalPriceChange(totalPrice); // Update total price in parent component
    onDaysDifferenceChange(daysDifference);
  };
  const fetchDisabledDates = async () => {
    const querySnapshot = await getDocs(
      query(
        collection(db, "Reservation"),
        where("postId", "==", postId),
        where("status", "==", "accepted")
      )
    );
    let disabledDates = [];
    let startYear;
    let startMonth;
    let startDay;
    let endYear;
    let endMonth;
    let endDay;

    querySnapshot.forEach((element) => {
      const startDate = new Date(element.data().startDate.seconds * 1000);
      const endDate = new Date(element.data().endDate.seconds * 1000); // Convert seconds to milliseconds
      startYear = startDate.getFullYear();
      startMonth = String(startDate.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
      startDay = String(startDate.getDate()).padStart(2, "0");
      endYear = endDate.getFullYear();
      endMonth = String(endDate.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
      endDay = String(endDate.getDate()).padStart(2, "0");
      disabledDates = [
        ...disabledDates,
        {
          startDate: `${startYear}-${startMonth}-${startDay}`,
          endDate: `${endYear}-${endMonth}-${endDay}`,
        },
      ];
    });
    setDisbaledDatesArray(disabledDates);
  };

  const handleDateSelection = (date) => {
    const disabledDates = getDisabledDates(disabledDatesArray);
    let isValid = false;
    if (!startDate && !endDate) {
      setStartDate(new Date(date.dateString));
    } else if (!endDate && startDate <= new Date(date.dateString)) {
      for (
        let dateStart = new Date(startDate);
        dateStart <= new Date(date.dateString);
        dateStart.setDate(dateStart.getDate() + 1)
      ) {
        const dateString = dateStart.toISOString().split("T")[0];
        if (disabledDates[dateString]) {
          Alert.alert("Please choose a valid date");
          return;
        }
      }
      isValid = true;
    } else {
      setStartDate(new Date(date.dateString));
      setEndDate("");
      return;
    }

    if (isValid) {
      setEndDate(new Date(date.dateString));
      calculateTotalPrice();
    }
  };

  const getSelectedDates = () => {
    var selectedDates = {};
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (startDate && !endDate) {
      const dateString = start.toISOString().split("T")[0];
      selectedDates[dateString] = {
        disabled: true,
        disableTouchEvent: true,
        color: "purple",
        textColor: "white",
        selected: true,
      };
    } else if (startDate && endDate) {
      for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
        const dateString = date.toISOString().split("T")[0];
        selectedDates[dateString] = {
          disabled: true,
          disableTouchEvent: true,
          color: "purple",
          textColor: "white",
          startingDay: date.getTime() === startDate.getTime() ? true : false,
          endingDay: date.getTime() === endDate.getTime() ? true : false,
        };
      }
    }
    return selectedDates;
  };

  const getDisabledDates = (disabledDatesArray) => {
    const disabledDates = {};
    for (let i = 0; i < disabledDatesArray.length; i++) {
      const start = new Date(disabledDatesArray[i].startDate);
      const end = new Date(disabledDatesArray[i].endDate);
      for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
        const dateString = date.toISOString().split("T")[0];
        disabledDates[dateString] = {
          disabled: true,
          disableTouchEvent: true,
          color: "red",
          textColor: "white",
          startingDay:
            date.getTime() ===
            new Date(disabledDatesArray[i].startDate).getTime()
              ? true
              : false,
          endingDay:
            date.getTime() === new Date(disabledDatesArray[i].endDate).getTime()
              ? true
              : false,
        };
      }
    }
    return disabledDates;
  };
  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const calculateDaysDifference = (start, end) => {
    if (start != "" && end != "") {
      return Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
    } else if (start != "") {
      return 1;
    } else {
      return 0;
    }
  };

  const formatedStartDate = startDate
    ? `${startDate.getDate()}/${
        startDate.getMonth() + 1
      }/${startDate.getFullYear()}`
    : "";
  const formatedEndDate = endDate
    ? `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`
    : "";

  const handleApply = () => {
    onStartDateChange(startDate);
    onEndDateChange(endDate);
    setIsCalendarVisible(false);
    calculateTotalPrice();
    setdaysDifference(calculateDaysDifference(startDate, endDate))
    onDaysDifferenceChange(calculateDaysDifference(startDate, endDate));
    onTotalPriceChange(totalPrice);
  };

  const handleClear = () => {
    onDaysDifferenceChange("");
    onTotalPriceChange("");
    setStartDate("");
    setEndDate("");
    setTotalPrice(0); // Reset total price
  };

  return (
    <View className="bg-violet-300  rounded-lg  w-11/12  m-auto mt-2 py-2">
      <View className="flex-row  justify-around">
        <View style={{ width: "45%" }}>
          {/* Pick-up date */}
          <Text className="font-bold mb-2 text-white">Pick-up date</Text>
          <TouchableOpacity
            onPress={toggleCalendar}
            className="flex-row rounded-lg bg-violet-600 p-2 items-center "
          >
            <FontAwesome5 name="calendar" size={20} color="white" />
            <Text className="text-white ml-2">{formatedStartDate}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "45%" }}>
          {/* Drop-off date */}
          <Text className="font-bold mb-2 text-white">Drop-off date</Text>
          <View className="flex-row rounded-lg bg-violet-600 p-2 items-center">
            <FontAwesome5 name="calendar" size={20} color="white" />
            <Text className="text-white ml-2">
              {formatedEndDate ? formatedEndDate : formatedStartDate}
            </Text>
          </View>
        </View>
      </View>
      <View className="p-2 ">
        {/* Price */}
        <View className="flex-row justify-between border-b-[1px] border-white mb-2">
          <Text className="text-white font-bold">Minimum Days: ({minDays})</Text>
          <Text className="text-white font-bold">Maximum Days:({maxDays})</Text>
        </View>
        
        {/* Total time */}
        <View className="flex-row justify-between border-b-[1px] border-white mb-2">
          <Text className="text-white font-bold">Total time</Text>
          <Text className="text-white font-bold">{daysDifference + " days"}</Text>
        </View>
        <View className="flex-row justify-between border-b-[1px] border-white mb-2">
          <Text className="text-white font-bold text-xl">Price</Text>
          <Text className="text-white font-bold text-xl">{price}$/day</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-xl font-bold text-white">
              Total Price:
              {totalPrice}$
            </Text>
          </View>
          {/* Clear */}
          <View className="items-end ">
            <TouchableOpacity
              className="bg-violet-600 mr-1 text-center items-center justify-center rounded-xl"
              style={{
                width: widthPercentageToDP(20),
                height: widthPercentageToDP(10),
              }}
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
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              width: "100%",
              height: heightPercentageToDP(60),
              backgroundColor: "#FFFFFF",
              borderRadius: 10,
            }}
          >
            <Text className="text-xl font-bold text-center mt-2">Calendar</Text>
            <Text className="text-base text-center  ">
              Choose Pick-Up And Drop-Off Dates
            </Text>

            {/* CalendarPicker component */}
            <View className="border-2 border-violet-600 rounded-lg p-2 m-1 ">
              <Calendar
                minDate={minDate}
                markingType={"period"}
                markedDates={{
                  ...getDisabledDates(disabledDatesArray),
                  ...getSelectedDates(),
                }}
                disableAllTouchEventsForDisabledDays={true}
                hideExtraDays={true}
                onDayPress={(date) => {
                  handleDateSelection(date);
                }}
                enableSwipeMonths={true}
              />
            </View>
            {/* Button to apply selected dates */}
            <TouchableOpacity
              onPress={handleApply}
              style={{ position: "absolute", bottom: 12, right: 20 }}
            >
              <Text style={{ color: "blue", fontSize: 18 }}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
