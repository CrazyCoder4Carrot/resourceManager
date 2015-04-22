var express = require('express');
var db = require('../lib/database');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next)
{
    var sess = req.session;
    var allUsersInfo;
    if (sess.results)
    {

        db.queryallusers(sess.results, function(err, queryResults)
        {
            if (queryResults)
            {
                res.render('users',
                {
                    allUsersInfo: queryResults
                });
            }
            else
            {
                allUsersInfo = Null;
            }
        });
        console.log(allUsersInfo);
    }
    else
    {
        res.redirect('/login');
    }

});


router.post('/add', function(req, res, next)
{
    var sess = req.session;
    var allUsersInfo;
    if (sess.results)
    {
        var userinfo = {
            name:req.body.name,
            password:req.body.password,
            teamid:req.body.teamid,
            emailaddress:req.body.emailaddress,
            role:req.body.role
        }
        db.addUser(userinfo, function(err, queryResults)
        {
            if (!err)
            {
                res.redirect('/users');
            }
            else
            {
                res.send(queryResults);
            }
        });
    }
    else
    {
        res.redirect('/login');
    }
});

router.get('/delete/:id', function(req, res, next)
{
    var sess = req.session;
    var allUsersInfo;
    if (sess.results)
    {
        var userId = req.params.id;
        console.log(userId);
        db.deleteUser(userId, function(err, queryResults)
        {
            if (!err)
            {
                res.redirect('/users');
            }
            else
            {
                res.send(queryResults);
            }
        });
    }
    else
    {
        res.redirect('/login');
    }

});

router.post('/update', function(req, res, next)
{
    var sess = req.session;
    var allUsersInfo;
    if (sess.results)
    {

        var userinfo = {
            id:req.body.id,
            name:req.body.name,
            password:req.body.password,
            teamid:req.body.teamid,
            emailaddress:req.body.emailaddress,
            role:req.body.role
        }
        db.updateUser(userinfo, function(err, queryResults)
        {
            if (!err)
            {
                res.redirect('/users');
            }
            else
            {
                res.send(queryResults);
            }
        });
    }
    else
    {
        res.redirect('/login');
    }

});
module.exports = router;
