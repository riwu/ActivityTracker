import { StackNavigator } from 'react-navigation';
import DashBoard from '../components/DashBoard';
import Constants from '../constants';
import NavigationOptions from './NavigationOptions';

const DashBoardNav = StackNavigator({
  DashBoard: {
    screen: DashBoard,
    navigationOptions: ({ navigation }) => NavigationOptions(navigation,
      Constants.DASH_BOARD),
  },
});

export default DashBoardNav;
