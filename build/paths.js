var path = require('path');

var appRoot = 'src/';
var outputRoot = 'target/';
var assetsOutputRoot = 'target/_assets/';
var dist = 'dist/';
var dddRoot = 'ddd/';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.js',
  typescript: appRoot + '**/*.ts',
  vendor: 'vendor/**/*.*',
  vendorOutput: outputRoot + 'vendor/',
  html: appRoot + '**/*.html',
  css: appRoot + '**/*.css',
  audio: appRoot + '_assets/audio/**/*',
  images: appRoot + '_assets/img/**/*',
  utils: appRoot + '_assets/utils/**/*',
  utilsOutput: outputRoot + '_assets/utils/',
  fonts: appRoot + '_assets/fonts/*',
  sass: appRoot + 'index.scss',
  globalSass: appRoot + 'global.scss',
  output: outputRoot,
  audioOutput: assetsOutputRoot + 'audio/',
  imgOutput: assetsOutputRoot + 'img/',
  svgInput: appRoot + '_assets/img/svg/*.svg',
  svgOutput: assetsOutputRoot + 'img/svg/',
  fontsOutput: assetsOutputRoot + 'fonts/',
  styleOutput: assetsOutputRoot + 'styles/',
  doc: './doc',
  docs: appRoot + '_assets/docs/*',
  docsOutput: assetsOutputRoot + 'docs/',
  e2eSpecsSrc: 'test/e2e/target/*.js',
  e2eSpecsDist: 'test/e2e/dist/',
  unitSpecs: 'test/unit/**/*.js',
  swigTemplates: 'build/templates/',
  component: {
    script: appRoot + 'components/**/*.ts',
    html: appRoot + 'components/**/*.html',
    style: appRoot + 'components/**/*.scss',
    dist: dist
  }
};
