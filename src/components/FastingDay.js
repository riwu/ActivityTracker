import React, { Component } from 'react';
import { View, StyleSheet, Image, Animated, PanResponder } from 'react-native';
import FastingChartPassed from '../../Images/FastingChart/passed.png';
import FastingChartTried from '../../Images/FastingChart/tried.png';
import FastingChartFailed from '../../Images/FastingChart/failed.png';
import CONSTANTS from '../Constants';

class FastingDay extends Component {

  constructor(props) {
    super(props);

    this.state = {
      passed: new Animated.ValueXY(),
      tried: new Animated.ValueXY(),
      failed: new Animated.ValueXY(),
      activeImage: null,
    };

    const createPanResponder = (stateKey, selectedImage) => PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {
        dx: this.state[stateKey].x,
        dy: this.state[stateKey].y,
      }]),
      onPanResponderRelease: (e, gesture) => {
        const box = this.dropZone;
        const boxY = box.y + CONSTANTS.STATUS_BAR_HEIGHT + CONSTANTS.NAV_BAR_HEIGHT + marginTop;
        if (box.x <= gesture.moveX && gesture.moveX <= box.x + box.width &&
          boxY <= gesture.moveY && gesture.moveY <= boxY + box.height) {
          this.setState({ selectedImage });
        }

        Animated.decay(
              this.state[stateKey],
              { toValue: { x: 0, y: 0 } },
          ).start();
      },
    });
    this.panResponders = Object.entries({ passed: FastingChartPassed, tried: FastingChartTried, failed: FastingChartFailed })
      .map(([key, img]) => [img, createPanResponder(key, img)]);
  }

  renderContainer() {
    return (
      <View style={styles.container}>
        <View onLayout={(e) => { this.dropZone = e.nativeEvent.layout; }} style={styles.box}>
          {this.state.activeImage
            ? <Image style={styles.enlargedImage} source={this.state.activeImage} />
            : null}
        </View>
      </View>
    );
  }

  render() {
    return (
      <View>
        <View style={styles.images}>
          {this.panResponders.map(([img, panResponder]) => (
            <Animated.Image
              key={img}
              onLayout={(e) => { this.imageDim = e.nativeEvent.layout; }}
              {...panResponder.panHandlers}
              style={[this.state.passed.getLayout(), styles.image]}
              source={img}
            />
          ),
          )}
        </View>
        {this.renderContainer()}
      </View>
    );
  }
}
const marginTop = 20;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  images: {
    marginTop,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  image: {
    width: '25%',
    height: 110,
    resizeMode: 'cover',
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
    marginTop: 250,
    padding: 7,
  },
});

export default FastingDay;
