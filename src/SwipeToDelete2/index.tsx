import React from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import ListItem from './ListItem';
import {useNavigation} from '@react-navigation/native';

export type ItemType = {
  id: number;
  name: string;
};

const data: ItemType[] = [
  {id: 1, name: 'A'},
  {id: 2, name: 'B'},
];

const SwipeToDelete2: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity onPress={navigation.goBack}>
        <Text>Back</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={({item}) => <ListItem data={item} />}
        keyExtractor={(item) => `${item.id}`}
        ItemSeparatorComponent={() => (
          <View style={{backgroundColor: 'grey', height: 0.5}} />
        )}
      />
    </View>
  );
};

export default SwipeToDelete2;
