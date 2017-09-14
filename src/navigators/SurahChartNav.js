import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import IOSIcon from 'react-native-vector-icons/Ionicons';
import Day from '../components/Day';
import SurahChart from '../components/SurahChart';
import CONSTANTS from '../Constants';
import NavigationOptions from './NavigationOptions';

const FastingChartNav = StackNavigator({
  Main: {
    screen: SurahChart,
    navigationOptions: ({ navigation }) => NavigationOptions(navigation, CONSTANTS.SURAH_CHART),
  },
  Detail: {
    screen: Day,
    navigationOptions: props => ({
      title: 'Day 1',
    }),
  },
});

export default FastingChartNav;
