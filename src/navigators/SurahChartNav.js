import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import IOSIcon from 'react-native-vector-icons/Ionicons';
import FastingDay from '../components/FastingDay';
import SurahChart from '../components/SurahChart';
import CONSTANTS from '../CONSTANTS';

const FastingChartNav = StackNavigator({
  Main: {
    screen: SurahChart,
    navigationOptions: ({ navigation }) => ({
      title: CONSTANTS.SURAH_CHART,
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
          <IOSIcon name="ios-menu" size={30} />
        </TouchableOpacity>
            ),
      headerStyle: { paddingRight: 10, paddingLeft: 10 },
    }),
  },
  Detail: {
    screen: FastingDay,
    navigationOptions: props => ({
      title: 'Day 1',
    }),
  },
});

export default FastingChartNav;
