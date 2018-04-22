import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CONSTANTS from '../constants';
import { store } from '../../App';

const styles = StyleSheet.create({
  headerStyle: {
    paddingRight: 15,
    paddingLeft: 15,
    height: CONSTANTS.NAV_BAR_HEIGHT,
  },
  backgroundContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});

const textStyle = {
  margin: 15,
};

const COLORS = [
  '#c3e17f',
  '#f6fccc',
  '#ffcc70',
  '#f0776c',
  '#da9dbe',
  '#c49bdd',
  '#6999e1',
  '#61c2e3',
];

const NavigationOptions = (navigation, title, isDrawerComponent = true) => {
  const options = {
    headerBackground: (
      <View style={styles.backgroundContainer}>
        {COLORS.map((color) => (
          <View
            key={color}
            style={{
              backgroundColor: color,
              width: CONSTANTS.WIDTH / COLORS.length,
            }}
          />
        ))}
      </View>
    ),
    title,
    headerStyle: styles.headerStyle,
  };
  if (isDrawerComponent) {
    options.drawerLabel = <Text style={textStyle}>{title}</Text>;
    options.headerLeft = (
      <TouchableOpacity
        onPress={() => store.dispatch({ type: 'Navigation/NAVIGATE', routeName: 'DrawerOpen' })}
      >
        <Ionicons name="ios-menu" size={30} />
      </TouchableOpacity>
    );
  }
  return options;
};

export default NavigationOptions;
