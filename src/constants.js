import { Dimensions } from 'react-native';

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

const constants = {
  WIDTH: width,
  HEIGHT: height,
  FASTING_CHART_IMAGES: [FastingChartPassed, FastingChartTried, FastingChartFailed],
  TARAWIH_CHART_IMAGES: [TarawihChartPassed, TarawihChartTried, TarawihChartFailed],
  SURAH_CHART_IMAGES: [SurahChartPassed, SurahChartTried, SurahChartFailed],
  DASH_BOARD: 'Dashboard',
  PROFILES: 'Profiles',
  FASTING_CHART: 'Read / வாசிப்பு',
  TARAWIH_CHART: 'Speak / எழுதுதல்',
  SURAH_CHART: 'Write / பேசுதல்',
  DU_A_LIST: 'Proverbs',
  BACKUP_AND_RECOVERY: 'Backup',
  CREDITS: 'Credits',

  NAV_BAR_HEIGHT: 55,
};

constants.DRAWER_ORDER = [
  constants.DASH_BOARD,
  constants.PROFILES,
  constants.FASTING_CHART,
  constants.TARAWIH_CHART,
  constants.SURAH_CHART,
  constants.DU_A_LIST,
  constants.BACKUP_AND_RECOVERY,
  constants.CREDITS,
];

deepFreeze(constants);
export default constants;
