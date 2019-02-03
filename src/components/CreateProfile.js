import React from 'react';
import { connect } from 'react-redux';
import { ImagePicker, FileSystem, Permissions } from 'expo';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import { withStateHandlers } from 'recompose';
import { createProfile } from '../actions';
import Button from './Button';
import commonStyles from './styles';
import defaultPhoto from '../../assets/photo.jpg';
import constants from '../constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  photoButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  pickButton: {
    backgroundColor: 'lightblue',
  },
  orText: {
    fontSize: 20,
  },
  button: {
    backgroundColor: '#ee7771',
  },
  input: {
    textAlign: 'center',
    marginVertical: 20,
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
    setName: () => name => ({
      name,
    }),
    setPhoto: () => photo => ({
      photo,
    }),
  },
);

class CreateProfile extends React.Component {
  async setPhoto(action, options) {
    const isImagePicker = action === 'launchImageLibraryAsync';
    const permissions = [Permissions.CAMERA_ROLL].concat(isImagePicker ? [] : Permissions.CAMERA);
    const res = await Permissions.askAsync(...permissions);

    if (res.status !== 'granted') {
      Alert.alert(
        `${
          res.permissions.cameraRoll.status === 'granted' ? 'Camera' : 'Storage'
        } permission not granted`,
        'Please enable it in App settings',
      );
      return;
    }

    ImagePicker[action]({
      ...options,
      allowsEditing: true,
      base64: true,
    })
      .then((result) => {
        if (!result.cancelled) {
          this.props.setPhoto({ uri: `data:image/png;base64,${result.base64}` });
          FileSystem.deleteAsync(result.uri);
        }
      })
      .catch(e =>
        Alert.alert(`Failed to launch ${isImagePicker ? 'image picker' : 'camera'}`, e.message));
  }

  render() {
    const { props } = this;
    return (
      <KeyboardAvoidingView
        behavior="position"
        style={styles.container}
        keyboardVerticalOffset={constants.NAV_BAR_HEIGHT}
      >
        <Image style={commonStyles.photo} source={props.photo} />
        <View style={styles.photoButtons}>
          <Button
            title="Select a photo"
            style={styles.pickButton}
            onPress={() =>
              this.setPhoto('launchImageLibraryAsync', {
                mediaType: ImagePicker.MediaTypeOptions.Images,
              })
            }
          />
          <Text style={styles.orText}>OR</Text>
          <Button
            title="Take a picture"
            style={styles.pickButton}
            onPress={() => this.setPhoto('launchCameraAsync')}
          />
        </View>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
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
            if (this.pressed) return;
            this.pressed = true;
            const name = props.name.trim();
            if (props.profiles[name]) {
              Alert.alert('Oops!', 'That name is already taken, please use a different name');
              this.pressed = false;
              return;
            }
            props.createProfile(name, props.photo);
            // multiple CreateProfile in stack if app reloaded, so `goBack` not sufficient
            props.navigation.navigate('AllProfiles');
          }}
        />
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  profiles: state.profile.profiles,
});

export default connect(
  mapStateToProps,
  { createProfile },
)(addState(CreateProfile));
