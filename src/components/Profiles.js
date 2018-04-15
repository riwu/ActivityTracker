import React from 'react';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import { View, Text, StyleSheet, FlatList, Alert, Image } from 'react-native';
import Button from '../components/Button';
import { deleteProfile, setActiveProfile } from '../actions';
import commonStyles from './styles';

const MARGIN = 10;

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: '#505050',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  createButtonContainer: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    marginTop: MARGIN,
    marginBottom: MARGIN,
    paddingBottom: MARGIN,
  },
  createButton: {
    backgroundColor: '#ee7771',
  },
  profileButton: {
    backgroundColor: '#fcce78',
  },
  listItem: {
    paddingBottom: MARGIN,
  },
  separator: {
    height: 1,
    backgroundColor: 'lightgrey',
    marginBottom: MARGIN,
  },
});

const addLifecycle = lifecycle({
  componentWillMount() {
    if (this.props.activeProfile === '') {
      this.props.navigation.navigate('CreateProfile');
    }
  },
});

const MainScreen = (props) => (
  <FlatList
    ListHeaderComponent={
      <View style={styles.createButtonContainer}>
        <Button
          style={styles.createButton}
          onPress={() => props.navigation.navigate('CreateProfile')}
          title="CREATE NEW PROFILE"
        />
      </View>
    }
    data={Object.entries(props.profiles)}
    extraData={props.activeProfile}
    keyExtractor={([name]) => name}
    ItemSeparatorComponent={() => <View style={styles.separator} />}
    renderItem={({ item: [name, obj] }) => {
      const isActive = name === props.activeProfile;
      return (
        <View style={styles.listItem}>
          <Image style={commonStyles.photo} source={obj.photo} />
          <Text style={[styles.text, { marginTop: 10 }]}>Profile: {name}</Text>
          <Text style={styles.text}>Status: {isActive ? 'Active' : 'Inactive'}</Text>
          <View style={styles.buttons}>
            <View style={{ flex: 1 }}>
              <Button
                title="USE PROFILE"
                style={styles.profileButton}
                onPress={() => {
                  Alert.alert('Success!', `You are using ${name} profile now`);
                  props.setActiveProfile(name);
                }}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Button
                title="REMOVE PROFILE"
                style={styles.profileButton}
                onPress={() => {
                  if (isActive) {
                    Alert.alert(
                      'Oops!',
                      `Please change your active profile first before removing ${name}`,
                    );
                    return;
                  }
                  Alert.alert(`Remove ${name}`, `Are you sure you want to remove ${name}?`, [
                    { text: 'Cancel', style: 'cancel' },
                    {
                      text: 'OK',
                      style: 'destructive',
                      onPress: () => {
                        props.deleteProfile(name);
                        Alert.alert('Success!', `${name} profile removed`);
                      },
                    },
                  ]);
                }}
              />
            </View>
          </View>
        </View>
      );
    }}
  />
);

const mapStateToProps = (state) => ({
  profiles: state.profile.profiles,
  activeProfile: state.profile.activeProfile,
});

export default connect(mapStateToProps, { deleteProfile, setActiveProfile })(addLifecycle(MainScreen));
