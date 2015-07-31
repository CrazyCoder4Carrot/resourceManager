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

exports.findOneUsers = function findOneUsers(req, res)
{
    var sess = req.session;
    if (sess.results)
    {
        var id = req.params.id;
        db.queryOneuser(id, function(err, queryResults)
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

exports.selectOneResources = function selectOneResources(req, res)
{
    var sess = req.session;
    if (sess.results)
    {
        var id = req.params.id;
        console.log(sess.results);
        db.queryOneResource(sess.results, id, function(err, queryResults)
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
            sourceTeam: req.body.sourceTeam,
            dest: req.body.dest,
            destTeam: req.body.destTeam,
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
        var destTeam = req.body.destTeam;
        var resourceInfo = {
            assetId: id,
            dest: username,
            teamName: destTeam
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
exports.updateResourceBatch = function updateResourceBatch(req, res)
{
    var sess = req.session;
    if (sess.results)
    {
        var id = req.params.id;
        var resourceInfo = {
            type: req.body.type,
            size: req.body.size,
            server: req.body.server,
            user: req.body.user,
            team: req.body.team,
            location: req.body.location,
            position: req.body.positon,
            createtime: req.body.createtime,
            discard: req.body.discard,
            template: req.body.template,
            manufacturer: req.body.manufacturer,
            model: req.body.model,
            status: req.body.status,
            assetId: id
        }
        console.log(resourceInfo);
        db.updateResourceBatch(resourceInfo, function(err, queryResults)
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

exports.findAllRoles = function findAllRoles(req, res)
{
    var sess = req.session;
    if (sess.results)
    {

        db.selectAllRoles(sess.results, function(err, queryResults)
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
exports.findTeamUsers = function findTeamUsers(req, res)
{
    var sess = req.session;
    if (sess.results)
    {
        var team = req.params.name;
        db.selectTeamUsers(team, function(err, queryResults)
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
exports.findAssetByUsers = function findAssetByUsers(req, res)
{
    var sess = req.session;
    if (sess.results)
    {
        var name = req.params.name;
        db.selectAssetByUser(name, function(err, queryResults)
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
exports.findAssetByTeam = function findAssetByTeam(req, res)
{
    var sess = req.session;
    if (sess.results)
    {
        var team = req.params.team;
        db.selectAssetByTeam(team, function(err, queryResults)
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
exports.findAllStatus = function findAllStatus(req, res)
{
    var sess = req.session;
    if (sess.results)
    {
        var team = req.params.team;
        db.selectAllStatus(team, function(err, queryResults)
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
