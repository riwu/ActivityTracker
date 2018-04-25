import React, { Component } from 'react';
import { View, StyleSheet, Animated, PanResponder, Platform } from 'react-native';
import CONSTANTS from '../constants';

const MARGIN_TOP = 20;
const IMAGE_SIZE = CONSTANTS.WIDTH / 4;
const BOX_SIZE = CONSTANTS.WIDTH / 2;
const BOX_PADDING = 7;
const BOX_MARGIN_TOP = CONSTANTS.HEIGHT / 6;

const IS_IOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
  images: {
    marginTop: MARGIN_TOP,
    flexDirection: 'row',
    justifyContent: 'space-around',
    ...(IS_IOS ? { zIndex: 1 } : undefined),
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    ...(IS_IOS ? undefined : { zIndex: 1 }),
  },
  enlargedImage: {
    marginTop: BOX_MARGIN_TOP + BOX_PADDING,
    alignSelf: 'center',
    width: BOX_SIZE - BOX_PADDING * 2,
    height: BOX_SIZE - BOX_PADDING * 2,
  },
  boxBorder: {
    marginTop: BOX_MARGIN_TOP,
    alignSelf: 'center',
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'dashed',
    borderRadius: 0.001,
    position: 'absolute',
  },
});

class Day extends Component {
  constructor(props) {
    super(props);
    const { images } = props;
    this.state = {
      ...images.reduce((acc, image, index) => {
        acc[index] = new Animated.ValueXY();
        return acc;
      }, {}),
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
          // the end position of the box
          const boxY = box.y + CONSTANTS.NAV_BAR_HEIGHT + MARGIN_TOP + IMAGE_SIZE;
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
      <View>
        <View
          onLayout={(e) => {
            this.dropZone = e.nativeEvent.layout;
          }}
          style={styles.boxBorder}
        />
        {this.state.selectedImageIndex !== undefined && (
          <Animated.Image
            {...this.selectedImagePanResponder.panHandlers}
            style={[this.state.selectedImagePos.getLayout(), styles.enlargedImage]}
            source={this.props.images[this.state.selectedImageIndex]}
          />
        )}
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
