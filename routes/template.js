var express = require('express');
var db = require('../lib/database');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next)
{
    var sess = req.session;
    var allTemplateInfo;
    var allTypeInfo;
    if (sess.results)
    {
        db.selectTemplate(sess.results, function(err, queryResults)
        {
            if (queryResults)
            {
                allTemplateInfo = queryResults;
                db.selectType(sess.results, function(err, queryResults)
                {
                    if (queryResults)
                    {
                        res.render('template',
                        {
                            allTemplateInfo: allTemplateInfo,
                            allTypeInfo:queryResults,
                            result: sess.results
                        });
                    }
                    else
                    {
                        allTypeInfo = Null;
                    }

                });
            }
            else
            {
                allTemplateInfo = Null;
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
            name: req.body.name,
            type:req.body.type,
            manu:req.body.Manufacturer,
            model:req.body.Model,
            size:req.body.Size
        }
        db.addTemplate(labInfo, function(err, queryResults)
        {
            if (!err)
            {
                res.redirect('/template');
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
        db.deleteTemplate(labId, function(err, queryResults)
        {
            if (!err)
            {
                res.redirect('/template');
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
        // .set("name",templateInfo.name)
        // .set("type",templateInfo.type)
        // .set("manufacturer",templateInfo.manu)
        // .set("model",templateInfo.model)
        // .set("size",templateInfo.size)
        var labInfo = {
            id: req.body.id,
            name: req.body.name,
            type:req.body.type,
            manu:req.body.Manufacturer,
            model:req.body.Model,
            size:req.body.Size

        }
        db.updateTemplate(labInfo, function(err, queryResults)
        {
            if (!err)
            {
                res.redirect('/template');
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
