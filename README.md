# Gulp


1.
gulp.task (define a task)
js (jscs, jshint)

precompile (transpile), tests, optimizing, serve app

----------------------------------------------
2.
gulp.src (read files into stream)



----------------------------------------------
3.
gulp.dest (write the files, do stuffs to thems)


----------------------------------------------
4.
gulp.watch (watch files for changes)

----------------------------------------------



Pipeline
--------
- dev
- analyze
- test 
- build 
- deploy



1) gulp.task('taskname', ['jscs', 'jshint'], function () {
    return gulp
        .src('./src/**/*.js')
        .pipe(concat())
})






* [Pluralsight course](https://github.com/johnpapa/pluralsight-gulp)
