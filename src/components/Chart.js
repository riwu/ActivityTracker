import React from 'react';
import { View, FlatList, Image, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { resetChart, updateChart } from '../actions';

class Chart extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <MaterialCommunityIcons
        name="restart"
        onPress={() => navigation.state.params.reset()}
        size={25}
      />
    ),
  });
  static defaultProps = {
    numColumns: 4,
  };

  componentDidMount() {
    this.props.navigation.setParams({
      reset: () =>
        Alert.alert('Reset chart', 'Data for this chart will be cleared', [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Reset',
            style: 'destructive',
            onPress: () => this.props.resetChart(this.props.navPath),
          },
        ]),
    });
  }

  render() {
    const {
      mainImage,
      images,
      data,
      updateChart,
      navigation,
      styles,
      DefaultItem,
      navPath,
      numColumns,
      defaultItemImage,
    } = this.props;

    const getItem = (item) => {
      let Item;
      console.log('replac', item.replace, typeof item.replace);
      if (
        item.replace === undefined ||
        (typeof item.replace === 'object' && item.replace.length === 0)
      ) {
        Item = <DefaultItem main={item.main} />;
      } else if (typeof item.replace === 'object') {
        Item = (
          <ImageBackground source={defaultItemImage} style={styles.dataImage}>
            {item.replace.map((index) => (
              <Image key={index} style={styles.fittedImage} source={images[index]} />
            ))}
          </ImageBackground>
        );
      } else {
        Item = <ImageBackground style={styles.dataImage} source={images[item.replace]} />;
      }
      return Item;
    };

    return (
      <FlatList
        style={styles.container}
        ListHeaderComponent={<Image style={styles.image} source={mainImage} />}
        data={Object.values(data || {})}
        extraData={data}
        keyExtractor={(item, index) => index}
        numColumns={numColumns}
        ItemSeparatorComponent={() => (
          <View
            style={{
              backgroundColor: 'white',
              height: 0.5,
            }}
          />
        )}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.view}
            onPress={() =>
              navigation.navigate(navPath, {
                day: item.main,
                replace: item.replace,
                onChange: (replaceIndex) => {
                  updateChart({ chart: navPath, index, replaceIndex });
                },
              })
            }
          >
            {getItem(item)}
          </TouchableOpacity>
        )}
      />
    );
  }
}

export default connect(null, { resetChart, updateChart })(Chart);
