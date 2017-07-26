
module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      "jasmine"
    ],
    // list of files / patterns to load in the browser
    files: [

      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
      'bower_components/angular-translate-storage-local/angular-translate-storage-local.js',
      'bower_components/angular-translate-handler-log/angular-translate-handler-log.js',
      'bower_components/angular-dynamic-locale/src/tmhDynamicLocale.js',
      'bower_components/what-input/what-input.js',
      'bower_components/foundation-sites/dist/foundation.js',
      'bower_components/highcharts/highcharts.js',
      'bower_components/highcharts/highcharts-more.js',
      'bower_components/highcharts/modules/exporting.js',
      'bower_components/underscore/underscore.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'app/common/**/*.js',
      'app/bar/scripts/controllers/**/*.js',
      'app/bar/scripts/partials/**/*.html',
      'app/bar/scripts/services/**/*.js',
      'app/bar/scripts/barmain.js',

      //Tests
      'test/bar/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8081,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'Chrome'
    ],

    // Which plugins to enable
    plugins: [
      "karma-ng-html2js-preprocessor",
      "karma-phantomjs-launcher",
      "karma-jasmine",
      "karma-chrome-launcher"
    ],

    preprocessors: {
      'app/bar/scripts/partials/landing/*.html':['ng-html2js']
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'app',
      moduleName: 'ngTemplates' //you can name this whatever you want
    },


    reporters: ['progress', 'coverage', 'dots', 'junit', 'html'],

    proxyValidateSSL: false,
    // ngHtml2JsPreprocessor: {
    //     moduleName: 'myTemplates',
    //     cacheIdFromPath: function(filepath) {
    //         return filepath.match(/\/app\/common\/templates\/.*\html./);
    //     }
    // },

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,
    junitReporters: {
      outputFile: 'test-results.xml'
    },

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,
  });
};
