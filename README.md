# pattern-lab-component-builder

> Automatically Create Pattern Lab Components

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install pattern-lab-component-builder --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('pattern-lab-component-builder');
```

## The "pattern_lab_component_builder" task

### Overview
In your project's Gruntfile, add a section named `pattern_lab_component_builder` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  pattern_lab_component_builder: {
    colors: {
      options: {
        component: 'colors',
        template: 'templates/colors.mustache'
      },
      src: 'test/fixtures/colors.scss',
      dest: 'tmp/colors.mustache'
    }
  },
})
```

The `src` is the file that the plugin reads from and infers your Pattern Lab component, which then gets written to `dest`.

### Options

#### options.component
Type: `String`

Which Pattern Lab component to work with. Available options:

- `colors`

#### options.template
Type: `path`

The Mustache template to render the Pattern Lab compoenent with. See `templates/` for examples (which are the defaults).

### Usage Examples

The only current usage is in the overview.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 Evan Lovely. Licensed under the MIT license.
