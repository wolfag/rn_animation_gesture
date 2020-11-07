import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {IMAGES} from '../assets/images';
import {
  TapGestureHandler,
  State,
  TextInput,
} from 'react-native-gesture-handler';
import Animated, {
  event,
  block,
  cond,
  eq,
  set,
  Value,
  Easing,
  clockRunning,
  startClock,
  timing,
  debug,
  stopClock,
  Clock,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import Svg, {Image, Circle, ClipPath} from 'react-native-svg';

const {height, width} = Dimensions.get('window');

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(startClock.finished, debug('stop clock', stopClock(clock))),
    state.position,
  ]);
}

class ProLogin extends React.Component {
  constructor() {
    super();
    this.buttonOpacity = new Value(1);
    this.onStateChange = event([
      {
        nativeEvent: ({state}) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0)),
            ),
          ]),
      },
    ]);

    this.onCloseState = event([
      {
        nativeEvent: ({state}) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0, 1)),
            ),
          ]),
      },
    ]);

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3 - 50, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.formZIndex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP,
    });
    this.formOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    this.formY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 100],
      extrapolate: Extrapolate.CLAMP,
    });

    this.rotateClose = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: ['180deg', '360deg'],
      extrapolate: Extrapolate.CLAMP,
    });
  }

  render() {
    return (
      <View
        style={{flex: 1, backgroundColor: '#fff', justifyContent: 'flex-end'}}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {transform: [{translateY: this.bgY}]},
          ]}>
          <Svg width={width} height={height + 50}>
            <ClipPath id="clip">
              <Circle r={height + 50} cx={width / 2} />
            </ClipPath>
            <Image
              href={IMAGES[0].url}
              width={width}
              height={height + 50}
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#clip)"
            />
          </Svg>
        </Animated.View>
        <View style={{height: height / 3}}>
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={[
                styles.button,
                {
                  opacity: this.buttonOpacity,
                  transform: [
                    {
                      translateY: this.buttonY,
                    },
                  ],
                },
              ]}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>SIGN IN</Text>
            </Animated.View>
          </TapGestureHandler>
          <Animated.View
            style={[
              styles.button,
              {
                backgroundColor: '#2e71dc',
                opacity: this.buttonOpacity,
                transform: [
                  {
                    translateY: this.buttonY,
                  },
                ],
              },
            ]}>
            <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
              SIGN IN WITH FACEBOOK
            </Text>
          </Animated.View>
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              {
                top: null,
                justifyContent: 'center',
                height: height / 3,
                zIndex: this.formZIndex,
                opacity: this.formOpacity,
                transform: [
                  {
                    translateY: this.formY,
                  },
                ],
              },
            ]}>
            <TapGestureHandler onHandlerStateChange={this.onCloseState}>
              <Animated.View style={styles.closeButton}>
                <Animated.Text
                  style={{
                    fontSize: 15,
                    transform: [{rotate: this.rotateClose}],
                  }}>
                  X
                </Animated.Text>
              </Animated.View>
            </TapGestureHandler>
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              placeholderTextColor="#000"
            />
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              placeholderTextColor="#000"
            />
            <Animated.View style={[styles.button]}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>SIGN IN</Text>
            </Animated.View>
          </Animated.View>
        </View>
      </View>
    );
  }
}

export default ProLogin;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
    shadowColor: 'black',
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  closeButton: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    position: 'absolute',
    top: -20,
    left: width / 2 - 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.2,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 0.2,
  },
});
