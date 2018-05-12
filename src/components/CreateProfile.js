import React from 'react';
import { connect } from 'react-redux';
import { ImagePicker, FileSystem } from 'expo';
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
    setName: () => (name) => ({
      name,
    }),
    setPhoto: () => (photo) => ({
      photo,
    }),
  },
);

class CreateProfile extends React.Component {
  setPhoto(action, options) {
    return ImagePicker[action]({
      ...options,
      allowsEditing: true,
      base64: true,
    }).then((result) => {
      console.log('data', { ...result, base64: result.base64.slice(0, 10) });
      if (!result.cancelled) {
        this.props.setPhoto({ uri: `data:image/png;base64,${result.base64}` });
        FileSystem.deleteAsync(result.uri);
      }
    });
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
            props.navigation.goBack();
          }}
        />
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => ({
  profiles: state.profile.profiles,
});

export default connect(mapStateToProps, { createProfile })(addState(CreateProfile));
