// Karma configuration

module.exports = function(config) {
    var mainBowerFiles = require('main-bower-files');

    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [].concat(mainBowerFiles({
            debugging: false,
            checkExistence: true,
            paths: {
                bowerDirectory: 'bower_components',
                bowerJson: 'bower.json'
            }
        })).concat([
            'bower_components/angular-mocks/angular-mocks.js',
            'dist/js/main.module.js',
            'dist/js/*.js',
            {
                pattern: 'dist/views/*',
                included: false
            },
            'src/test/unit/**/*.spec.js'
        ]),

        // files for preprocessors
        preprocessors: {
            'dist/js/*.js': ['coverage']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage', 'junit'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // the default configuration
        junitReporter: {
            outputDir: 'test-results', // results will be saved as $outputDir/$browserName.xml
            outputFile: 'unit-test.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
            suite: '', // suite will become the package name attribute in xml testsuite element
            useBrowserName: true // add browser name to report and classes names
        },

        // coverage reporter
        coverageReporter: {
            dir: 'coverage',
            reporters: [
                { type: 'html', subdir: 'html' },
                { type: 'json', subdir: 'json' }
            ]
        }
    });
};
