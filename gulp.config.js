module.exports = function () {
    'use strict';

    var client = './src/client/';

    var config = {

        temp: './.tmp/',

        alljs: [
            './src/**/*.js',
            './*.js'
        ],

        less: client + 'styles/styles.less'
    };

    return config;

};
