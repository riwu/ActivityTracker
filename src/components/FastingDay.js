import React, { Component } from 'react';
import { View, StyleSheet, Image, Animated, PanResponder } from 'react-native';
import CONSTANTS from '../Constants';

const marginTop = 20;
const imageHeight = 110;
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
    width: '25%',
    height: imageHeight,
  },
  enlargedImage: {
    width: '100%',
    height: '100%',
  },
  box: {
    width: 180,
    height: 180,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'dashed',
    borderRadius: 0.001,
    marginTop: 150,
    padding: 7,
  },
});

class FastingDay extends Component {
  constructor(props) {
    super(props);
    const images = this.props.navigation.state.params.images;
    this.state = {
      ...images.reduce((obj, image, index) => ({
        ...obj,
        [index]: new Animated.ValueXY(),
      }), {}),
      selectedImageIndex: undefined,
    };

    this.panResponders = images.map((image, index) => PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {
        dx: this.state[index].x,
        dy: this.state[index].y,
      }]),
      onPanResponderRelease: (e, gesture) => {
        const box = this.dropZone;
        const boxY = box.y + CONSTANTS.STATUS_BAR_HEIGHT + CONSTANTS.NAV_BAR_HEIGHT + marginTop + imageHeight;
        if (box.x <= gesture.moveX && gesture.moveX <= box.x + box.width &&
          boxY <= gesture.moveY && gesture.moveY <= boxY + box.height) {
          this.setState({ selectedImageIndex: index });
          this.props.navigation.state.params.onChange(index);
        }

        Animated.decay(
              this.state[index],
              { toValue: { x: 0, y: 0 } },
          ).start();
      },
    }));
  }

  renderContainer() {
    return (
      <View style={styles.container}>
        <View onLayout={(e) => { this.dropZone = e.nativeEvent.layout; }} style={styles.box}>
          {
            this.state.selectedImageIndex === undefined ? null :
            <Image style={styles.enlargedImage} source={this.props.navigation.state.params.images[this.state.selectedImageIndex]} />
          }
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
              onLayout={(e) => { this.imageDim = e.nativeEvent.layout; }}
              {...panResponder.panHandlers}
              style={[this.state[index].getLayout(), styles.image]}
              source={this.props.navigation.state.params.images[index]}
            />
            ),
          )}
        </View>
        {this.renderContainer()}
      </View>
    );
  }
}

export default FastingDay;
