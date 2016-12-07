// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var itemSchema = new Schema({

  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  category: {type: String},
  condition: {type: String},
  date:{type: Date, default:Date.now },
  owner:{type:String},
  borrower:{type:String},
  isAvailable:{type:Boolean, default:true}
  // address: {type: String}
  // charge: { length: {hourly, daily}, rate: {}
});

// the schema is useless so far
// we need to create a model using it
var Item = mongoose.model('Item', itemSchema);

// make this available to our users in our Node applications
module.exports = Item;
