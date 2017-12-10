import React from 'react';
import { connect } from 'react-redux';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { withStateHandlers } from 'recompose';
import { createProfile } from '../actions';
import Button from './Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#ff8080',
  },
  input: {
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    color: 'white',
  },
});

const addState = withStateHandlers(
  () => ({
    name: '',
  }),
  {
    setName: () => name => ({
      name,
    }),
  },
);

const CreateProfile = props => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="What's your name"
      autoFocus
      onChangeText={(name) => {
          props.setName(name);
        }}
    />
    <Button
      style={styles.button}
      title="CREATE!"
      disabled={props.name.trim() === ''}
      onPress={() => {
        const name = props.name.trim();
        if (props.profiles[name]) {
          Alert.alert('Oops!', 'That name is already taken, please use a different name');
          return;
        }
        props.createProfile(name);
        props.navigation.navigate('AllProfiles');
      }}
    />
  </View>
);

const mapStateToProps = state => ({
  profiles: state.profile.profiles,
});

export default connect(mapStateToProps, { createProfile })(addState(CreateProfile));
