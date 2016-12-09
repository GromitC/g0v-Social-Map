// grab the mongoose module
var mongoose = require('mongoose');

var TweetsSchema= new mongoose.Schema({

}, { strict: false })

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('tweets',TweetsSchema,'tweets' );