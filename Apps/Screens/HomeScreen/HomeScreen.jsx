import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'deprecated-react-native-prop-types'; // Import PropTypes from the deprecated package
import Carousel from '../../Components/HomeComponents/Carousel';
export default function HomeScreen() {
    const images = [
        
        require('../../../assets/HomeSlider/s0.jpg'),
        require('../../../assets/HomeSlider/s3.jpg'),
        require('../../../assets/HomeSlider/s2.webp'),
        require('../../../assets/HomeSlider/s1.png'),
    ];
    

    return (
        <View className='mt-12'>
            <View className='flex-row mb-2'>
            <Text className='text-[#7F5AF0] text-xl font-bold ml-4'>Find</Text><Text className='text-xl'> Your Favorite Car</Text>
            </View>
         <Carousel/>
        </View>
    );
}
