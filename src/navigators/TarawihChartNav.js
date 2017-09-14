import { StackNavigator } from 'react-navigation';
import Day from '../components/Day';
import TarawihChart from '../containers/TarawihChartContainer';
import CONSTANTS from '../Constants';
import NavigationOptions from './NavigationOptions';

const FastingChartNav = StackNavigator({
  Main: {
    screen: TarawihChart,
    navigationOptions: ({ navigation }) => NavigationOptions(navigation, CONSTANTS.TARAWIH_CHART),
  },
  Detail: {
    screen: Day,
    navigationOptions: () => ({
      title: 'Day 1',
    }),
  },
});

export default FastingChartNav;
