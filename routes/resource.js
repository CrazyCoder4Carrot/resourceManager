var db = require('../lib/database');
var express = require('express');
var moment = require('moment');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next)
{
    var sess = req.session;
    var allUsersInfo;
    if (sess.results)
    {

        db.queryResource(sess.results, function(err, queryResults)
        {
            if (queryResults)
            {
                res.render('resource',
                {
                    allResourceInfo: queryResults,
                    moment: moment
                });
            }
            else
            {
                allResourceInfo = Null;
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
        var resourceId = req.params.id;
        db.DeleteResource(resourceId, function(err, queryResults)
        {
            if (!err)
            {
                res.redirect('/resource');
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

router.post('/add', function(req, res, next)
{
    var sess = req.session;
    if (sess.results)
    {
        var resourceInfo = {
            name:req.body.name,
            type:req.body.type,
            size:req.body.size,
            serverId:req.body.serverId,
            userId:req.body.userId,
            teamId:req.body.teamId,
            location:req.body.location,
            position:req.body.position,
            createtime:req.body.createtime,
            discard:req.body.discard,
        }
        db.insertResource(resourceInfo, function(err, queryResults)
        {
            if (!err)
            {
                res.redirect('/resource');
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

        var resourceInfo = {
            id:req.body.id,
            name:req.body.name,
            type:req.body.type,
            size:req.body.size,
            serverId:req.body.serverId,
            userId:req.body.userId,
            teamId:req.body.teamId,
            location:req.body.location,
            position:req.body.position,
            createtime:req.body.createtime,
            discard:req.body.discard,
        }
        console.log(resourceInfo);
        db.updateResource(resourceInfo, function(err, queryResults)
        {
            if (!err)
            {
                res.redirect('/resource');
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
