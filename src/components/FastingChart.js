import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import FastingChartImg from '../../Images/FastingChart/main.png';

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
        data={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15',
          '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']}
        keyExtractor={item => item}
        numColumns={4}
        ItemSeparatorComponent={this.renderSeparator}
        renderItem={({ item }) => (
          <View style={styles.view}>
            <Text
              style={styles.text}
              onPress={() => this.props.navigation.navigate('FastingDay', { day: item })}
            >
              {item}
            </Text>
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
    resizeMode: 'cover',
  },
  view: {
    width: '25%',
    borderRightWidth: 0.5,
    borderRightColor: 'white',
  },
  text: {
    fontSize: 50,
    textAlign: 'center',
  },
});

export default FastingChart;
