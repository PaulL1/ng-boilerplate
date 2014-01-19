var ngbp = require( '../index' );

/**
 * The NGBP Grunt task definition.
 */
module.exports = function ( grunt ) {
  /**
   * Runs bower tasks.
   */
  grunt.registerTask( 'ngbp-bower', function ( cmd, pkg ) {
    var done = this.async();
    ngbp.bower.run( cmd, pkg ).then( function () {
      done();
    });
  });
};

