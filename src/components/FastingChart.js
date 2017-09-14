import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import FastingChartImg from '../../Images/Fasting/main.png';


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
            {item.replace === undefined
              ?
                <Text
                  style={styles.text}
                  onPress={() => this.props.navigation.navigate('FastingDay', {
                    day: item.main,
                    images: this.props.images,
                    onChange: (replaceIndex) => {
                      const newData = {
                        ...this.props.data,
                        [index]: {
                          ...this.props.data[index],
                          replace: replaceIndex,
                        },
                      };
                      this.props.updateFastingChart(newData);
                    },
                  })}
                >
                  {item.main}
                </Text>
              :
                <Image style={styles.dataImage} source={this.props.images[item.replace]} />
            }

          </View>
        )}
      />
    );
  }
}
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width,
    height: width / 1.6543,
  },
  dataImage: {
    width: width / 4,
    height: width / 4,
  },
  view: {
    flex: 1,
    width: '25%',
    borderRightWidth: 0.5,
    borderRightColor: 'white',
  },
  text: {
    fontSize: width / 8.2,
    textAlign: 'center',
    padding: 20,
  },
});

export default FastingChart;
