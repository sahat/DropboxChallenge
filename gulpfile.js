var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var plumber = require('gulp-plumber');
var webserver = require('gulp-webserver');


// uncss
// recess

gulp.task('sass', function() {
  gulp.src('css/styles.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(csso())
    .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
  gulp.watch('css/*.scss', ['sass']);
});

gulp.task('webserver', function() {
  gulp.src('.')
    .pipe(webserver({
      livereload: true
    }));
});

gulp.task('default', ['sass', 'webserver', 'watch']);