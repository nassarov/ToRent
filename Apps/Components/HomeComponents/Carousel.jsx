import { View, Text, Image } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'

export default function Carousel() {
    const carouselSlides=[
        {id:'1',image:require('./../../../assets/HomeSlider/s0.jpg')},
        {id:'2',image:require('./../../../assets/HomeSlider/s1.png')},
        {id:'3',image:require('./../../../assets/HomeSlider/s2.webp')},
        {id:'4',image:require('./../../../assets/HomeSlider/s3.jpg')},
    ];
    const renderItem=({item,index})=>{
<View>
    <Image source={item.image} style={{height:200,width}}/>
</View>
    }
  return (
    <View>
      <Text>Carousel</Text>
      <FlatList data={carouselSlides} renderItem={renderItem}/>
    </View>
  )
}