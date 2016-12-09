var mongoose = require('mongoose');

var _ = require('underscore')

var tools =require('./tools/tools');

tools.DataGrouper.register("sum", function(item) {
      return _.extend({}, item.key, {Value: _.reduce(item.vals, function(memo, node) {
          return memo + Number(node.Value);
      }, 0)});
  });
module.exports = function(app) {
  // var Whd = mongoose.model('Whd');
  // var Dictionary = mongoose.model('Dictionary');
  // var Complaint = mongoose.model('Complaint');
  // var Inspection = mongoose.model('Inspection');
  // var Legal = mongoose.model('Legal');
  var Tiles= mongoose.model('tiles');
  var Tweets= mongoose.model('tweets');
  var Social= mongoose.model('social');
  // server routes ===========================================================
  // handle things like api calls
  // authentication routes
    app.get('/getSocial', function(req, res) {
    var querySocial = Social.find({},{});

      querySocial.exec(function (err, social){
      if (err) { 
        console.log(err)
        return next(err); 
      }
      if (!social) { return next(new Error('can\'t find social')); }

      //console.log('start grouping')
      //whd = tools.DataGrouper.sum(whd, ["latlng"])
      //console.log('done grouping')
      req.social = social;
      res.json(req.social);
  })
    })
    app.get('/getTweets/:date', function(req, res) {
          var queryTweets = Tweets.find({'date':req.params.date});

        queryTweets.exec(function (err, tweets){
          if (err) { 
            console.log(err)
            return next(err); 
          }
          if (!tweets) { return next(new Error('can\'t find tweets')); }
          req.tweets = tweets;
          res.json(req.tweets);
        });
    })
    app.get('/getTiles', function(req, res) {
    var queryTiles = Tiles.find({},{});

      queryTiles.exec(function (err, tile){
      if (err) { 
        console.log(err)
        return next(err); 
      }
      if (!tile) { return next(new Error('can\'t find tile')); }

      //console.log('start grouping')
      //whd = tools.DataGrouper.sum(whd, ["latlng"])
      //console.log('done grouping')
      req.tile = tile;
      res.json(req.tile);
  })
    })
  // frontend routes =========================================================
  // route to handle all angular requests
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
  });

};