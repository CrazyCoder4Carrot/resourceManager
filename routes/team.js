var express = require('express');
var db = require('../lib/database');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next)
{
    var sess = req.session;
    var allTeamInfo;
    if (sess.results)
    {

        db.selectTeam(sess.results, function(err, queryResults)
        {
            if (queryResults)
            {
                res.render('team',
                {
                    allTeamInfo: queryResults,
                    result:sess.results,
                });
            }
            else
            {
                allTeamInfo = Null;
            }
        });
        console.log(allTeamInfo);
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
        var teamInfo = {
            name:req.body.name,
        }
        db.addTeam(teamInfo, function(err, queryResults)
        {
            if (!err)
            {
                res.redirect('/team');
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
    if (sess.results)
    {
        var teamId = req.params.id;
        db.deleteTeam(teamId, function(err, queryResults)
        {
            if (!err)
            {
                res.redirect('/team');
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
    if (sess.results)
    {

        var teaminfo = {
            id:req.body.id,
            name:req.body.name,
        }
        db.updateTeam(teaminfo, function(err, queryResults)
        {
            if (!err)
            {
                res.redirect('/team');
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
