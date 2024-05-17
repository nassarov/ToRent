import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

export default function PostCard({
  car,
  imageUrls,
  ownerId,
  ownerData,
  horizontal,
  postId
}) {
  const navigation = useNavigation();
  const customWidth = horizontal ? widthPercentageToDP(50) : widthPercentageToDP(45);
  const customHeight = horizontal ? widthPercentageToDP(50) : widthPercentageToDP(50);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.card,
        {
          width: customWidth,
          height: customHeight,
        },
        horizontal ? styles.horizontalSpacing : styles.verticalSpacing
      ]}
      onPress={() =>
        navigation.navigate("CarRentingScreen", {
          images: imageUrls,
          carData: car,
          ownerId: ownerId,
          ownerData: ownerData,
          postId: postId
        })
      }
    >
      <Image
        source={{ uri: imageUrls[0] }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.modelText}>{car.model}</Text>
        <Text style={styles.brandText}>{car.brand} ({car.year})</Text>
        <View style={styles.infoRow}>
          <View style={styles.addressContainer}>
            <Icon
              name="map-marker-radius"
              color="#777777"
              size={18}
            />
            <Text style={styles.addressText}>{car.address.label}</Text>
          </View>
          <Text style={styles.priceText}>${car.price}/day</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    backgroundColor: 'white',
  },
  horizontalSpacing: {
    marginLeft: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  verticalSpacing: {
    marginLeft: 4,
    marginTop: 4,
  },
  image: {
    width: '100%',
    height: '55%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    padding: 8,
  },
  modelText: {
    fontWeight: 'bold',
    color: '#7F5AF0',
    fontSize: 18,
  },
  brandText: {
    fontSize: 12,
    color: '#555555',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    marginLeft: 4,
    color: '#7F5AF0',
  },
  priceText: {
    color: '#7F5AF0',
  },
});
