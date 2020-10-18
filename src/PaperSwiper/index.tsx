import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';

const {width, height} = Dimensions.get('window');

export type ArticleType = {
  id: number;
  color: string;
  content: string;
};

const ARTICLES: ArticleType[] = [
  {
    id: 1,
    color: 'red',
    content: `
    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
    Doloremque earum alias dolore voluptate aspernatur magni
    reiciendis nemo autem. Laboriosam iusto dignissimos sunt
    voluptates error, inventore incidunt doloremque accusantium
    nostrum iste. Lorem ipsum dolor sit amet consectetur
    adipisicing elit. Corporis labore earum reprehenderit
    mollitia, voluptatum ab ut odio porro voluptas accusamus ipsa
    sit, praesentium facilis blanditiis veritatis eligendi et
    vitae molestiae. Lorem ipsum dolor, sit amet consectetur
    adipisicing elit. Doloremque earum alias dolore voluptate
    aspernatur magni reiciendis nemo autem. Laboriosam iusto
    dignissimos sunt voluptates error, inventore incidunt
    doloremque accusantium nostrum iste. Lorem ipsum dolor sit
    amet consectetur adipisicing elit. Corporis labore earum
    reprehenderit mollitia, voluptatum ab ut odio porro voluptas
    accusamus ipsa sit, praesentium facilis blanditiis veritatis
    eligendi et vitae molestiae. Lorem ipsum dolor, sit amet
    consectetur adipisicing elit. Doloremque earum alias dolore
    voluptate aspernatur magni reiciendis nemo autem. Laboriosam
    iusto dignissimos sunt voluptates error, inventore incidunt
    doloremque accusantium nostrum iste. Lorem ipsum dolor sit
    amet consectetur adipisicing elit. Corporis labore earum
    reprehenderit mollitia, voluptatum ab ut odio porro voluptas
    accusamus ipsa sit, praesentium facilis blanditiis veritatis
    eligendi et vitae molestiae. Lorem ipsum dolor, sit amet
    consectetur adipisicing elit. Doloremque earum alias dolore
    voluptate aspernatur magni reiciendis nemo autem. Laboriosam
    iusto dignissimos sunt voluptates error, inventore incidunt
    doloremque accusantium nostrum iste. Lorem ipsum dolor sit
    amet consectetur adipisicing elit. Corporis labore earum
    reprehenderit mollitia, voluptatum ab ut odio porro voluptas
    accusamus ipsa sit, praesentium facilis blanditiis veritatis
    eligendi et vitae molestiae.`,
  },
  {
    id: 2,
    color: 'green',
    content: `
    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
    Doloremque earum alias dolore voluptate aspernatur magni
    reiciendis nemo autem. Laboriosam iusto dignissimos sunt
    voluptates error, inventore incidunt doloremque accusantium
    nostrum iste. Lorem ipsum dolor sit amet consectetur
    adipisicing elit. Corporis labore earum reprehenderit
    mollitia, voluptatum ab ut odio porro voluptas accusamus ipsa
    sit, praesentium facilis blanditiis veritatis eligendi et
    vitae molestiae. Lorem ipsum dolor, sit amet consectetur
    adipisicing elit. Doloremque earum alias dolore voluptate
    aspernatur magni reiciendis nemo autem. Laboriosam iusto
    dignissimos sunt voluptates error, inventore incidunt
    doloremque accusantium nostrum iste. Lorem ipsum dolor sit
    amet consectetur adipisicing elit. Corporis labore earum
    reprehenderit mollitia, voluptatum ab ut odio porro voluptas
    accusamus ipsa sit, praesentium facilis blanditiis veritatis
    eligendi et vitae molestiae. Lorem ipsum dolor, sit amet
    consectetur adipisicing elit. Doloremque earum alias dolore
    voluptate aspernatur magni reiciendis nemo autem. Laboriosam
    iusto dignissimos sunt voluptates error, inventore incidunt
    doloremque accusantium nostrum iste. Lorem ipsum dolor sit
    amet consectetur adipisicing elit. Corporis labore earum
    reprehenderit mollitia, voluptatum ab ut odio porro voluptas
    accusamus ipsa sit, praesentium facilis blanditiis veritatis
    eligendi et vitae molestiae. Lorem ipsum dolor, sit amet
    consectetur adipisicing elit. Doloremque earum alias dolore
    voluptate aspernatur magni reiciendis nemo autem. Laboriosam
    iusto dignissimos sunt voluptates error, inventore incidunt
    doloremque accusantium nostrum iste. Lorem ipsum dolor sit
    amet consectetur adipisicing elit. Corporis labore earum
    reprehenderit mollitia, voluptatum ab ut odio porro voluptas
    accusamus ipsa sit, praesentium facilis blanditiis veritatis
    eligendi et vitae molestiae.`,
  },
  {
    id: 3,
    color: 'pink',
    content: `
    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
    Doloremque earum alias dolore voluptate aspernatur magni
    reiciendis nemo autem. Laboriosam iusto dignissimos sunt
    voluptates error, inventore incidunt doloremque accusantium
    nostrum iste. Lorem ipsum dolor sit amet consectetur
    adipisicing elit. Corporis labore earum reprehenderit
    mollitia, voluptatum ab ut odio porro voluptas accusamus ipsa
    sit, praesentium facilis blanditiis veritatis eligendi et
    vitae molestiae. Lorem ipsum dolor, sit amet consectetur
    adipisicing elit. Doloremque earum alias dolore voluptate
    aspernatur magni reiciendis nemo autem. Laboriosam iusto
    dignissimos sunt voluptates error, inventore incidunt
    doloremque accusantium nostrum iste. Lorem ipsum dolor sit
    amet consectetur adipisicing elit. Corporis labore earum
    reprehenderit mollitia, voluptatum ab ut odio porro voluptas
    accusamus ipsa sit, praesentium facilis blanditiis veritatis
    eligendi et vitae molestiae. Lorem ipsum dolor, sit amet
    consectetur adipisicing elit. Doloremque earum alias dolore
    voluptate aspernatur magni reiciendis nemo autem. Laboriosam
    iusto dignissimos sunt voluptates error, inventore incidunt
    doloremque accusantium nostrum iste. Lorem ipsum dolor sit
    amet consectetur adipisicing elit. Corporis labore earum
    reprehenderit mollitia, voluptatum ab ut odio porro voluptas
    accusamus ipsa sit, praesentium facilis blanditiis veritatis
    eligendi et vitae molestiae. Lorem ipsum dolor, sit amet
    consectetur adipisicing elit. Doloremque earum alias dolore
    voluptate aspernatur magni reiciendis nemo autem. Laboriosam
    iusto dignissimos sunt voluptates error, inventore incidunt
    doloremque accusantium nostrum iste. Lorem ipsum dolor sit
    amet consectetur adipisicing elit. Corporis labore earum
    reprehenderit mollitia, voluptatum ab ut odio porro voluptas
    accusamus ipsa sit, praesentium facilis blanditiis veritatis
    eligendi et vitae molestiae.`,
  },
];

