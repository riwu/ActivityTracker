import { StackNavigator } from 'react-navigation';
import PrayerTimes from '../components/PrayerTimes';
import Constants from '../Constants';
import NavigationOptions from './NavigationOptions';

const PrayerTimesNav = StackNavigator({
  PrayerTimes: {
    screen: PrayerTimes,
    navigationOptions: ({ navigation }) => NavigationOptions(navigation,
      Constants.PRAYER_TIMES),
  },
});

export default PrayerTimesNav;
