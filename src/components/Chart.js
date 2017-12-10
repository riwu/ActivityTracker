import React from 'react';
import { View, FlatList, Image, TouchableOpacity } from 'react-native';

const Chart = ({
  mainImage, images, data, updateChart, navigation, styles,
  DefaultItem, navPath, numColumns = 4,
}) => {
  console.log('rendered chart', data); // getting rendered 3x for FastingChart
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
          onPress={() => navigation.navigate(navPath, {
              day: item.main,
              replace: item.replace,
              onChange: (replaceIndex) => {
                updateChart({ chart: navPath, index, replaceIndex });
              },
            })}
        >
          {item.replace === undefined
              ? <DefaultItem main={item.main} />
              : <Image style={styles.dataImage} source={images[item.replace]} />
            }
        </TouchableOpacity>
      )}
    />
  );
};

export default Chart;
