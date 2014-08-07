/*
 * pattern-lab-component-builder
 *
 *
 * Copyright (c) 2014 Evan Lovely
 * Licensed under the MIT license.
 */

'use strict';
var Mustache = require('Mustache');
var _ = require('underscore-node');
module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('pattern_lab_component_builder', 'Automatically Create Pattern Lab Components', function () {

    // Merge task-specific and/or target-specific options with these defaults.
    var
      $options = this.options({
//        'regex': /^\$color--.*/mg,
//        'template': 'templates/colors.mustache'
      }),
      $target = this.target
    ;

    // Iterate over all specified file groups.
    this.files.forEach(function ($file) {
        grunt.log.writeln("Source File: " + $file.src);
        grunt.log.writeln("Template File: " + $options.template);
        grunt.log.writeln("Destination File: " + $file.dest);

      var get = function($fileSrc) {
        var $contents = grunt.file.read($fileSrc);
//        var $results = $contents.match(/./);
        var $regex = new RegExp("^\\$" + $options.regex, "mg");
//        var $regex = new RegExp($options.regex, "mg");
        var $matched = $contents.match($regex);
        if ($matched == null) {
          grunt.fail.fatal("No matching items found in `" + $fileSrc + "` while searching it with the RegEx `" + $options.regex + '`\n' + "Consider running again with --verbose");
        }
//        return $results;
        var
          $results = [],
          $results_with_var_values = []
        ;
        $matched.forEach(function($item) {
          var $name = $item.split(":")[0];
          var $value = $item.split(":")[1].trim().replace(";", "");
          if (!$value.match(/\$/)) {
            $results.push({"name": $name, "value": $value, "uses": []});
          } else {
            $results_with_var_values.push({"name": $name, "value": $value});
          }
          grunt.log.verbose.writeln("Name : " + $name);
          grunt.log.verbose.writeln("Value: " + $value);
        });
        return $results;
      };

      if ($options.component === "fonts") {

        var $fonts = [];
        grunt.log.subhead("Contents of Fonts:");
//        grunt.log.writeln($contents);
        get($file.src).forEach(function($font) {
          grunt.log.writeln("$font: " + $font);
        });
      }

      if ($options.component === "colors") {

        var $colors = [],
            $colors_with_var_values = [];
        $colors.push(get($file.src));
//        get($file.src).forEach(function($color) {
//          var $name = $color.split(":")[0];
//          var $value = $color.split(":")[1].trim().replace(";", "");
//          if (!$value.match(/\$/)){
//            $colors.push({"name": $name, "value": $value, "uses": []});
//          } else {
//            $colors_with_var_values.push({"name": $name, "value": $value});
//          }
//          grunt.log.verbose.writeln("Name : " + $name);
//          grunt.log.verbose.writeln("Value: " + $value);
//        });
          grunt.log.verbose.writeln("$colors: " + JSON.stringify($colors, null, '\t'));

        var $plInfo = {};
        $plInfo[$target] = $colors;

//        $colors_with_var_values.forEach(function($varColor) {
//          $plInfo[$target].forEach(function($color) {
//            if ($color.name === $varColor.value) {
//              $color["uses"].push($varColor.name);
//            }
//          });
//        });

        var $template = grunt.file.read($options.template);
        var $plComponent = Mustache.render($template, $plInfo);
        grunt.file.write($file.dest, $plComponent);
        grunt.log.ok("Rendered!");

        grunt.log.verbose.subhead("PL Info JSON:");
        grunt.log.verbose.writeln(JSON.stringify($plInfo, null, '\t'));
        grunt.log.verbose.subhead("Colors with Var Values:");
        grunt.log.verbose.writeln(JSON.stringify($colors_with_var_values, null, '\t'));
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
