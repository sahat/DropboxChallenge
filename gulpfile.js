var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var plumber = require('gulp-plumber');
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

gulp.task('default', ['sass', 'watch']);