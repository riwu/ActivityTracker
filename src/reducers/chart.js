const getState = length => Array(...{ length }).map(Number.call, Number)
  .reduce((obj, i) => ({
    ...obj,
    [i]: {
      main: i + 1,
    },
  }), {});

const initialState = {
  fasting: getState(30),
  tarawih: getState(30),
  surah: getState(38),
};

const chart = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_FASTING_CHART':
      return {
        ...state,
        fasting: action.data,
      };
    case 'UPDATE_TARAWIH_CHART':
      return {
        ...state,
        tarawih: action.data,
      };
    case 'UPDATE_SURAH_CHART':
      return {
        ...state,
        surah: action.data,
      };
    default:
      return state;
  }
};

export default chart;
