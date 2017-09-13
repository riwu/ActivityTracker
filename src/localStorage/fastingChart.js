import makeLocalStorageController from './makeLocalStorageController';

const { get, set } = makeLocalStorageController('fastingChart');

export { get as getFastingChart, set as setFastingChart };
