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
      tests: ['tmp/*']
    },

    // Configuration to be run (and then tested).
    pattern_lab_component_builder: {
      colors: {
        options: {
          component: 'colors',
          template: 'templates/colors.mustache',
          'regex': "^\\$color--.*"
        },
        src: 'test/fixtures/colors.scss',
        dest: 'tmp/colors.json'
      },
      fonts: {
        options: {
          component: 'fonts',
          template: 'templates/fonts.mustache',
          regex: "^\\$type.*"
        },
        src: 'test/fixtures/fonts.scss',
        dest: 'tmp/fonts.json'
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
        tasks: 'test'
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
