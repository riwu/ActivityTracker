import { combineReducers } from 'redux';
import navigation from './navigation';
import profile from './profile';

const isFontLoaded = (state = false, action) => {
  if (action.type !== 'FONT_LOADED') return state;
  return true;
};

const reducer = combineReducers({
  navigation,
  isFontLoaded,
  profile,
});

export default reducer;
