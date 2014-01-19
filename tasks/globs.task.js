var ngbp = require( '../index' );
var MOUT = require( 'mout' );

/**
 * The NGBP Grunt task definition.
 */
module.exports = function ( grunt ) {
  /**
   * Prints out the list of defined globs.
   */
  grunt.registerTask( 'ngbp-globs', function () {
    var done = this.async();

    ngbp.task.prepareTaskList().then( function () {
      var val;
      var key = 'ngbp.globs';

      if ( grunt.option( 'raw' ) ) {
        val = JSON.stringify( grunt.config.getRaw( key ), {}, "  " );
      } else {
        val = JSON.stringify( grunt.config.get( key ), {}, "  " );
      }

      grunt.log.writeln( "Globs:".magenta );
      grunt.log.writeln( val );

      done();
    });
  });
};


