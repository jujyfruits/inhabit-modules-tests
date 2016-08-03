// Karma configuration
var path = require('path');
var configName = 'inhabit.cfg.json';

try {
    var inhabitCfg = require(path.join(process.cwd(), configName));
} catch (e) {
    throw Error('You have to create "' + configName + '" file to use this tests\n' + e);
}

try {
    var moduleAbsolutePath = path.join(path.join(process.cwd(), inhabitCfg.main));
} catch (e) {
    throw Error('Specified path of main module file is incorrect\n' + e);
}

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: './',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['browserify', 'jasmine'],

        // list of files / patterns to load in the browser
        files: [
            {pattern: 'module.test.js'},
            {pattern: moduleAbsolutePath}
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'module.test.js': ['browserify']
        },

        browserify: {
            debug: true,
            extensions: ['.js']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['dots'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Helps to address an issue on TravisCI where activity can time out
        browserNoActivityTimeout: 30000
    });
};
