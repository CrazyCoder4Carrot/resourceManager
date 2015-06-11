var express = require('express');
var db = require('../lib/database');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next)
{
    var sess = req.session;
    var allLabInfo;
    if (sess.results)
    {

        db.selectLab(sess.results, function(err, queryResults)
        {
            if (queryResults)
            {
                res.render('lab',
                {
                    allLabInfo: queryResults,
                    result:sess.results
                });
            }
            else
            {
                allLabInfo = Null;
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
        var labInfo = {
            name:req.body.name,
        }
        db.addLab(labInfo, function(err, queryResults)
        {
            if (!err)
            {
                res.redirect('/lab');
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
        var labId = req.params.id;
        db.deleteLab(labId, function(err, queryResults)
        {
            if (!err)
            {
                res.redirect('/lab');
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

        var labInfo = {
            id:req.body.id,
            name:req.body.name,
        }
        db.updateLab(labInfo, function(err, queryResults)
        {
            if (!err)
            {
                res.redirect('/lab');
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
