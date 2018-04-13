import React from 'react';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import { View, Text, StyleSheet, FlatList, Alert, Image } from 'react-native';
import Button from '../components/Button';
import { deleteProfile, setActiveProfile } from '../actions';
import commonStyles from './styles';

const MARGIN = 10;

const styles = StyleSheet.create({
  container: {
    margin: MARGIN,
  },
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
    marginBottom: MARGIN,
    paddingBottom: MARGIN,
  },
  createButton: {
    backgroundColor: '#f08e83',
  },
  profileButton: {
    backgroundColor: '#fdd58f',
  },
  separator: {
    height: 1,
    backgroundColor: 'lightgrey',
    marginTop: MARGIN,
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
    style={styles.container}
    ListHeaderComponent={
      <View style={styles.createButtonContainer}>
        <Button
          style={styles.createButton}
          onPress={() => props.navigation.navigate('CreateProfile')}
          title="CREATE PROFILE"
        />
      </View>
    }
    data={Object.entries(props.profiles)}
    extraData={props.activeProfile}
    keyExtractor={([name]) => name}
    ItemSeparatorComponent={() => <View style={styles.separator} />}
    renderItem={({ item: [name, obj] }) => {
      console.log('index', name, obj);
      const isActive = name === props.activeProfile;
      return (
        <View>
          <Image style={commonStyles.photo} source={obj.photo} />
          <Text style={[styles.text, { marginTop: 10 }]}>Profile: {name}</Text>
          <Text style={styles.text}>Status: {isActive ? 'Active' : 'Inactive'}</Text>
          <View style={styles.buttons}>
            <Button
              title="USE PROFILE"
              style={styles.profileButton}
              onPress={() => {
                Alert.alert('Success!', `You are using ${name} profile now`);
                props.setActiveProfile(name);
              }}
            />
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
                props.deleteProfile(name);
              }}
            />
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
