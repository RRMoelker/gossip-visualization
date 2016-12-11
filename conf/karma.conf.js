const webpackConfig = require('./webpack-test.conf');
webpackConfig.entry = {};

module.exports = function (config) {
  config.set({
    basePath: '../',
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],

    reporters: ['progress'],
    logLevel: config.LOG_INFO,

    autoWatchBatchDelay: 300,

    files: [
      {pattern: '**/*.karma.js', watched: true}
    ],

    preprocessors: {
      './src/index.js': ['webpack'],
      './**/*.karma.js': ['webpack']
    },

    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    }

  });
};
