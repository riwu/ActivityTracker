import { StackNavigator } from 'react-navigation';
import CreateProfile from '../components/CreateProfile';
import Profiles from '../components/Profiles';
import CONSTANTS from '../Constants';
import NavigationOptions from './NavigationOptions';

const ProfilesNav = StackNavigator({
  AllProfiles: {
    screen: Profiles,
    navigationOptions: ({ navigation }) => NavigationOptions(navigation, CONSTANTS.PROFILES),
  },
  CreateProfile: {
    screen: CreateProfile,
    navigationOptions: ({ navigation }) => NavigationOptions(navigation, 'Create Profile'),
  },
});

export default ProfilesNav;
