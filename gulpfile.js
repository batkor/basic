/**
 * @file
 * This Gulp config file.
 */

'use strict'

const gulp = require("gulp");
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const sassGlob = require('gulp-sass-glob');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const rename = require("gulp-rename");

const paths = {
  js: {
    src: "assets/js/**/*.es6.js",
    dest: "assets/js",
  },
  styles: {
    src: "assets/scss/**/*.scss",
    dest: "assets/css",
  }
}

function scss() {
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(paths.styles.dest));
}

function js() {
  return gulp
    .src(paths.js.src)
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(rename(function (path) {
      return {
        dirname: path.dirname,
        basename: path.basename.replace('.es6', ''),
        extname: path.extname
      };
    }))
    .pipe(gulp.dest(paths.js.dest))
}

function watchFiles() {
  scss();
  js();
  gulp.watch(paths.styles.src, gulp.series('scss'));
  gulp.watch(paths.js.src, gulp.series('js'));
}

exports.scss = scss;
exports.js = js;
exports.default = watchFiles;
