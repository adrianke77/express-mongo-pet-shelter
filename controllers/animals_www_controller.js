// add express dependency
const express = require( 'express' );

//import schema
const animalModel = require( "../models/animal_model" );

// add routing to express
const router = express.Router();

//show all and create form(home page) 
router.get( "/", ( req, res ) => {
  animalModel.find( {}, ( err, itemsList ) => {
    if ( err ) return console.log( err );
    buttonArr = []
    itemsList.forEach( ( val, idx ) => {
      if ( val.status === "Adopted" )
        buttonArr[ idx ] = "Abandon"
      else buttonArr[ idx ] = "Adopt"
    } );

    res.render( "listall", {
      data: itemsList,
      buttonArr:buttonArr
    } );
  } );
} );

//create
router.post( "/", ( req, res ) => {
  req.body.status = "Abandoned"
  animalModel.create( req.body, ( err, newTodo ) => {
    if ( err )
      return console.log( err );
    res.redirect( "/animals" );
  } );
} );

//show update form
router.get( "/edit/:id", ( req, res ) => {
  animalModel.findById( req.params.id, ( err, item ) => {
    res.render( "updateform", {
      item: item,
    } )
  } )
} );

//update
router.put( "/edit/:id", ( req, res ) => {
  animalModel.findByIdAndUpdate( req.params.id, req.body, { new: true },
    ( err ) => {
      if ( err ) return console.log( err );
      res.redirect( "/animals" );
    } );
} );

//adopt
router.get( "/Adopt/:id", ( req, res ) => {
  animalModel.findByIdAndUpdate( req.params.id, { status: "Adopted" }, { new: true },
    ( err ) => {
      if ( err ) return console.log( err );
      res.redirect( "/animals" );
    } );
} );

//abandon
router.get( "/Abandon/:id", ( req, res ) => {
  animalModel.findByIdAndUpdate( req.params.id, { status: "Abandoned" }, { new: true },
    ( err ) => {
      if ( err ) return console.log( err );
      res.redirect( "/animals" );
    } );
} );
// destroy
router.get( "/delete/:id", ( req, res ) => {
  animalModel.findByIdAndRemove( req.params.id, ( err ) => {
    if ( err ) return console.log( err );
    res.redirect( "/animals" );
  } );
} );

//export routing in file
module.exports = router;