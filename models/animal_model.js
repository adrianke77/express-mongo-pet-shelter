const mongoose = require( 'mongoose' );

// make todo schema
const animalSchema = new mongoose.Schema( {
  name: {
    type: String,
    required: true,
    unique: true,
  },
  breed: { type: String, required: true },
  DOB: { type: Date, required: true },
  gender: { type: String, required: true },
  family: { type: String},
  status: { type: String, required: true }

} );

const AnimalModel = mongoose.model( "Todo", animalSchema );

module.exports = AnimalModel;