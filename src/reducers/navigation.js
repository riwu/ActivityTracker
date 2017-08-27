import { NavigationActions } from 'react-navigation';
import CONSTANTS from '../Constants';
import { NAVIGATE_BACK } from '../ActionTypes';
import AppNavigator from '../navigators/Drawer';

const firstAction = AppNavigator.router.getActionForPathAndParams(CONSTANTS.FASTING_CHART);
const initialNavState = AppNavigator.router.getStateForAction(firstAction);

const navigation = (state = initialNavState, action) => {
  let nextState;
  if (action.type === NAVIGATE_BACK) {
    nextState = AppNavigator.router.getStateForAction(
      NavigationActions.back(),
      state,
    );
  } else if (CONSTANTS.DRAWER_ORDER.includes(action.type)) {
    nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: action.type }),
        state,
      );
  } else {
    nextState = AppNavigator.router.getStateForAction(action, state);
  }

  return nextState || state;
};

export default navigation;
