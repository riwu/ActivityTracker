const getState = length => Array(...{ length }).map(Number.call, Number)
  .reduce((obj, i) => {
    obj[i] = { // eslint-disable-line no-param-reassign
      main: i + 1,
    };
    return obj;
  }, {});

const initialProfileState = {
  FastingDay: getState(30),
  SurahDay: getState(30),
  TarawihDay: getState(38),
};

const initialState = {
  activeProfile: '',
  profiles: {
    '': initialProfileState,
  },
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_PROFILE': {
      if (state.activeProfile === '') { // replace with default user
        return {
          activeProfile: action.name,
          profiles: {
            [action.name]: state.profiles[''],
          },
        };
      }
      return {
        ...state,
        profiles: {
          ...state.profiles,
          [action.name]: initialProfileState,
        },
      };
    }
    case 'DELETE_PROFILE': {
      const profiles = { ...state.profiles };
      delete profiles[action.name];
      return {
        ...state,
        profiles,
      };
    }
    case 'SET_ACTIVE_PROFILE':
      return {
        ...state,
        activeProfile: action.name,
      };
    case 'UPDATE_CHART': {
      const charts = state.profiles[state.activeProfile];
      const alteredChart = charts[action.chart];
      return {
        ...state,
        profiles: {
          ...state.profiles,
          [state.activeProfile]: {
            ...charts,
            [action.chart]: {
              ...alteredChart,
              [action.index]: {
                ...alteredChart[action.index],
                replace: action.replaceIndex,
              },
            },
          },
        },
      };
    }
    case 'UPDATE_SURAH_CHART':
      return {
        ...state,
        surah: action.data,
      };
    default:
      return state;
  }
};

export default profile;
