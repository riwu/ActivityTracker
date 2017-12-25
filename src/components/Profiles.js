import React from 'react';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import { View, Text, StyleSheet, FlatList, Alert, Image } from 'react-native';
import Button from './Button';
import { deleteProfile, setActiveProfile } from '../actions';
import commonStyles from './styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  createButton: {
    backgroundColor: '#ff8080',
  },
  profileButton: {
    backgroundColor: 'orange',
  },
});

const addLifecycle = lifecycle({
  componentWillMount() {
    if (this.props.activeProfile === '') {
      this.props.navigation.navigate('CreateProfile');
    }
  },
});

const MainScreen = props => (
  <View style={styles.container}>
    <Button
      style={styles.createButton}
      onPress={() => props.navigation.navigate('CreateProfile')}
      title="CREATE PROFILE"
    />
    <FlatList
      data={Object.entries(props.profiles)}
      extraData={props.activeProfile}
      keyExtractor={([name]) => name}
      renderItem={({ item: [name, obj] }) => {
        console.log('index', name, obj);
        const isActive = name === props.activeProfile;
        return (
          <View>
            <Image style={commonStyles.photo} source={obj.photo && { uri: obj.photo }} />
            <Text style={[styles.text, { marginTop: 10 }]}>Profile: {name}</Text>
            <Text style={styles.text}>Status: {isActive ? 'Active' : 'Inactive'}</Text>
            <View style={styles.buttons}>
              <Button
                style={styles.profileButton}
                title="USE PROFILE"
                onPress={() => {
                  Alert.alert('Success!', `You are using ${name} profile now`);
                  props.setActiveProfile(name);
                }}
              />
              <Button
                style={styles.profileButton}
                title="REMOVE PROFILE"
                onPress={() => {
                  if (isActive) {
                    Alert.alert(
                      'Oops!',
                      `Please change your active profile first before removing ${name}`,
                    );
                    return;
                  }
                  props.deleteProfile(name);
                }}
              />
            </View>
          </View>
        );
      }}
    />
  </View>
);

const mapStateToProps = state => ({
  profiles: state.profile.profiles,
  activeProfile: state.profile.activeProfile,
});

export default connect(mapStateToProps, { deleteProfile, setActiveProfile })(addLifecycle(MainScreen));
