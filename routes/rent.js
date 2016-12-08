var express = require('express');
var router = express.Router();
var Item = require ('../models/item');

router.post('/', function (req,res,next){


  var id= req.body.rent;
  console.log(id);
  Item.findById(id, function(err,item){
    if(err) throw err;
      console.log(item);
      item.isAvailable = false;
      item.save(function(err,update){
        if(err)return handleError(err);
        res.render('rent' ,{title:'Rent'});

      });
    

  });





});
module.exports = router;
