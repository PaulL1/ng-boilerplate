var grunt = require( 'grunt' );
var MOUT = require( 'mout' );
var Q = require( 'q' );
var plugins = require( './plugins' );

// Lists of tasks to run at each point of the build cycle.
var hooks = {
  prebuild: [],
  build: [],
  postbuild: [],
  precompile: [],
  compile: [],
  postcompile: []
};

// List of tasks to run in response to each glob in the watch cycle.
var watches = {};

// Just all registered ngbp tasks.
var registry = [];

/**
 * Checks user configuration to see if a certain task should be ignored.
 */
var shouldPreventTask = module.exports.shouldPreventTask = function shouldPreventTask ( task ) {
  var prevent = grunt.config.get("ngbp.prevent");
  if ( prevent.indexOf( task ) >= 0 || prevent.indexOf( task.split( ':' )[0] ) >= 0 ) {
    return true;
  } else {
    return false;
  }
}

/**************************************************************************************************/

var Task = module.exports.Task = function Task ( name, config ) {
  grunt.verbose.writeln( 'Registering ngbp task: ' + name );
  this.name = name;
  this.defaultConfig = config;

  registry.push( this );

  var userConfig = grunt.config.getRaw( name );
  if ( ! userConfig ) {
    grunt.log.debug( '...creating new config' );
    grunt.config.set( name, config );
  } else {
    grunt.log.debug( '...merging config' );
    grunt.config.set( name, MOUT.object.merge( config, userConfig ) );
  }
}

Task.prototype.run = function run ( subtask, when, priority ) {
  if ( ! hooks[ when ] ) {
    grunt.fail.warn( "Unknown injection point: " + when );
    return;
  }

  hooks[ when ].push( { priority: priority, taskName: this.name + ":" + subtask } );
};

Task.prototype.watch = function watch ( subtask, glob, priority ) {
  var configKey = "ngbp.globs." + glob;
  var globKey = MOUT.string.camelCase( glob.replace( '.', '-' ) );

  // FIXME(jdm): This may cause problems with task-registered globs due to order to execution.
  if ( ! grunt.config.getRaw( configKey ) ) {
    grunt.fail.warn( "Unknown glob in task '" + this.name + "':" + configKey );
    return;
  }

  if ( ! watches[ globKey ] ) {
    watches[ globKey ] = [];
  }
  
  watches[ globKey ].push({
    priority: priority,
    taskName: this.name + ":" + subtask
  });
}

/**
 * For all user-specified modules, load 'em up; then inject all user-specified tasks.
 */
var prepareTaskList = module.exports.prepareTaskList = function prepareTaskList () {
  return plugins.loadOrInstall( plugins.getModules() )
  .then( function () {
    /**
     * Now validate any user-specified tasks and then inject them.
     */
    grunt.config.get("ngbp.inject").forEach( function ( task ) {
      if ( ! task.task ) {
        grunt.fail.fatal( "Injection error: you cannot inject a task without a 'task'." );
      }
      if ( ! task.priority ) {
        grunt.fail.fatal( "Injection error: you cannot inject a task without a 'priority'." );
      }
      if ( ! task.when ) {
        grunt.fail.fatal( "Injection error: you cannot inject a task without specifying 'when'." );
      }

      if ( task.when === 'watch' ) {
        if ( ! task.glob ) {
          grunt.fail.fatal( "Injection error: watch tasks need a 'glob' at which change to run." );
        }

        injectWatch( task.glob, task.task, task.priority );
      } else {
        injectHook( task.when, task.task, task.priority );
      }
    });

    return true;
  });
}

var injectHook = module.exports.injectHook = function injectHook ( when, task, priority ) {
  if ( ! hooks[ when ] ) {
    grunt.fail.warn( "Unknown injection point (" + when + ") when trying to inject '" + task + "'." );
    return;
  }

  hooks[ when ].push( { priority: priority, taskName: task } );
};

var injectWatch = module.exports.injectWatch = function injectWatch ( glob, task, priority ) {
  var configKey = "ngbp.globs." + glob;
  var globKey = MOUT.string.camelCase( glob.replace( '.', '-' ) );

  if ( ! grunt.config.getRaw( configKey ) ) {
    grunt.fail.warn( "ngbp.task.Unknown glob (" + glob + ") when trying to inject '" + task + "'." );
    return;
  }

  if ( ! watches[ globKey ] ) {
    watches[ globKey ] = [];
  }
  
  watches[ globKey ].push({
    priority: priority,
    taskName: task
  });
};

/**
 * From a list of tasks, check if we should ignore them and run them if we shouldn't.
 */
var runTasks = module.exports.runTasks = function runTasks ( tasks ) {
  tasks.forEach( function forEachTask ( task ) {
    if ( shouldPreventTask( task.taskName ) ) {
      grunt.log.writeln( "Prevented run of " + task.taskName );
    } else {
      grunt.task.run( task.taskName );
    }
  });
};

var create = module.exports.create = function create ( name, config ) {
  return new Task( name, config );
};

var getHooks = module.exports.getHooks = function getHooks () {
  for ( key in hooks ) {
    hooks[key] = MOUT.array.sortBy( hooks[ key ], 'priority' );
  }

  return hooks;
};

var getWatches = module.exports.getWatches = function getWatches () {
for ( key in watches ) {
  watches[key] = MOUT.array.sortBy( watches[ key ], 'priority' );
}

return watches;
};

var registerGlob = module.exports.registerGlob = function registerGlob ( glob, value ) {
  if ( grunt.config.getRaw( 'ngbp.globs.' + glob ) ) {
    grunt.fail.warn( "Glob '" + glob + "' is already defined. If you forse, there be dragons..." );
  }

  grunt.config.set( 'ngbp.globs.' + glob, value );
};

