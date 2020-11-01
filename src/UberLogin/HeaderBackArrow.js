import React from 'react';
import {View, Text} from 'react-native';
import Animated, {interpolate} from 'react-native-reanimated';
import {TapGestureHandler} from 'react-native-gesture-handler';

const HeaderBackArrow = ({isOpenAnimation, gestureHandler}) => {
  const opacity = interpolate(isOpenAnimation, {
    inputRange: [0, 0.7, 1],
    outputRange: [0, 0, 1],
  });
  return (
    <TapGestureHandler {...gestureHandler}>
      <Animated.View
        style={{
          position: 'absolute',
          height: 60,
          width: 60,
          top: 60,
          left: 25,
          opacity,
          zIndex: 100,
        }}>
        <Text style={{fontSize: 30}}>{`<-`}</Text>
      </Animated.View>
    </TapGestureHandler>
  );
};

export default HeaderBackArrow;
