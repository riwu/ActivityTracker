import {
  setCustomView,
  setCustomText,
  setCustomImage,
} from 'react-native-global-props';

import { Platform } from 'react-native';
import { Font } from 'expo';

Font.loadAsync({
  Lato: require('../Lato/Lato.ttf'),
}).then(() => {
  const customTextProps = {
    style: {
      fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Lato',
    },
  };
  setCustomText(customTextProps);
});

const customViewProps = {
  style: {
  },
};


const customImageProps = {
  resizeMode: 'cover',
};


setCustomView(customViewProps);
setCustomImage(customImageProps);
