import React from 'react';
import { View, FlatList, Image, TouchableOpacity, ImageBackground } from 'react-native';

const Chart = ({
  mainImage, images, data, updateChart, navigation, styles,
  DefaultItem, navPath, numColumns = 4, defaultItemImage,
}) => {
  console.log('rendered chart'); // getting rendered 3x for FastingChart

  const getItem = (item) => {
    let Item;
    console.log('replac', item.replace, typeof item.replace);
    if (item.replace === undefined || (typeof item.replace === 'object' && item.replace.length === 0)) {
      Item = <DefaultItem main={item.main} />;
    } else if (typeof item.replace === 'object') {
      Item = (
        <ImageBackground source={defaultItemImage} style={styles.dataImage}>
          {item.replace.map(index => (
            <Image
              key={index}
              style={styles.fittedImage}
              source={images[index]}
            />
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
          onPress={() => navigation.navigate(navPath, {
              day: item.main,
              replace: item.replace,
              onChange: (replaceIndex) => {
                updateChart({ chart: navPath, index, replaceIndex });
              },
            })}
        >
          {getItem(item)}
        </TouchableOpacity>
      )}
    />
  );
};

export default Chart;
