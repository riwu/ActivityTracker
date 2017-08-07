import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

import AppNavigator from '../navigators/Drawer';

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('Profiles');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const initialNavState = AppNavigator.router.getStateForAction(
  firstAction,
  tempNavState,
);

function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case 'Profiles':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Profiles' }),
        state,
      );
      break;
    case 'My Fasting Chart':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'My Fasting Chart' }),
        state,
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}


const AppReducer = combineReducers({
  nav,
});

export default AppReducer;
