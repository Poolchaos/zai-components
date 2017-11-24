let gulp = require('gulp');
let runSequence = require('run-sequence');
let changed = require('gulp-changed');
let plumber = require('gulp-plumber');
let es6 = require('gulp-babel');
let ts = require('gulp-typescript');
let sourcemaps = require('gulp-sourcemaps');
let minifyCss = require('gulp-minify-css');
let paths = require('../paths');
let tsLint = require('gulp-tslint');
let tsLintOptions = require('../tslint');
let notify = require('gulp-notify');
let sass = require('gulp-ruby-sass');
let swig = require('gulp-swig');
let data = require('gulp-data');
let svgMin = require('gulp-svgmin');

let tsProject = ts.createProject('tsconfig.json');

gulp.task('build-typescript', function() {
  let tsResult = gulp
    .src([paths.typescript])
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>')
      })
    )
    .pipe(tsLint(tsLintOptions))
    .pipe(tsLint.report())
    .pipe(sourcemaps.init())
    .pipe(tsProject());
  return tsResult.js
    .pipe(
      sourcemaps.write({
        includeContent: true
      })
    )
    .pipe(gulp.dest(paths.output));
});

gulp.task('build-html', function() {
  return gulp
    .src([paths.html])
    .pipe(
      changed(paths.output, {
        extension: '.html'
      })
    )
    .pipe(gulp.dest(paths.output));
});

gulp.task('build-images', function() {
  return gulp
    .src(paths.images)
    .pipe(
      changed(paths.imgOutput, {
        extension: '*'
      })
    )
    .pipe(gulp.dest(paths.imgOutput));
});

gulp.task('build-utils', function() {
  return gulp
    .src(paths.utils)
    .pipe(
      changed(paths.utilsOutput, {
        extension: '.js'
      })
    )
    .pipe(gulp.dest(paths.utilsOutput));
});

gulp.task('build-svg', ['build-images'], function() {
  return gulp
    .src(paths.svgInput)
    .pipe(svgMin())
    .pipe(gulp.dest(paths.svgOutput));
});

gulp.task('build-docs', function() {
  return gulp
    .src(paths.docs)
    .pipe(
      changed(paths.docsOutput, {
        extension: '*'
      })
    )
    .pipe(gulp.dest(paths.docsOutput));
});

gulp.task('build-fonts', function() {
  return gulp
    .src(paths.fonts)
    .pipe(
      changed(paths.fontsOutput, {
        extension: '*'
      })
    )
    .pipe(gulp.dest(paths.fontsOutput));
});

gulp.task('build-audio', function() {
  return gulp
    .src(paths.audio)
    .pipe(
      changed(paths.audioOutput, {
        extension: '*'
      })
    )
    .pipe(gulp.dest(paths.audioOutput));
});

gulp.task('build-css', ['build-components-css', 'build-global-css'], function() {
  return sass(paths.sass, { sourcemap: true })
    .on('error', sass.logError)
    .pipe(plumber())
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styleOutput));
});

gulp.task('build-components-css', function() {
  return sass('src/components/**/*.scss', { sourcemap: true })
    .on('error', sass.logError)
    .pipe(plumber())
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('target/components/'));
});

gulp.task('build-global-css', function() {
  return sass(paths.globalSass, { sourcemap: true })
    .on('error', sass.logError)
    .pipe(plumber())
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('target/_assets/css/'));
});

gulp.task('build', function(callback) {
  return runSequence('clean', ['build-typescript', 'build-html', 'build-images', 'build-svg', 'build-audio', 'build-docs', 'build-fonts', 'build-css', 'build-utils'], callback);
});

gulp.task('build-component-typescript', function() {
  let tsResult = gulp
    .src(paths.component.script)
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>')
      })
    )
    .pipe(tsLint(tsLintOptions))
    .pipe(tsLint.report())
    .pipe(sourcemaps.init())
    .pipe(tsProject());
  return tsResult.js
    .pipe(
      sourcemaps.write({
        includeContent: true
      })
    )
    .pipe(gulp.dest(paths.component.dist));
});

gulp.task('build-component-html', function() {
  return gulp
    .src(paths.component.html) //
    .pipe(gulp.dest(paths.component.dist));
});

gulp.task('build-component-css', function() {
  return sass(paths.component.style, { sourcemap: true })
    .on('error', sass.logError)
    .pipe(plumber())
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.component.dist));
});

gulp.task('package', function(callback) {
  return runSequence('clean-export', ['build-component-typescript', 'build-component-html', 'build-component-css'], callback);
});
