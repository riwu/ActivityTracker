import { StackNavigator } from 'react-navigation';
import BackupAndRecovery from '../components/BackupAndRecovery';
import Constants from '../constants';
import NavigationOptions from './NavigationOptions';

const BackupAndRecoveryNav = StackNavigator({
  BackupAndRecovery: {
    screen: BackupAndRecovery,
    navigationOptions: ({ navigation }) => NavigationOptions(navigation,
      Constants.BACKUP_AND_RECOVERY),
  },
});

export default BackupAndRecoveryNav;
