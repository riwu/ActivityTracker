
export const fontLoaded = () => ({
  type: 'FONT_LOADED',
});

export const navigateBack = () => ({
  type: 'NAVIGATE_BACK',
});

export const updateFastingChart = data => ({
  type: 'UPDATE_FASTING_CHART',
  data,
});

export const updateTarawihChart = data => ({
  type: 'UPDATE_TARAWIH_CHART',
  data,
});

export const updateSurahChart = data => ({
  type: 'UPDATE_SURAH_CHART',
  data,
});
