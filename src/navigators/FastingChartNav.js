import React from 'react';
import { StackNavigator } from 'react-navigation';
import Chart from '../components/Chart';
import CONSTANTS from '../constants';
import NavigationOptions from './NavigationOptions';
import FastingChartImg from '../../Images/Fasting/main.jpg';
import Day from '../components/Day';

const FastingChartNav = StackNavigator({
  MainFastingChart: {
    screen: Chart,
    navigationOptions: ({ navigation }) => NavigationOptions(navigation, CONSTANTS.FASTING_CHART),
  },
  FastingDay: {
    screen: (props) => <Day images={CONSTANTS.FASTING_CHART_IMAGES} {...props} />,
    navigationOptions: ({ navigation }) =>
      NavigationOptions(navigation, `Day ${navigation.state.params.day}`, false),
  },
});

export default () => (
  <FastingChartNav
    screenProps={{
      images: CONSTANTS.FASTING_CHART_IMAGES,
      mainImage: FastingChartImg,
      navPath: 'FastingDay',
    }}
  />
);
