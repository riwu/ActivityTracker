module.exports = function f(api) {
  return {
    presets: ['babel-preset-expo'],
    ...(api.env('production') && {
      env: {
        plugins: ['transform-remove-console'],
      },
    }),
  };
};
