var db = require('../lib/database');
var express = require('express');
var moment = require('moment');
var fs = require('fs');
var formidable = require("formidable");
var router = express.Router();
var AVATAR_UPLOAD_FOLDER = '/avatar/';
var TITLE = 'formidable上传示例';
/* GET users listing. */
router.get('/', function(req, res, next)
{
    var sess = req.session;
    if (sess.results)
    {

        db.selectAllOrders(sess.results, function(err, queryResults)
        {
            if (queryResults)
            {
                res.render('order',
                {
                    allOrderInfo: queryResults,
                    moment: moment
                });
            }
            else
            {
                allOrderInfo = Null;
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
        db.deleteOrder(resourceId, function(err, queryResults)
        {
            if (!err)
            {
                res.redirect('/order');
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
        var orderInfo = {
            category: req.body.category,
            vendor: req.body.vendor,
            quantity: req.body.quantity,
            unitPrice: req.body.unitPrice,
            order: req.body.order,
            date: req.body.date,
            comment: req.body.comment,
            team: req.body.team,
        }
        db.addOrder(orderInfo, function(err, queryResults)
        {
            if (!err)
            {
                res.redirect('/order');
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

        var orderInfo = {
            id: req.body.id,
            category: req.body.category,
            vendor: req.body.vendor,
            quantity: req.body.quantity,
            unitPrice: req.body.unitPrice,
            order: req.body.order,
            date: req.body.date,
            comment: req.body.comment,
            team: req.body.team,
            id: req.body.id
        }
        db.updateOrder(orderInfo, function(err, queryResults)
        {
            if (!err)
            {
                res.redirect('/order');
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

router.post('/file-upload', function(req, res, next)
{
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;
    form.keepExtensions = true;
    form.maxFieldsSize = 2 * 1024 * 1024;

    form.parse(req, function(err, fields, files)
    {

        if (err)
        {
            res.locals.error = err;
            res.render('index',
            {
                title: TITLE
            });
            return;
        }
        console.log("file tpye "+ files.fulAvatar.type);
        var extName = ''; //后缀名
        switch (files.fulAvatar.type)
        {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }

        if (extName.length == 0)
        {
            res.locals.error = '只支持png和jpg格式图片';
            res.render('index',
            {
                title: TITLE
            });
            return;
        }

        var avatarName = Math.random() + '.' + extName;
        var newPath = form.uploadDir + avatarName;

        console.log(newPath);
        fs.renameSync(files.fulAvatar.path, newPath); //重命名
    });

    res.locals.success = '上传成功';
    res.render('index',
    {
        title: TITLE
    });
});

module.exports = router;
