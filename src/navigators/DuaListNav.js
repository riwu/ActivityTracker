import { StackNavigator } from 'react-navigation';
import DuaList from '../components/DuaList';
import Constants from '../Constants';
import NavigationOptions from './NavigationOptions';

const DuaListNav = StackNavigator({
  Dualist: {
    screen: DuaList,
    navigationOptions: ({ navigation }) => NavigationOptions(navigation,
      Constants.DU_A_LIST),
  },
});

export default DuaListNav;
