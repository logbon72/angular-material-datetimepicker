var gulp = require('gulp'),
	pump = require('pump'),
	uglify = require('gulp-uglify'),
	cleanCSS = require('gulp-clean-css'),
	sourcemaps = require('gulp-sourcemaps'),
	rename = require('gulp-rename'),
	runSequence = require('run-sequence');

gulp.task('default', function(cb) {
	runSequence(['js', 'css'], cb);
});

gulp.task('js', function(cb) {
	pump([
		gulp.src(['./js/angular-material-datetimepicker.js']),
		sourcemaps.init(),
		uglify(),
		rename({extname: '.min.js'}),
		sourcemaps.write(''),
		gulp.dest('./dist/')
	], cb);
});

gulp.task('css', function(cb) {
	pump([
		gulp.src(['./css/material-datetimepicker.css']),
		cleanCSS(),
		rename({extname: '.min.css'}),
		gulp.dest('./dist/')
	], cb);
});