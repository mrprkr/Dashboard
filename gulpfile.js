var gulp = require('gulp');
var bower = require ('gulp-bower');
var sass = require ('gulp-sass');
var notify = require ('gulp-notify');
var browserSync = require ('browser-sync');


//Move files in html to public/
gulp.task('html', function(){
	gulp.src('./build/html/*.html')
		.pipe(gulp.dest('./public/'));
});


//move both the templatecache service and angular app to public/js
gulp.task('scripts', ['html'], function(){
	gulp.src('./build/js/*.js')
		.pipe(gulp.dest('./public/js/'));
});

//compile SASS and then move it to public/css
//Notify when build is complete
gulp.task('build', ['scripts'], function(){
	gulp.src('./build/scss/*scss')
		.pipe(sass({
	        style: 'compressed',
	        errLogToConsole: false,
	        onError: function(err) {
	            return notify().write(err);
	        }
	    }))
		.pipe(gulp.dest('./public/css/'))
		.pipe(notify("Build - Success!"));
});

//move bower components to the library folder
gulp.task('bower', function(){
	return bower()
		.pipe(gulp.dest('./public/js/lib/'));
});

//watch these files and run the build if they update
gulp.task('watch', function(){
    gulp.watch(
        ['./build/html/*.html',
        './build/js/*.js',
        './build/scss/**/*.scss',
        './bower_components'],
        ['build']
    )
});

//Create a local web server using browser-sync
//Refresh the browser if any files change
gulp.task('serve', function () {
		var files = [
		'./public/*.html',
		'./public/**/*.js',
		'./public/css/*.css',
	];

    browserSync.init(files, {
        server: {
            baseDir: 'public/',
        }
    });
});

//default task
gulp.task('default', ['build', 'bower', 'watch', 'serve']);

