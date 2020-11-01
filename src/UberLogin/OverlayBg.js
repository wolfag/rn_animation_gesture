import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated, {interpolate} from 'react-native-reanimated';
import {LOGIN_VIEW_HEIGHT, SCREEN_HEIGHT} from './constant';
import {interpolateColor} from 'react-native-redash';

const OverlayBg = ({isOpenAnimation}) => {
  const translateY = interpolate(isOpenAnimation, {
    inputRange: [0, 1],
    outputRange: [SCREEN_HEIGHT - LOGIN_VIEW_HEIGHT, -LOGIN_VIEW_HEIGHT],
  });
  const bgColor = interpolateColor(isOpenAnimation, {
    inputRange: [0, 0.1, 1],
    outputRange: ['#2289d6', '#ffff', '#ffff'],
  });
  return (
    <Animated.View
      style={{
        height: LOGIN_VIEW_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bgColor,
        ...StyleSheet.absoluteFill,
        transform: [{translateY}],
      }}></Animated.View>
  );
};

export default OverlayBg;
