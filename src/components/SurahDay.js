import React, { Component } from 'react';
import { View, Image, Animated, PanResponder, ImageBackground } from 'react-native';
import CONSTANTS from '../Constants';
import Grey from '../../Images/Surah/grey/divided_17.gif';

class Day extends Component {
  constructor(props) {
    super(props);
    const { images } = props;
    console.log('replace', props); // TODO: find out why it has updateChart props
    this.state = {
      ...images.reduce((obj, image, index) => {
        obj[index] = new Animated.ValueXY();  //eslint-disable-line
        return obj;
      }, {}),
      selectedImagePos: images.map(() => new Animated.ValueXY()),
      selectedImages: props.navigation.state.params.replace || [],
    };

    const createPanResponder = (index, remove) => PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {
        dx: (remove ? this.state.selectedImagePos : this.state)[index].x,
        dy: (remove ? this.state.selectedImagePos : this.state)[index].y,
      }]),
      onPanResponderRelease: (e, gesture) => {
        const box = this.dropZone;
        const boxY = box.y + CONSTANTS.STATUS_BAR_HEIGHT + CONSTANTS.NAV_BAR_HEIGHT + props.extraHeight;
        if ((box.x <= gesture.moveX && gesture.moveX <= box.x + box.width &&
             boxY <= gesture.moveY && gesture.moveY <= boxY + box.height)
             !== remove) {
          const { selectedImages } = this.state;
          let newSelectedImages;
          if (remove) {
            newSelectedImages = selectedImages.filter(i => i !== index);
          } else {
            newSelectedImages = selectedImages.includes(index)
              ? selectedImages
              : [...selectedImages, index];
          }
          console.log('new', newSelectedImages);
          this.setState({
            selectedImages: newSelectedImages,
            // selectedImagePos: images.map(() => new Animated.ValueXY()),
          });
          props.navigation.state.params.onChange(newSelectedImages);
        }

        Animated.decay(
          this.state.selectedImagePos[index],
          { toValue: { x: 0, y: 0 } },
        ).start();

        if (!remove) {
          Animated.decay(
            this.state[index],
            { toValue: { x: 0, y: 0 } },
          ).start();
        }
      },
    });

    this.panResponders = images.map((image, index) => createPanResponder(index, false));
    this.selectedImagePanResponder = images.map((image, index) => createPanResponder(index, true));
  }

  renderContainer() {
    return (
      <View style={this.props.styles.container}>
        <View
          onLayout={(e) => { this.dropZone = e.nativeEvent.layout; }}
          style={this.props.styles.box}
        >
          <ImageBackground
            style={this.props.styles.enlargedImage}
            source={Grey}
          >
            {this.state.selectedImages.map(index => (
              <Animated.Image
                key={index}
                {...this.selectedImagePanResponder[index].panHandlers}
                style={[this.state.selectedImagePos[index].getLayout(),
                  this.props.styles.fittedImage]}
                source={this.props.images[index]}
              />
            ))}
          </ImageBackground>
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
