import React from 'react';
import { StackNavigator } from 'react-navigation';
import Chart from '../components/Chart';
import CONSTANTS from '../constants';
import NavigationOptions from './NavigationOptions';
import TarawihChartImg from '../../Images/Tarawih/main.jpg';
import Day from '../components/Day';

const TarawihChartNav = StackNavigator({
  MainTarawihChart: {
    screen: (props) => (
      <Chart
        images={CONSTANTS.TARAWIH_CHART_IMAGES}
        mainImage={TarawihChartImg}
        navPath="TarawihDay"
        {...props}
      />
    ),
    navigationOptions: ({ navigation }) => NavigationOptions(navigation, CONSTANTS.TARAWIH_CHART),
  },
  TarawihDay: {
    screen: (props) => <Day images={CONSTANTS.TARAWIH_CHART_IMAGES} {...props} />,
    navigationOptions: ({ navigation }) =>
      NavigationOptions(navigation, `Day ${navigation.state.params.day}`, false),
  },
});

export default TarawihChartNav;
