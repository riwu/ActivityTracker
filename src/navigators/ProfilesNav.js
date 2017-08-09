import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import IOSIcon from 'react-native-vector-icons/Ionicons';
import CreateProfile from '../components/CreateProfile';
import Profiles from '../components/Profiles';
import CONSTANTS from '../CONSTANTS';

const ProfilesNav = StackNavigator({
  AllProfiles: {
    screen: Profiles,
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
  CreateProfile: {
    screen: CreateProfile,
    navigationOptions: props => ({
      title: 'Create Profile',
    }),
  },
});

export default ProfilesNav;
