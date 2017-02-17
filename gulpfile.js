var gulp = require('gulp'),
	pump = require('pump'),
	uglify = require('gulp-uglify'),
	cleanCSS = require('gulp-clean-css'),
	sourcemaps = require('gulp-sourcemaps'),
	rename = require('gulp-rename'),
	runSequence = require('run-sequence'),
	bump = require('gulp-bump'),
	git  = require('gulp-git'),
	filter = require('gulp-filter'),
	push = require('gulp-git-push'),
	tag = require('gulp-tag-version'),
	argv = require('yargs')
    .option('type', {
        alias: 't',
        choices: ['patch', 'minor', 'major']
    }).argv;

gulp.task('default', function(cb) {
	runSequence(['js', 'css'], cb);
});

gulp.task('bump', function(cb) {
	runSequence(['js', 'css'], 'bump push', cb);
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

gulp.task('bump push', function(cb) {
	pump([
		gulp.src(['./package.json', './bower.json']),
		bump({type: argv.type || 'patch'}),
		gulp.dest('./'),
		git.commit('bump version '),
		filter('package.json'),
		tag(),
		push()
	], cb);
});