import React from 'react';
import { Text, StyleSheet, SectionList } from 'react-native';
import proverbs from '../data/proverbs.json';

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginTop: 10,
  },
  header: {
    fontWeight: 'bold',
    backgroundColor: 'green',
    fontSize: 20,
    padding: 10,
  },
  item: {
    marginBottom: 10,
    fontSize: 15,
  },
});

const DuaList = () => (
  <SectionList
    style={styles.container}
    sections={proverbs}
    renderItem={({ item, index }) => <Text style={styles.item}>{`${index + 1}. ${item}`}</Text>}
    renderSectionHeader={({ section: { title } }) => <Text style={styles.header}>{title}</Text>}
    keyExtractor={(item) => item}
  />
);

export default DuaList;
