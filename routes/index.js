var express = require('express');
var router = express.Router();
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
var User = require('../models/user');
var Item = require('../models/item');
//Require authentificaiton
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
};
var Item = require('../models/item');//josh

/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tools' });
});


// Render the login template
router.get('/login',
function(req, res){
  console.log(env);
  res.render('login', { env: env });
});

// Perform session logout and redirect to homepage
router.get('/logout', function(req, res){
req.logout();
res.redirect('/');
});

// Perform the final stage of authentication and redirect to '/user'
router.get('/callback',
passport.authenticate('auth0', { failureRedirect: '/' }),
function(req, res) {
  res.redirect(req.session.returnTo || '/newitem');
});

// /* GET powertools page. */
router.get('/power', function(req, res, next){
  Item.find({'category': 'Power Tools'}, null, {sort: {date: -1}}, function(err, items){
     if (err) throw err;
    res.render('power', {title:"Power Tools", items: items});
  });
});

// /* GET penumatictools page. */
router.get('/pneumatic', function(req, res, next){
  Item.find({'category': 'Pneumatic Tools'}, null, {sort: {date: -1}}, function(err, items){
     if (err) throw err;
    res.render('pneumatic', {title:"Power Tools", items: items});
  });
});

router.get('/machine', function(req, res, next){
  Item.find({'category': 'Machine Tools'}, null, {sort: {date: -1}}, function(err, items){
     if (err) throw err;
    res.render('machine', {title:"Machine Tools", items: items});
  });
});

router.get('/newrentals', function(req, res, next){
  Item.find({}, null, {sort: {date: -1}}, function(err, items){
     if (err) throw err;
    res.render('newrentals', {title:"New Stuff", items: items});
  });
});


/* GET New User page. */
router.get('/signup', function(req, res) {
    res.render('signup', { title: 'New User signup' });
});

/* GET New Item page.
router.get('/newitem', function(req, res) {
    res.render('newitem', { title: 'Add New Item' });
});

 */

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable


    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;
    var newUser = User({
      username: userName,
      email: userEmail
    });
    newUser.save(function(err) {
      if (err) throw err;

      res.redirect('/');
    });
  });





module.exports = router;
