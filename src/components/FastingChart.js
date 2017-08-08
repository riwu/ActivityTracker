import React, { Component } from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';

class FastingChart extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SectionList
          initialNumToRender={30}
          renderItem={({ item, index, section }) => (
            <Button title={index + 1} onPress={() => this.props.navigation.navigate('Detail')} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FastingChart;
