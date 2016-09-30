var webpackConfig = require('./webpack-test.conf.js');
webpackConfig.entry = {};

module.exports = function(config) {
  config.set({
    basePath: '../',
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],

    reporters: ['progress'],
    logLevel: config.LOG_INFO,

    autoWatchBatchDelay: 300,

    files: [
      {pattern: '**/*.karma.js', watched: false}
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
}