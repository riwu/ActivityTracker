import { combineReducers } from 'redux';
import { FONT_LOADED } from '../ActionTypes';
import navigation from './navigation';

const isFontLoaded = (state = false, action) => {
  if (action.type !== FONT_LOADED) return state;
  return true;
};

const reducer = combineReducers({
  navigation,
  isFontLoaded,
});

export default reducer;
