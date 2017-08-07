import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProfilesNav from './ProfilesNav';
import FastingChartNav from './FastingChartNav';
import CONSTANTS from '../CONSTANTS';

const navs = [ProfilesNav, FastingChartNav];
const Drawer = DrawerNavigator(
  CONSTANTS.DRAWER_ORDER.reduce((obj, element, index) => ({ ...obj,
    [element]: {
      screen: navs[index],
      navigationOptions: {
        drawer: {
          label: element,
          icon: ({ tintColor }) => <Icon name="rocket" size={24} />,
        },
      },
    },
  }), {}),
  {
    drawerWidth: 250,
  },
);

export default Drawer;
