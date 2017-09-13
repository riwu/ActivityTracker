
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
