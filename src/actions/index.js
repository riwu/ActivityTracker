
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

export const createProfile = name => ({
  type: 'CREATE_PROFILE',
  name,
});

export const deleteProfile = index => ({
  type: 'DELETE_PROFILE',
  index,
});

export const setActiveProfile = name => ({
  type: 'SET_ACTIVE_PROFILE',
  name,
});
