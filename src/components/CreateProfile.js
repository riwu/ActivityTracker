import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

class CreateProfile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button title="CREATE!" onPress={() => {}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreateProfile;
