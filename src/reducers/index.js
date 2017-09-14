import { combineReducers } from 'redux';
import navigation from './navigation';
import chart from './chart';

const isFontLoaded = (state = false, action) => {
  if (action.type !== 'FONT_LOADED') return state;
  return true;
};

const reducer = combineReducers({
  navigation,
  isFontLoaded,
  chart,
});

export default reducer;
