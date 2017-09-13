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

    this.state = {
      ...this.props.images.reduce((obj, image, index) => ({
        [index]: new Animated.ValueXY(),
      }), {}),
      selectedImageIndex: null,
    };

    this.panResponders = this.props.images.map((image, imageIndex) => PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {
        dx: this.state[imageIndex].x,
        dy: this.state[imageIndex].y,
      }]),
      onPanResponderRelease: (e, gesture) => {
        const box = this.dropZone;
        const boxY = box.y + CONSTANTS.STATUS_BAR_HEIGHT + CONSTANTS.NAV_BAR_HEIGHT + marginTop + imageHeight;
        if (box.x <= gesture.moveX && gesture.moveX <= box.x + box.width &&
          boxY <= gesture.moveY && gesture.moveY <= boxY + box.height) {
          this.setState({ selectedImageIndex: imageIndex });
          this.props.navigation.state.params.onChange(imageIndex);
        }

        Animated.decay(
              this.state[imageIndex],
              { toValue: { x: 0, y: 0 } },
          ).start();
      },
    });
    this.panResponders = Object.entries({ passed: 0, tried: 1, failed: 2 })
      .map(([stateKey, imageSource]) => ({
        stateKey,
        imageSource,
        panResponder: createPanResponder(stateKey, imageSource),
      }));
  }

  renderContainer() {
    return (
      <View style={styles.container}>
        <View onLayout={(e) => { this.dropZone = e.nativeEvent.layout; }} style={styles.box}>
          {this.state.selectedImage
            ? <Image style={styles.enlargedImage} source={this.state.selectedImage} />
            : null}
        </View>
      </View>
    );
  }

  render() {
    return (
      <View>
        <View style={styles.images}>
          {this.panResponders.map(({ stateKey, imageSource, panResponder }) => (
            <Animated.Image
              key={stateKey}
              onLayout={(e) => { this.imageDim = e.nativeEvent.layout; }}
              {...panResponder.panHandlers}
              style={[this.state[stateKey].getLayout(), styles.image]}
              source={imageSource}
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
