import { StackNavigator } from 'react-navigation';
import Day from '../components/Day';
import FastingChart from '../containers/FastingChartContainer';
import Constants from '../Constants';
import NavigationOptions from './NavigationOptions';

const FastingChartNav = StackNavigator({
  MainFastingChart: {
    screen: FastingChart,
    navigationOptions: ({ navigation }) => NavigationOptions(navigation,
      Constants.FASTING_CHART),
  },
  FastingDay: {
    screen: Day,
    navigationOptions: ({ navigation }) => NavigationOptions(navigation,
      `Day ${navigation.state.params.day}`, false),
  },
});

export default FastingChartNav;
