import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    padding: 10,
    backgroundColor: '#ececec',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 35,
    height: 35,
    marginLeft: 15,
    marginRight: 25,
  },
  profileText: {
    fontSize: 20,
  },
});

const ContentComponent = ({ activeProfile, photo, ...props }) => (
  <View style={styles.container}>
    <ScrollView alwaysBounceVertical={false}>
      <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }} style={styles.drawer}>
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
    <View style={styles.profile}>
      <Image source={photo} style={styles.image} />
      <Text style={styles.profileText}>{activeProfile}</Text>
    </View>
  </View>
);

export default connect((state) => ({
  activeProfile: state.profile.activeProfile,
  photo: state.profile.profiles[state.profile.activeProfile].photo,
}))(ContentComponent);
