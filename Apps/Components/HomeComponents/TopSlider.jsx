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
    
     // Define a function to render each image with rounded corners
     const renderRoundedImage = (imageUri, index) => (
        <Image
            key={index}
            source={imageUri}
            style={{
                width: '100%',
                height: '100%',
                borderRadius: 10, // Adjust the radius to your preference
            }}
            resizeMode="cover"
        />
    );

    return (
        
           
            <View style={{ borderRadius: 12, overflow: 'hidden', marginHorizontal:10}}> 
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
