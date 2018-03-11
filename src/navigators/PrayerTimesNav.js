import { StackNavigator } from 'react-navigation';
import PrayerTimes from '../components/PrayerTimes';
import CONSTANTS from '../constants';
import NavigationOptions from './NavigationOptions';

const PrayerTimesNav = StackNavigator({
  PrayerTimes: {
    screen: PrayerTimes,
    navigationOptions: ({ navigation }) => NavigationOptions(navigation, CONSTANTS.PRAYER_TIMES),
  },
});

export default PrayerTimesNav;
