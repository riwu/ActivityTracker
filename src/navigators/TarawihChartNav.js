import { StackNavigator } from 'react-navigation';
import FastingDay from '../components/FastingDay';
import TarawihChart from '../components/TarawihChart';
import CONSTANTS from '../Constants';
import NavigationOptions from './NavigationOptions';

const FastingChartNav = StackNavigator({
  Main: {
    screen: TarawihChart,
    navigationOptions: ({ navigation }) => NavigationOptions(navigation, CONSTANTS.TARAWIH_CHART),
  },
  Detail: {
    screen: FastingDay,
    navigationOptions: props => ({
      title: 'Day 1',
    }),
  },
});

export default FastingChartNav;
