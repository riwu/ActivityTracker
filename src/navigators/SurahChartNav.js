import { StackNavigator } from 'react-navigation';
import Day from '../components/Day';
import SurahChart from '../containers/SurahChartContainer';
import CONSTANTS from '../Constants';
import NavigationOptions from './NavigationOptions';

const SurahChartNav = StackNavigator({
  MainSurahChart: {
    screen: SurahChart,
    navigationOptions: ({ navigation }) => NavigationOptions(navigation, CONSTANTS.SURAH_CHART),
  },
  SurahDay: {
    screen: Day,
    navigationOptions: ({ navigation }) => NavigationOptions(navigation,
      null, false),
  },
});

export default SurahChartNav;
