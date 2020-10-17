import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  UIManager,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';

import {ItemType} from './index';

const WINDOW_WIDTH = Dimensions.get('window').width;

type Props = {
  data: ItemType;
};

const ListItem: React.FC<Props> = ({data}) => {
  const animationRef = useRef(null);

  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
  }, []);

  const onPanResponderRelease = (event, gestureState) => {
    if (Math.abs(gestureState.dx) < WINDOW_WIDTH / 2) {
      animationRef.current?.setNativeProps({
        style: {transform: [{translateX: 0}]},
      });
    } else {
      LayoutAnimation.configureNext(
        LayoutAnimation.create(300, 'easeInEaseOut', 'opacity'),
      );
      animationRef.current?.setNativeProps({
        style: {transform: [{translateX: WINDOW_WIDTH}]},
      });
      //handle action
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => false,
    onStartShouldSetPanResponderCapture: () => false,
    onMoveShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: (event, gestureState) => {
      const {dx, dy} = gestureState;
      if (dx > 2 || dx < -2 || dy > 5 || dy < -5) {
        return true;
      }
      return false;
    },
    onPanResponderMove: (event, gestureState) => {
      animationRef.current?.setNativeProps({
        style: {transform: [{translateX: gestureState.dx}]},
      });
    },
    onPanResponderTerminate: onPanResponderRelease,
    onPanResponderRelease: onPanResponderRelease,
  });

  return (
    <View>
      <View style={styles.absolute}>
        <Text style={[styles.text, {marginHorizontal: 10}]}>Delete</Text>
        <Text style={[styles.text, {marginHorizontal: 10}]}>Edit</Text>
      </View>
      <Animated.View
        style={styles.item}
        ref={animationRef}
        {...panResponder.panHandlers}>
        <Text style={[styles.text, {flex: 1}]}>{data.name}</Text>
        <TouchableOpacity>
          <View style={styles.menu} />
          <View style={styles.menu} />
          <View style={styles.menu} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  absolute: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'red',
    flexDirection: 'row',
  },
  text: {
    marginVertical: 20,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  menu: {
    width: 20,
    height: 2,
    backgroundColor: 'silver',
    marginHorizontal: 10,
    borderRadius: 3,
    marginVertical: 2,
  },
});
