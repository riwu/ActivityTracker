import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Share, FlatList, Alert } from 'react-native';
import { FileSystem, DocumentPicker } from 'expo';
import { withStateHandlers } from 'recompose';
import Button from './Button';
import CheckBox from './CheckBox';
import { restoreProfiles } from '../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 20,
  },
  buttonContainer: {
    flex: 1,
  },
  profile: {
    marginBottom: 18,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#fcce78',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    padding: 10,
    paddingLeft: 18,
  },
  childRow: {
    paddingLeft: 47,
  },
  text: {
    fontSize: 17,
  },
});

const CHARTS = [
  { label: 'Reading Chart', key: 'FastingDay' },
  { label: 'Speaking Chart', key: 'TarawihDay' },
  {
    label: 'Writing Chart',
    key: 'SurahDay',
  },
];

const addState = withStateHandlers(
  {
    uncheckedCharts: {},
  },
  {
    toggleChart: ({ uncheckedCharts }) => (name, chart) => ({
      uncheckedCharts: {
        ...uncheckedCharts,
        [name]: {
          ...uncheckedCharts[name],
          [chart]: !(uncheckedCharts[name] || {})[chart],
        },
      },
    }),
    setChart: ({ uncheckedCharts }) => (name, check) => ({
      uncheckedCharts: {
        ...uncheckedCharts,
        [name]: check
          ? {}
          : CHARTS.reduce((acc, { key }) => {
            acc[key] = true;
            return acc;
          }, {}),
      },
    }),
  },
);

// returns false if all charts are unchecked (3 true values)
const isProfileChecked = (uncheckedCharts) =>
  Object.values(uncheckedCharts).filter((unchecked) => unchecked).length < 3;

const BackupAndRecovery = (props) => (
  <View style={styles.container}>
    <FlatList
      data={Object.keys(props.profiles)}
      keyExtractor={(name) => name}
      renderItem={({ item: name }) => {
        const profileChecked = isProfileChecked(props.uncheckedCharts[name] || {});
        return (
          <View style={styles.profile}>
            <View style={styles.rowContainer}>
              <Text style={styles.text}>
                {name}
                {"'"}s Profile and Charts
              </Text>
              <CheckBox
                checked={profileChecked}
                onPress={() => props.setChart(name, !profileChecked)}
              />
            </View>
            {CHARTS.map(({ label, key }) => (
              <View style={[styles.rowContainer, styles.childRow]} key={key}>
                <Text style={styles.text}>
                  {name}
                  {"'"}s {label}
                </Text>
                <CheckBox
                  checked={!(props.uncheckedCharts[name] || {})[key]}
                  onPress={() => props.toggleChart(name, key)}
                />
              </View>
            ))}
          </View>
        );
      }}
    />
    <View style={styles.buttons}>
      <View style={styles.buttonContainer}>
        <Button
          title="BACKUP"
          style={styles.button}
          onPress={async () => {
            const data = Object.entries(props.profiles).reduce((acc, [name, profile]) => {
              const uncheckedCharts = props.uncheckedCharts[name] || {};
              if (isProfileChecked(uncheckedCharts)) {
                const { photo, ...charts } = profile;
                acc[name] = Object.entries(charts).reduce(
                  (accumulator, [key, chart]) => {
                    if (!uncheckedCharts[key]) {
                      accumulator[key] = chart;
                    }
                    return accumulator;
                  },
                  { photo },
                );
              }
              return acc;
            }, {});

            const url = `${FileSystem.cacheDirectory}TamilHotHouse.json`;
            await FileSystem.writeAsStringAsync(url, JSON.stringify(data));
            await Share.share({ url, title: 'TamilHotHouse Backup' });
            FileSystem.deleteAsync(url);
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="RESTORE"
          style={styles.button}
          onPress={async () => {
            const result = await DocumentPicker.getDocumentAsync();
            if (result.type === 'cancel') return;
            console.log('uri', result.uri);

            const fileName = decodeURIComponent(result.uri.slice(result.uri.lastIndexOf('/') + 1));

            let content;
            try {
              content = await FileSystem.readAsStringAsync(result.uri);
            } catch (e) {
              Alert.alert(`Failed to read ${fileName}`, "Make sure it's a valid text file");
              return;
            } finally {
              FileSystem.deleteAsync(result.uri);
            }

            try {
              const data = JSON.parse(content);
              props.restoreProfiles(data);
            } catch (e) {
              console.log('e', e);
              Alert.alert('Invalid file content', e.message);
              return;
            }
            Alert.alert('Success', `Profiles restored from\n${fileName}`);
          }}
        />
      </View>
    </View>
  </View>
);

export default connect((state) => ({ profiles: state.profile.profiles }), { restoreProfiles })(addState(BackupAndRecovery));
