function deepFreeze(obj) {
  Object.values(obj).forEach((value) => {
    if (typeof value === 'object' && value !== null) {
      deepFreeze(value);
    }
  });

  return Object.freeze(obj);
}

const CONSTANTS = {
  PROFILES: 'Profiles',
  FASTING_CHART: 'My Fasting Chart',
  TARAWIH_CHART: 'My Tarawih Chart',
  SURAH_CHART: 'My Surah Chart',
  DU_A_LIST: "Du'a List",
  PRAYER_TIMES: 'Prayer Times',
  BACKUP_AND_RECOVERY: 'Backup & Recovery',
  CREDITS: 'Credits',
};

CONSTANTS.DRAWER_ORDER = [
  CONSTANTS.PROFILES, CONSTANTS.FASTING_CHART,
  CONSTANTS.TARAWIH_CHART, CONSTANTS.SURAH_CHART, CONSTANTS.DU_A_LIST,
  CONSTANTS.PRAYER_TIMES, CONSTANTS.BACKUP_AND_RECOVERY, CONSTANTS.CREDITS,
];

deepFreeze(CONSTANTS);
export default CONSTANTS;
