/*
 * pattern-lab-component-builder
 * Copyright (c) 2015 Evan Lovely
 * Licensed under the MIT license.
 */

'use strict';
var _ = require('underscore');
module.exports = function (grunt) {

  grunt.registerMultiTask('pattern_lab_component_builder', 'Automatically Create Pattern Lab Components', function () {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      'regex': "^\\$.*",
      'allow_var_values': true
    });

  });

};
