'use strict';

// Load gulp
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'log', 'del', 'main-bower-files', 'run-sequence', 'karma', 'git-rev']
});

// Global Variables
var IS_RELEASE_BUILD = $.util.env.production != null; // jshint ignore:line
var IS_DEBUG = $.util.env.debug != null; // jshint ignore:line
var IS_HOST_DEFINED = $.util.env.host != null; // jshint ignore:line
var IS_PROXY_DEFINED = $.util.env.proxy != null; // jshint ignore:line
var IS_MAINTENANCE = $.util.env.maintenance != null; // jshint ignore:line
var revision = null;

// Folder paths
var paths = {
    src: 'src',
    build: 'dist',
    scripts: 'js',
    views: 'views',
    styles: 'css',
    fonts: 'fonts',
    images: 'images'
};
paths.app = paths.src + '/app';
paths.libraries = paths.scripts + '/lib';

// File paths
var files = {
    index: 'index.html',
    templates: '**/*.tpl.html',
    css: '**/*.css',
    less: '**/*.less',
    js: '**/*.js',
    configJS: 'config.js',
    config: {
        production: 'configProd.json',
        development: 'configDev.json'
    },
    images: 'assets/images/**/*',
    fonts: 'assets/fonts/**/*',
    icons: 'assets/icons/**/*',
    karmaConfig: 'karma.conf.js'
};
files.styles = [files.css, '**/main.less'];
files.watchStyles = [files.css, files.less];

// Order of the files
var order = {
    js: [
        '**/main.module.js',
        files.js
    ]
};

// Prepend function for global usage
var prepend = function (string, array) {
    var i, item, len, returnArray;
    returnArray = [];
    if (Array.isArray(array)) {
        for (i = 0, len = array.length; i < len; i++) {
            item = array[i];
            returnArray.push(string + '/' + item);
        }
        return returnArray;
    }
    return string + '/' + array;
};

// Add leading zero to date
var addZ = function (n) {
    return n < 10 ? '0' + n : '' + n;
};

/**
 * Clean build folder and config.js
 */
gulp.task('clean', function (done) {
    return $.del([paths.build + "/**", "!" + paths.build, paths.app + '/config.js'], function (err) {
        done(err);
    });
});


/**
 * JSHint
 */
gulp.task('jshint', function () {
    return gulp.src(files.js, {
            cwd: paths.app
        })

        .pipe($.changed(paths.scripts, {
            cwd: paths.build
        }))

        //Check code with JSHint
        .pipe($.ignore.exclude('**/' + files.configJS))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.if(!IS_DEBUG, $.jshint.reporter('fail')));
});


/**
 * Process scripts
 */
gulp.task('scripts', ['jshint', 'config'], function () {
    return gulp.src(files.js, {
            cwd: paths.app
        })

        .pipe($.changed(paths.scripts, {
            cwd: paths.build
        }))

        // Wrap in codes to avoid globals
        .pipe($.wrap('(function(){\n<%= contents %>\n})(this);'))

        // Flatten sources
        .pipe($.flatten())

        // Ignore spec files in release build
        .pipe($.if(IS_RELEASE_BUILD, $.ignore('*.spec.js')))

        // Order JS files
        .pipe($.if(IS_RELEASE_BUILD, $.order(order.js)))

        // Debug for order check
        .pipe($.if(IS_DEBUG, $.debug()))

        .pipe($.if(IS_RELEASE_BUILD, $.concat('app.js')))
        .pipe($.if(IS_RELEASE_BUILD, $.ngAnnotate()))
        .pipe($.if(IS_RELEASE_BUILD, $.uglify()))
        .pipe($.if(IS_RELEASE_BUILD, $.rev()))

        .pipe(gulp.dest(paths.scripts, {
            cwd: paths.build
        }));
});


/**
 * Compile LESS files to build folder
 */
