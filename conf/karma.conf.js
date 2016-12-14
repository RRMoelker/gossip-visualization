const webpackConfig = require('./webpack-test.conf');
webpackConfig.entry = {};

module.exports = function (config) {
  config.set({
    basePath: '../',
    frameworks: ['jasmine'],
    // browsers: ['PhantomJS'],
    browsers: ['Chrome'],

    reporters: ['progress'],
    logLevel: config.LOG_INFO,

    autoWatchBatchDelay: 300,

    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      {pattern: '**/*.karma.js', watched: true}
    ],

    preprocessors: {
      './src/index.js': ['webpack'],
      './**/*.karma.js': ['webpack']
    },

    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },

    plugins: [
      'karma-jasmine',
      'karma-webpack',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher'
    ]

  });
};
