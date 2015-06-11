var express = require('express');
var db = require('../lib/database');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next)
{
    var sess = req.session;
    var allTypeInfo;
    if (sess.results)
    {

        db.selectType(sess.results, function(err, queryResults)
        {
            if (queryResults)
            {
                res.render('type',
                {
                    allTypeInfo: queryResults,
                    result:sess.results
                });
            }
            else
            {
                allTypeInfo = Null;
            }
        });
       // console.log(allTypeInfo);
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
        var typeInfo = {
            name:req.body.name,
        }
        db.addType(typeInfo, function(err, queryResults)
        {
            if (!err)
            {
                res.redirect('/type');
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
        var typeId = req.params.id;
        console.log(typeId);
        db.deleteType(typeId, function(err, queryResults)
        {
            if (!err)
            {
                res.redirect('/type');
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

        var typeInfo = {
            id:req.body.id,
            name:req.body.name,
        }
        db.updateType(typeInfo, function(err, queryResults)
        {
            if (!err)
            {
                res.redirect('/type');
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
