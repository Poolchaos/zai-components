let gulp = require('gulp');
let jscs = require('gulp-jscs');
let paths = require('../paths');

gulp.task('jscs', function() {
  return gulp.src(paths.source)
      .pipe(jscs())
      .pipe(jscs.reporter());
});

gulp.task('jscs-fix', function() {
  return gulp.src(paths.source)
      .pipe(jscs({fix: true}))
      .pipe(jscs.reporter())
      .pipe(gulp.dest('fixed'));
});

gulp.task('jscs-test', function() {
  return gulp.src(paths.unitSpecs)
      .pipe(jscs())
      .pipe(jscs.reporter());
});
