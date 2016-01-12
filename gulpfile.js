var gulp 			= require('gulp');
var postcss 		= require('gulp-postcss');
var precss 			= require('precss');
var autoprefixer 	= require('autoprefixer');
var cssnano 		= require('cssnano');
var fileinclude 	= require('gulp-file-include');
var uglify 			= require('gulp-uglify');

gulp.task('styles', function() {
	var processors = [
        require('autoprefixer')({browsers: ['last 2 versions']}),
        require('cssnano'),
        require('precss')
    ];
    return gulp.src(['./src/css/style.css', '!./src/css/_*.css'])
    	.pipe(postcss(processors))
    	.pipe(gulp.dest('./dist/css'));
});
gulp.task('includes', function(){
	gulp.src(['./src/**.html'])
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest('./dist'));
});
gulp.task('scripts', function(){
	return gulp.src('./src/js/**.js')
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js'));
});
gulp.task('watch', function(){
	gulp.watch('./src/css/**.css', ['styles']);
	gulp.watch('./src/**/*.html', ['includes']);
	gulp.watch('./src/js/*.js', ['scripts']);
});