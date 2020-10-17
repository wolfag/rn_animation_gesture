import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {ItemType} from '../App';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const {width} = Dimensions.get('window');

type Props = {
  data: ItemType;
  onDelete: () => void;
};

const ItemBox: React.FC<Props> = ({data, onDelete}) => {
  const renderLeftAction = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity onPress={onDelete} style={styles.leftBox}>
        <View style={{}}>
          <Animated.Text style={{transform: [{scale}]}}>Delete</Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderRightAction = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity style={styles.rightBox}>
        <View style={{}}>
          <Animated.Text style={{transform: [{scale}]}}>Edit</Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <Swipeable
      renderLeftActions={renderLeftAction}
      renderRightActions={renderRightAction}>
      <View style={styles.container}>
        <Text>My name is {data.name}</Text>
      </View>
    </Swipeable>
  );
};

export default ItemBox;

const styles = StyleSheet.create({
  container: {
    height: 80,
    width,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10,
  },
  leftBox: {
    backgroundColor: 'red',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightBox: {
    backgroundColor: 'green',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
