var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var closureCompiler = require('google-closure-compiler').gulp();
const zip = require('gulp-zip');
const size = require('gulp-size');


gulp.task('compile', function() {

    return gulp.src('./game/*.js', {base: './'})
      .pipe(closureCompiler({
          compilation_level: 'ADVANCED',
          warning_level: 'VERBOSE',
          language_in: 'ECMASCRIPT6_STRICT',
          language_out: 'ECMASCRIPT5_STRICT',
          output_wrapper: '(function(){\n%output%\n}).call(this)',
          js_output_file: 'output.min.js'
        }))
      .pipe(gulp.dest('./dist'));
});


gulp.task('zip', function () {
    return gulp.src('./dist/*')
        .pipe(zip('test.zip'))
        .pipe(size())
        .pipe(gulp.dest('./'));
});


gulp.task('watch', function(){
    //gulp.watch('game/*.js', ['compile']);
    //gulp.watch('game/*.js',['zip'])
    browserSync.init({
        server: {
            baseDir: "./game/"
        }
    });
    gulp.watch("game/*.*").on('change', browserSync.reload);
});
