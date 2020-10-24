import React from 'react';
import {View, Text, TextStyle} from 'react-native';

type Props = {
  isSelected: boolean;
  name: string;
};

const Tab: React.FC<Props> = ({isSelected, name}) => {
  const textStyle: TextStyle = isSelected
    ? {fontWeight: 'bold', color: '#000'}
    : {fontWeight: '400', color: 'grey'};
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={[
          textStyle,
          {
            fontSize: 20,
            alignSelf: 'center',
          },
        ]}>
        {name}
      </Text>
    </View>
  );
};

export default Tab;
