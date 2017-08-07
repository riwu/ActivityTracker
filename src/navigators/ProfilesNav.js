import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import IOSIcon from 'react-native-vector-icons/Ionicons';
import DetailScreen from '../components/detail';
import MainScreen from '../components/main';
import CONSTANTS from '../CONSTANTS';

const ProfilesNav = StackNavigator({
  Main: {
    screen: MainScreen,
    navigationOptions: ({ navigation }) => ({
      title: CONSTANTS.PROFILES,
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
      title: 'Detail',
    }),
  },
});

export default ProfilesNav;
