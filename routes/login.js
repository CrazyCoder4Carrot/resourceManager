var express = require('express');
var crypto = require('crypto');
var db = require('../lib/database');
var router = express.Router();

var orgdao = module.exports;
/* GET home page. */
router.get('/', function(req, res, next)
{
    var sess = req.session;
    if (sess.results)
    {
        res.redirect('/resource');
    }
    else
    {
        res.render('login',
        {
            title: 'Express'
        });
    }

});

router.post('/', function(req, res)
{
    db.queryuser(req.body.inputUsername, req.body.inputPassword, function(err, results)
    {
        if (results)
        {
            console.log(results.username);
            req.session.results = results;
            res.redirect('/resource');
        }
        else
        {
            res.send('login failed');
        }
    });
});



module.exports = router;
