module.exports = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'babel?plugins=rewire'
        ]
      }
    ]
  },
  plugins: [],
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  }
};
