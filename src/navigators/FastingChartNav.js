import { StackNavigator } from 'react-navigation';
import FastingDay from '../components/FastingDay';
import FastingChart from '../containers/FastingChartContainer';
import CONSTANTS from '../Constants';
import NavigationOptions from './NavigationOptions';

const FastingChartNav = StackNavigator({
  MainFastingChart: {
    screen: FastingChart,
    navigationOptions: ({ navigation }) => NavigationOptions(navigation,
      CONSTANTS.FASTING_CHART),
  },
  FastingDay: {
    screen: FastingDay,
    navigationOptions: ({ navigation }) => NavigationOptions(navigation,
      `Day ${navigation.state.params.day}`, false),
  },
});

export default FastingChartNav;
