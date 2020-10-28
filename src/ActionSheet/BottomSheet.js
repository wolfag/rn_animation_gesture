import React from 'react';
import Animated from 'react-native-reanimated';
import {StyleSheet, Dimensions} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');

function BottomSheet({translateY, gestureHandler, zIndex}) {
  return (
    <>
      <TapGestureHandler {...gestureHandler}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {backgroundColor: 'rgba(0,0,0,.5)', zIndex},
          ]}
        />
      </TapGestureHandler>
      <Animated.View
        style={[
          styles.bottomSheet,
          {transform: [{translateY}], zIndex},
        ]}></Animated.View>
    </>
  );
}

export default BottomSheet;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: width - 20,
    height: 300,
    backgroundColor: 'white',
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 10,
  },
});
