// grab the mongoose module
var mongoose = require('mongoose');

var TileSchema= new mongoose.Schema({

}, { strict: false })

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('tiles',TileSchema,'tiles' );