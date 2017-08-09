import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import AppNavigator from '../navigators/Drawer';
import CONSTANTS from '../CONSTANTS';

const firstAction = AppNavigator.router.getActionForPathAndParams(CONSTANTS.FASTING_CHART);
const initialNavState = AppNavigator.router.getStateForAction(firstAction);
function nav(state = initialNavState, action) {
  let nextState;
  if (CONSTANTS.DRAWER_ORDER.includes(action.type)) {
    nextState = AppNavigator.router.getStateForAction(
      NavigationActions.navigate({ routeName: action.type }),
      state,
    );
  } else {
    nextState = AppNavigator.router.getStateForAction(action, state);
  }

  return nextState || state;
}


const AppReducer = combineReducers({
  nav,
});

export default AppReducer;
