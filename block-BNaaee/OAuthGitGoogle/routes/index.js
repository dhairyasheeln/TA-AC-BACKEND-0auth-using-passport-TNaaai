var express = require('express');
var router = express.Router();
var passport=require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/success',(req,res,next)=>{
  res.send('Success');
});

router.get('/failure',(req,res,next)=>{
  res.send('failure');
});

router.get('/auth/github',passport.authenticate('github'));

router.get('/auth/github/callback',passport.authenticate('github',{failureRedirect:'/failure'}),(req,res)=>{
  res.redirect('/success');
});

router.get('/auth/google',passport.authenticate('google'));

router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/failure'}),(req,res)=>{
  res.redirect('/success');
});

module.exports = router;
