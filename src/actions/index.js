export const fontLoaded = () => ({
  type: 'FONT_LOADED',
});

export const navigateBack = () => ({
  type: 'NAVIGATE_BACK',
});

export const updateChart = data => ({
  type: 'UPDATE_CHART',
  ...data,
});

export const createProfile = (name, photo) => ({
  type: 'CREATE_PROFILE',
  name,
  photo,
});

export const deleteProfile = name => ({
  type: 'DELETE_PROFILE',
  name,
});

export const setActiveProfile = name => ({
  type: 'SET_ACTIVE_PROFILE',
  name,
});
