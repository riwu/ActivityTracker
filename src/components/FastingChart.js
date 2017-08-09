import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Image } from 'react-native';
import FastingChartImg from '../../Images/FastingChart/main.png';

class FastingChart extends Component {
  renderSeparator = () => (
    <View
      style={{
        backgroundColor: '#ffffff',
        height: 0.1,
      }}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={FastingChartImg} />
        <FlatList
          data={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15',
            '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']}
          numColumns={4}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({ item }) => (
            <Text
              style={styles.text}
              onPress={() => this.props.navigation.navigate('FastingDay', { day: item })}
            >
              {item}
            </Text>
          )}
        />
      </View>
    );
  }
}
//
const styles = StyleSheet.create({
  container: {
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  text: {
    width: '25%',
    fontSize: 50,
    textAlign: 'center',
  },
});

export default FastingChart;
