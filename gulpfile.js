var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var compass = require('gulp-compass');
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var minifyHTML = require('gulp-minify-html');
var imagemin = require('gulp-imagemin');
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
    .on('error', console.error.bind(console))
    .pipe(gulp.dest(paths.es5));
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

gulp.task('compass', function() {
  return gulp.src('assets/scss/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: 'assets/css',
      sass: 'assets/scss'
    }))
    .pipe(csso())
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('assets/css'));
});

gulp.task('minifyhtml', function() {
  return gulp.src('views/*.html.uncompressed.html')
    .pipe(rename(function(path){
      path.basename = path.basename.slice(0, -18);
      return path.basename + '.html';
    }))
    .pipe(minifyHTML())
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('views'));
});

gulp.task('imagemin', function() {
  return gulp.src('assets/img/*')
    .pipe(imagemin({
      progressive: true,
      optimizationLevel: 5,
      interlaced: true
    }))
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('assets/img'));
});

gulp.task('serve', ['babel'], function() {
  return nodemon({
    script: 'es5/app.js',
    ext: 'js jade',
    env: {'NODE_ENV': 'development'}
  })
});

gulp.task('watch', function() {
  gulp.watch(paths.es6, ['babel']);
  gulp.watch('assets/scss/*.scss', ['compass']);
  gulp.watch('assets/css/*.css.uncompressed.css', ['csso']);
  gulp.watch('views/*.html.uncompressed.html', ['minifyhtml']);
});

gulp.task('default', ['serve', 'watch']);
