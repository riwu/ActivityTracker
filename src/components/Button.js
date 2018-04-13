import React from 'react';
import { Button } from 'react-native-elements';

const ButtonComponent = ({ style, ...otherProps }) => (
  <Button raised buttonStyle={style} {...otherProps} />
);

export default ButtonComponent;
