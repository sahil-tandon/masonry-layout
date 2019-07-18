/* gulpfile.js
   ----------------------------- */

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    useref = require('gulp-useref'),
    terser = require('gulp-terser'),
    gulpIf = require('gulp-if'),
    cssnano = require('gulp-cssnano'),
    del = require('del'),
    runSequence = require('run-sequence');

/* ==[ Convert SASS to CSS ]== */
gulp.task('sass', function() {
  return gulp.src('src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/css'));
});

/* ==[ Live-reload on Browser ]== */
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  });
});

/* ==[ Concatenate specified files in HTML and generate prod index.html ]== */
gulp.task('useref', function() {
  return gulp.src('src/index.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', terser()))     //minify JS files
    .pipe(gulpIf('*.css', cssnano()))     //minify CSS files
    .pipe(gulp.dest('dist'))
});

/* ==[ Clean up dist folder ]== */
gulp.task('cleanDist', function() {
  return del.sync('dist');
});

/* ==[ Watch for Changes ]== */
gulp.task('watch', function() {
  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('src/css/*.css', browserSync.reload);
  gulp.watch('src/js/*.js', browserSync.reload);
});

/* ==[ Run prod build ]== */
gulp.task('build', function(callback) {
  runSequence(
    'cleanDist',
    'sass',
    'useref',
    callback
  )
});

/* ==[ default task ]== */
gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync'], 'watch',
    callback
  )
});