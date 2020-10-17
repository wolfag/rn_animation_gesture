import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, SafeAreaView, View, FlatList, Text} from 'react-native';
import SwipeToDelete from './SwipeToDelete';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SwipeToDelete2 from './SwipeToDelete2';

const Stack = createStackNavigator();

const data = [
  {
    id: 1,
    name: 'Swipe to delete',
    route: 'SwipeToDelete',
  },
  {
    id: 2,
    name: 'Swipe to delete 2',
    route: 'SwipeToDelete2',
  },
];

const DemoList: React.FC = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <FlatList
        style={{padding: 20}}
        ItemSeparatorComponent={() => (
          <View style={{height: 0.5, backgroundColor: 'grey'}} />
        )}
        data={data}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={{padding: 20}}
              onPress={() => navigation.navigate(item.route)}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

const RootStack: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="DemoList" component={DemoList} />
      <Stack.Screen name="SwipeToDelete" component={SwipeToDelete} />
      <Stack.Screen name="SwipeToDelete2" component={SwipeToDelete2} />
    </Stack.Navigator>
  </NavigationContainer>
);

const App: React.FC = () => <RootStack />;

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 0.5,
    backgroundColor: 'grey',
  },
});
