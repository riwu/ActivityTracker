import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProfilesNav from './ProfilesNav';
import FastingChartNav from './FastingChartNav';

const Drawer = DrawerNavigator({
  Profiles: {
    screen: ProfilesNav,
    navigationOptions: {
      drawer: {
        label: 'Profiles',
        icon: ({ tintColor }) => <Icon name="rocket" size={24} />,
      },
    },
  },

  'My Fasting Chart': {
    screen: FastingChartNav,
    navigationOptions: {
      drawer: {
        label: 'My Fasting Chart',
        icon: ({ tintColor }) => <Icon name="rocket" size={24} />,
      },
    },
  },
});

export default Drawer;
