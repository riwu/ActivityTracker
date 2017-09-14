import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';

const FastingChart = ({ mainImage, images, data, updateChart, navigation, styles }) => (
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
      <View style={styles.view}>
        {item.replace === undefined
          ?
            <Text
              style={styles.text}
              onPress={() => navigation.navigate('FastingDay', {
                day: item.main,
                images,
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
              {item.main}
            </Text>
          :
            <Image style={styles.dataImage} source={images[item.replace]} />
        }

      </View>
        )}
  />
);

export default FastingChart;
