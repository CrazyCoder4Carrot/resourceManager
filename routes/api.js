var express = require('express');
var db = require('../lib/database');
var router = express.Router();
exports.findAllLab = function findAllLab(req, res)
{
    var sess = req.session;
    if (sess.results)
    {

        db.selectLab(sess.results, function(err, queryResults)
        {
            if (queryResults)
            {
                res.send(queryResults);
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
}

exports.deleteLab = function deleteLab(req, res)
{
    var sess = req.session;
    if (sess.results)
    {
        var labId = req.params.id;
        db.deleteLab(labId, function(err, queryResults)
        {
            if (!err)
            {
                console.log(queryResults + 'Delete');
                res.send(req.body);
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

}
exports.findAllTeams = function findAllTeams(req, res)
{
    var sess = req.session;
    if (sess.results)
    {

        db.selectTeam(sess.results, function(err, queryResults)
        {
            if (!err)
            {
                res.send(queryResults);
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
}

exports.deleteTeam = function deleteTeam(req, res)
{
    var sess = req.session;
    if (sess.results)
    {
        var teamId = req.params.id;
        db.deleteTeam(teamId, function(err, queryResults)
        {
            if (!err)
            {
                res.send("ok");
            }
            else
            {
                res.send(err + "filed");
            }
        });
    }
    else
    {
        res.redirect('/login');
    }
}

exports.findAllTypes = function findAllTypes(req, res)
{
    var sess = req.session;
    var allTypeInfo;
    if (sess.results)
    {

        db.selectType(sess.results, function(err, queryResults)
        {
            if (queryResults)
            {
                res.send(queryResults);
            }
            else
            {
                res.send(err);
            }
        });
        // console.log(allTypeInfo);
    }
    else
    {
        res.redirect('/login');
    }

}

exports.deleteType = function deleteType(req, res)
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
                res.send('ok');
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

}

exports.deleteUser = function deleteUser(req, res)
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
                res.send('ok');
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

}
exports.deleteResource = function deleteResource(req, res)
{
    var sess = req.session;
    if (sess.results)
    {
        var resourceId = req.params.id;
        db.DeleteResource(resourceId, function(err, queryResults)
        {
            if (!err)
            {
                res.send('ok');
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

}

exports.findAllTemplate = function findAllTemplate(req, res)
{
    var sess = req.session;
    var allTemplateInfo;
    if (sess.results)
    {
        db.selectTemplate(sess.results, function(err, queryResults)
        {
            if (queryResults)
            {
                res.send(queryResults);
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
}

exports.findOneTemplate = function findOneTemplate(req, res)
{
    var sess = req.session;
    var name = req.params.name;
    var allTemplateInfo;
    if (sess.results)
    {
        db.selectOneTemplate(name, function(err, queryResults)
        {
            if (queryResults)
            {
                res.send(queryResults);
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
}

exports.deleteTemplate = function deleteTemplate(req, res)
{
    var sess = req.session;
    if (sess.results)
    {

        var labId = req.params.id;
        db.deleteTemplate(labId, function(err, queryResults)
        {
            if (!err)
            {
                res.send('ok');
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
}

exports.selectServerId = function selectServerId(req, res)
{
    var sess = req.session;
    if (sess.results)
    {
        var userInfo = sess.results;
        db.selectServerId(userInfo, function(err, queryResults)
        {
            if (!err)
            {
                res.send(queryResults);
            }
            else
            {
                res.send(err + queryResults);
            }
        });
    }
    else
    {
        res.redirect('/login');
    }
}

exports.findAllUsers = function findAllUsers(req, res)
{
    var sess = req.session;
    if (sess.results)
    {
        var userInfo = sess.results;
        db.queryallusers(userInfo, function(err, queryResults)
        {
            if (!err)
            {
                res.send(queryResults);
            }
            else
            {
                res.send(err + queryResults);
            }
        });
    }
    else
    {
        res.redirect('/login');
    }
}

exports.findAllPosition = function findAllPosition(req, res)
{
    var sess = req.session;
    if (sess.results)
    {

        db.selectPosition(sess.results, function(err, queryResults)
        {
            if (queryResults)
            {
                res.send(queryResults);
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
}

exports.deletePosition = function deletePosition(req, res)
{
    var sess = req.session;
    if (sess.results)
    {
        var labId = req.params.id;
        db.deletePosition(labId, function(err, queryResults)
        {
            if (!err)
            {
                res.send(req.body);
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

}

exports.findAllServer = function findAllServer(req, res)
{
    var sess = req.session;
    if (sess.results)
    {

        db.selectServers(sess.results, function(err, queryResults)
        {
            if (queryResults)
            {
                res.send(queryResults);
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
}


exports.findAllDetail = function findAllDetail(req, res)
{
    var sess = req.session;
    if (sess.results)
    {
        var template;
        db.selectDetail(template, function(err, queryResults)
        {
            if (queryResults)
            {
                res.send(queryResults);
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
}

exports.findOneDetail = function findOneDetail(req, res)
{
    var sess = req.session;
    if (sess.results)
    {
        var id = req.params.id;
        db.selectOneDetail(id, function(err, queryResults)
        {
            if (queryResults)
            {
                res.send(queryResults);
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
}
exports.deleteDetail = function deleteDetail(req, res)
{
    var sess = req.session;
    if (sess.results)
    {
        var id = req.params.id;
        db.deleteDetail(id, function(err, queryResults)
        {
            if (queryResults)
            {
                res.send(queryResults);
            }
            else
            {
                res.send(err);
            }
        });
    }
}

exports.selectResources = function selectResources(req, res)
{
    var sess = req.session;
    if (sess.results)
    {
        console.log(sess.results);
        db.queryResource(sess.results, function(err, queryResults)
        {
            if (queryResults)
            {
                res.send(queryResults);
            }
            else
            {
                res.send(err);
            }
        });
    }
}

exports.findAllOrder = function findAllOrder(req, res)
{
    var sess = req.session;
    if (sess.results)
    {
        var template;
        db.selectAllOrders(template, function(err, queryResults)
        {
            if (queryResults)
            {
                res.send(queryResults);
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
}

exports.deleteOrder = function deleteOrder(req, res)
{
    var sess = req.session;
    if (sess.results)
    {
        var id = req.params.id;
        db.deleteOrder(id, function(err, queryResults)
        {
            if (queryResults)
            {
                res.send(queryResults);
            }
            else
            {
                res.send(err);
            }
        });
    }
}

exports.transfer = function transfer(req, res)
{
    var sess = req.session;
    var date = new Date();
    if (sess.results)
    {
        var id = req.body.id;
        var username = req.body.name;
        var resourceInfo = {
            assetId: req.body.id,
            type: req.body.type,
            source: req.body.source,
            dest: req.body.dest,
            date: date.toISOString().slice(0, 19).replace('T', ' ')
        }
        db.addChange(resourceInfo, function(err, queryResults)
        {
            if (queryResults)
            {
                res.send(queryResults);
            }
            else
            {
                res.send(err);
            }
        });
    }
}

exports.updateResource = function updateResource(req, res)
{
    var sess = req.session;
    if (sess.results)
    {
        var id = req.params.id;
        var username = req.body.dest;
        var resourceInfo = {
            assetId: id,
            dest: username
        }
        console.log(resourceInfo);
        db.updateResourceUser(resourceInfo, function(err, queryResults)
        {
            if (!err)
            {
                res.send(queryResults);
            }
            else
            {
                res.send(err);
            }
        });
    }
}


exports.findAllModel = function findAllModel(req, res)
{
    var sess = req.session;
    if (sess.results)
    {

        db.selectModel(sess.results, function(err, queryResults)
        {
            if (!err)
            {
                res.send(queryResults);
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
}

exports.deleteModel = function deleteModel(req, res)
{
    var sess = req.session;
    if (sess.results)
    {
        var modelId = req.params.id;
        db.deleteModel(modelId, function(err, queryResults)
        {
            if (!err)
            {
                res.send("ok");
            }
            else
            {
                res.send(err + "filed");
            }
        });
    }
    else
    {
        res.redirect('/login');
    }
}

exports.findAllSize = function findAllSize(req, res)
{
    var sess = req.session;
    if (sess.results)
    {

        db.selectSize(sess.results, function(err, queryResults)
        {
            if (!err)
            {
                res.send(queryResults);
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
}

exports.deleteSize = function deleteSize(req, res)
{
    var sess = req.session;
    if (sess.results)
    {
        var sizeId = req.params.id;
        db.deleteSize(sizeId, function(err, queryResults)
        {
            if (!err)
            {
                res.send("ok");
            }
            else
            {
                res.send(err + "filed");
            }
        });
    }
    else
    {
        res.redirect('/login');
    }
}



exports.findAllManu = function findAllManu(req, res)
{
    var sess = req.session;
    if (sess.results)
    {

        db.selectManu(sess.results, function(err, queryResults)
        {
            if (!err)
            {
                res.send(queryResults);
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
}

exports.deleteManu = function deleteManu(req, res)
{
    var sess = req.session;
    if (sess.results)
    {
        var sizeId = req.params.id;
        db.deleteManu(sizeId, function(err, queryResults)
        {
            if (!err)
            {
                res.send("ok");
            }
            else
            {
                res.send(err + "filed");
            }
        });
    }
    else
    {
        res.redirect('/login');
    }
}