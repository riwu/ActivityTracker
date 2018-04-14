import { DrawerNavigator } from 'react-navigation';

import CONSTANTS from '../constants';

import DashBoard from './DashBoardNav';
import ProfilesNav from './ProfilesNav';
import FastingChartNav from './FastingChartNav';
import TarawihChartNav from './TarawihChartNav';
import SurahChartNav from './SurahChartNav';
import DuaList from './DuaListNav';
import PrayerTimes from './PrayerTimesNav';
import BackupAndRecovery from './BackupAndRecoveryNav';
import Credits from './CreditsNav';

const navs = [
  DashBoard,
  ProfilesNav,
  FastingChartNav,
  TarawihChartNav,
  SurahChartNav,
  DuaList,
  PrayerTimes,
  BackupAndRecovery,
  Credits,
];

const Drawer = DrawerNavigator(
  CONSTANTS.DRAWER_ORDER.reduce((acc, element, index) => {
    acc[element] = { screen: navs[index] };
    return acc;
  }, {}),
  {
    contentOptions: {
      itemStyle: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgrey',
      },
    },
  },
);

export default Drawer;
