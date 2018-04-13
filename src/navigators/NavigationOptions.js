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
});

const textStyle = {
  margin: 15,
};

const COLORS = ['red', 'blue', 'green', 'yellow', 'orange'];

const NavigationOptions = (navigation, title, isDrawerComponent = true) => {
  const options = {
    // header: (props) => (
    //   <View style={{ backgroundColor: 'transparent' }}>
    //     <View
    //       style={{
    //         position: 'absolute',
    //         height: '100%',
    //         width: '100%',
    //         backgroundColor: 'transparent',
    //         flexDirection: 'row',
    //         // zIndex: 1,
    //         // opacity: 0.4,
    //       }}
    //     >
    //       {COLORS.map((color) => (
    //         <View
    //           key={color}
    //           style={{
    //             backgroundColor: color,
    //             opacity: 0.6,
    //             width: CONSTANTS.WIDTH / COLORS.length,
    //           }}
    //         />
    //       ))}
    //     </View>
    //     <Header {...props} style={{ backgroundColor: 'red' }} />
    //   </View>
    // ),
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
