import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import IOSIcon from 'react-native-vector-icons/Ionicons';
import FastingDay from '../components/FastingDay';
import TarawihChart from '../components/TarawihChart';
import CONSTANTS from '../CONSTANTS';

const FastingChartNav = StackNavigator({
  Main: {
    screen: TarawihChart,
    navigationOptions: ({ navigation }) => ({
      title: CONSTANTS.TARAWIH_CHART,
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
