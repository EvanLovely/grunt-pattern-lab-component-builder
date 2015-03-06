/*
 * pattern-lab-component-builder
 *
 *
 * Copyright (c) 2014 Evan Lovely
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['test/dest*']
    },

    // Configuration to be run (and then tested).
    pattern_lab_component_builder: {
      colors: {
        options: {
          'regex': "^\\$color--.*",
          allow_var_values: false
        },
        src: 'test/src/*.scss',
        dest: 'test/dest/colors.json'
      },
      fonts: {
        options: {
          regex: "^\\$type.*"
        },
        src: ['test/src/fonts.scss'],
        dest: 'test/dest/fonts.json'
      },
      nullSearch: {
        options: {
          regex: "^\\$asdf.*"
        },
        src: ['test/src/fonts.scss'],
        dest: 'test/dest/nullSearch.json'
      },
      globSearch: {
        options: {
          //regex: "^\\$.*"
        },
        src: ['test/src/*.scss'],
        dest: 'test/dest/globSearch.json'
      },
      missingFile: {
        src: ['test/src/mia.scss'],
        dest: 'test/dest/mia.json'
      }
    },

    watch: {
      plugin: {
        options: {
          atBegin: true
        },
        files: [
          'Gruntfile.js',
          'tasks/*'
        ],
        tasks: [
          'pattern_lab_component_builder'
        ]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    },

    bump: {// https://github.com/vojtajina/grunt-bump
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', [
    'clean',
    'pattern_lab_component_builder'
//    'nodeunit'
  ]);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
