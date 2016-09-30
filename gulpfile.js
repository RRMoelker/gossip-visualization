const gulp = require('gulp');

const browserSync = require('browser-sync');

const conf = require('./conf/gulp.conf');

require('require-dir')('./gulp_tasks');

gulp.task('build', gulp.series(gulp.parallel('other', 'webpack:dist')));
gulp.task('watch', watch);
gulp.task('test:single', gulp.series('eslint', 'karma:single'));
gulp.task('test:watch', gulp.series('karma:watch'));
gulp.task('test', gulp.series('test:single'));
gulp.task('serve', gulp.series('webpack:watch', 'browsersync'));
gulp.task('serve:dist', gulp.series('clean', 'build', 'browsersync:dist'));
gulp.task('default', gulp.series('build'));

const reloadBrowserSync = (cb) => {
  browserSync.reload();
  cb();
}

const watch = done => {
  gulp.watch(conf.path.tmp('index.html'), reloadBrowserSync);
  done();
}
