var CMD = require( 'command' );

/**
 * TODO: replace with Bower module
 */
module.exports.run = function run ( cmd, pkg ) {
  return CMD.open( process.cwd() )
    .on( 'stdout', CMD.writeTo( process.stdout ) )
    .on( 'stderr', CMD.writeTo( process.stderr ) )
    .exec( 'bower', [ cmd, pkg, '--save-dev' ] );
};

