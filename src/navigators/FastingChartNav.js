import { StackNavigator } from 'react-navigation';
import FastingDay from '../containers/FastingDayContainer';
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
    screen: FastingDay,
    navigationOptions: ({ navigation }) => NavigationOptions(navigation,
      `Day ${navigation.state.params.day}`, false),
  },
});

export default FastingChartNav;
