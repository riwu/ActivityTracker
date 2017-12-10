const initialState = {
  profiles: [],
  activeProfile: null,
};
const profile = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_PROFILE':
      return {
        ...state,
        profiles: [
          ...(state.profiles || []),
          {
            name: action.name,
          },
        ],
        activeProfile: state.activeProfile || action.name,
      };
    case 'DELETE_PROFILE': {
      const profiles = state.profiles.slice();
      profiles.splice(action.index, 1);
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
    default:
      return state;
  }
};

export default profile;
