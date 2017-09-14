import React, { Component } from 'react';
import { View, Image, Animated, PanResponder } from 'react-native';
import CONSTANTS from '../Constants';

class FastingDay extends Component {
  constructor(props) {
    super(props);
    const images = this.props.images;
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
        const boxY = box.y + CONSTANTS.STATUS_BAR_HEIGHT + CONSTANTS.NAV_BAR_HEIGHT + this.props.extraHeight;
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
      <View style={this.props.styles.container}>
        <View onLayout={(e) => { this.dropZone = e.nativeEvent.layout; }} style={this.props.styles.box}>
          {
            this.state.selectedImageIndex === undefined ? null :
            <Image style={this.props.styles.enlargedImage} source={this.props.images[this.state.selectedImageIndex]} />
          }
        </View>
      </View>
    );
  }

  render() {
    return (
      <View>
        <View style={this.props.styles.images}>
          {this.panResponders.map((panResponder, index) => (
            <Animated.Image
              key={index}
              onLayout={(e) => { this.imageDim = e.nativeEvent.layout; }}
              {...panResponder.panHandlers}
              style={[this.state[index].getLayout(), this.props.styles.image]}
              source={this.props.images[index]}
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
