/*jshint node:true*/
'use strict';


/**
 * @see http://expressjs.com/
 * @type {function}
 */
var express = require('express');


/**
 * @see http://expressjs.com/
 * @type {function}
 */
var app = express();


/**
 * @see https://github.com/expressjs/body-parser
 * @type {function}
 */
var bodyParser = require('body-parser');


/**
 * @see https://www.npmjs.com/package/cors
 * @type {function}
 */
var compress = require('compression');


/**
 * @see https://www.npmjs.com/package/cors
 * @type {function}
 */
var cors = require('cors');


/**
 * @type {object}
 */
var errorHandler = require('./routes/utils/errorHandler')();


/**
 * @see https://www.npmjs.com/package/serve-favicon
 * @type {function}
 */
var favicon = require('serve-favicon');


/**
 * @see https://www.npmjs.com/package/morgan
 * @type {function}
 */
var logger = require('morgan');


/**
 * @type {number}
 */
var port = process.env.PORT || 7203;

/**
 * {function}
 */
var routes;

var environment = process.env.NODE_ENV;

app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(compress());
app.use(logger('dev'));
app.use(cors());

app.use(errorHandler.init);

routes = require('./routes/index')(app);
console.log(typeof routes);

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

app.get('/ping', function (req, res, next) {
    console.log(req.body);
    res.send('pong');
});

switch (environment) {
case 'build':
    console.log('** BUILD **');
    app.use(express.static('./build/'));
    app.use('/*', express.static('./build/index.html'));
    break;
default:
    console.log('** DEV **');
    app.use(express.static('./src/client/'));
    app.use(express.static('./'));
    app.use(express.static('./tmp'));
    app.use('/*', express.static('./src/client/index.html'));
    break;
}

app.listen(port, function () {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
        '\n__dirname = ' + __dirname +
        '\nprocess.cwd = ' + process.cwd());
});
