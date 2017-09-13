import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import { updateFastingChart } from '../actions';
import FastingChartImg from '../../Images/FastingChart/main.png';
import Constants from '../Constants';

const width = Dimensions.get('window').width;
console.log(width);

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
    console.log('data', this.props.data);
    return (
      <FlatList
        style={styles.container}
        ListHeaderComponent={<Image style={styles.image} source={FastingChartImg} />}
        data={Object.values(this.props.data || {})}
        keyExtractor={(item, index) => index}
        numColumns={4}
        ItemSeparatorComponent={this.renderSeparator}
        renderItem={({ item }) => (
          <View style={styles.view}>
            {item.replace
              ?
                <Image style={styles.dataImage} source={item.replace} />
              :
                <Text
                  style={styles.text}
                  onPress={() => this.props.navigation.navigate('FastingDay', {
                    day: index + 1,
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
    fontSize: 40,
    textAlign: 'center',
    padding: 20,
  },
});

export default FastingChart;
