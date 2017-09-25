'use strict';

var gulp = require('gulp'),
		sass = require('gulp-sass'),
		minifyCss = require('gulp-csso'),
		rename = require('gulp-rename'),
		sourcemaps = require('gulp-sourcemaps'),
		autoprefixer = require('gulp-autoprefixer'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglify'),
		imagemin = require('gulp-imagemin'),
		gutil = require('gulp-util'),
		del = require('del'),
		htmlreplace = require('gulp-html-replace'),
		browserSync = require('browser-sync').create(),
		reload = browserSync.reload;


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
	return gulp.src ([
			'./app/scss/**/*.scss',
			'./app/scss/**/*.css'
		])
			.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(sass().on('error', sass.logError))
			.pipe(autoprefixer())
			.pipe(sourcemaps.write('./maps'))
			.pipe(gulp.dest("app/css"))
			.pipe(browserSync.stream());
});


// Static Server + watching scss/html files
gulp.task('browser-sync', ['sass'], function() {
	browserSync.init({
		server: {
			baseDir: './app'
		}
	});
	gulp.watch('./app/*.html').on('change', browserSync.reload);
	gulp.watch('./app/scss/**/*.scss', ['sass']);
	gulp.watch('./app/js/**/*.js').on('change', browserSync.reload);
});


gulp.task('default', ['browser-sync']);


// ====================================================
// ====================================================
// ================= Сборка DIST ======================
//Clean DIST folder
gulp.task('clean', function() {
	return del('dist');
});

//Copie Fonts 
gulp.task('fonts', function() {
    gulp.src('./app/fonts/**/*.{woff,woff2}')
    // Perform minification tasks, etc here
    .pipe(gulp.dest('./dist/fonts'));
});

//Minify CSS
gulp.task('mincss', function() {
	return gulp.src('./app/css/**/*.css')
		.pipe(minifyCss())
		.pipe(rename('main.min.css'))
		.pipe(gulp.dest('dist/css'))
});

//Minify Js
gulp.task('javascript', function() {
	return gulp.src('./app/js/main.js')
	.pipe(uglify())
	.pipe(rename('main.min.js'))
	.pipe(gulp.dest('dist/js'))
});

// Libs JS
gulp.task('libJS', function() {
	return gulp.src([
		//'./app/js/lib/**/*.js',
		'./app/bower/jquery/dist/jquery.min.js',
		'./app/bower/jquery.scrollbar/jquery.scrollbar.js',
		'./app//bower/select2/dist/js/select2.min.js'
		])
	.pipe(concat('vendor.js'))
	.pipe(uglify())
	.pipe(rename('vendor.min.js'))
	.pipe(gulp.dest('dist/js'))
});

//Images
gulp.task('images', function () {
	return gulp.src('./app/img/**/*')
		.pipe(imagemin({
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest('dist/img'));
});

gulp.task('path', function() {
	gulp.src('./app/index.html')
		.pipe(htmlreplace({
			'css' : [
				'css/main.min.css'
			],
			'js' : [
				'js/vendor.min.js',
				'js/main.min.js'
			]
		}))
		.pipe(gulp.dest('dist'))
})

gulp.task('build',['clean', 'fonts', 'mincss', 'javascript', 'libJS', 'images', 'path'], function() {});