var express = require('express');

var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();

/* GET users listing. */
//ensureLoggedIn is where the magic happens
router.get('/',ensureLoggedIn, function(req, res, next) {
  console.log(req.user);
  res.render('user', {user: req.user});
});

module.exports = router;
