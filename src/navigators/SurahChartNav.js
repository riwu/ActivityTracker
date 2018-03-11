import React from 'react';
import { StackNavigator } from 'react-navigation';
import Chart from '../components/Chart';
import CONSTANTS from '../Constants';
import NavigationOptions from './NavigationOptions';
import SurahChartImg from '../../Images/Surah/main.jpg';
import Day from '../components/Day';

const SurahChartNav = StackNavigator({
  MainSurahChart: {
    screen: (props) => (
      <Chart
        images={CONSTANTS.SURAH_CHART_IMAGES}
        mainImage={SurahChartImg}
        navPath="SurahDay"
        {...props}
      />
    ),
    navigationOptions: ({ navigation }) => NavigationOptions(navigation, CONSTANTS.SURAH_CHART),
  },
  SurahDay: {
    screen: (props) => <Day images={CONSTANTS.SURAH_CHART_IMAGES} {...props} />,
    navigationOptions: ({ navigation }) =>
      NavigationOptions(navigation, `Day ${navigation.state.params.day}`, false),
  },
});

export default SurahChartNav;
