import { StackNavigator } from 'react-navigation';
import TarawihDay from '../containers/TarawihDayContainer';
import TarawihChart from '../containers/TarawihChartContainer';
import CONSTANTS from '../Constants';
import NavigationOptions from './NavigationOptions';

const TarawihChartNav = StackNavigator({
  MainTarawihChart: {
    screen: TarawihChart,
    navigationOptions: ({ navigation }) => NavigationOptions(navigation, CONSTANTS.TARAWIH_CHART),
  },
  TarawihDay: {
    screen: TarawihDay,
    navigationOptions: ({ navigation }) => NavigationOptions(navigation,
      `Day ${navigation.state.params.day}`, false),
  },
});

export default TarawihChartNav;
