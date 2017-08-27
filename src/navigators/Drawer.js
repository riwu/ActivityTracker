import React from 'react';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import CONSTANTS from '../Constants';

import DashBoard from '../components/DashBoard';
import ProfilesNav from './ProfilesNav';
import FastingChartNav from './FastingChartNav';
import TarawihChartNav from './TarawihChartNav';
import SurahChartNav from './SurahChartNav';
import DuaList from '../components/DuaList';
import PrayerTimes from '../components/PrayerTimes';
import BackupAndRecovery from '../components/BackupAndRecovery';
import Credits from '../components/Credits';

const navs = [DashBoard, ProfilesNav, FastingChartNav, TarawihChartNav,
  SurahChartNav, DuaList, PrayerTimes, BackupAndRecovery, Credits];

const Drawer = DrawerNavigator(
  CONSTANTS.DRAWER_ORDER.reduce((obj, element, index) => ({ ...obj,
    [element]: {
      screen: navs[index],
      navigationOptions: {
        drawer: {
          icon: ({ tintColor }) => <Icon name="rocket" size={24} />,
        },
      },
    },
  }), {}),
  {
    drawerWidth: 250,
    contentOptions: {
      style: {
        marginTop: 24,
        flex: 1,
      },
    },
  },
);

export default Drawer;
