'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
 
sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('./src/static/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./src/static/scss/*.scss', gulp.series('sass'));
});