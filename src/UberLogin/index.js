import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Text, Button, Image, Keyboard} from 'react-native';
import Logo from './Logo';
import Animated, {
  useCode,
  cond,
  eq,
  set,
  interpolate,
  SpringUtils,
  call,
  Easing,
} from 'react-native-reanimated';
import {
  withTimingTransition,
  onGestureEvent,
  withSpringTransition,
  delay,
} from 'react-native-redash';
import {SCREEN_HEIGHT, LOGIN_VIEW_HEIGHT} from './constant';
import {useNavigation} from '@react-navigation/native';
import {IMAGES} from '../assets/images';
import {
  TextInput,
  TapGestureHandler,
  State,
} from 'react-native-gesture-handler';
import OverlayBg from './OverlayBg';
import HeaderBackArrow from './HeaderBackArrow';
import Placeholder from './Placeholder';
import ForwardArrow from './ForwardArrow';

function UberLogin(props) {
  const navigation = useNavigation();
  const scale = useRef(new Animated.Value(0));
  const scaleAnimation = withTimingTransition(scale.current);
  const textInputRef = useRef(null);
  const keyboardHeight = new Animated.Value(0);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow');
      Keyboard.removeListener('keyboardDidHide');
    };
  });
  const keyboardDidShow = (e) => {
    let toValue = -e.endCoordinates.height;
    Animated.timing(keyboardHeight, {
      toValue,
      duration: 250,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };
  const keyboardDidHide = () => {
    Animated.timing(keyboardHeight, {
      toValue: 0,
      duration: 250,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const innerLoginY = interpolate(scaleAnimation, {
    inputRange: [0, 1],
    outputRange: [LOGIN_VIEW_HEIGHT, 0],
  });

  const gestureState = useRef(new Animated.Value(State.UNDETERMINED));
  const gestureHandler = onGestureEvent({state: gestureState.current});

  const backArrowGestureState = useRef(new Animated.Value(State.UNDETERMINED));
  const backArrowGestureHandler = onGestureEvent({
    state: backArrowGestureState.current,
  });

  const isOpen = useRef(new Animated.Value(0));
  const isOpenAnimation = withSpringTransition(isOpen.current, {
    ...SpringUtils.makeDefaultConfig(),
    overshootClamping: true,
    damping: new Animated.Value(20),
  });

  const outerLoginY = interpolate(isOpenAnimation, {
    inputRange: [0, 1],
    outputRange: [SCREEN_HEIGHT - LOGIN_VIEW_HEIGHT, LOGIN_VIEW_HEIGHT / 2],
  });

  const headingOpacity = interpolate(isOpenAnimation, {
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  // keyboard show parallel
  // useCode(
  //   () =>
  //     cond(eq(gestureState.current, State.END), [
  //       cond(eq(isOpen.current, 0), [
  //         set(isOpen.current, 1),
  //         call([], () => {
  //           textInputRef.current.focus();
  //         }),
  //       ]),
  //     ]),
  //   [gestureState.current],
  // );

  // keyboard show sequency
  useCode(
    () =>
      cond(eq(gestureState.current, State.END), [
        cond(eq(isOpen.current, 0), [set(isOpen.current, 1)]),
        cond(
          eq(isOpen.current, 1),
          delay(
            call([], () => textInputRef.current.focus()),
            750,
          ),
        ),
      ]),
    [gestureState.current],
  );

  useCode(() => cond(eq(scale.current, 0), set(scale.current, 1)), []);

  // keyboard hidden sequency
  useCode(
    () =>
      cond(eq(backArrowGestureState.current, State.END), [
        set(gestureState.current, State.UNDETERMINED),
        call([], () => textInputRef.current.blur()),
        delay(set(isOpen.current, 0), 300),
      ]),
    [backArrowGestureState.current],
  );

  // keyboard hidden parallel
  // useCode(
  //   () =>
  //     cond(eq(backArrowGestureState.current, State.END), [
  //       set(gestureState.current, State.UNDETERMINED),

  //       call([], () => {
  //         textInputRef.current.blur();
  //       }),
  //       set(isOpen.current, 0),
  //     ]),
  //   [backArrowGestureState.current],
  // );

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo scale={scaleAnimation} />
      </View>
      <HeaderBackArrow
        isOpenAnimation={isOpenAnimation}
        gestureHandler={backArrowGestureHandler}
      />
      <Animated.View
        style={{
          backgroundColor: 'white',
          ...StyleSheet.absoluteFill,
          transform: [{translateY: outerLoginY}],
        }}>
        <OverlayBg isOpenAnimation={isOpenAnimation} />
        <ForwardArrow keyboardHeight={keyboardHeight} />
        <Animated.View>
          <Animated.View
            style={{
              height: LOGIN_VIEW_HEIGHT,
              backgroundColor: 'white',
              transform: [{translateY: innerLoginY}],
            }}>
            <Animated.View style={[styles.heading, {opacity: headingOpacity}]}>
              <Text style={{fontSize: 24}}>Get moving with UBER</Text>
            </Animated.View>
            <TapGestureHandler {...gestureHandler}>
              <Animated.View>
                <Animated.View
                  pointerEvents="none"
                  style={{flexDirection: 'row', margin: 25}}>
                  <Placeholder isOpenAnimation={isOpenAnimation} />
                  <Image
                    source={IMAGES[0].url}
                    style={{height: 24, width: 24}}
                    resizeMode="contain"
                  />

                  <Text style={{fontSize: 20, paddingHorizontal: 10}}>+91</Text>
                  <TextInput
                    ref={textInputRef}
                    style={{flex: 1, fontSize: 20}}
                    placeholder="Enter your mobile number"
                    placeholderTextColor="grey"
                    keyboardType="number-pad"
                  />
                </Animated.View>
              </Animated.View>
            </TapGestureHandler>
          </Animated.View>
        </Animated.View>
      </Animated.View>
      <Button title="Back" onPress={navigation.goBack} />
    </View>
  );
}

export default UberLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2289d6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    alignItems: 'flex-start',
    marginHorizontal: 25,
    marginTop: 50,
  },
});
