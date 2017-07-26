// Generated on 2016-02-18 using generator-angular 0.15.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);
   var proxy = require('http-proxy-middleware');
   grunt.loadNpmTasks('grunt-connect-proxy');

  // Automatically load required Grunt tasks
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates',
    cdnify: 'grunt-google-cdn',
    ngconstant: 'grunt-ng-constant',
    angularFileLoader: 'angular-file-loader'
  });

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    modules: 'bar',
    appJSFilePath: 'barmain.js',
    test: 'test',
    sonarIP: 'localhost',
    sonarPort: '9000',
    dist: 'dist',
    mock: 'json'
  };

  //Set default module to bar
  grunt.config.set('bar.modules', 'bar');

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    bar: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= bar.app %>/<%= bar.modules %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all', 'newer:jscs:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/<%= bar.modules %>/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'newer:jscs:test', 'karma']
      },
      compass: {
        files: ['<%= bar.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'postcss:server']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= bar.app %>/{,*/,**/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= bar.app %>/img/{,*/,**/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    scsslint: {
      allFiles: [
        '<%= bar.app %>/styles/**/*.scss',
      ],
      options: {
        bundleExec: true,
        reporterOutput: 'coverage/styles/scss-lint-report.xml',
        colorizeOutput: true,
        emitSuccess: true,
        config: '.scss-lint.yml',
        compact: true,
        force: true
      },
    },

    hologram: {
      generate: {
        options: {
          config: 'styleguide/hologram_config.yml'
        }
      }
    },
    sonarRunner: {
      bar: {
        options: {
          debug: true,
          separator: '\n',
          sonar: {
            scm: {
              provider: 'git'
            },
            host: {
              url: 'http://localhost:9090'
            },
            projectKey: 'sonar:grunt-sonar-runner:0.1.0',
            projectName: 'Dynamic Bar Graph',
            projectVersion: '0.10',
            sources: ['app/bar'].join(','),
            language: 'js',
            sourceEncoding: 'UTF-8'
          }
        }
      },
      main: {
        options: {
          debug: true,
          separator: '\n',
          sonar: {
            host: {
              url: 'http://localhost:9191'
            },
            projectKey: 'bar:bar:0.1.0',
            projectName: 'Dynamic Bar Graph',
            projectVersion: '0.10',
            sources: ['app/common'].join(','),
            language: 'js',
            sourceEncoding: 'UTF-8'
          }
        }
      }
    },
    karmaSonar: {
      options: {
        defaultOutputDir: '.tmp/sonar/custom_options/',
        instance: {
          hostUrl: 'http://<%= bar.sonarIP %>:<%= bar.sonarPort %>'
        }

      },
      bar: {
        project: {
          key: 'bar:bar:0.1.0',
          name: 'Bar App',
          version: '0.10'
        },
        paths: [{
          framework: 'jasmine',
          cwd: '.', // the current working directory'
          src: 'app/bar', // the source directory within the cwd
          test: 'test/bar', // the test directory within the cwd
          reports: {
            coverage: 'coverage/bar/lcovonly/report-lcovonly.txt' //, // the glob for lcov files'
          }
        },{
          framework: 'jasmine',
          cwd: '.', // the current working directory'
          src: 'app/common', // the source directory within the cwd
          test: 'test/main', // the test directory within the cwd
          reports: {
            coverage: 'coverage/main/lcovonly/report-lcovonly.txt' //, // the glob for lcov files'
          }
        }],
        exclusions: []
      }
    },
    // The actual grunt server settings
    connect: {
      options: {
        port: 2205,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      proxies: [
          {
              context: '/',
              host: 'localhost',
              port: 8198,
              https: false,
              xforward: false,
              headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Methods' : '*',
                  'Access-Control-Allow-Credentials' : 'true'
              },
              hideHeaders: ['x-removed-header']
          }
      ],
      livereload: {
        options: {
          open: true,
          middleware: function(connect) {
            return [
              connect.static('data'),
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/app/styles',
                connect.static('./app/styles')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9055,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                  '/bower_components',
                  connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= bar.dist %>/<%= bar.modules %>'
        }
      }
    },

    // Make sure there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= bar.app %>/<%= bar.modules %>/scripts/{,*/}*.js'
        ]
      }
    },

    // Make sure code styles are up to par
    jscs: {
      options: {
        config: '.jscsrc',
        verbose: true
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= bar.app %>/<%= bar.modules %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        src: ['test/<%= bar.modules %>/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= bar.dist %>/<%= bar.modules %>',
            '!<%= bar.dist %>/<%= bar.modules %>/.git{,*/}*'
          ]
        }]
      },
      json: {
        files: [{
          dot: true,
          src: [
            '<%= bar.app %>/common/json/*'
          ]
        }]
      },
      main: {
        files: [{
          dot: true,
          src: [
            '<%= bar.dist %>/main'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    postcss: {
      options: {
        processors: [
          require('autoprefixer-core')({
            browsers: ['> 2%', 'iOS 8']
          })
        ]
      },
      server: {
        options: {
          map: true
        },
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Angular components into the app
    angularFileLoader: {
      options: {
        scripts: [
           '<%= bar.app %>/<%= bar.modules %>/scripts/<%= bar.appJSFilePath%>',
           '<%= bar.app %>/<%= bar.modules %>/scripts/directives/**/*.js',
           '<%= bar.app %>/<%= bar.modules %>/scripts/controllers/**/*.js',
           '<%= bar.app %>/<%= bar.modules %>/scripts/services/**/*.js',
           '<%= bar.app %>/<%= bar.modules %>/scripts/filters/**/*.js',
           '<%= bar.app %>/common/**/*.js',
           '<%= bar.app %>/common/**/*.json'
        ]
      },
      target: {
        src: ['<%= bar.app %>/index.html']
      },
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= bar.app %>/index.html'],
        ignorePath: /\.\.\//
      },
      test: {
        devDependencies: true,
        src: '<%= karma.unit.configFile %>',
        ignorePath: /\.\.\//,
        fileTypes: {
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
            detect: {
              js: /'(.*\.js)'/gi
            },
            replace: {
              js: '\'{{filePath}}\','
            }
          }
        }
      },
      sass: {
        src: ['<%= bar.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= bar.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/img/generated',
        imagesDir: '<%= bar.app %>/img',
        javascriptsDir: '<%= bar.app %>/scripts',
        fontsDir: '<%= bar.app %>/fonts',
        importPath: './bower_components',
        httpImagesPath: '/img',
        httpGeneratedImagesPath: '/img/',
        httpFontsPath: '/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= bar.dist %>/<%= bar.modules %>/img/'
        }
      },
      server: {
        options: {
          sourcemap: true
        }
      }
    },

    // Renames files for browser caching purposes
    // filerev: {
    // dist: {
    // src: [
    // '<%= bar.dist %>/<%= bar.modules %>/scripts/{,*/}*.js',
    // '<%= bar.dist %>/<%= bar.modules %>/styles/{,*/}*.css',
    // '<%= bar.dist %>/<%= bar.modules %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
    // '<%= bar.dist %>/<%= bar.modules %>/fonts/*'
    // ]
    // }
    // },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= bar.app %>/index.html',
      options: {
        dest: '<%= bar.dist %>/<%= bar.modules %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= bar.dist %>/<%= bar.modules %>/{,*/}*.html'],
      css: ['<%= bar.dist %>/<%= bar.modules %>/styles/{,*/}*.css'],
      js: ['<%= bar.dist %>/<%= bar.modules %>/scripts/{,*/}*.js'],
      options: {
        assetsDirs: [
          '<%= bar.dist %>/<%= bar.modules %>',
          '<%= bar.dist %>/<%= bar.modules %>/img',
          '<%= bar.dist %>/<%= bar.modules %>/styles'
        ],
        patterns: {
          js: [
            [/(img\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']
          ]
        }
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    // dist: {
    // files: {
    // '<%= bar.dist %>/<%= bar.modules %>/styles/main.css': [
    // '.tmp/styles/{,*/}*.css'
    // ]
    // }
    // }
    // },
    // uglify: {
    // dist: {
    // files: {
    // '<%= bar.dist %>/<%= bar.modules %>/scripts/scripts.js': [
    // '<%= bar.dist %>/<%= bar.modules %>/scripts/scripts.js'
    // ]
    // }
    // }
    // },
    // concat: {
    // dist: {}
    // },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= bar.app %>/img',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= bar.dist %>/<%= bar.modules %>/img'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= bar.app %>/img',
          src: '{,*/}*.svg',
          dest: '<%= bar.dist %>/<%= bar.modules %>/img'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true
        },
        files: [{
          expand: true,
          cwd: '<%= bar.dist %>/<%= bar.modules %>',
          src: ['*.html'],
          dest: '<%= bar.dist %>/<%= bar.modules %>'
        }]
      }
    },

    ngtemplates: {
      dist: {
        options: {
          module: 'bar-graph-dynamic',
          htmlmin: '<%= htmlmin.dist.options %>',
          usemin: '<%= bar.dist %>/<%= bar.modules %>/scripts/scripts.js'
        },
        cwd: '<%= bar.app %>',
        src: ['<%= bar.modules %>/scripts/**/*.html', 'common/templates/**/*.html'],
        dest: '.tmp/templates.js'
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= bar.dist %>/<%= bar.modules %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= bar.app %>',
          dest: '<%= bar.dist %>/<%= bar.modules %>',
          src: [
            '*.{ico,png,txt}',
            '*.html',
            'img/{,*/,**/}*.{png,jpg,jpeg,gif,webp,svg}',
            'fonts/{,*/,**/}*',
            'app/common/json/*.json'
          ]
        }, {
          expand: true,
          cwd: '.tmp/img',
          dest: '<%= bar.dist %>/<%= bar.modules %>/img',
          src: ['generated/*']
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= bar.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },
    injector: {
      options: {
        // Task-specific options go here.
        transform: function(filepath) {
          var path = require('path');
          var tempPath = filepath.replace('/.tmp/', '');
          
          var extension = path.extname(filepath).slice(1);
          var injectString = '';
          switch (extension) {
            case 'css':
              injectString = '<link rel="stylesheet" href="' + tempPath + '">';
              break;
            case 'js':
              injectString = '<script src="' + tempPath + '"></script>';
              break;
            case 'json':
            break;
            case 'html':
              injectString = '<link rel="import" href="' + tempPath + '">';
              break;
            default:
              injectString = '';
          }
          return injectString;
        }
      },
      dependencies: {
        // Target-specific file lists and/or options go here.
        files: {
          '<%= bar.app %>/index.html': ['.tmp/styles/main.css', '.tmp/styles/main.css', 'app/common/json/*.json'],
        }
      },
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      dist: [
        'compass:dist',
        //'imagemin',
        //'svgmin'
      ],
      style: [
        'compass:dist'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    ngconstant: {
      // Options for all targets
      options: {
        space: ' ',
        wrap: '"use strict";\n\n {%= __ngModule %}',
        name: 'config',
      },
      apimock: {
        options: {
          dest: '<%= bar.app %>/common/services/Environment.js'
        },
        constants: {
          BASE_URL: {
            name: 'apimock',
            apiEndpoint: 'http://192.168.1.71:3000'
          }
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-scss-lint');
  var env = grunt.option('env') || 'test';

  grunt.registerTask('sonar', 'Sends data to SOnar web server', function(ip, port) {
    if(ip !== undefined)
         grunt.config.set('bar.sonarIP', ip);
    if(port !== undefined)
      grunt.config.set('bar.sonarPort', port);
    switch (env) {
      case 'noruby':
          grunt.task.run('test');
          grunt.task.run('karmaSonar');
        break;
      case 'test':
      default:
          grunt.task.run('test');
          grunt.task.run('karmaSonar');
        break;
    }

  });

  grunt.registerTask('serve', 'Compile then start a connect web server', function(module, target) {

    var param = grunt.option('env');
    console.log('env -> ',env);


    if (env === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'injector',
      'clean:server',
      'angularFileLoader',
      'wiredep',
      'ngconstant:' + env,
      'concurrent:server',
      'postcss:server',
      'configureProxies:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function(target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'wiredep',
    'concurrent:test',
    'postcss',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('ensurePhantomJsPath', function () {
      process.env.PHANTOMJS_BIN = './node_modules/phantomjs-prebuilt/bin/phantomjs';
      console.log(process.env.PHANTOMJS_BIN);
  });
};
