var ngbp = require( '../index' );
var MOUT = require( 'mout' );

/**
 * The NGBP Grunt task definition.
 */
module.exports = function ( grunt ) {
  /**
   * Perform the precompile, compile, and postcompile tasks according to the priority
   * with which they registered.
   */
  grunt.registerTask( 'ngbp-compile', function () {
    var done = this.async();

    ngbp.task.prepareTaskList()
    .then( function () {
      var compile_steps = [ 'precompile', 'compile', 'postcompile' ];
      var hooks = ngbp.task.getHooks();

      compile_steps.forEach( function forEachBuildStep ( step ) {
        ngbp.task.runTasks( hooks[ step ] );
      });

      done();
    });
  });
};

