var express = require('express');
var router = express.Router();
var Item = require('../models/item');




router.post('/',function(req, res){



  var search = req.body.hello;
  console.log(search);
  // $regex allows us to turn a string into a query 'contains'
  // Switch i stands for case i-nsensitive
  Item.find({$or: [{"name":{"$regex": search, "$options": "i"}},{"description":{"$regex": search, "$options": "i"}}]}, function(err, tools){
    if(err) throw err;


    res.render('search', {title:'Search', items: tools} )
  });

});

module.exports = router;