gulp.task('styles', ['fonts'], function () {
    var lessFilter = $.filter(['**/main.less'], {restore: true});

    return gulp.src(files.styles, {
            cwd: paths.src
        })

        // Filter less files and compile them
        .pipe(lessFilter)

        // Debug for order check
        .pipe($.if(IS_DEBUG, $.debug()))

        .pipe($.less())
        .on('error', function (error) {
            console.log(error);
            process.exit(1);
        })

        // Restore filter to include css files too
        .pipe(lessFilter.restore)

        // Add vendor css files
        .pipe($.addSrc($.mainBowerFiles(files.css)))
        .pipe($.flatten())

        // Debug for order check
        .pipe($.if(IS_DEBUG, $.debug()))

        .pipe($.if(IS_RELEASE_BUILD, $.concat('style.css')))
        .pipe($.if(IS_RELEASE_BUILD, $.cssnano({ zindex: false })))
        .pipe($.if(IS_RELEASE_BUILD, $.rev()))

        // If its not release, then livereload
        .pipe($.if(!IS_RELEASE_BUILD, $.livereload()))

        .pipe(gulp.dest(paths.styles, {
            cwd: paths.build
        }));
});


/**
 * Compile templates and copy HTML files to paths.views
 */
gulp.task('templates', function () {
    return gulp.src(files.templates, {
            cwd: paths.app
        })

        // Check if changed
        .pipe($.changed(paths.views, {
            cwd: paths.build
        }))

        // Flatten sources
        .pipe($.flatten())

        .pipe($.if(IS_RELEASE_BUILD, $.htmlmin()))
        .pipe($.if(IS_RELEASE_BUILD, $.angularTemplatecache({
            module: 'angularApp',
            root: paths.views
        })))
        .pipe($.if(IS_RELEASE_BUILD, $.rev()))
        .pipe($.if(IS_RELEASE_BUILD, $.uglify()))

        //If its not release, then livereload
        .pipe($.if(!IS_RELEASE_BUILD, $.livereload()))

        .pipe(gulp.dest(paths.views, {
            cwd: paths.build
        }));
});


/**
 * Copy fonts to paths.fonts
 */
gulp.task('fonts', function () {
    // Get fonts from bower_components
    gulp.src($.mainBowerFiles(['**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff', '**/*.woff2']))

        // Check if changed
        .pipe($.changed(paths.fonts, {
            cwd: paths.build
        }))

        // If its not release, then livereload
        .pipe($.if(!IS_RELEASE_BUILD, $.livereload()))

        .pipe(gulp.dest(paths.fonts, {
            cwd: paths.build
        }));

    // Get fonts from files.fonts
    return gulp.src(files.fonts, {
            cwd: paths.src
        })

        // Check if changed
        .pipe($.changed(paths.fonts, {
            cwd: paths.build
        }))

        // If its not release, then livereload
        .pipe($.if(!IS_RELEASE_BUILD, $.livereload()))

        .pipe(gulp.dest(paths.fonts, {
            cwd: paths.build
        }));
});


/**
 * Get images from files.images
 */
gulp.task('images', function () {
    return gulp.src(files.images, {
            cwd: paths.src
        })

        //Check if changed
        .pipe($.changed(paths.images, {
            cwd: paths.build
        }))

        //If it's a release build, then compress them
        .pipe($.if(IS_RELEASE_BUILD, $.imagemin(
            [$.imagemin.gifsicle(), $.imagemin.jpegtran(), $.imagemin.optipng(), $.imagemin.svgo()],
            {
                verbose: true
            })))

        //If its not release, then livereload
        .pipe($.if(!IS_RELEASE_BUILD, $.livereload()))

        .pipe(gulp.dest(paths.images, {
            cwd: paths.build
        }));
});


/**
 * Extras - Get extra files (currently only .icon files)
 */
gulp.task('icons', function () {
    return gulp.src(files.icons, {
            cwd: paths.src
        })

        .pipe(gulp.dest(paths.build));
});


/**
 * Version - Get version information from git revision
 */
gulp.task('version', function(cb) {
    return $.gitRev.short(function(data) {
        revision = data;
        cb();
    });
});


/**
 * Config - Use different config files for production and development
 */
gulp.task('config', ['version'], function () {
    var source = (IS_RELEASE_BUILD) ? files.config.production : files.config.development;
    var date = new Date();

    return gulp.src(source, {
            cwd: paths.app
        })

        .pipe($.jsonEditor({
            ENV: {
                'revision': revision,
                'build': date.getFullYear() + '-' + addZ((date.getMonth() + 1)) + '-' + addZ(date.getDate()) + ' ' +
                addZ(date.getHours()) + ':' + addZ(date.getMinutes())
            }
        }))

        .pipe($.if(IS_PROXY_DEFINED, $.jsonEditor({
            ENV: {
                'apiEndpoint': $.util.env.proxy
            }
        })))

        .pipe($.if(IS_MAINTENANCE, $.jsonEditor({
            ENV: {
                'maintenance': $.util.env.maintenance
            }
        })))

        .pipe($.ngConfig('angularApp', {
            createModule: false,
            wrap: true
        }))

        .pipe($.rename(files.configJS))
        .pipe(gulp.dest(paths.app));
});


