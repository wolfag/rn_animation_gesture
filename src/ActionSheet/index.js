import React from 'react';
import {View, SafeAreaView, Text} from 'react-native';
import {ScrollView, State} from 'react-native-gesture-handler';
import {IMAGES} from '../assets/images';
import Img from './Img';
import BottomSheet from './BottomSheet';
import {withTransition} from 'react-native-redash';

import Animated, {
  Value,
  useCode,
  cond,
  eq,
  set,
  not,
  interpolate,
} from 'react-native-reanimated';

function ActionSheet(props) {
  const state = new Value(State.UNDETERMINED);
  const isOpen = new Value(0);
  const transition = withTransition(isOpen);
  const translateY = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const zIndex = interpolate(translateY, {
    inputRange: [0, 299, 300],
    outputRange: [1, 1, -1],
  });

  useCode(() => {
    return cond(eq(state, State.END), set(isOpen, not(isOpen)));
  }, [state, isOpen]);

  console.log({isOpen});

  return (
    <>
      <SafeAreaView style={{backgroundColor: 'black'}} />
      <View
        style={{
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'black',
        }}>
        <Text style={{fontSize: 24, color: 'white'}}>The Gram</Text>
      </View>
      <ScrollView>
        {IMAGES.map((item, index) => (
          <Img
            url={item.url}
            key={item.id}
            gestureHandler={{
              onHandlerStateChange: Animated.event([
                {
                  nativeEvent: {state},
                },
              ]),
            }}
          />
        ))}
      </ScrollView>
      <BottomSheet
        zIndex={zIndex}
        translateY={translateY}
        gestureHandler={{
          onHandlerStateChange: Animated.event([
            {
              nativeEvent: {state},
            },
          ]),
        }}
      />
    </>
  );
}

export default ActionSheet;
