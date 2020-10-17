import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import ItemBox from './ItemBox';

export type ItemType = {
  id: number;
  name: string;
};

const data: ItemType[] = [
  {
    id: 1,
    name: 'a',
  },
  {
    id: 2,
    name: 'b',
  },
  {
    id: 3,
    name: 'c',
  },
  {
    id: 4,
    name: 'd',
  },
];

const SwipeToDelete: React.FC = () => {
  const [list, setList] = useState(data);

  const deleteItem = (index: number) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={list}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({item, index}) => (
          <ItemBox data={item} onDelete={() => deleteItem(index)} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

export default SwipeToDelete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 0.5,
    backgroundColor: 'grey',
  },
});
