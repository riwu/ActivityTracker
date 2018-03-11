import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { EvilIcons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
import CONSTANTS from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    marginLeft: 10,
    marginRight: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 15,
  },
  charts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  chart: {
    margin: 5,
    backgroundColor: '#F0F8FF',
    height: CONSTANTS.HEIGHT / 3.5,
  },
  chartTitleContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'space-between',
  },
  chartTitle: {
    textAlign: 'center',
    fontSize: 20,
    color: 'orange',
  },
  textBox: {
    position: 'absolute',
    alignSelf: 'center',
    top: 40,
  },
  text: {
    color: '#1E90FF',
    fontSize: 16,
    textAlign: 'center',
  },
  completedCount: {
    fontSize: 70,
    color: '#1E90FF',
  },
  totalCount: {
    fontSize: 15,
    color: '#1E90FF',
  },
});

const TextProgress = connect(null, {
  navigate: (routeName) => NavigationActions.navigate({ routeName }),
})(({ chart, Circular, navigate }) => (
  <TouchableOpacity style={styles.chart} onPress={() => navigate(chart.route)}>
    <View style={styles.chartTitleContainer}>
      <Text style={styles.chartTitle}>{chart.name}</Text>
      <EvilIcons name="chevron-right" size={30} color="orange" />
    </View>
    <View style={styles.progressContainer}>
      <View>
        <Text style={styles.completedCount}>{chart.completed}</Text>
        <Text style={styles.totalCount}>out of {chart.total}</Text>
      </View>
      {Circular && <Circular chart={chart} />}
    </View>
  </TouchableOpacity>
));

const CircularProgress = (props) => (
  <TextProgress
    chart={props.chart}
    Circular={({ chart }) => (
      <AnimatedCircularProgress
        size={CONSTANTS.HEIGHT / 5.5}
        width={10}
        fill={(chart.completed / chart.total) * 100 /* prettier-ignore */}
        tintColor="#1E90FF"
        backgroundColor="white"
      >
        {(fill) => (
          <View style={styles.textBox}>
            <Text style={styles.text}>{Math.round(fill)}%</Text>
            <Text style={styles.text}>completed</Text>
          </View>
        )}
      </AnimatedCircularProgress>
    )}
  />
);

const DashBoard = (props) => (
  <View style={styles.container}>
    {[props.fasting, props.tarawih, props.surahRead].map((chart) => (
      <CircularProgress chart={chart} key={chart.name} />
    ))}
  </View>
);

const mapStateToProps = (state) => {
  const profile = state.profile.profiles[state.profile.activeProfile];
  const getCompleted = ({ name, chartKey, route }) => {
    const values = Object.values(profile[chartKey]);
    return {
      name,
      route,
      completed: values.filter((obj) => obj.replace !== undefined).length,
      total: values.length,
    };
  };
  return {
    fasting: getCompleted({
      name: 'Read',
      route: CONSTANTS.FASTING_CHART,
      chartKey: 'FastingDay',
    }),
    tarawih: getCompleted({
      name: 'Speak',
      route: CONSTANTS.TARAWIH_CHART,
      chartKey: 'TarawihDay',
    }),
    surahRead: getCompleted({
      name: 'Write',
      route: CONSTANTS.SURAH_CHART,
      chartKey: 'SurahDay',
    }),
  };
};

export default connect(mapStateToProps)(DashBoard);
