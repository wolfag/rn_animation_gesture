import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, SafeAreaView, View, FlatList, Text} from 'react-native';
import SwipeToDelete from './SwipeToDelete';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SwipeToDelete2 from './SwipeToDelete2';
import TwitterHeader from './TwitterHeader';
import PaperSwiper from './PaperSwiper';
import MusicBar from './MusicBar';
import AppleApp from './AppleApp';
import ShuffleImg from './ShuffleImg';
import ActionSheet from './ActionSheet';
import UberLogin from './UberLogin';
import SkeletonUI from './SkeletonUI';

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
  {
    id: 3,
    name: 'TwitterHeader',
    route: 'TwitterHeader',
  },
  {
    id: 4,
    name: 'PaperSwiper',
    route: 'PaperSwiper',
  },
  {
    id: 5,
    name: 'MusicBar',
    route: 'MusicBar',
  },
  {
    id: 6,
    name: 'AppleApp',
    route: 'AppleApp',
  },
  {
    id: 7,
    name: 'ShuffleImg',
    route: 'ShuffleImg',
  },
  {
    id: 8,
    name: 'ActionSheet',
    route: 'ActionSheet',
  },
  {
    id: 9,
    name: 'UberLogin',
    route: 'UberLogin',
  },
  {
    id: 10,
    name: 'SkeletonUI',
    route: 'SkeletonUI',
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
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="DemoList" component={DemoList} />
      <Stack.Screen name="SwipeToDelete" component={SwipeToDelete} />
      <Stack.Screen name="SwipeToDelete2" component={SwipeToDelete2} />
      <Stack.Screen name="TwitterHeader" component={TwitterHeader} />
      <Stack.Screen name="PaperSwiper" component={PaperSwiper} />
      <Stack.Screen name="MusicBar" component={MusicBar} />
      <Stack.Screen name="AppleApp" component={AppleApp} />
      <Stack.Screen name="ShuffleImg" component={ShuffleImg} />
      <Stack.Screen name="ActionSheet" component={ActionSheet} />
      <Stack.Screen name="UberLogin" component={UberLogin} />
      <Stack.Screen name="SkeletonUI" component={SkeletonUI} />
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
