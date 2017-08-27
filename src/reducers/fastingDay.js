import { Animated } from 'react-native';

const initialState = {
  passed: new Animated.ValueXY(),
  tried: new Animated.ValueXY(),
  failed: new Animated.ValueXY(),
  activeImage: null,
};

const navigation = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default navigation;
