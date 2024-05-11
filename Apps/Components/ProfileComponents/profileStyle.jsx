import { Platform, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
    marginTop: 10,
  },

  title: {
    marginTop: 15,
    marginLeft: 4,
    marginBottom: 5,
    fontSize: 24,
    fontWeight: "bold",
  },

  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
    marginTop: 7,
  },

  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  column: {
    flexDirection: "column",
    marginBottom: 10,
  },

  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "column",
    height: "90%",
  },
  infoBox: {
    padding:1,
    alignItems: "center",
    justifyContent: "center",
  },

  menuwrapper: {
    marginTop: 10,
  },

  menuItem: {
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingVertical: 15,
  },

  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },

  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },

  panelTitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },

  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
  },

  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: "5",
  },

  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },

  TextInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#05375a",
  },
  ApplyButton: {
    backgroundColor: "#7F5AF0",
    borderRadius: 8,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
    width: heightPercentageToDP(16),
    height: widthPercentageToDP(13),
  },
  ApplyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
