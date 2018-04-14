import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
  button: {
    padding: 6,
  },
});

const ButtonComponent = ({ style, ...otherProps }) => (
  <Button raised fontSize={13} buttonStyle={[styles.button, style]} {...otherProps} />
);

export default ButtonComponent;
