/*
 * pattern-lab-component-builder
 *
 *
 * Copyright (c) 2014 Evan Lovely
 * Licensed under the MIT license.
 */

'use strict';
var fs = require('fs');
var util = require('util');
var Mustache = require('Mustache');
module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('pattern_lab_component_builder', 'Automatically Create Pattern Lab Components', function () {

    // Merge task-specific and/or target-specific options with these defaults.
    var $options = this.options({
      'regex': /^\$color.*/mg,
      'template': 'templates/colors.mustache'
    });

    // Iterate over all specified file groups.
    this.files.forEach(function ($file) {
      if ($options.component == "colors") {
        grunt.log.writeln("Source File: " + $file.src);
        grunt.log.writeln("Template File: " + $options.template);
        grunt.log.writeln("Destination File: " + $file.dest);

        var $sass = grunt.file.read($file.src);
        var $regExForSassVars = $options.regex;
        var $sass_filtered = $sass.match($regExForSassVars);
        if ($sass_filtered == null) {
          grunt.fail.fatal("No matching items found in `" + $file.src + "` while searching it with the RegEx `" + $options.regex + '`\n' + "Consider running again with --verbose");
        }

        var $colors = [];
        $sass_filtered.forEach(function($color) {
          var $name = $color.split(":")[0];
          var $value = $color.split(":")[1].trim().replace(";", "");
          $colors.push({"name": $name, "value": $value});
          grunt.log.verbose.writeln("Name : " + $name);
          grunt.log.verbose.writeln("Value: " + $value);
        });

        // @todo The string `"colors"` below needs to be replaced with `$target`, but isn't working
        var $target = grunt.task.current.target;
        var $plInfo = {
          "colors": $colors
        };

        var $template = grunt.file.read($options.template);
        var $plComponent = Mustache.render($template, $plInfo);
        grunt.file.write($file.dest, $plComponent);
        grunt.log.ok("Rendered!");


        grunt.log.verbose.subhead("PL Info JSON:");
        grunt.log.verbose.writeln(JSON.stringify($plInfo, null, '\t'));
        grunt.log.verbose.subhead("Template Contents:");
        grunt.log.verbose.writeln($template);
        grunt.log.verbose.subhead("View Contents:");
        grunt.log.verbose.writeln(JSON.stringify($plInfo, null, '\t'));
        grunt.log.verbose.subhead("Destination Contents:");
        grunt.log.verbose.writeln($plComponent);
      }
    });
  });

};
