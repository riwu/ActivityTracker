import React from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
  StyleSheet,
  Text,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { resetChart, updateChart } from '../actions';
import Constants from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: Constants.WIDTH,
    height: Constants.WIDTH / 1.6543,
  },
  dataImage: {
    width: Constants.WIDTH / 4,
    height: Constants.WIDTH / 4,
  },
  view: {
    flex: 1,
    width: '25%',
    borderRightWidth: 0.5,
    borderRightColor: 'white',
  },
  text: {
    fontSize: Constants.WIDTH / 8.5,
    textAlign: 'center',
    padding: 20,
  },
});

const DefaultItem = ({ main }) => <Text style={styles.text}>{main}</Text>;

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
    const { props } = this;
    const {
      mainImage, images, data, navigation, navPath, numColumns, defaultItemImage,
    } = props;

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
                  props.updateChart({ chart: navPath, index, replaceIndex });
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

export default connect(
  (state, ownProps) => ({
    data: state.profile.profiles[state.profile.activeProfile][ownProps.navPath],
  }),
  { resetChart, updateChart },
)(Chart);
