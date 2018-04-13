import { Platform, NativeModules, Dimensions } from 'react-native';

import FastingChartPassed from '../assets/Fasting/passed.jpg';
import FastingChartTried from '../assets/Fasting/tried.jpg';
import FastingChartFailed from '../assets/Fasting/failed.jpg';

import TarawihChartPassed from '../assets/Tarawih/passed.jpg';
import TarawihChartTried from '../assets/Tarawih/tried.jpg';
import TarawihChartFailed from '../assets/Tarawih/failed.jpg';

import SurahChartPassed from '../assets/Surah/passed.jpg';
import SurahChartTried from '../assets/Surah/tried.jpg';
import SurahChartFailed from '../assets/Surah/failed.jpg';

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
  FASTING_CHART: 'வாசிப்பு',
  TARAWIH_CHART: 'எழுதுதல்',
  SURAH_CHART: 'பேசுதல்',
  DU_A_LIST: 'Proverbs',
  PRAYER_TIMES: 'Activity',
  BACKUP_AND_RECOVERY: 'Backup & Recovery',
  CREDITS: 'Credits',

  BACK: 'backPress',

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
