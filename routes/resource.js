var db = require('../lib/database');
var lib = require('../lib/lib');
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
                    moment: moment,
                    result: sess.results
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
                db.deleteDetail(resourceId, function(err, queryResults)
                {
                    if (!err)
                    {
                        res.redirect('/resource');
                    }
                    else
                    {
                        res.send(err);
                    }
                });

            }
            else
            {
                res.send(err);
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
            name: req.body.name,
            type: req.body.type,
            size: req.body.size,
            serverId: req.body.serverId,
            userId: req.body.userId,
            teamId: req.body.teamId,
            location: req.body.location,
            position: req.body.position,
            createtime: req.body.createtime,
            discard: req.body.discard,
        }
        db.insertResource(resourceInfo, function(err, queryResults)
        {
            if (!err)
            {
                var detailInfo = {
                    id: queryResults.insertId,
                    name: resourceInfo.name,
                }
                db.addDetail(detailInfo, function(err, queryResults)
                {
                    res.redirect('/resource');
                });
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
            id: req.body.id,
            name: req.body.name,
            type: req.body.type,
            size: req.body.size,
            serverId: req.body.serverId,
            userId: req.body.userId,
            teamId: req.body.teamId,
            location: req.body.location,
            position: req.body.position,
            createtime: req.body.createtime,
            discard: req.body.discard,
        }
        console.log(resourceInfo);
        db.updateResource(resourceInfo, function(err, queryResults)
        {
            if (!err)
            {
                var detailInfo = {
                    id: queryResults.insertId,
                    name: resourceInfo.name,
                    type: resourceInfo.type,
                }
                db.updatePartDetail(detailInfo, function(err, queryResults)
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
    form.maxFieldsSize = 20000 * 1024 * 1024;
    lib.mkdir(form.uploadDir);
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
        console.log(newPath);
        fs.renameSync(files.fulAvatar.path, newPath); //重命名
        var obj = xlsx.parse(newPath); // parses a file 

        // var obj = xlsx.parse(fs.readFileSync(newPath));
        console.log("count is " + obj[0].data.length);
        for (var i = 1; i < obj[0].data.length; i++)
        {
            var date = new Date(1900, 0, obj[0].data[i][8] - 1);
            console.log(date);
            var resourceInfo = {
                name: obj[0].data[i][0].toString(),
                type: obj[0].data[i][1].toString(),
                size: obj[0].data[i][2].toString(),
                serverId: obj[0].data[i][3].toString(),
                userId: obj[0].data[i][4].toString(),
                teamId: obj[0].data[i][5].toString(),
                location: obj[0].data[i][6].toString(),
                position: obj[0].data[i][7].toString(),
                createtime: date.toISOString().slice(0, 19).replace('T', ' '),
                discard: obj[0].data[i][9].toString()
            }
            db.insertResource(resourceInfo, function(err, queryResults)
            {
                if (err)
                {
                    res.send(queryResults);
                }
            });
        }
        console.log("import finished");
        // fs.unlink(newPath);

    });

    res.locals.success = '上传成功';
    res.redirect('/resource');

});

//add thansfer
router.post('/addtrans', function(req, res, next)
{
    var sess = req.session;
    var date = new Date();
    console.log(sess);
    if (sess.results)
    {
        var resourceInfo = {
            assetId: req.body.id,
            type: req.body.type,
            source: sess.results.username,
            dest: req.body.dest,
            date: date.toISOString().slice(0, 19).replace('T', ' ')
        }
        db.addChange(resourceInfo, function(err, queryResults)
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
