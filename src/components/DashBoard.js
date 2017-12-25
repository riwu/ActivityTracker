import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Constants from '../Constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  charts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  chart: {
    margin: 5,
  },
  chartTitle: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
  textBox: {
    position: 'absolute',
    alignSelf: 'center',
    top: 40,
  },
  text: {
    color: '#1E90FF',
    fontSize: 20,
    textAlign: 'center',
  },
});

const Chart = ({ chart }) => (
  <View style={styles.chart}>
    <Text style={styles.chartTitle}>{chart.name}</Text>
    <AnimatedCircularProgress
      size={120}
      width={10}
      fill={(chart.completed / chart.total) * 100 /* prettier-ignore */}
      tintColor="#1E90FF"
      backgroundColor="#3d5875"
    >
      {fill => (
        <View style={styles.textBox}>
          <Text style={styles.text}>
            {chart.completed}/{chart.total}
          </Text>
          <Text style={styles.text}>{Math.round(fill)}%</Text>
        </View>
      )}
    </AnimatedCircularProgress>
  </View>
);

const DashBoard = props => (
  <View style={styles.container}>
    <View style={styles.charts}>
      {[props.fasting, props.tarawih].map(chart => <Chart key={chart.name} chart={chart} />)}
    </View>
    <View>
      <Text style={styles.chartTitle}>Surah Chart</Text>
      <View style={styles.charts}>
        {[props.surahRead, props.surahMemorized].map(chart => (
          <Chart key={chart.name} chart={chart} />
        ))}
      </View>
    </View>
  </View>
);

const mapStateToProps = (state) => {
  const profile = state.profile.profiles[state.profile.activeProfile];
  const getCompleted = (name, chartKey, predicate) => {
    const values = Object.values(profile[chartKey]);
    return {
      name,
      completed: values.filter(obj => predicate(obj.replace)).length,
      total: values.length,
    };
  };
  return {
    fasting: getCompleted('Fasting Chart', 'FastingDay', replace => replace !== undefined),
    tarawih: getCompleted('Tarawih Chart', 'TarawihDay', replace => replace !== undefined),
    surahRead: getCompleted('Read', 'SurahDay', replace => replace && replace.includes(0)),
    surahMemorized: getCompleted(
      'Memorized',
      'SurahDay',
      replace => replace && replace.includes(1),
    ),
  };
};

export default connect(mapStateToProps)(DashBoard);
