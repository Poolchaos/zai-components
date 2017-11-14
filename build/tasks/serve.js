let gulp = require('gulp');
let browserSync = require('browser-sync');
let historyApiFallback = require('connect-history-api-fallback');

let corsFilter = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
};

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve', ['build'], function(done) {
  browserSync(
    {
      online: false,
      open: false,
      port: 9000,
      server: {
        baseDir: ['.'],
        middleware: [historyApiFallback(), corsFilter]
      }
    },
    done
  );
});
