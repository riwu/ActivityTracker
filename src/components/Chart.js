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
    fontSize: Constants.WIDTH / 10,
    textAlign: 'center',
    padding: 20,
  },
});

const DefaultItem = ({ main }) => <Text style={styles.text}>{main}</Text>;

const Reset = (props) => (
  <MaterialCommunityIcons
    name="restart"
    onPress={() =>
      Alert.alert('Reset chart', 'Data for this chart will be cleared', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => props.resetChart(props.navPath),
        },
      ])
    }
    size={25}
  />
);

const ConnectedReset = connect(null, { resetChart })(Reset);

const Chart = (props) => {
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
};

Chart.navigationOptions = ({ screenProps: { navPath } }) => ({
  headerRight: <ConnectedReset navPath={navPath} />,
});

Chart.defaultProps = {
  numColumns: 4,
};

export default connect(
  (state, ownProps) => ({
    data: state.profile.profiles[state.profile.activeProfile][ownProps.screenProps.navPath],
  }),
  { updateChart },
)(Chart);
