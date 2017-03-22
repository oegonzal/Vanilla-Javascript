var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');


gulp.task('minify-css', function() {
  return gulp.src('./css/*.css')
    .pipe(minifyCss({compatibility: 'ie8', keepSpecialComments: 0}))
    .pipe(gulp.dest('distCSS'));
});


gulp.task('uglify', function(){
	return gulp.src('./js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./distJS'));
})

gulp.task('concatJS', function(){
	return gulp.src('./js/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('./concatJS'))
})
gulp.task('concatCSS', function(){
	return gulp.src('./css/*.css')
		.pipe(concat('all.css'))
		.pipe(gulp.dest('./concatCSS'))
})

 
gulp.task('compress', function() {
  return gulp.src('lib/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build'));
});


gulp.task('default', function() {
  // place code for your default task here
});