import { combineReducers } from 'redux';
import navigation from './navigation';
import fastingChart from './fastingChart';

const isFontLoaded = (state = false, action) => {
  if (action.type !== 'FONT_LOADED') return state;
  return true;
};

const reducer = combineReducers({
  navigation,
  isFontLoaded,
  fastingChart,
});

export default reducer;
