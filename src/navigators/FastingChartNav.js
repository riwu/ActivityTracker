import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import IOSIcon from 'react-native-vector-icons/Ionicons';
import FastingDay from '../components/FastingDay';
import FastingChart from '../components/FastingChart';
import CONSTANTS from '../CONSTANTS';

const FastingChartNav = StackNavigator({
  MainFastingChart: {
    screen: FastingChart,
    navigationOptions: ({ navigation }) => ({
      title: CONSTANTS.FASTING_CHART,
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
          <IOSIcon name="ios-menu" size={30} />
        </TouchableOpacity>
            ),
      headerStyle: { paddingRight: 10, paddingLeft: 10, marginTop: 24 },
    }),
  },
  FastingDay: {
    screen: FastingDay,
    navigationOptions: ({ navigation }) => ({
      title: `Day ${navigation.state.params.day}`,
      headerStyle: { paddingRight: 10, paddingLeft: 10, marginTop: 24 },
    }),
  },
});

export default FastingChartNav;
