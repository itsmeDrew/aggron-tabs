'use strict';

var argv = require('yargs').argv;
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');
var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var ngAnnotate = require('gulp-ng-annotate');
var ngTemplateCache = require('gulp-angular-templatecache');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var rjs = require('requirejs');
var sass = require('gulp-ruby-sass');
var uglify = require('gulp-uglifyjs');

argv.production = false;

gulp.task('clean:public', function (cb) { return del('./public/assets', cb); });
gulp.task('clean:fonts', function (cb) { return del('./public/assets/fonts', cb); });
gulp.task('clean:images', function (cb) { return del('./public/assets/img', cb); });
gulp.task('clean:views', function (cb) { return del('./public/assets/views', cb); });
gulp.task('clean:js', function (cb) { return del('./public/assets/js', cb); });
gulp.task('clean:css', function (cb) { return del('./public/assets/css', cb); });

gulp.task('copy:fonts', function() {
  return gulp.src('./src/fonts/**/*')
    .pipe(gulp.dest('./public/assets/fonts'));
});

gulp.task('copy:images', [ 'clean:images' ], function() {
  return gulp.src('./src/img/**/*')
    .pipe(gulp.dest('./public/assets/img'));
});

gulp.task('build:js', [ 'clean:js' ], function(cb) {
  var options = {
    baseUrl: './src/js',
    mainConfigFile: './src/js/main.js',
    out: './public/assets/js/main.min.js',
    optimize: 'none',
    include: [ 'main' ],
    name: 'almond',
    generateSourceMaps: false,
    preserveLicenseComments: false,
    wrapShim: true
  };

  rjs.optimize(options, function() {
    if (argv.verbose) {
      gutil.log(arguments['0']);
    }

    if (argv.production) {
      gulp.src('./public/assets/js/main.min.js')
        .pipe(ngAnnotate())
        .pipe(uglify('main.min.js'))
        .pipe(gulp.dest('./public/assets/js'))
          .on('finish', cb);
    } else {
      gulp.src('./public/assets/js/main.min.js')
        .pipe(gulp.dest('./public/assets/js'))
          .on('finish', cb);
    }
  });
});

gulp.task('copy:js:tabs', function(cb) {
  return gulp.src('./src/js/aggron-tabs.js')
    .pipe(gulp.dest('./public/assets/js'));
});

gulp.task('copy:views', [ 'clean:views' ], function() {
  return gulp.src('./src/views/**/*')
    .pipe(gulp.dest('./public/assets/views'));
});

gulp.task('build:css', ['clean:css', 'build:css:tabs'], function() {
  return sass('./src/scss/main.scss', {
        style: 'compressed',
        loadPath: './bower_components'
      })
      .on('error', notify.onError(function(err) {
        return 'CSS Error:' + err.message;
      }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./public/assets/css'))
    .pipe(notify('CSS Success: <%= file.relative %>'));
});

gulp.task('build:css:tabs', function() {
  return sass('./src/scss/components/_tabs.scss', {
        loadPath: './bower_components'
      })
      .on('error', notify.onError(function(err) {
        return 'CSS Error:' + err.message;
      }))
    .pipe(rename({ basename: 'aggron-tabs' }))
    .pipe(gulp.dest('./public/assets/css'))
    .pipe(notify('CSS Success: <%= file.relative %>'));
});

gulp.task('lint:js', function() {
  return gulp.src([ './src/js/**/*.js', '!./src/js/templates.js' ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
  gulp.watch('./src/views/**/*.html', [ 'copy:views' ]);
  gulp.watch('./src/js/**/*.js', [ 'build:js' ]);
  gulp.watch('./src/scss/**/*.scss', [ 'build:css' ]);
  gulp.watch('./src/img/**/*.scss', [ 'copy:images' ]);
  gulp.watch('./src/fonts/**/*.scss', [ 'copy:fonts' ]);
})

gulp.task('build', function(cb) {
  gulp.start([ 'build:js', 'build:css', 'copy:views', 'copy:fonts', 'copy:images', 'copy:js:tabs'], cb);
});

gulp.task('default', [ 'build' ], function() {
  gulp.start([ 'watch' ]);
});
