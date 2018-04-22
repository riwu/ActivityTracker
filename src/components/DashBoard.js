import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { EvilIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo';
import { NavigationActions } from 'react-navigation';
import CONSTANTS from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
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
  },
  chart: {
    margin: 4,
    backgroundColor: '#e3f0f6',
    shadowOpacity: 0.3,
    elevation: 10,
  },
  bottomChart: {
    flex: 1,
  },
  chartTitleContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 5,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chartTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: Math.min(CONSTANTS.WIDTH / 25, 20),
    color: '#fe9818',
  },
  text: {
    color: '#0975cd',
    fontSize: 20,
    textAlign: 'center',
  },
  completed: {
    fontSize: 10,
  },
  completedCount: {
    fontSize: 70,
    color: '#0975cd',
  },
  totalCount: {
    fontSize: 15,
    color: '#0975cd',
  },
});

const TextProgress = connect(null, {
  navigate: (routeName) => NavigationActions.navigate({ routeName }),
})(({
  chart, Circular, navigate, style,
}) => (
  <TouchableOpacity style={[styles.chart, style]} onPress={() => navigate(chart.route)}>
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
        size={CONSTANTS.HEIGHT / 6}
        width={6}
        fill={(chart.completed / chart.total) * 100 /* prettier-ignore */}
        tintColor="#1E90FF"
        backgroundColor="white"
      >
        {(fill) => (
          <View>
            <Text style={styles.text}>{Math.round(fill)}%</Text>
            <Text style={[styles.text, styles.completed]}>completed</Text>
          </View>
        )}
      </AnimatedCircularProgress>
    )}
  />
);

const DashBoard = (props) => (
  <LinearGradient colors={['#7ebddc', '#dae9f1']} start={[1, 0]} style={styles.container}>
    <CircularProgress chart={props.tarawih} />
    <View style={styles.charts}>
      {[props.fasting, props.surahRead].map((chart) => (
        <TextProgress chart={chart} key={chart.name} style={styles.bottomChart} />
      ))}
    </View>
  </LinearGradient>
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
      name: 'Read / வாசிப்பு',
      route: CONSTANTS.FASTING_CHART,
      chartKey: 'FastingDay',
    }),
    tarawih: getCompleted({
      name: 'Speak / எழுதுதல்',
      route: CONSTANTS.TARAWIH_CHART,
      chartKey: 'TarawihDay',
    }),
    surahRead: getCompleted({
      name: 'Write / பேசுதல்',
      route: CONSTANTS.SURAH_CHART,
      chartKey: 'SurahDay',
    }),
  };
};

export default connect(mapStateToProps)(DashBoard);
