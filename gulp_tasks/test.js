const path = require('path');
const gulp = require('gulp');
const karma = require('karma');
const eslint = require('gulp-eslint');

gulp.task('eslint:config', () => {
  return gulp.src(['gulpfile.js, conf/*.js', 'gulp_tasks/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('karma:single', done => {
  new karma.Server({
    configFile: path.join(process.cwd(), 'conf', 'karma.conf.js'),
    singleRun: true
  }, done).start();
});

gulp.task('karma:watch', done => {
  new karma.Server({
    configFile: path.join(process.cwd(), 'conf', 'karma.conf.js')
  }, done).start();
});
