const initialState = Array(...{ length: 30 }).map(Number.call, Number)
  .reduce((obj, i) => ({ ...obj, [i + 1]: String(i + 1) }), {});

const fastingChart = (state = initialState, action) => {
  console.log('action', action, state);
  switch (action.type) {
    case 'UPDATE_FASTING_CHART':
      return action.data;
    default:
      return state;
  }
};

export default fastingChart;
