var MOUT = require( 'mout' );
var grunt = require( 'grunt' );
var TASK = require( './lib/task' );
var CONFIG = require( './lib/config' );
var BOWER = require( './lib/bower' );
var PLUGINS = require( './lib/plugins' );

module.exports = {
  task: TASK,
  config: CONFIG,
  bower: BOWER,
  plugins: PLUGINS
};

/**
 * Merge the default ngbp config into the grunt config so other tasks can access it.
 */
var options = MOUT.object.merge( CONFIG.default, grunt.config.getRaw( 'ngbp' ) || {} );
grunt.config.set( 'ngbp', options );

/**
 * Now load all installed modules. We have to do this before any other tasks run so that tasks
 * spawned to new grunt instances will have the requisite tasks defined. But this is a safe
 * operation as any modules not yet installed will not be loaded until an appropriate ngbp task is
 * executed.
 */
PLUGINS.loadModules( PLUGINS.getModules() );

