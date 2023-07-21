import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";
import colors from "../styles";

const Carousel = () => {
    const { dotcolor, inactiveDotColor } = colors;
    
    // get random images array 
    const images = [
        "https://source.unsplash.com/featured/300x200",
        "https://source.unsplash.com/featured/300x201",
        "https://source.unsplash.com/featured/300x202",
        "https://source.unsplash.com/featured/300x203",
        "https://source.unsplash.com/featured/300x204",
        "https://source.unsplash.com/featured/300x205",
        "https://source.unsplash.com/featured/300x206",
    ];
  return (
    <View>
      <SliderBox
        images={images}
        autoplay
        circleloop
        dotcolor = {dotcolor}
        inactiveDotColor={inactiveDotColor}
        ImageComponentStyle={{ borderRadius: 6, width: "94%" }}
      />
    </View> 
  );
};

export default Carousel;

const styles = StyleSheet.create({});
