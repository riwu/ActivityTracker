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

const ITEMS_PER_ROW = 4;

const styles = StyleSheet.create({
  image: {
    width: Constants.WIDTH,
    height: Constants.WIDTH / 1.6543,
  },
  dataImage: {
    width: Constants.WIDTH / ITEMS_PER_ROW,
    height: Constants.WIDTH / ITEMS_PER_ROW,
  },
  view: {
    width: '25%',
  },
  borderRight: {
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
            onPress: () => this.props.resetChart(this.props.screenProps.navPath),
          },
        ]),
    });
  }

  render() {
    const { props } = this;
    const {
      data, navigation, numColumns, defaultItemImage,
    } = props;

    const { images, mainImage, navPath } = props.screenProps;

    const getItem = (item) => {
      let Item;
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
            style={[styles.view, (index + 1) % ITEMS_PER_ROW > 0 && styles.borderRight]}
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
    data: state.profile.profiles[state.profile.activeProfile][ownProps.screenProps.navPath],
  }),
  { resetChart, updateChart },
)(Chart);
