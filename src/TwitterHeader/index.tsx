import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Animated, Image, ScrollView, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import avatar from '../assets/wolf.jpg';

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 70;
const PROFILE_IMG_MAX_HEIGHT = 80;
const PROFILE_IMG_MIN_HEIGHT = 40;

const TwitterHeader: React.FC = () => {
  const navigation = useNavigation();

  const scrollY = new Animated.Value(0);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });
  const profileImgHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [PROFILE_IMG_MAX_HEIGHT, PROFILE_IMG_MIN_HEIGHT],
    extrapolate: 'clamp',
  });
  const profileImgMarginTop = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [
      HEADER_MAX_HEIGHT - PROFILE_IMG_MAX_HEIGHT / 2,
      HEADER_MAX_HEIGHT + 5,
    ],
    extrapolate: 'clamp',
  });
  const headerZIndex = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const headerTitleBottom = scrollY.interpolate({
    inputRange: [
      0,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMG_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMG_MIN_HEIGHT + 26,
    ],
    outputRange: [-20, -20, -20, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: 'lightblue',
          height: headerHeight,
          zIndex: headerZIndex,
          alignItems: 'center',
        }}>
        <Animated.View
          style={{position: 'absolute', bottom: headerTitleBottom}}>
          <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>
            Wolfag
          </Text>
        </Animated.View>
      </Animated.View>
      <ScrollView
        style={{flex: 1}}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}>
        <Animated.View
          style={{
            height: profileImgHeight,
            width: profileImgHeight,
            borderRadius: PROFILE_IMG_MAX_HEIGHT / 2,
            borderWidth: 3,
            borderColor: '#fff',
            overflow: 'hidden',
            marginTop: profileImgMarginTop,
            marginLeft: 10,
          }}>
          <Image source={avatar} style={{flex: 1, width: null, height: null}} />
        </Animated.View>
        <View>
          <Text style={{fontWeight: 'bold', fontSize: 26, paddingLeft: 10}}>
            Wolfag
          </Text>
        </View>
        <View
          style={{
            height: 1000,
            backgroundColor: 'pink',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Text>Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default TwitterHeader;
