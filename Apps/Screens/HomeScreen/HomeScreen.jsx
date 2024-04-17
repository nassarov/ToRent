import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'deprecated-react-native-prop-types'; // Import PropTypes from the deprecated package
import { SliderBox } from 'react-native-image-slider-box';

export default function HomeScreen() {
    const images = [
        
        require('../../../assets/HomeSlider/s0.jpg'),
        require('../../../assets/HomeSlider/s3.jpg'),
        require('../../../assets/HomeSlider/s2.webp'),
        require('../../../assets/HomeSlider/s1.png'),
    ];
    
    return (
        <View>
            <View className='flex-row mb-6'>
            <Text className='text-[#7F5AF0] text-lg'>Find</Text><Text className='text-lg'> Your Favorite Car</Text>
            </View>
            <SliderBox
                images={images}
                sliderBoxHeight={180}
                dotColor="#7F5AF0"
                inactiveDotColor="gray"
                paginationBoxVerticalPadding={20}
                autoplay
                circleLoop
               
                
            />
        </View>
    );
}
