// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2016-02-24 using
// generator-karma 1.0.1
var karmaArgumentObject = {};
const APP_FOLDER_NAME = 'app';
const APP_TEST_FOLDER_NAME = 'test';
const APP_BASE_PATH = '';
var PRE_PROCESSOR = '';
const FILESYSTEM = require('fs');
module.exports = function(config) {
  'use strict';
  karmaArgumentObject = initKarmaArguments();
   console.log("*******: "+karmaArgumentObject.module);
  PRE_PROCESSOR = JSON.parse('{"app/' + karmaArgumentObject.module + '/scripts/' + karmaArgumentObject.appJSPath + '/**/*.js":["coverage"]}');
   console.log("----PRE_PROCESSOR-----");
      console.log(PRE_PROCESSOR);


  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: APP_BASE_PATH,

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'jasmine'
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
      'app/common/templates/**/*.html',

      'app/' + karmaArgumentObject.module + '/scripts/controllers/**/*.js',
      'app/' + karmaArgumentObject.module + '/scripts/partials/**/*.html',
      'app/' + karmaArgumentObject.module + '/scripts/services/**/*.js',
      'app/' + karmaArgumentObject.module + '/scripts/' + karmaArgumentObject.appJSPath + 'controllers/**/*.js',
      'app/' + karmaArgumentObject.module + '/scripts/' + karmaArgumentObject.appJSPath + 'partials/**/*.html',
      'app/' + karmaArgumentObject.module + '/scripts/' + karmaArgumentObject.appJSPath + 'services/**/*.js',
      'app/' + karmaArgumentObject.module + '/scripts/' + karmaArgumentObject.appJSPath + 'barmain.js',

      //Tests
      'test/' + karmaArgumentObject.module + '/spec/' + karmaArgumentObject.appJSPath + 'controllers/**/*.js',
      'test/' + karmaArgumentObject.module + '/spec/' + karmaArgumentObject.appJSPath + 'partials/**/*.js',
      'test/' + karmaArgumentObject.module + '/spec/' + karmaArgumentObject.appJSPath + 'services/**/*.js',
    ],

    // list of files / patterns to exclude
    exclude: karmaArgumentObject.excludePath,

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
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-ng-html2js-preprocessor',
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-junit-reporter',
      'karma-coverage'
    ],
    reporters: ['progress', 'coverage', 'dots', 'junit'],
    preprocessors: PRE_PROCESSOR,
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
      outputFile: 'coverage/' + karmaArgumentObject.module + '/' + karmaArgumentObject.appJSPath + 'test-results.xml'
    },

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
    coverageReporter: {
      type: 'html',
      dir: 'coverage/' + karmaArgumentObject.module + '/' + karmaArgumentObject.appJSPath,
      reporters: [{
        type: 'html',
        subdir: 'html'
      }, {
        type: 'cobertura',
        subdir: 'cobertura'
      }, {
        type: 'lcov',
        subdir: 'report-lcov'
      }, {
        type: 'lcovonly',
        subdir: 'lcovonly',
        file: 'report-lcovonly.txt'
      }, {
        type: 'teamcity',
        subdir: 'teamcity',
        file: 'teamcity.txt'
      }, {
        type: 'text',
        subdir: 'text',
        file: 'text.txt'
      }, {
        type: 'text-summary',
        subdir: 'text-summary',
        file: 'text-summary.txt'
      }]
    }
  });
     console.log("----PRE_PROCESSOR222-----");
      console.log(PRE_PROCESSOR);
};

function checkArgument() {
  //ignore first 3 arguments in node
  var nodeInputArguments = process.argv.slice(3);

  //Convert arguments to a JSON
  var argumentObject = {};
  var objectKey, objectValue;
  var argumentsArray;

  //Read all arguments and write them in JSON
  nodeInputArguments.forEach(function(arguments) {

    //Prepare the Key and Value
    argumentsArray = arguments.split('=');
    if (argumentsArray.length == 2) {
      //Expect arguments to start with --
      objectKey = argumentsArray[0].replace('--', "");
      objectValue = argumentsArray[1];
    } else {
      console.log("Invalid argument format or no value entered, please use --arg=<value>");
      return;
    }
    argumentObject[objectKey] = objectValue;
  });
  return argumentObject;
}

function getAppJSPath(argumentsObject) {
  var tempObject = argumentsObject;
  var excludedCollection = new Array();
  if (tempObject.country) {
    tempObject.country = tempObject.country.toLowerCase();
    tempObject['appJSPath'] = 'geo/' + tempObject.country + '/';
    tempObject['appCountryFolder'] = 'app/' + tempObject.module + '/scripts/' + tempObject.appJSPath;
    tempObject['appKarmaCountryFiles'] = getAllFilesFromFolder(APP_FOLDER_NAME, APP_TEST_FOLDER_NAME, __dirname + '//' + tempObject.appCountryFolder);
    tempObject['excludePath'] = replacePathinArray(tempObject.appKarmaCountryFiles, tempObject.appJSPath, "");
    tempObject['excludePath'] = removeNonExistingFiles(tempObject['excludePath']);
  } else {
    tempObject['appJSPath'] = '';
    tempObject['excludePath'] = new Array();
    tempObject.excludePath.push('app/' + tempObject.module + '/scripts/geo/**/*.js');
    tempObject.excludePath.push('test/' + tempObject.module + '/spec/geo/**/*.js');
  }
  return tempObject;
}

function initKarmaArguments() {
  return getAppJSPath(checkArgument());
}

function getAllFilesFromFolder(appFolderName, testFolderName, dir) {
  var cleanSourceFileName, cleanSpecFileName;
  var results = new Array();

  FILESYSTEM.readdirSync(dir).forEach(function(file) {
    file = dir + '/' + file;
    var stat = FILESYSTEM.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFilesFromFolder(appFolderName, testFolderName, file))
    } else {
      cleanSourceFileName = file.replace(__dirname, "");
      cleanSpecFileName = cleanSourceFileName;
      cleanSourceFileName = cleanSourceFileName.replace('//' + appFolderName, appFolderName);
      cleanSourceFileName = cleanSourceFileName.replace('//', '/');
      cleanSpecFileName = cleanSpecFileName.replace('//' + appFolderName, testFolderName);
      cleanSpecFileName = cleanSpecFileName.replace('//', '/');
      cleanSpecFileName = cleanSpecFileName.replace('/scripts/', '/spec/');
      cleanSpecFileName = cleanSpecFileName.replace('.js', 'Spec.js');
      results.push(cleanSourceFileName);
      results.push(cleanSpecFileName);
    }
  });
  return results;
}

function replacePathinArray(filePathArray, originalValue, replacedValue) {
  var filePathCollection = new Array();
  filePathArray.forEach(function(item) {
    filePathCollection.push(item.replace(originalValue, replacedValue));
  });
  return filePathCollection;
}

function removeNonExistingFiles(fileArrayList) {
  var tempFileArray = fileArrayList;
  for (var index = tempFileArray.length - 1; index >= 0; index--) {

    try {
      FILESYSTEM.accessSync(tempFileArray[index], FILESYSTEM.F_OK);
    } catch (e) {
      // It isn't accessible
      if (index > -1) {
        tempFileArray.splice(index, 1);
      }
    }
  }
  return fileArrayList;
}
