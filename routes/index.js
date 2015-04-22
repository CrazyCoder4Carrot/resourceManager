var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var sess = req.session;
  if(sess.results)
  {
  	res.redirect('users');
  }
  else
  {
      res.render('login', { title: 'Express' });    
  }

});

module.exports = router;
