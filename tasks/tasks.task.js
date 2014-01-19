var ngbp = require( '../index' );
var MOUT = require( 'mout' );

/**
 * The NGBP Grunt task definition.
 */
module.exports = function ( grunt ) {
  /**
   * Prints out the list of defined globs.
   */
  grunt.registerTask( 'ngbp-tasks', function ( subset ) {
    /**
     * Prints out the set of hooked tasks.
     */
    var done = this.async();

    ngbp.task.prepareTaskList().then( function () {
      var hooks = ngbp.task.getHooks();
      var watches = ngbp.task.getWatches();
      var ignore, globKey;

      function printTasks ( name, tasks, indent ) {
        grunt.log.writeln( "\n" + name.blue );
        if ( tasks ) {
          tasks.forEach( function ( task ) {
            ignore = ngbp.task.shouldPreventTask( task.taskName ) ? ' (prevented)' : '';
            grunt.log.writeln( indent + task.priority + " - " + task.taskName + ignore.yellow );
          });

          if ( ! tasks.length ) {
            grunt.log.writeln( indent + "(none)" );
          }
        } 
      }

      if ( subset && subset !== 'watch' ) {
        grunt.log.subhead( "Tasks:".magenta );

        if ( hooks[ subset ] ) {
          printTasks( subset, hooks[ subset ], " " );
        } else {
          grunt.fail.warn( "Unknown hook: " + subset );
        }
      } else if ( ! subset ) {
        grunt.log.subhead( "Tasks:".magenta );

        for ( key in hooks ) {
          printTasks( key, hooks[ key ], "  " );
        };
      }

      if ( ! subset || subset == 'watch' ) {
        grunt.log.subhead( "Watches:".magenta );

        Object.keys( watches ).sort().forEach( function ( key ) {
          globKey = MOUT.string.unCamelCase( key, '.' );
          glob = grunt.option( 'raw' ) ? grunt.config.getRaw( "ngbp.globs." + globKey )
            : grunt.config.get( "ngbp.globs." + globKey );
          printTasks( globKey + ": " + glob, watches[ key ], "  " );
        });
      }

      done();
    });
  });
};


