const getState = (length) =>
  Array(...{ length })
    .map(Number.call, Number)
    .reduce((acc, i) => {
      acc[i] = { main: i + 1 };
      return acc;
    }, {});

const initialProfileState = {
  FastingDay: getState(31),
  TarawihDay: getState(31),
  SurahDay: getState(31),
};

const initialState = {
  activeProfile: '',
  profiles: {
    '': initialProfileState,
  },
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case 'RESTORE_PROFILES': {
      const arr = Object.entries(action.data);
      return {
        activeProfile: arr[0][0],
        profiles: arr.reduce((acc, [name, data]) => {
          acc[name] = {
            ...initialProfileState,
            ...data,
          };
          return acc;
        }, {}),
      };
    }
    case 'CREATE_PROFILE': {
      if (state.activeProfile === '') {
        // replace with default user
        return {
          activeProfile: action.name,
          profiles: {
            [action.name]: {
              ...state.profiles[''],
              photo: action.photo,
            },
          },
        };
      }
      return {
        ...state,
        profiles: {
          ...state.profiles,
          [action.name]: {
            ...initialProfileState,
            photo: action.photo,
          },
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
    case 'RESET_CHART':
      return {
        ...state,
        profiles: {
          ...state.profiles,
          [state.activeProfile]: {
            ...state.profiles[state.activeProfile],
            [action.chart]: initialProfileState[action.chart],
          },
        },
      };
    default:
      return state;
  }
};

export default profile;
