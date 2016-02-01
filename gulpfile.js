var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var compass = require('gulp-compass');
var nodemon = require('gulp-nodemon');

var path = require('path');

// ====== Variables =================
var paths = {
  es6: ['es6/**/*.js'],
  es5: 'es5',
  // Must be absolute or relative to source map
  sourceRoot: path.join(__dirname, 'es6'),
};

// ======== Tasks ====================
gulp.task('babel', function () {
  return gulp.src(paths.es6)
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(sourcemaps.write('.', { sourceRoot: paths.sourceRoot }))
    .pipe(gulp.dest(paths.es5));
});

gulp.task('compass', function() {
  return gulp.src('assets/scss/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: 'assets/css',
      sass: 'assets/scss'
    }))
    .pipe(gulp.dest('assets/css'));
});

gulp.task('serve', ['babel'], function() {
  return nodemon({
    script: 'es5/app.js',
    ext: 'js jade',
    env: {'NODE_ENV': 'development'}
  })
});

gulp.task('watch', function() {
  gulp.watch(paths.es6, ['babel'])
  gulp.watch('assets/scss/*.scss', ['compass']);
});

gulp.task('default', ['serve', 'watch']);