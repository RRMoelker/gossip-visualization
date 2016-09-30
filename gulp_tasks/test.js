const path = require('path');
const gulp = require('gulp');
const karma = require('karma');

gulp.task('karma:single', function (done) {
  new karma.Server({
    configFile:  path.join(process.cwd(), 'conf', 'karma.conf.js'),
    singleRun: true
  }, done).start();
});

gulp.task('karma:watch', function (done) {
  new karma.Server({
    configFile:  path.join(process.cwd(), 'conf', 'karma.conf.js')
  }, done).start();
});
