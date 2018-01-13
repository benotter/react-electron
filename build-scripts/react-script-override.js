const rewire = require( 'rewire' );
const proxyquire = require( 'proxyquire' );


main( process.argv[ 2 ] );


function main ( arg )
{
    if ( arg === 'start' )
        rewireModule(
            'react-scripts/scripts/start.js',
            loadCustomModule( './config.dev.js' )
        );
    else if ( arg === "build" )
        rewireModule(
            'react-scripts/scripts/build.js',
            loadCustomModule( './config.prod.js' )
        );
    else if ( arg === "test" )
    {
        let custom = loadCustomModule( './custom-overrides.test.js' );

        proxyquire.load( 'react-scripts/scripts/test.js', {
            '../utils/createJestConfig': ( args ) =>
            {
                let createJC = require( 'react-scripts/scripts/utils/createJestConfig' );
                return custom( createJC( ...args ) );
            }
        } );
    }
    else
    {
        console.log( "custom-config does not support commands other then start, build, and test." );
        process.exit( -1 );
    }
}

function rewireModule ( modPath, custo )
{
    let defs = rewire( modPath );
    let newConf = defs.__get__( 'config' );
    
    custo( newConf );
}

function loadCustomModule ( modP )
{
    try { return require( modP ); }
    catch ( e ) { if ( e.code !== "MODULE_NOT_FOUND" ) throw e; }
    return ( c => c );
}

