import {
  setCustomView,
  setCustomText,
  setCustomImage,
} from 'react-native-global-props';

import { Platform, NativeModules } from 'react-native';


const customViewProps = {
  style: {
  },
};

const customTextProps = {
  style: {
    fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto',
  },
};


const customImageProps = {
  resizeMode: 'cover',
};


setCustomView(customViewProps);
setCustomText(customTextProps);
setCustomImage(customImageProps);
