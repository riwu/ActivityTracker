import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    margin: 10,
    padding: 10,
  },
});

const Button = ({ title, onPress, disabled, style }) => (
  <TouchableOpacity
    style={[styles.button, style, { opacity: disabled ? 0.5 : 1 }]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default Button;
