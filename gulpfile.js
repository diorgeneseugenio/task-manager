var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', function(){
  console.log('Working!');
});

gulp.task('styles', function() {
    gulp.src('src/sass/App.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/dist/css/'));
});

gulp.task('watch', function () {
    gulp.watch('src/sass/App.scss', ['styles']);
});