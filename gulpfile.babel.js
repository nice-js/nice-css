import gulp from 'gulp';
import cleanCSS from 'gulp-clean-css';
import del from 'del';
import less from 'gulp-less';
import runSequence from 'run-sequence';
import rename from 'gulp-rename';

const argv = require('minimist')(process.argv.slice(2));
const DEBUG = !!argv.debug;
const watch = DEBUG ? true : false;

gulp.task('default', () => {
  runSequence('createCSS');
});

gulp.task('clean', () => {
  return del(['dist']);
});

gulp.task('createCSS', () => {
  return gulp.src('less/nicecss.less')
    .pipe(less())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
  gulp.watch('less/**/*.less', ['createCSS']);
});

gulp.task('minify-css', () => {
  return gulp.src('dist/nicecss.css')
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', () => {
  if (DEBUG) {
    runSequence('clean', 'watch', 'createCSS');
  } else {
    runSequence('clean', 'createCSS', 'minify-css');
  }
});
