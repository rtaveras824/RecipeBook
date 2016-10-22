var gulp = require('gulp'),
	gutil = require('gulp-util'),
	browserify = require('gulp-browserify'),
	connect = require('gulp-connect'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	pngcrush = require('imagemin-pngcrush'),
	concat = require('gulp-concat');

var env,
	jsSources,
	sassSources,
	sassStyle,
	outputDir;

env = process.env.NODE_ENV || 'development';

if (env === 'development') {
	outputDir = 'gulp/builds/development/';
	sassStyle = 'expanded';
} else {
	outputDir = 'gulp/builds/production/';
	sassStyle = 'compressed';
}

