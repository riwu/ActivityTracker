import { combineReducers } from 'redux';
import navigation from './navigation';
import chart from './chart';
import profile from './profile';

const isFontLoaded = (state = false, action) => {
  if (action.type !== 'FONT_LOADED') return state;
  return true;
};

const reducer = combineReducers({
  navigation,
  isFontLoaded,
  chart,
  profile,
});

export default reducer;
