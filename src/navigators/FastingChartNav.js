import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import IOSIcon from 'react-native-vector-icons/Ionicons';
import DetailScreen from '../components/detail';
import FastingChart from '../components/FastingChart';
import CONSTANTS from '../CONSTANTS';

const FastingChartNav = StackNavigator({
  Main: {
    screen: FastingChart,
    navigationOptions: ({ navigation }) => ({
      title: CONSTANTS.FASTING_CHART,
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
          <IOSIcon name="ios-menu" size={30} />
        </TouchableOpacity>
            ),
      headerStyle: { paddingRight: 10, paddingLeft: 10 },
    }),
  },
  Detail: {
    screen: DetailScreen,
    navigationOptions: props => ({
      title: 'Day 1',
    }),
  },
});

export default FastingChartNav;
