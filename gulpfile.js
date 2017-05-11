const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const mainBowerFiles = require('main-bower-files');

const PATH = {
  SRC: './app',
  LESS: 'less/app.less',
  CSS: 'app/css',
  BOWER: 'bower_components',
  LIB: 'app/lib'
}

const now = new Date();
const TIMESTAMP = {
  YEAR: now.getFullYear(),
  MONTH: now.getMonth() + 1,
  DAY: now.getDate()
};

const banner = `
/**
 * <%= pkg.name %> <%= pkg.version %>
 *
 * Copyright (c) ${TIMESTAMP.YEAR}, Cairenhui Ltd.
 * All rights reserved.
 *
 * LICENSE
 * build: ${TIMESTAMP.YEAR}-${TIMESTAMP.MONTH}-${TIMESTAMP.DAY}
 */
`;

gulp.task('bower', () => {
  gulp.src(mainBowerFiles(), { base: PATH.BOWER })
    .pipe(gulp.dest(PATH.LIB));
});

gulp.task('serve', function () {
  browserSync.init({
    server: PATH.SRC,
    open: false
  });

  gulp.watch('less/**/*.less', ['less']);
  gulp.watch([
    'app/**/*.html',
    'app/js/**/*.js',
    'app/api/**/*.json',
    'app/img/**/*.{png|gif|jpg|jpeg}',
    'app/fonts/iconfont.{svg|ttf}']).on('change', browserSync.reload);
});

gulp.task('less', () => {
  gulp.src(PATH.LESS)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(PATH.CSS))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('default', ['serve', 'less']);
