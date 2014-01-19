/**
 * Default ngbp options
 */
var defaultOptions = {
  paths: {
    // The top-level directory where all built files are stored
    build: 'build',
    // The top-level directory where all compiled files are stored
    compile: 'bin',
    
    // The top-level directory where source files are kept pre-build
    source: 'src',
    // The top-level directory where vendor files are kept pre-build
    vendor: 'vendor',

    // Where source styles are kept pre-build
    source_styles: '<%= ngbp.paths.source %>/styles',

    // Where source assets are kept
    source_assets: '<%= ngbp.paths.source %>/assets',
    // Where assets are stored after the build
    build_assets: '<%= ngbp.paths.build %>/assets',
    // Where assets are finnaly put after the compile
    compile_assets: '<%= ngbp.paths.compile %>/assets',

    // Where scripts are stored after the build
    build_js: '<%= ngbp.paths.build %>/scripts',
    // Where scripts are finally stored after the compile
    build_css: '<%= ngbp.paths.build %>/styles',
  },

  // The final resting place of processed and compiled targets.
  targets: {
    compile: {
      js: '<%= ngbp.paths.compile_assets %>/<%= pkg.name %>-<%= pkg.version %>.min.js',
      css: '<%= ngbp.paths.compile_assets %>/<%= pkg.name %>-<%= pkg.version %>.min.css',
      html: '<%= ngbp.paths.compile %>/index.html'
    },

    build: {
      html: '<%= ngbp.paths.build %>/index.html'
    }
  },

  // Default file patterns for use by ngbp modules
  globs: {
    app: {
      js: [
        '<%= ngbp.paths.source %>/**/*.js', 
        '!<%= ngbp.paths.source %>/**/*.spec.js', 
        '!<%= ngbp.paths.source_assets %>/**/*'
      ],
      jsunit: [ 
        '<%= ngbp.paths.source %>/**/*.spec.js',
        '!<%= ngbp.paths.source_assets %>/**/*'
      ],
      html: [
        '<%= ngbp.paths.source %>/**/*.html',
        '!<%= ngbp.paths.source %>/**/*.partial.html',
        '!<%= ngbp.paths.source %>/**/*.tpl.html',
        '!<%= ngbp.paths.source_assets %>/**/*'
      ],
      css: [
        '<%= ngbp.paths.source_styles %>/**/*.css'
      ],
      assets: [
        '<%= ngbp.paths.source_assets %>/**/*'
      ]
    },
    vendor: {
      js: [],
      jsunit: [],
      html: [],
      css: [],
      assets: []
    },
    build: {
      scripts: '<%= ngbp.paths.build_js %>/**/*.js',
      styles: '<%= ngbp.paths.build_css %>/**/*.css'
    }
  },

  banners: {
    js: {
      min: '' +
        '/**\n' +
        ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * <%= pkg.homepage %>\n' +
        ' *\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
        ' */\n'
    },
    css: {
      min: '' +
        '/**\n' +
        ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * <%= pkg.homepage %>\n' +
        ' *\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
        ' */\n'
    }
  },

  prevent: [],
  inject: []
};

module.exports = {
  default: defaultOptions
};

