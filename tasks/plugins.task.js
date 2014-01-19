var ngbp = require( '../index' );

/**
 * The NGBP Grunt task definition.
 */
module.exports = function ( grunt ) {
  /**
   * Manage ngbp plugins through NPM
   */
  grunt.registerTask( 'ngbp-plugins', function ( cmd, arg2 ) {
    var done = this.async();

    // print a list of installed tasks if requested...or if no command was supplied
    if ( ! cmd || cmd === '' || cmd === 'list' ) {
      grunt.log.writeln( "Current Modules".magenta );
      modules.forEach( function ( mod ) {
        grunt.log.writeln( mod + ( ! ngbp.plugins.isInstalled( mod ) ? ' (not installed)' : '' ) );
      });

      done();
    } else {
      switch ( cmd ) {
        case 'search':
          ngbp.plugins.search( arg2, function () {
            done();
          });
          break;
        case 'install':
          ngbp.plugins.install( arg2, function ( res ) {
            done();
          });
          break;
        case 'uninstall':
          ngbp.plugins.uninstall( arg2, function () {
            done();
          });
          break;
        default:
          grunt.fail.fatal( "Unknown ngbp:plugins action: " + cmd );
          break;
      }
    }
  });
};

