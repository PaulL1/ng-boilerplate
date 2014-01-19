var ngbp = require( '../index' );
var MOUT = require( 'mout' );

/**
 * The NGBP Grunt task definition.
 */
module.exports = function ( grunt ) {
  /**
   * Prepares and then runs the watch command.
   */
  grunt.registerTask( 'ngbp-watch', function () {
    var done = this.async();
    var watchConfig = {};
    var watches, globKey, patterns;

    ngbp.task.prepareTaskList().then( function () {
      watches = ngbp.task.getWatches();

      for ( key in watches ) {
        // Get the glob key from the slugified version and then fetch the file patterns.
        globKey = MOUT.string.unCamelCase( key, '.' );
        patterns = grunt.config.getRaw( 'ngbp.globs.' + globKey );

        // These are the tasks that need to be run for this glob.
        var tasks = [];
        watches[ key ].forEach( function ( task ) {
          tasks.push( task.taskName );
        })

        // Create a new watch config entry for it.
        watchConfig[ key ] = {
          files: patterns,
          tasks: tasks
        };
      };

      // Load the config into Grunt; we just overwrite it as merging would not make a lot of sense.
      grunt.loadNpmTasks( 'grunt-contrib-watch' );
      grunt.task.renameTask( 'watch', 'delta' );
      grunt.config.set( 'delta', watchConfig );

      // Finally, run the task.
      grunt.task.run( 'delta' );
      
      done();
    });
  });
};

