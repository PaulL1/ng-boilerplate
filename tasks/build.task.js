var ngbp = require( '../index' );
var MOUT = require( 'mout' );

/**
 * The NGBP Grunt task definition.
 */
module.exports = function ( grunt ) {
  /**
   * Perform the prebuild, build, and postbuild tasks according to the priority
   * with which they registered.
   */
  grunt.registerTask( 'ngbp-build', function () {
    var done = this.async();

    ngbp.task.prepareTaskList()
    .then( function () {
      var build_steps = [ 'prebuild', 'build', 'postbuild' ];
      var hooks = ngbp.task.getHooks();

      build_steps.forEach( function forEachBuildStep ( step ) {
        ngbp.task.runTasks( hooks[ step ] );
      });

      done();
    });
  });
};

