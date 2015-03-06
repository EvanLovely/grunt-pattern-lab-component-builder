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
    var regex = new RegExp(options.regex, "mg");
    var target = this.target;
    //var x = JSON.stringify(this, null, ' ');
    //grunt.log.debug(x);

    function colonBreaker(theString) {
      var name = theString.split(":")[0].trim();
      var value = theString.split(":")[1].trim().replace(";", "");
      var result = {
        "name": name,
        "value": value
      };
      if (options.allow_var_values) {
        return result;
      } else {
        if (!value.match(/\$/)) {
          return result;
        }
      }
    }

    this.files.forEach(function (file) {
      grunt.log.debug(JSON.stringify(file, null, '  '));
      var src = file.src.filter(function (filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function (filepath) {
        var results = grunt.file.read(filepath).match(regex);
        var organizedResults = [];
        if (results) {
          results.forEach(function (line) {
            organizedResults.push(colonBreaker(line));
          });
        }
        //console.log(typeof results, results);
        return organizedResults;
      });
      src = _.flatten(src);
      src = _.compact(src);
      grunt.log.debug(JSON.stringify(src, null, '  '));
      var finalResults = {};
      finalResults[target] = src;
      grunt.file.write(file.dest, JSON.stringify(finalResults, null, '  '));
      grunt.log.writeln("File created from matches: " + file.dest);
    });


  });

};
