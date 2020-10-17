import React from 'react';
import {View, FlatList} from 'react-native';
import ListItem2 from './ListItem2';

export type ItemType = {
  id: number;
  name: string;
};

const data: ItemType[] = [
  {id: 1, name: 'A'},
  {id: 2, name: 'B'},
];

const SwipeToDelete2: React.FC = () => {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item}) => <ListItem2 data={item} />}
        keyExtractor={(item) => `${item.id}`}
        ItemSeparatorComponent={() => (
          <View style={{backgroundColor: 'grey', height: 0.5}} />
        )}
      />
    </View>
  );
};

export default SwipeToDelete2;