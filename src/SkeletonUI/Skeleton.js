import React, {useEffect} from 'react';
import {Animated, Dimensions, Easing, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');

const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);

const Skeleton = ({children}) => {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear.inOut,
        useNativeDriver: true,
      }),
    ).start();
  }, [animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width * 2, width * 2],
  });

  return (
    <View
      style={{
        backgroundColor: '#a0a0a0',
        borderColor: '#b0b0b0',
        height: 150,
        width: width,
      }}>
      <AnimatedLG
        colors={['#a0a0a0', '#b0b0b0', '#b0b0b0', '#a0a0a0']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{
          ...StyleSheet.absoluteFill,
          transform: [{translateX}],
        }}
      />
      {children}
    </View>
  );
};

export default Skeleton;
