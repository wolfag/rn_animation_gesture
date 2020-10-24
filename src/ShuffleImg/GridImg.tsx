import React from 'react';
import {View, Image} from 'react-native';

type Props = {
  key: string | number;
  width: number;
  color: string;
  url: string;
};

const GridImg: React.FC<Props> = ({url, color, width, key}) => {
  return (
    <View key={`${key}`} style={{width, height: width, marginVertical: 10}}>
      <Image
        source={url}
        style={{
          flex: 1,
          height: null,
          width: null,
          backgroundColor: color,
        }}
      />
    </View>
  );
};

export default GridImg;
