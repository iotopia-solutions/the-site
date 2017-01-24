"use strict";

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var minifyHTML = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');

var path = require('path');

// ====== Variables =================
var paths = {
  src: ['src/**/*.*'],
  es6: ['src/**/*.js'],
  html: ['src/**/*.html'],
  build: 'build',
  // Must be absolute or relative to source map
  sourceRoot: path.join(__dirname, 'src'),
};

// ======== Tasks ====================
gulp.task('babel', function () {
  return gulp.src(paths.es6)
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['es2015', 'react']
    }))
    .pipe(sourcemaps.write('.', { sourceRoot: paths.sourceRoot }))
    .on('error', console.error.bind(console))
    .pipe(gulp.dest(paths.build));
});

gulp.task('csso', function () {
    return gulp.src('assets/css/*.css.uncompressed.css')
      .pipe(rename(function(path){
        path.basename = path.basename.slice(0, -17);
        return path;
      }))
      .pipe(csso())
      .on('error', console.error.bind(console))
      .pipe(gulp.dest('assets/css'));
});

gulp.task('sass', function() {
  return gulp.src('assets/css/sass/[^_]*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('assets/css'));
});

// gulp.task('compass', function() {
//   return gulp.src('assets/scss/*.scss')
//     .pipe(compass({
//       config_file: './config.rb',
//       css: 'assets/css',
//       sass: 'assets/scss'
//     }))
//     .pipe(csso())
//     .on('error', console.error.bind(console))
//     .pipe(gulp.dest('assets/css'));
// });

gulp.task('minifyhtml', function() {
  return gulp.src(paths.html)
    .pipe(minifyHTML({collapseWhitespace: true}))
    .on('error', console.error.bind(console))
    .pipe(gulp.dest(paths.build));
});

gulp.task('imagemin', function() {
  return gulp.src([
      'assets/img/*',
      'assets/img/projects/*',
      'assets/img/clients/*',
      'assets/img/clients/*/*'
    ])
    .pipe(imagemin({
      progressive: true,
      optimizationLevel: 5,
      interlaced: true
    }))
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('assets/img'));
});

gulp.task('serve', ['babel', 'sass', 'minifyhtml'], function() {
  return nodemon({
    script: path.join(paths.build, 'app.js'),
    ext: 'js html',
    env: {'NODE_ENV': 'development'}
  })
});

gulp.task('watch', function() {
  gulp.watch(paths.es6, ['babel']);
  gulp.watch('assets/scss/*.scss', ['sass']);
  gulp.watch('assets/css/*.css.uncompressed.css', ['csso']);
  gulp.watch(paths.html, ['minifyhtml']);
});

gulp.task('default', ['serve', 'watch']);
