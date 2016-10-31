var gulp = require('gulp');


var args = require('yargs').argv;



/**
 * Returns an object with the following properties:
 *  - client,
 *  - config,
 *  - temp,
 *  - allJs
 * @type {Object}
 */
var config = require('./gulp.config')();



var del = require('del'); // not a gulp package; just NPM



var $ = require('gulp-load-plugins')({
    lazy: true
});



// var jshint = require('gulp-jshint');
// var jscs = require('gulp-jscs');
// var util = require('gulp-util');
// var lodash = require('lodash');
// var gulpprint = require('gulp-print');
// var gulpif = require('gulp-if');



// Are we in verbose mode
var isVerbose = args.verbose;


///  other stuffs



/**
 * Log stuffs
 * @param {Mixed} msg String or array of strings
 */
function log(msg) {
    'use strict';

    if (typeof msg === 'object') {
        msg.forEach(function (i) {
            $.util.log($.util.colors.blue(i));
        });
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}


/**
 * [clean description]
 * @param  {String}   path Path from which to delete files
 * @param  {Function} callback   Callback function
 * @return {Undefined}
 */
function clean(path, callback) {
    'use strict';
    log('Cleaning ' + $.util.colors.blue(path));
    del(path, callback);
}


gulp.task('vet', function () {
    'use strict';
    log('Analyzing source with jscs and jshint');
    return gulp
        .src(config.alljs)
        .pipe($.if(isVerbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe($.jshint.reporter('fail'));
});


/**
 * Uses plumber to handle errors encountered during less transpilation more
 * gracefully.
 *
 * @see gulp plumber https://www.npmjs.com/package/gulp-plumber
 */
gulp.task('styles', ['clean-styles'], function () {
    'use strict';
    log('Compiling Less to CSS');
    return gulp
        .src(config.less)
        .pipe($.plumber())
        .pipe($.less())
        .pipe($.autoprefixer({
            browsers: ['last 2 version', '> 5%']
        }))
        .pipe(gulp.dest(config.temp));
});

/**
 * Clean styles from .tmp
 *
 * @param  {Function} Callback function.
 * @return {[type]}     [description]
 */
gulp.task('clean-styles', function (callback) {
    'use strict';
    /**
     * The location of the files to delete
     * @type {String}
     */
    var loc = config.temp + '**/*.css';
    clean(loc, callback);
    callback();
});


/**
 * Watch for changes in Less location, and when changes occur, trigger
 * 'styles' task to run.
 * @return {Undefined}
 */
gulp.task('less-watcher', function () {
    'use strict';
    gulp.watch([config.less], ['styles']);
});



gulp.task('wiredep', function () {
    'use strict';
    log('Wire up the bower css js and our app js into the html');
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;
    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js)))
        .pipe(gulp.dest(config.client));
});



gulp.task('inject', ['wiredep', 'styles'], function () {
    'use strict';
    log('Wire up the app css into the html, and call wiredep');

    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.css)))
        .pipe(gulp.dest(config.client));
});
