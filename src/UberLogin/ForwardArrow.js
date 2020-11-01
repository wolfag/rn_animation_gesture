import React from 'react';
import {View, Text} from 'react-native';
import Animated, {interpolate} from 'react-native-reanimated';
import {LOGIN_VIEW_HEIGHT} from './constant';

const ForwardArrow = ({keyboardHeight}) => {
  const opacity = interpolate(keyboardHeight, {
    inputRange: [0, keyboardHeight],
    outputRange: [0, 1],
  });
  return (
    <Animated.View
      style={{
        position: 'absolute',
        height: 60,
        width: 60,
        right: 10,
        bottom: LOGIN_VIEW_HEIGHT / 2,
        zIndex: 10000,
        backgroundColor: '#54575e',
        transform: [{translateY: keyboardHeight}],
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
      }}>
      <Text style={{fontSize: 30, color: '#fff'}}>{`->`}</Text>
    </Animated.View>
  );
};

export default ForwardArrow;
