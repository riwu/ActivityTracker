import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';

const FastingChart = ({ mainImage, images, data, updateChart, navigation, styles,
  DefaultItem, navPath }) => (
    <FlatList
      style={styles.container}
      ListHeaderComponent={<Image style={styles.image} source={mainImage} />}
      data={Object.values(data || {})}
      keyExtractor={(item, index) => index}
      numColumns={4}
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
            onChange: (replaceIndex) => {
              const newData = {
                ...data,
                [index]: {
                  ...data[index],
                  replace: replaceIndex,
                },
              };
              updateChart(newData);
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

export default FastingChart;
