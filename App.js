import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import OnBoardScreen from './Apps/Screens/OnBoardScreen';
export default function App() {
  return (
    <View style={styles.container}>
       <Icon name="heart" size={30} color="red" />
       <OnBoardScreen/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 