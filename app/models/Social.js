// grab the mongoose module
var mongoose = require('mongoose');

var SocialSchema= new mongoose.Schema({

}, { strict: false })

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('social',SocialSchema,'social' );