var db = require('../lib/database');
var express = require('express');
var moment = require('moment');
var fs = require('fs');
var formidable = require("formidable");
var router = express.Router();
var AVATAR_UPLOAD_FOLDER = '/uploaded/';
var TITLE = 'formidable上传示例';
var path = require('path');
var fs = require('fs');
var excelParser = require('excel-parser');
var xlsx = require('node-xlsx');
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

function mkdir(dirpath, dirname)
{
    //判断是否是第一次调用  
    if (typeof dirname === "undefined")
    {
        if (fs.existsSync(dirpath))
        {
            return;
        }
        else
        {
            mkdir(dirpath, path.dirname(dirpath));
        }
    }
    else
    {
        //判断第二个参数是否正常，避免调用时传入错误参数  
        if (dirname !== path.dirname(dirpath))
        {
            mkdir(dirpath);
            return;
        }
        if (fs.existsSync(dirname))
        {
            fs.mkdirSync(dirpath)
        }
        else
        {
            mkdir(dirname, path.dirname(dirname));
            fs.mkdirSync(dirpath);
        }
    }
}
router.post('/file-upload', function(req, res, next)
{
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;
    form.keepExtensions = true;
    form.maxFieldsSize = 20000 * 1024 * 1024;
    mkdir(form.uploadDir);
    form.parse(req, function(err, fields, files)
    {
        console.log("file tpye " + files.fulAvatar);
        if (err)
        {
            res.locals.error = err;
            console.log(err);
            res.render('index',
            {
                title: TITLE
            });
            return;
        }
        var avatarName = "temp.xlsx";
        var newPath = form.uploadDir + avatarName;
        var obj = xlsx.parse(newPath); // parses a file 

       // var obj = xlsx.parse(fs.readFileSync(newPath));
        console.log(obj[0].data);
        fs.renameSync(files.fulAvatar.path, newPath); //重命名
    });

    res.locals.success = '上传成功';
    res.redirect('/order');
});

module.exports = router;