/**
 * Compile index and inject css and scripts tags
 */
gulp.task('index', ['styles', 'images', 'icons', 'scripts', 'templates'], function () {
    // Add scripts
    var scripts = gulp.src(order.js, {
            cwd: paths.build,
            read: false
        })

        // Ignore libs
        .pipe($.ignore('**/lib/*.js'))

        // Order js files
        .pipe($.order(order.js));

    // Add styles
    var styles = gulp.src(paths.styles + '/*.css', {
            cwd: paths.build,
            read: false
        })

        // Order css files
        .pipe($.order(order.css));

    // Add libraries from bower
    var libraries = gulp.src($.mainBowerFiles({
            debugging: IS_DEBUG,
            checkExistence: true
        }))

        .pipe($.ignore.include(files.js))

        //Debug for order check
        .pipe($.if(IS_DEBUG, $.debug()))

        .pipe($.if(IS_RELEASE_BUILD, $.concat('libs.js')))
        .pipe($.if(IS_RELEASE_BUILD, $.ngAnnotate()))
        .pipe($.if(IS_RELEASE_BUILD, $.uglify()))
        .pipe($.if(IS_RELEASE_BUILD, $.rev()))
        .pipe(gulp.dest(paths.libraries, {
            cwd: paths.build
        }));

    // Generate index.html
    return gulp.src(files.index, {
            cwd: paths.app
        })

        .pipe($.inject(libraries, {
            addRootSlash: false,
            name: 'libraries'
        }))
        .pipe($.inject(scripts, {
            addRootSlash: false
        }))
        .pipe($.inject(styles, {
            addRootSlash: false
        }))
        .pipe($.if(IS_RELEASE_BUILD, $.htmlmin()))
        .pipe(gulp.dest(paths.build));
});


/**
 * Watch if resources change
 */
gulp.task('watch', ['index'], function () {
    if (!IS_RELEASE_BUILD) {
        $.livereload.listen();
        gulp.watch(prepend(paths.app, files.index), ['index']);
        gulp.watch(prepend(paths.app, files.templates), ['templates']);
        gulp.watch(prepend(paths.app, files.watchStyles), ['styles', 'index']);
        gulp.watch(prepend(paths.app, files.js), ['index']);
    }
});


/**
 * Start a dev webserver
 */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
gulp.task('serve', ['index', 'watch'], function () {
    gulp.src(paths.build)
        .pipe($.webserver({
            livereload: true,
            open: true,
            https: false,
            host: (IS_HOST_DEFINED) ? $.util.env.host : undefined,
            port: 8000
        }));
});

/**
 * Concat clean and index
 */
gulp.task('clean index', function (callback) {
    $.runSequence('clean', 'index', callback);
});


/**
 * Concat clean and serve
 */
gulp.task('clean serve', function (callback) {
    $.runSequence('clean', 'serve', callback);
});


/**
 * Run every test
 */
gulp.task('test', function (callback) {
    $.runSequence('clean', 'index', 'test:unit', 'enforce-coverage', callback);
});


/**
 * Run Unit tests with karma
 */
gulp.task('test:unit', function (done) {
    var path = prepend(__dirname, files.karmaConfig);

    var config = {
        configFile: path,
        singleRun: true,
        browsers: ['PhantomJS'],
        reporters: ['progress', 'coverage', 'junit']
    };

    new $.karma.Server(
        config,
        function (status) {
            done(status ? 'There are failing unit tests' : undefined);
        }).start();
});


/**
 * Enforce coverage for tests (values are in percent)
 */
gulp.task('enforce-coverage', function () {
    var options = {
        thresholds : {
            statements : 0,
            branches : 0,
            lines : 0,
            functions : 0
        },
        coverageDirectory : 'coverage/json',
        rootDirectory : ''
    };

    return gulp.src('.')
        .pipe($.istanbulEnforcer(options));
});


/**
 * Gulp default task
 */
gulp.task('default', function (callback) {
    $.runSequence('clean', 'serve', callback);
});
