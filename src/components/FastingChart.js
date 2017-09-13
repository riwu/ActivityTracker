import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, AsyncStorage } from 'react-native';
import { updateFastingChart } from '../actions';
import FastingChartImg from '../../Images/FastingChart/main.png';

import FastingChartPassed from '../../Images/FastingChart/passed.png';
import FastingChartTried from '../../Images/FastingChart/tried.png';
import FastingChartFailed from '../../Images/FastingChart/failed.png';

const images = [FastingChartPassed, FastingChartTried, FastingChartFailed];

class FastingChart extends Component {
  renderSeparator = () => (
    <View
      style={{
        backgroundColor: 'white',
        height: 0.5,
      }}
    />
  );

  render() {
    return (
      <FlatList
        style={styles.container}
        ListHeaderComponent={<Image style={styles.image} source={FastingChartImg} />}
        data={Object.values(this.props.data || {})}
        keyExtractor={(item, index) => index}
        numColumns={4}
        ItemSeparatorComponent={this.renderSeparator}
        renderItem={({ item, index }) => (
          <View style={styles.view}>
            {(typeof item === 'string')
              ?
                <Text
                  style={styles.text}
                  onPress={() => this.props.navigation.navigate('FastingDay', {
                    day: index,
                    onChange: (img) => {
                      const newData = {
                        ...this.props.data,
                        [item]: img,
                      };
                      console.log('new', newData);
                      updateFastingChart(newData);
                    },
                  })}
                >
                  {item}
                </Text>
              :
                <Image style={styles.dataImage} source={item} />
            }

          </View>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 250,
  },
  dataImage: {
    width: '100%',
    height: 100,
  },
  view: {
    flex: 1,
    width: '25%',
    borderRightWidth: 0.5,
    borderRightColor: 'white',
  },
  text: {
    fontSize: 50,
    textAlign: 'center',
    padding: 20,
  },
});

export default FastingChart;
