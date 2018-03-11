import { Platform, NativeModules, Dimensions } from 'react-native';

import FastingChartPassed from '../Images/Fasting/passed.jpg';
import FastingChartTried from '../Images/Fasting/tried.jpg';
import FastingChartFailed from '../Images/Fasting/failed.jpg';

import TarawihChartPassed from '../Images/Tarawih/passed.jpg';
import TarawihChartTried from '../Images/Tarawih/tried.jpg';
import TarawihChartFailed from '../Images/Tarawih/failed.jpg';

import SurahChartPassed from '../Images/Surah/passed.jpg';
import SurahChartTried from '../Images/Surah/tried.jpg';
import SurahChartFailed from '../Images/Surah/failed.jpg';

function deepFreeze(obj) {
  Object.values(obj).forEach((value) => {
    if (typeof value === 'object' && value !== null) {
      deepFreeze(value);
    }
  });

  return Object.freeze(obj);
}

const { width, height } = Dimensions.get('window');

const CONSTANTS = {
  WIDTH: width,
  HEIGHT: height,
  FASTING_CHART_IMAGES: [FastingChartPassed, FastingChartTried, FastingChartFailed],
  TARAWIH_CHART_IMAGES: [TarawihChartPassed, TarawihChartTried, TarawihChartFailed],
  SURAH_CHART_IMAGES: [SurahChartPassed, SurahChartTried, SurahChartFailed],
  DASH_BOARD: 'Dashboard',
  PROFILES: 'Profiles',
  FASTING_CHART: 'Read',
  TARAWIH_CHART: 'Speak',
  SURAH_CHART: 'Write',
  DU_A_LIST: 'Proverbs',
  PRAYER_TIMES: 'Activity',
  BACKUP_AND_RECOVERY: 'Backup & Recovery',
  CREDITS: 'Credits',

  BACK: 'backPress',

  STATUS_BAR_HEIGHT: Platform.OS === 'ios' ? 0 : NativeModules.StatusBarManager.HEIGHT,
  NAV_BAR_HEIGHT: 55,
};

CONSTANTS.DRAWER_ORDER = [
  CONSTANTS.DASH_BOARD,
  CONSTANTS.PROFILES,
  CONSTANTS.FASTING_CHART,
  CONSTANTS.TARAWIH_CHART,
  CONSTANTS.SURAH_CHART,
  CONSTANTS.DU_A_LIST,
  CONSTANTS.PRAYER_TIMES,
  CONSTANTS.BACKUP_AND_RECOVERY,
  CONSTANTS.CREDITS,
];

deepFreeze(CONSTANTS);
export default CONSTANTS;
