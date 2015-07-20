var express = require('express');
var db = require('../lib/database');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next)
{
    var sess = req.session;
    var allUsersInfo;
    console.log(sess.results);
    if (sess.results)
    {
        var allteams;
        var allRoles;
        var allUserInfo;
        db.selectTeam(sess.results, function(err, queryResults)
        {
            if (queryResults)
            {
                allteams = queryResults;
                db.selectAllRoles(sess.results, function(err, queryResults)
                {
                    if (queryResults)
                    {
                        allRoles = queryResults;
                        db.queryallusers(sess.results, function(err, queryResults)
                        {

                            if (queryResults)
                            {
                                allUserInfo = queryResults;
                                for (var i = 0; i < allUserInfo.length; i++)
                                {
                                    for (var j = 0; j < allRoles.length; j++)
                                    {
                                        if (allUserInfo[i] != undefined && allRoles[j] != undefined)
                                        {
                                            if (allUserInfo[i].role == allRoles[j].id)
                                            {
                                                allUserInfo[i].role = allRoles[j].name;
                                            }
                                        }

                                    }
                                }
                                res.render('users',
                                {
                                    allUsersInfo: allUserInfo,
                                    allRoles: allRoles,
                                    result: sess.results,
                                    allTeams: allteams
                                });
                            }
                            else
                            {
                                allUsersInfo = null;
                            }
                        });
                    }
                    else
                    {
                        allRoles = null;
                    }
                });
            }
            else
            {
                allteams = null;
            }
        });



    }
    else
    {
        res.redirect('/login');
    }

});

var allRoles;
router.post('/add', function(req, res, next)
{
    var sess = req.session;
    var allUsersInfo;
    if (sess.results)
    {
        var userinfo = {
            name: req.body.name,
            password: req.body.password,
            teamid: req.body.teamid,
            emailaddress: req.body.emailaddress,
            role: req.body.role
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
            id: req.body.id,
            name: req.body.name,
            password: req.body.password,
            teamid: req.body.teamid,
            emailaddress: req.body.emailaddress,
            role: req.body.role
        }
        db.selectAllRoles(sess.results, function(err, queryResults)
        {
            if (queryResults)
            {
                allRoles = queryResults;
                if (allRoles)
                    for (var i = 0; i < allRoles.length; i++)
                    {
                        if (userinfo.role == allRoles[i].name)
                            userinfo.role = allRoles[i].id;
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
                allRoles = null;
            }
        });

    }
    else
    {
        res.redirect('/login');
    }

});
module.exports = router;