const PaperSwiper: React.FC = () => {
  const positionAnimate = new Animated.ValueXY();
  const swiperCardPositionAnimation = new Animated.ValueXY({x: 0, y: -height});
  const [curIndex, setCurIndex] = useState(0);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      if (gestureState.dy > 0 && curIndex > 0) {
        swiperCardPositionAnimation.setValue({
          x: 0,
          y: -height + gestureState.dy,
        });
      } else {
        positionAnimate.setValue({y: gestureState.dy, x: 0});
      }
    },
    onPanResponderRelease: (event, gestureState) => {
      if (curIndex > 0 && gestureState.dy > 50 && gestureState.vy > 0.7) {
        Animated.timing(swiperCardPositionAnimation, {
          toValue: {x: 0, y: 0},
          duration: 400,
          useNativeDriver: false,
        }).start(() => {
          setCurIndex(curIndex - 1);
          swiperCardPositionAnimation.setValue({x: 0, y: -height});
        });
      } else if (
        -gestureState.dy > 50 &&
        -gestureState.vy > 0.7 &&
        curIndex < ARTICLES.length - 1
      ) {
        Animated.timing(positionAnimate, {
          toValue: {x: 0, y: -height},
          duration: 400,
          useNativeDriver: false,
        }).start(() => {
          setCurIndex(curIndex + 1);
          positionAnimate.setValue({x: 0, y: 0});
        });
      } else {
        Animated.parallel([
          Animated.spring(positionAnimate, {
            toValue: {x: 0, y: 0},
            useNativeDriver: false,
          }),
          Animated.spring(swiperCardPositionAnimation, {
            toValue: {x: 0, y: -height},
            useNativeDriver: false,
          }),
        ]).start();
      }
    },
  });

  return (
    <View style={styles.container}>
      {ARTICLES.map((item, index) => {
        if (index === curIndex - 1) {
          return (
            <Animated.View
              key={index}
              style={swiperCardPositionAnimation.getLayout()}
              {...panResponder.panHandlers}>
              <View
                style={{
                  flex: 1,
                  position: 'absolute',
                  height,
                  width,
                  backgroundColor: '#fff',
                }}>
                <View style={{flex: 2}}>
                  <View
                    style={{
                      backgroundColor: item.color,
                      width,
                      height: (width / 3) * 2,
                    }}
                  />
                </View>
                <View style={{flex: 3, padding: 5}}>
                  <Text>{item.content}</Text>
                </View>
              </View>
            </Animated.View>
          );
        }
        if (index < curIndex) {
          return null;
        }
        if (index === curIndex) {
          return (
            <Animated.View
              key={index}
              style={positionAnimate.getLayout()}
              {...panResponder.panHandlers}>
              <View
                style={{
                  flex: 1,
                  position: 'absolute',
                  height,
                  width,
                  backgroundColor: '#fff',
                }}>
                <View style={{flex: 2}}>
                  <View
                    style={{
                      backgroundColor: item.color,
                      width,
                      height: (width / 3) * 2,
                    }}
                  />
                </View>
                <View style={{flex: 3, padding: 5}}>
                  <Text>{item.content}</Text>
                </View>
              </View>
            </Animated.View>
          );
        }
        return (
          <Animated.View key={index}>
            <View
              style={{
                flex: 1,
                position: 'absolute',
                height,
                width,
                backgroundColor: '#fff',
              }}>
              <View style={{flex: 2}}>
                <View
                  style={{
                    backgroundColor: item.color,
                    width,
                    height: (width / 3) * 2,
                  }}
                />
              </View>
              <View style={{flex: 3, padding: 5}}>
                <Text>{item.content}</Text>
              </View>
            </View>
          </Animated.View>
        );
      }).reverse()}
    </View>
  );
};

export default PaperSwiper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
