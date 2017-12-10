import React from 'react';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import Button from './Button';
import { deleteProfile, setActiveProfile } from '../actions';

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
    if (this.props.profiles.length === 0) {
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
      data={props.profiles}
      extraData={props.activeProfile}
      keyExtractor={item => item.name}
      renderItem={({ item, index }) => {
        console.log('index', item, index);
        const isActive = item.name === props.activeProfile;
        return (
          <View>
            <Text style={styles.text}>Profile: {item.name}</Text>
            <Text style={styles.text}>
                Status: {isActive ? 'Active' : 'Inactive'}
            </Text>
            <View style={styles.buttons}>
              <Button
                style={styles.profileButton}
                title="USE PROFILE"
                onPress={() => {
                  Alert.alert('Success!', `You are using ${item.name} profile now`);
                  props.setActiveProfile(item.name);
                }}
              />
              <Button
                style={styles.profileButton}
                title="REMOVE PROFILE"
                onPress={() => {
                  if (isActive) {
                    Alert.alert('Oops!', `Please change your active profile first before removing ${item.name}`);
                    return;
                  }
                  props.deleteProfile(index);
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

export default connect(
  mapStateToProps,
  { deleteProfile, setActiveProfile },
)(addLifecycle(MainScreen));
