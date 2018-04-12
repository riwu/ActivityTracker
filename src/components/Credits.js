import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  label: {
    fontSize: 20,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  link: {
    textDecorationLine: 'underline',
    marginRight: 2,
    fontSize: 20,
  },
  top: {
    marginBottom: 50,
  },
});

const Credits = () => (
  <View style={styles.container}>
    <Text style={styles.label}>App is developed by:</Text>
    <TouchableOpacity
      style={[styles.linkContainer, styles.top]}
      onPress={() => Linking.openURL('https://wangriwu.com/Contact')}
    >
      <Text style={styles.link}>Wang Riwu</Text>
      <Feather name="external-link" />
    </TouchableOpacity>

    <Text style={styles.label}>Services and concept provided by:</Text>
    <TouchableOpacity
      style={styles.linkContainer}
      onPress={() => Linking.openURL('mailto:wfervin@gmail.com')}
    >
      <Text style={styles.link}>Wahidah Fervin</Text>
      <MaterialCommunityIcons name="email-outline" />
    </TouchableOpacity>
  </View>
);

export default Credits;
