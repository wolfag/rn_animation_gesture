import React from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {Transition, Transitioning} from 'react-native-reanimated';
import Tab from './Tab';
import GridImg from './GridImg';

const IMAGES = [
  {
    id: 1,
    color: 'pink',
    url: '',
  },
  {
    id: 2,
    color: 'green',
    url: '',
  },
  {
    id: 3,
    color: 'blue',
    url: '',
  },
  {
    id: 4,
    color: 'yellow',
    url: '',
  },
];

const {width, height} = Dimensions.get('window');

class ShuffleImg extends React.PureComponent {
  constructor() {
    super();
    this.ref = React.createRef();
    this.state = {
      selectedTab: 0,
      images: IMAGES,
    };
  }

  componentDidMount() {
    this.ref.current.animateNextTransition();
  }

  onSelect = (index) => {
    this.ref.current.animateNextTransition();
    this.setState({selectedTab: index});
  };

  randomizeImg = (imgs) => {
    const shuffle = imgs.sort(() => 0.5 - Math.random());

    this.ref.current.animateNextTransition();
    this.setState({images: [...shuffle]});
  };

  deleteImages = (imgs) => {
    const newImgs = [...imgs];
    newImgs.pop();
    this.ref.current.animateNextTransition();
    this.setState({images: [...newImgs]});
  };

  transition = (
    <Transition.Together>
      <Transition.In
        type="slide-right"
        durationMs={2000}
        interpolation="easeInOut"
      />
      <Transition.In type="fade" durationMs={2000} />
      <Transition.Change />
      <Transition.Out type="fade" durationMs={2000} />
    </Transition.Together>
  );

  render() {
    const {selectedTab, images, test} = this.state;

    return (
      <Transitioning.View
        ref={this.ref}
        style={styles.full}
        transition={this.transition}>
        <View style={[styles.tabContainer]}>
          <View
            style={[
              {
                position: 'absolute',
                height: 70,
                width: (width - 30) / 2,
                backgroundColor: '#bada55',
                left: selectedTab === 0 ? 0 : null,
                right: selectedTab === 1 ? 0 : null,
              },
            ]}
          />
          <TouchableOpacity
            style={styles.full}
            onPress={() => this.onSelect(0)}>
            <Tab name="Photos" isSelected={selectedTab === 0} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.full}
            onPress={() => this.onSelect(1)}>
            <Tab name="Grid" isSelected={selectedTab === 1} />
          </TouchableOpacity>
        </View>
        {selectedTab === 0 ? (
          <View style={styles.imgContainer}>
            {images.map(({id, color, url}) => (
              <GridImg
                key={id}
                color={color}
                url={url}
                width={width / 2 - 20}
              />
            ))}
          </View>
        ) : (
          <View style={styles.imgContainer}>
            {images.map(({id, color, url}) => (
              <GridImg
                key={id}
                color={color}
                url={url}
                width={width / 4 - 20}
              />
            ))}
          </View>
        )}
        <TouchableWithoutFeedback
          onPress={() => {
            this.deleteImages(images);
          }}>
          <View
            style={{
              height: 70,
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: selectedTab == 0 ? -70 : 0,
              backgroundColor: 'red',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 24, color: 'white'}}>Delete Images</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            this.randomizeImg(images);
          }}>
          <View
            style={{
              height: 70,
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: selectedTab == 0 ? 0 : -70,
              backgroundColor: '#BADA55',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 24, color: 'white'}}>Randomize Images</Text>
          </View>
        </TouchableWithoutFeedback>
      </Transitioning.View>
    );
  }
}

export default ShuffleImg;

const styles = StyleSheet.create({
  tabContainer: {
    height: 70,
    flexDirection: 'row',
    marginTop: 50,
    borderRadius: 70,
    width: width - 30,
    marginHorizontal: 15,
    backgroundColor: 'lightgrey',
    overflow: 'hidden',
  },
  full: {
    flex: 1,
  },
  imgContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});
