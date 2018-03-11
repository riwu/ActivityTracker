import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CONSTANTS from '../constants';

const headerStyle = {
  paddingRight: 10,
  paddingLeft: 10,
  marginTop: CONSTANTS.STATUS_BAR_HEIGHT,
  height: CONSTANTS.NAV_BAR_HEIGHT,
};

const textStyle = {
  margin: 15,
};

const NavigationOptions = (navigation, title, isDrawerComponent = true) => {
  const options = {
    headerTitle: <Text>{title}</Text>,
    headerStyle,
  };
  if (isDrawerComponent) {
    options.drawerLabel = <Text style={textStyle}>{title}</Text>;
    options.headerLeft = (
      <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
        <Ionicons name="ios-menu" size={30} />
      </TouchableOpacity>
    );
  }
  return options;
};

export default NavigationOptions;
