import React, { Component } from 'react';
import { View, Image, Animated, PanResponder } from 'react-native';
import CONSTANTS from '../Constants';

class Day extends Component {
  constructor(props) {
    super(props);
    const { images } = props;
    console.log('replace'); // TODO: find out why it has updateChart props
    this.state = {
      ...images.reduce((obj, image, index) => ({
        ...obj,
        [index]: new Animated.ValueXY(),
      }), {}),
      selectedImageIndex: props.navigation.state.params.replace,
      selectedImagePos: new Animated.ValueXY(),
    };

    const createPanResponder = index => PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {
        dx: index === undefined ? this.state.selectedImagePos.x : this.state[index].x,
        dy: index === undefined ? this.state.selectedImagePos.y : this.state[index].y,
      }]),
      onPanResponderRelease: (e, gesture) => {
        const box = this.dropZone;
        const boxY = box.y + CONSTANTS.STATUS_BAR_HEIGHT + CONSTANTS.NAV_BAR_HEIGHT + props.extraHeight;
        if ((box.x <= gesture.moveX && gesture.moveX <= box.x + box.width &&
             boxY <= gesture.moveY && gesture.moveY <= boxY + box.height)
             === (index !== undefined)) {
          console.log('ani', this.state.selectedImagePos, index);
          this.setState({
            selectedImageIndex: index,
            // selectedImagePos: new Animated.ValueXY(), // TODO: this makes animation disappear
          });
          props.navigation.state.params.onChange(index);
        }

        Animated.decay(
          this.state.selectedImagePos,
          { toValue: { x: 0, y: 0 } },
        ).start();
        if (index !== undefined) {
          Animated.decay(
            this.state[index],
            { toValue: { x: 0, y: 0 } },
          ).start();
        }
      },
    });

    this.panResponders = images.map((image, index) => createPanResponder(index));
    this.selectedImagePanResponder = createPanResponder(undefined);
  }

  renderContainer() {
    return (
      <View style={this.props.styles.container}>
        <View onLayout={(e) => { this.dropZone = e.nativeEvent.layout; }} style={this.props.styles.box}>
          {
            this.state.selectedImageIndex === undefined ? null :
            <Animated.Image
              {...this.selectedImagePanResponder.panHandlers}
              style={[this.state.selectedImagePos.getLayout(), this.props.styles.enlargedImage]}
              source={this.props.images[this.state.selectedImageIndex]}
            />
          }
        </View>
      </View>
    );
  }

  render() {
    console.log('ani2', this.state.selectedImagePos);
    return (
      <View>
        <View style={this.props.styles.images}>
          {this.panResponders.map((panResponder, index) => (
            <Animated.Image
              key={index}
              {...panResponder.panHandlers}
              style={[this.state[index].getLayout(), this.props.styles.image]}
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
