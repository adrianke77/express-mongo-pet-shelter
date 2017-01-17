const express = require( 'express' );
const path = require( 'path' );
const debug = require( "debug" );
const logger = require( 'morgan' );
const mongoose = require( 'mongoose' );
const bodyParser = require( 'body-parser' );
const expressLayouts = require( 'express-ejs-layouts' );
const app = express();
const router = express.Router()
const methodOverride = require( 'method-override' )

const moongoose = require( 'mongoose' );
moongoose.connect( 'mongodb://localhost/animalshelter' );

app.use( logger( 'dev' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.set( 'views', path.join( __dirname, 'views' ) );
app.use( expressLayouts )
app.engine( 'ejs', require( 'ejs' ).renderFile );
app.set( 'view engine', 'ejs' );

const animalsWwwController = require( './controllers/animals_www_controller' );

// add access to public folder, including CSS
app.use( '/public', express.static( __dirname + '/public' ) );

// add method override
app.use( methodOverride( '_method' ) );

// web interface route
app.use( "/animals", animalsWwwController );

// default display for get host without other route
app.get( "/", ( req, res ) => {
  res.redirect( "/animals" )
} );

// development error handler
// will print stacktrace
if ( app.get( 'env' ) === 'development' ) {
  app.use( function( err, req, res, next ) {
    res.status( err.status || 500 );
    res.render( 'error', {
      message: err.message,
      error: err
    } );
  } );
}

app.listen( 3000 )