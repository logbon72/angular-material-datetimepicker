var gulp = require('gulp');
// Include Our Plugins
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var paths = {
    src: 'js/angular-material-datetimepicker.js',
    dest: 'angular-material-datetimepicker.min.js'
}

gulp.task('uglify', function() {
    gulp.src(paths.src)
        .pipe(uglify())
        .pipe(rename(paths.dest))
        .pipe(gulp.dest("js"));
});