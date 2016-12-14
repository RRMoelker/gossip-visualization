const path = require('path');
const gulp = require('gulp');
const karma = require('karma');
const eslint = require('gulp-eslint');

const shell = require('gulp-shell');

gulp.task('exec-tape', shell.task([
  'tape -r babel-register ./src/*/*.tape.js | faucet'
]));

gulp.task('tape', gulp.series('exec-tape'));

gulp.task('eslint:src', () => {
  return gulp.src(['src/**/*.js'])
    .pipe(eslint({
      fix: true
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(gulp.dest('./src/')); // <-- update original files;
});

gulp.task('eslint:config', () => {
  return gulp.src(['gulpfile.js, conf/*.js', 'gulp_tasks/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('eslint', gulp.series('eslint:src', 'eslint:config'));

gulp.task('karma:single', done => {
  new karma.Server({
    configFile: path.join(process.cwd(), 'conf', 'karma.conf.js'),
    singleRun: true
  }, exitCode => {
    if (exitCode === 0) {
      console.log('Karma:single done');
      done();
    } else {
      const msg = `test failed with code: ${exitCode}`;
      console.error(msg);
      throw msg;
    }
  }).start();
});

gulp.task('karma:watch', done => {
  new karma.Server({
    configFile: path.join(process.cwd(), 'conf', 'karma.conf.js')
  }, done).start();
});
