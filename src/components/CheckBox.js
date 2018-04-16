import React from 'react';
import { StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

const styles = StyleSheet.create({
  checkBox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    margin: 0,
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },
});

const CheckBoxComponent = (props) => (
  <CheckBox
    checkedIcon="check-square"
    uncheckedIcon="square"
    uncheckedColor="#e0e0e0"
    containerStyle={styles.checkBox}
    {...props}
  />
);

export default CheckBoxComponent;
