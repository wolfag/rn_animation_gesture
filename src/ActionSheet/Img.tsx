import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

type Props = {
  url: string;
  gestureHandler: any;
};

const Img: React.FC<Props> = ({url, gestureHandler}) => {
  return (
    <>
      <View style={styles.imageHeader}>
        <TapGestureHandler {...gestureHandler}>
          <Animated.View>
            <Text>...</Text>
          </Animated.View>
        </TapGestureHandler>
      </View>
      <View style={styles.imageContainer}>
        <Image source={url} style={styles.image} />
      </View>
    </>
  );
};

export default Img;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    height: 300,
    width: width,
  },
  imageHeader: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  image: {
    flex: 1,
    height: null,
    width: null,
  },
});
