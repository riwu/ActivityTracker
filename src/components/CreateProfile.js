import React from 'react';
import { connect } from 'react-redux';
import { View, TextInput, StyleSheet } from 'react-native';
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
    margin: 20,
    padding: 10,
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

const CreateProfile = (props) => {
  console.log('props', props);
  return (
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
          props.createProfile(props.name);
          props.navigation.navigate('AllProfiles');
        }}
      />
    </View>
  );
};

export default connect(null, { createProfile })(addState(CreateProfile));
