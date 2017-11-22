let gulp = require('gulp');
let paths = require('../paths');
let browserSync = require('browser-sync');

function reportChange(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

// this task wil watch for changes
// to js, html, and css files and call the
// reportChange method. Also, by depending on the
// serve task, it will instantiate a browserSync session
gulp.task('watch', ['serve'], function() {
  gulp.watch(paths.typescript, ['build-typescript', browserSync.reload]).on('change', reportChange);
  gulp.watch(paths.html, ['build-html', browserSync.reload]).on('change', reportChange);
  gulp.watch('src/**/*.scss', ['build-css', browserSync.reload]).on('change', reportChange);
});
