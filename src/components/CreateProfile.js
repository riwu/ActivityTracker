import React from 'react';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';
import { View, TextInput, StyleSheet, Alert, Image, Text } from 'react-native';
import { withStateHandlers } from 'recompose';
import { createProfile } from '../actions';
import Button from './Button';
import commonStyles from './styles';
import defaultPhoto from '../../Images/photo.jpg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  photoButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  pickButton: {
    backgroundColor: 'lightblue',
  },
  orText: {
    fontSize: 20,
  },
  button: {
    backgroundColor: '#ff8080',
  },
  input: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 25,
  },
  text: {
    textAlign: 'center',
    color: 'white',
  },
});

const addState = withStateHandlers(
  () => ({
    name: '',
    photo: defaultPhoto,
  }),
  {
    setName: () => (name) => ({
      name,
    }),
    setPhoto: () => (photo) => ({
      photo,
    }),
  },
);

const CreateProfile = (props) => (
  <View style={styles.container}>
    <Image style={commonStyles.photo} source={props.photo} />
    <View style={styles.photoButtons}>
      <Button
        title="Select a photo"
        style={styles.pickButton}
        onPress={() =>
          ImagePicker.launchImageLibraryAsync({
            mediaType: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
          }).then((result) => {
            console.log('data', result);
            if (!result.cancelled) {
              props.setPhoto({ uri: result.uri });
            }
          })
        }
      />
      <Text style={styles.orText}>OR</Text>
      <Button
        title="Take a picture"
        style={styles.pickButton}
        onPress={() =>
          ImagePicker.launchCameraAsync({
            allowsEditing: true,
          }).then((result) => {
            console.log('data', result);
            if (!result.cancelled) {
              props.setPhoto({ uri: result.uri });
            }
          })
        }
      />
    </View>
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
          Alert.alert(
            'Oops!',
            'That name is already taken, please use a different name',
          );
          return;
        }
        props.createProfile(name, props.photo);
        props.navigation.navigate('AllProfiles');
      }}
    />
  </View>
);

const mapStateToProps = (state) => ({
  profiles: state.profile.profiles,
});

export default connect(mapStateToProps, { createProfile })(
  addState(CreateProfile),
);
