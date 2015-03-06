'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.pattern_lab_component_builder = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },
  //colors: function (test) {
  //  test.expect(1);
  //
  //  var actual = grunt.file.read('tmp/colors.mustache').trim();
  //  var expected = grunt.file.read('test/expected/colors.mustache').trim();
  //  test.equal(actual, expected, 'Color Mustache file needs to render correctly');
  //
  //  test.done();
  //}
};
