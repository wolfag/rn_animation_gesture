import React from 'react';
import {View, Text} from 'react-native';
import Skeleton from './Skeleton';

const SkeletonUI = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Skeleton>
        <Text>hello</Text>
      </Skeleton>
    </View>
  );
};

export default SkeletonUI;
