var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');

gulp.task('css', function(){
  gulp.src('css/sass/**/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(cssnano())
    .pipe(sourcemaps.write('maps'))
    .pipe(plumber.stop())
    .pipe(gulp.dest('css'))
    .pipe(connect.reload());
});

gulp.task('connect', function(){
  connect.server({
    root: './',
    livereload: true
  });
});

gulp.task('html', function(){
  gulp.src('./*.html')
    .pipe(connect.reload());
});

gulp.task('watch:html', function(){
  gulp.watch(['./*.html'], ['html']);
});

gulp.task('watch:css', function(){
  gulp.watch('css/sass/**/*.scss', ['css']);
});

gulp.task('default', ['watch:css', 'connect', 'watch:html']);
