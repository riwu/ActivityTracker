import React from 'react';
import { Text, StyleSheet, SectionList, View } from 'react-native';
import proverbs from '../data/proverbs.json';

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 10,
  },
  itemContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  itemText: {
    fontSize: 15,
  },
  content: {
    flex: 1,
  },
  attribution: {
    textAlign: 'right',
    marginLeft: 10,
  },
});

const COLORS = [
  '#c3e17f',
  '#f6fccc',
  '#ffcc70',
  '#f0776c',
  '#da9dbe',
  '#c49bdd',
  '#6999e1',
  '#61c2e3',
];

const DuaList = () => (
  <SectionList
    sections={proverbs.map((proverb, index) => ({ ...proverb, index }))}
    renderItem={({ item, index }) => (
      <View style={styles.itemContainer}>
        <Text style={[styles.itemText, styles.content]}>
          {`${index + 1}. ${typeof item === 'string' ? item : item.content}`}
        </Text>
        {typeof item !== 'string' && (
          <Text style={[styles.itemText, styles.attribution]}>{item.attribution}</Text>
        )}
      </View>
    )}
    renderSectionHeader={({ section }) => (
      <Text style={[styles.header, { backgroundColor: COLORS[section.index % COLORS.length] }]}>
        {section.title}
      </Text>
    )}
    keyExtractor={(item) => (typeof item === 'string' ? item : item.content)}
  />
);

export default DuaList;
