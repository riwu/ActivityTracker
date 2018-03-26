import React from 'react';
import { StackNavigator } from 'react-navigation';
import Chart from '../components/Chart';
import CONSTANTS from '../constants';
import NavigationOptions from './NavigationOptions';
import SurahChartImg from '../../assets/Surah/main.jpg';
import Day from '../components/Day';

const SurahChartNav = StackNavigator({
  MainSurahChart: {
    screen: Chart,
    navigationOptions: ({ navigation }) => NavigationOptions(navigation, CONSTANTS.SURAH_CHART),
  },
  SurahDay: {
    screen: (props) => <Day images={CONSTANTS.SURAH_CHART_IMAGES} {...props} />,
    navigationOptions: ({ navigation }) =>
      NavigationOptions(navigation, `Day ${navigation.state.params.day}`, false),
  },
});

export default () => (
  <SurahChartNav
    screenProps={{
      images: CONSTANTS.SURAH_CHART_IMAGES,
      mainImage: SurahChartImg,
      navPath: 'SurahDay',
    }}
  />
);
