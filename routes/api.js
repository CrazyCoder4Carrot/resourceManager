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
