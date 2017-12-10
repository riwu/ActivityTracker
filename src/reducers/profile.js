const initialState = {
  profiles: [],
  activeIndex: 0,
};
const profiles = (state = initialState, action) => {
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
      };
    default:
      return state;
  }
};

export default profiles;
