module.exports = function () {
    'use strict';

    var client = './src/client/';
    var clientApp = client + 'app/';

    var config = {
        alljs: [
            './src/**/*.js',
            './*.js'
        ],

        client: client,

        temp: './.tmp/',

        index: client + 'index.html',
        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js'
        ],

        less: client + 'styles/styles.less',

        bower: {
            json: require('./bower.json'),
            directory: './bower_components',
            ignorePath: '../..'
        }

    };

    config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;

    };


    return config;

};
