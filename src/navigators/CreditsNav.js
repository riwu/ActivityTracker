import { StackNavigator } from 'react-navigation';
import Credits from '../components/Credits';
import Constants from '../Constants';
import NavigationOptions from './NavigationOptions';

const CreditsNav = StackNavigator({
  Credits: {
    screen: Credits,
    navigationOptions: ({ navigation }) => NavigationOptions(navigation,
      Constants.CREDITS),
  },
});

export default CreditsNav;
