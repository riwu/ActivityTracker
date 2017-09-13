import makeLocalStorageController from './makeLocalStorageController';

const fastingChartStorage = makeLocalStorageController('fastingChart');

let previousState = {};

const getLocalStorage = () => {
  previousState = {
    fastingChart: fastingChartStorage.get(),
  };
  return previousState;
};

const setLocalStorage = (state) => {
  if (state.fastingChart !== previousState.fastingChart) {
    fastingChartStorage.set(state.fastingChart);
  }

  previousState = state;
};


export { getLocalStorage, setLocalStorage };
