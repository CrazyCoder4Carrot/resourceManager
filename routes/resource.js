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
    console.log(sess);
    var allResourceInfo;
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
                        res.redirect('/asset');
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
        var serverId = req.body.serverId;
        if (!serverId.trim()) 
        {
            serverId = -1;
        }
        var resourceInfo = {
            name: req.body.name,
            template: req.body.template,
            type: req.body.type,
            manufacturer: req.body.manufacturer,
            model: req.body.model,
            size: req.body.size,
            serverId: serverId,
            userId: req.body.userId,
            teamId: req.body.teamId,
            location: req.body.location,
            position: req.body.position,
            createtime: req.body.createtime,
            discard: req.body.discard,
            number:req.body.number
        }
        db.insertResource(resourceInfo, function(err, queryResults)
        {
            if (!err)
            {
                var detailInfo = {
                    id: queryResults.insertId,
                    name: resourceInfo.name,
                    type:resourceInfo.type
                }
                db.addDetail(detailInfo, function(err, queryResults)
                {
                    res.redirect('/asset');
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
        console.log(req.body.manufacturer);
        var resourceInfo = {
            id: req.body.id,
            name: req.body.name,
            template: req.body.template,
            type: req.body.type,
            manufacturer: req.body.manufacturer,
            model: req.body.model,
            size: req.body.size,
            serverId: req.body.serverId,
            userId: req.body.userId,
            teamId: req.body.teamId,
            location: req.body.location,
            position: req.body.position,
            createtime: req.body.createtime,
            discard: req.body.discard,
            number:req.body.number,
        }
        console.log(resourceInfo);
        db.updateResource(resourceInfo, function(err, queryResults)
        {
            if (!err)
            {
                var detailInfo = {
                    id: resourceInfo.id,
                    name: resourceInfo.name,
                    type: resourceInfo.type,
                }
                console.log(detailInfo);
                db.updatePartDetail(detailInfo, function(err, queryResults)
                {
                    if (!err)
                    {
                        res.redirect('/asset');
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
            var date = new Date(1900, 0, obj[0].data[i][11] - 1);
            console.log(date);
            var resourceInfo = {
                name: obj[0].data[i][0].toString(),
                template: obj[0].data[i][1].toString(),
                type: obj[0].data[i][2].toString(),
                manufacturer: obj[0].data[i][3].toString(),
                model: obj[0].data[i][4].toString(),
                size: obj[0].data[i][5].toString(),
                serverId: obj[0].data[i][6].toString(),
                userId: obj[0].data[i][7].toString(),
                teamId: obj[0].data[i][8].toString(),
                location: obj[0].data[i][9].toString(),
                position: obj[0].data[i][10].toString(),
                createtime: date.toISOString().slice(0, 19).replace('T', ' '),
                number: obj[0].data[i][12].toString(),
                discard: obj[0].data[i][13].toString()
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

//add transfer
router.post('/addtrans', function(req, res, next)
{
    var sess = req.session;
    var date = new Date();

    if (sess.results)
    {
        var resourceInfo = {
            assetId: req.body.id,
            type: req.body.type,
            source: req.body.source,
            dest: req.body.dest,
            date: date.toISOString().slice(0, 19).replace('T', ' ')
        }
            console.log(resourceInfo);
        db.addChange(resourceInfo, function(err, queryResults)
        {
            if (!err)
            {
                db.updateResourceUser(resourceInfo,function(err, queryResults)
                {
                    if(!err)
                    {
                        res.redirect('/asset');
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


module.exports = router;
