import { AsyncStorage } from 'react-native';

const makeLocalStorageController = key => ({
  async get() {
    try {
      const string = await AsyncStorage.getItem(key);
      const value = JSON.parse(string);
        // prevent null from replacing default state argument in reducers,
        // but don't convert if it's false, 0, ''
      return value === null ? undefined : value;
    } catch (e) {
      return undefined;
    }
  },
  set(value) {
    AsyncStorage.setItem(key, JSON.stringify(value));
  },
});

export default makeLocalStorageController;
