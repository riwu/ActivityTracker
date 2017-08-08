import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import CONSTANTS from '../CONSTANTS';

import ProfilesNav from './ProfilesNav';
import FastingChartNav from './FastingChartNav';
import TarawihChart from './TarawihChart';
import SurahChart from './SurahChart';
import DuaList from './DuaList';
import PrayerTimes from './PrayerTimes';
import BackupAndRecovery from './BackupAndRecovery';
import Credits from './Credits';


const navs = [ProfilesNav, FastingChartNav, TarawihChart, SurahChart, DuaList, PrayerTimes, BackupAndRecovery, Credits];
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
