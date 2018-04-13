import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const BackupAndRecovery = (props) => (
  <View style={styles.container}>
    <Text>Backup is not yet available</Text>
  </View>
);

export default BackupAndRecovery;
