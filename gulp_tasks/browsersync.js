const gulp = require('gulp');
const browserSync = require('browser-sync');
const spa = require('browser-sync-spa');

const browserSyncConf = require('../conf/browsersync.conf');
const browserSyncDistConf = require('../conf/browsersync-dist.conf');

browserSync.use(spa());

const browserSyncServe = done => {
  browserSync.init(browserSyncConf());
  done();
};

const browserSyncDist = done => {
  browserSync.init(browserSyncDistConf());
  done();
};

gulp.task('browsersync', browserSyncServe);
gulp.task('browsersync:dist', browserSyncDist);
