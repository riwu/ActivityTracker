import React, { Component } from 'react';
import { View, StyleSheet, Animated, PanResponder } from 'react-native';
import CONSTANTS from '../constants';

const marginTop = 20;
const imageHeight = CONSTANTS.WIDTH / 4;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  images: {
    marginTop,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  image: {
    width: imageHeight,
    height: imageHeight,
  },
  enlargedImage: {
    width: '100%',
    height: '100%',
  },
  box: {
    width: CONSTANTS.WIDTH / 2,
    height: CONSTANTS.WIDTH / 2,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'dashed',
    borderRadius: 0.001,
    marginTop: CONSTANTS.HEIGHT / 6,
    padding: 7,
  },
});

class Day extends Component {
  constructor(props) {
    super(props);
    const { images } = props;
    this.state = {
      ...images.reduce(
        (obj, image, index) => ({
          ...obj,
          [index]: new Animated.ValueXY(),
        }),
        {},
      ),
      selectedImageIndex: props.navigation.state.params.replace,
      selectedImagePos: new Animated.ValueXY(),
    };

    const createPanResponder = (index) =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([
          null,
          {
            dx: index === undefined ? this.state.selectedImagePos.x : this.state[index].x,
            dy: index === undefined ? this.state.selectedImagePos.y : this.state[index].y,
          },
        ]),
        onPanResponderRelease: (e, gesture) => {
          const box = this.dropZone;
          const boxY = box.y + CONSTANTS.NAV_BAR_HEIGHT + marginTop + imageHeight;
          if (
            (box.x <= gesture.moveX &&
              gesture.moveX <= box.x + box.width &&
              boxY <= gesture.moveY &&
              gesture.moveY <= boxY + box.height) ===
            (index !== undefined)
          ) {
            this.setState({
              selectedImageIndex: index,
              // selectedImagePos: new Animated.ValueXY(), // TODO: this makes animation disappear
            });
            props.navigation.state.params.onChange(index);
          }

          Animated.decay(this.state.selectedImagePos, { toValue: { x: 0, y: 0 } }).start();
          if (index !== undefined) {
            Animated.decay(this.state[index], { toValue: { x: 0, y: 0 } }).start();
          }
        },
      });

    this.panResponders = images.map((image, index) => createPanResponder(index));
    this.selectedImagePanResponder = createPanResponder(undefined);
  }

  renderContainer() {
    return (
      <View style={styles.container}>
        <View
          onLayout={(e) => {
            this.dropZone = e.nativeEvent.layout;
          }}
          style={styles.box}
        >
          {this.state.selectedImageIndex === undefined ? null : (
            <Animated.Image
              {...this.selectedImagePanResponder.panHandlers}
              style={[this.state.selectedImagePos.getLayout(), styles.enlargedImage]}
              source={this.props.images[this.state.selectedImageIndex]}
            />
          )}
        </View>
      </View>
    );
  }

  render() {
    return (
      <View>
        <View style={styles.images}>
          {this.panResponders.map((panResponder, index) => (
            <Animated.Image
              key={index}
              {...panResponder.panHandlers}
              style={[this.state[index].getLayout(), styles.image]}
              source={this.props.images[index]}
            />
          ))}
        </View>
        {this.renderContainer()}
      </View>
    );
  }
}

export default Day;
