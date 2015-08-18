var mysql = require('mysql');
var squel = require('squel');
var pool = mysql.createPool(
{
    host: '127.0.0.1',
    user: 'root',
    password: '!QAZ@WSX',
    //database: 'resourcedb',
    database: 'resourcedblgm',
    connectionLimit: 100,
});

// Get one userinfo from user table by username and password. 

exports.getRecords = function(name, password, callback)
{
    var sql = "SELECT * FROM user WHERE username = " + name + " and password = " + password;
    // get a connection from the pool
    pool.getConnection(function(err, connection)
    {
        if (err)
        {
            console.log(err);
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, function(err, results)
        {
            connection.release();
            if (err)
            {
                console.log(err);
                callback(true);
                return;
            }
            console.log(results);
            callback(false, results);
        });
    });
};

function handle_database(name, password)
    {
        var sqltest = squel.select().from("user").where("username = " + "'" + name + "'").where("password = " + "'" + password + "'");
        pool.getConnection(function(err, connection)
        {
            if (err)
            {
                connection.release();
                res.json(
                {
                    "code": 100,
                    "status": "Error in connection database"
                });
                return;
            }

            console.log('connected as id ' + connection.threadId);
            console.log(sqltest);
            connection.query(sqltest.toString(), function(err, rows)
            {
                connection.release();
                if (!err)
                {
                    //res.json(rows);
                    console.log(rows);
                }
            });

            connection.on('error', function(err)
            {
                res.json(
                {
                    "code": 100,
                    "status": "Error in connection database"
                });
                return;
            });
        });
    }
    //query userinfo by user's name and user's password
exports.queryuser = function queryuser(name, password, callback)
{
    var sqltest = squel.select().from("user").where("username = " + "'" + name + "'").where("password = " + "'" + password + "'");
    // get a connection from the pool
    console.log(sqltest.toString());
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest.toString(), function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results[0]);
            }
        });
    });
};

//adduser

exports.addUser = function addUser(userInfo, callback)
{
    var sqltest = squel.insert()
        .into("`" + "user" + "`")
        .set("username", userInfo.name)
        .set("password", userInfo.password)
        .set("teamid", userInfo.teamid)
        .set("emailaddress", userInfo.emailaddress)
        .set("role", Number(userInfo.role))
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}

exports.updateUser = function updateUser(userInfo, callback)
{
    var sqltest = squel.update()
        .table("`" + "user" + "`")
        .set("username", userInfo.name)
        .set("password", userInfo.password)
        .set("teamid", userInfo.teamid)
        .set("emailaddress", userInfo.emailaddress)
        .set("role", Number(userInfo.role))
        .where("id=" + Number(userInfo.id))
        .toString();
    console.log(sqltest);
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}

//query all users' info
exports.queryallusers = function queryallusers(results, callback)
{
    switch (results.role)
    {
        case 1:
            var sqltest = squel.select().from("user").toString();
            break;
        case 2:
            var sqltest =
                squel
                .select().from("user")
                .where("teamid = " + "'" + results.teamid + "'")
                .where("role >=" + "'" + results.role + "'")
                .toString();
            break;
        case 3:
            var sqltest = squel.select().from("user").where("teamid = " + "'" + results.teamid + "'").toString();
            break;
    }
    //var sqltest = squel.select().from("user").where("username = "+"'"+name+"'").where("password = "+"'"+password+"'"); 
    // get a connection from the pool
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
};

exports.queryOneuser = function queryOneuser(id, callback)
{
    var sqltest = squel.select()
        .from("user")
        .where("id = " + "'" + id + "'")
        .toString();
    //var sqltest = squel.select().from("user").where("username = "+"'"+name+"'").where("password = "+"'"+password+"'"); 
    // get a connection from the pool
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
};


exports.queryallusersName = function queryallusersName(results, callback)
{
    var sqltest = squel.select().from("user").toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
};
exports.deleteUser = function deleteUser(userId, callback)
{
    var sqltest = squel.delete()
        .from("`" + "user" + "`")
        .where("id = " + userId)
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}

//get all resource of specific user
exports.queryResource = function queryResource(userInfo, callback)
    {
        console.log(userInfo);
        switch (userInfo.role)
        {
            case 1:
                var sqltest = squel.select().from("resource").toString();
                break;
            case 2:
                var sqltest = squel.select().from("resource").where("teamid = " + "'" + userInfo.teamid + "'").toString();
                break;
            case 3:
                var sqltest = squel.select().from("resource").where("userid = " + "'" + userInfo.username + "'").toString();
                console.log(sqltest);
                break;
        }
        pool.getConnection(function(err, connection)
        {
            // make the query
            connection.query(sqltest, function(err, results)
            {
                if (err)
                {
                    connection.release();
                    callback(true, err + sqltest);
                }
                else
                {
                    connection.release();
                    callback(false, results);
                }
            });
        });
    }

    exports.queryResourceStatus = function queryResourceStatus(userInfo, status, callback)
    {
        console.log(userInfo);
        switch (userInfo.role)
        {
            case 1:
                var sqltest = squel.select().from("resource")
                .where("status = " + "'" + status + "'")
                .toString();
                break;
            case 2:
                var sqltest = squel.select().from("resource")
                .where("teamid = " + "'" + userInfo.teamid + "'")
                .where("status = " + "'" + status + "'")
                .toString();
                break;
            case 3:
                var sqltest = squel.select().from("resource")
                .where("userid = " + "'" + userInfo.username + "'")
                .where("status = " + "'" + status + "'")
                .toString();
                console.log(sqltest);
                break;
        }
        pool.getConnection(function(err, connection)
        {
            // make the query
            connection.query(sqltest, function(err, results)
            {
                if (err)
                {
                    connection.release();
                    callback(true, err + sqltest);
                }
                else
                {
                    connection.release();
                    callback(false, results);
                }
            });
        });
    }

    exports.queryResourceId = function queryResourceId(userInfo, callback)
    {
        console.log(userInfo);
        switch (userInfo.role)
        {
            case 1:
                var sqltest = squel.select("id").from("resource").toString();
                break;
            case 2:
                var sqltest = squel.select("id").from("resource").where("teamid = " + "'" + userInfo.teamid + "'").toString();
                break;
            case 3:
                var sqltest = squel.select("id").from("resource").where("userid = " + "'" + userInfo.username + "'").toString();
                break;
        }
        pool.getConnection(function(err, connection)
        {
            // make the query
            connection.query(sqltest, function(err, results)
            {
                if (err)
                {
                    connection.release();
                    callback(true, err + sqltest);
                }
                else
                {
                    connection.release();
                    callback(false, results);
                }
            });
        });
    }
    //get all resource of specific user
exports.queryOneResource = function queryOneResource(userInfo, id, callback)
    {
        switch (userInfo.role)
        {
            case 1:
                var sqltest = squel
                    .select()
                    .from("resource")
                    .where("id = " + "'" + id + "'")
                    .toString();
                break;
            case 2:
                var sqltest = squel
                    .select()
                    .from("resource")
                    .where("teamid = " + "'" + userInfo.teamid + "'")
                    .where("id = " + "'" + id + "'")
                    .toString();
                break;
            case 3:
                var sqltest = squel
                    .select()
                    .from("resource")
                    .where("userid = " + "'" + userInfo.username + "'")
                    .where("id = " + "'" + id + "'")
                    .toString();
                console.log(sqltest);
                break;
        }
        pool.getConnection(function(err, connection)
        {
            // make the query
            connection.query(sqltest, function(err, results)
            {
                if (err)
                {
                    connection.release();
                    callback(true, err + sqltest);
                }
                else
                {
                    connection.release();
                    callback(false, results);
                }
            });
        });
    }
    //get all resource of specific user
exports.selectAssetByUser = function selectAssetByUser(username, callback)
{
    var sqltest = squel
        .select()
        .from("resource")
        .where("userid = " + "'" + username + "'")
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}
exports.selectAssetByUserStatus = function selectAssetByUserStatus(username, status, callback)
{
    var sqltest = squel
        .select()
        .from("resource")
        .where("userid = " + "'" + username + "'")
        .where("status = " + "'" + status + "'")
        .toString();
    pool.getConnection(function(err, connection)
    {
        console.log(sqltest);
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}
exports.selectAssetByTeam = function selectAssetByTeam(team, callback)
    {
        var sqltest = squel
            .select()
            .from("resource")
            .where("teamId = " + "'" + team + "'")
            .toString();
        pool.getConnection(function(err, connection)
        {
            // make the query
            connection.query(sqltest, function(err, results)
            {
                if (err)
                {
                    connection.release();
                    callback(true, err + sqltest);
                }
                else
                {
                    connection.release();
                    callback(false, results);
                }
            });
        });
    }

    exports.selectAssetByTeamStatus = function selectAssetByTeamStatus(team,status , callback)
    {
        var sqltest = squel
            .select()
            .from("resource")
            .where("teamId = " + "'" + team + "'")
            .where("status = " + "'" + status + "'")
            .toString();
        pool.getConnection(function(err, connection)
        {
            // make the query
            connection.query(sqltest, function(err, results)
            {
                if (err)
                {
                    connection.release();
                    callback(true, err + sqltest);
                }
                else
                {
                    connection.release();
                    callback(false, results);
                }
            });
        });
    }
    //insert resource
exports.insertResource = function insertResource(resourceInfo, callback)
{
    var sqltest = squel.insert()
        .into("resource")
        .set("name", resourceInfo.name)
        .set("template", resourceInfo.template)
        .set("type", resourceInfo.type)
        .set("manufacturer", resourceInfo.manufacturer)
        .set("model", resourceInfo.model)
        .set("size", resourceInfo.size)
        .set("serverId", resourceInfo.serverId)
        .set("userId", resourceInfo.userId)
        .set("teamId", resourceInfo.teamId)
        .set("location", resourceInfo.location)
        .set("position", resourceInfo.position)
        .set("createtime", resourceInfo.createtime)
        .set("number", resourceInfo.number)
        .set("discard", resourceInfo.discard)
        .set("status", resourceInfo.status)
        .set("`"+"check"+"`",resourceInfo.check)
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                console.log(err + " " + sqltest);
                callback(true, err + " " + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}

exports.DeleteResource = function DeleteResource(resourceId, callback)
{
    var sqltest = squel.delete()
        .from("resource")
        .where("id = " + resourceId)
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}

exports.SearchTypeResource = function SearchTypeResource(type, callback)
{
    var sqltest = squel.select()
        .from("resource")
        .where("type = " + "'" + type + "'")
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}

exports.updateResource = function iupdateResource(resourceInfo, callback)
{
    var sqltest = squel.update()
        .table("resource")
        .set("name", resourceInfo.name)
        .set("template", resourceInfo.template)
        .set("type", resourceInfo.type)
        .set("manufacturer", resourceInfo.manufacturer)
        .set("model", resourceInfo.model)
        .set("size", resourceInfo.size)
        .set("serverId", resourceInfo.serverId)
        .set("userId", resourceInfo.userId)
        .set("teamId", resourceInfo.teamId)
        .set("location", resourceInfo.location)
        .set("position", resourceInfo.position)
        .set("createtime", resourceInfo.createtime)
        .set("number", resourceInfo.number)
        .set("discard", resourceInfo.discard)
        .set("status", resourceInfo.status)
        .set("`"+"check"+"`", resourceInfo.check)
        .where("id=" + Number(resourceInfo.id))
        .toString();
    console.log(resourceInfo);
    console.log(resourceInfo.id);
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}
exports.updateResourceUser = function updateResourceUser(resourceInfo, callback)
{
    var sqltest = squel.update()
        .table("resource")
        .set("userId", resourceInfo.dest)
        .set("teamId", resourceInfo.teamName)
        .where("id=" + Number(resourceInfo.assetId))
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                console.log(err);
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}

exports.updateResourceBatch = function updateResourceBatch(resourceInfo, callback)
{
    var sqltest = squel.update()
        .table("resource")
        .set("type", resourceInfo.type)
        .set("size", resourceInfo.size)
        .set("serverId", resourceInfo.server)
        .set("userId", resourceInfo.user)
        .set("teamId", resourceInfo.team)
        .set("location", resourceInfo.location)
        .set("position", resourceInfo.position)
        .set("createtime", resourceInfo.createtime)
        .set("discard", resourceInfo.discard)
        .set("template", resourceInfo.template)
        .set("manufacturer", resourceInfo.manufacturer)
        .set("model", resourceInfo.model)
        .set("status", resourceInfo.status)
        .set("`"+"check"+"`", resourceInfo.check)
        .where("id=" + Number(resourceInfo.assetId))
        .toString();
        console.log(sqltest);
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                console.log(err);
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}

exports.selectAllOrders = function selectAllOrders(userInfo, callback)
{
    if (userInfo.role == 0)
    {
        var sqltest = squel.select()
            .from("`" + "order" + "`")
            .toString();
    }
    else
    {
        var sqltest = squel.select()
            .from("`" + "order" + "`")
            .where("teamId=" + "'" + userInfo.teamid + "'")
            .toString();
    }
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + " " + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}
exports.addOrder = function addOrder(orderInfo, callback)
{
    var sqltest = squel.insert()
        .into("`" + "order" + "`")
        .set("category", orderInfo.category)
        .set("vendor", orderInfo.vendor)
        .set("quantity", orderInfo.quantity)
        .set("unitprice", orderInfo.unitPrice)
        .set("`" + "order" + "`", orderInfo.order)
        .set("date", orderInfo.date)
        .set("comment", orderInfo.comment)
        .set("teamId", orderInfo.team)
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}
exports.updateOrder = function addOrder(orderInfo, callback)
{
    var sqltest = squel.update()
        .table("`" + "order" + "`")
        .set("category", orderInfo.category)
        .set("vendor", orderInfo.vendor)
        .set("quantity", orderInfo.quantity)
        .set("unitprice", orderInfo.unitPrice)
        .set("`" + "order" + "`", orderInfo.order)
        .set("date", orderInfo.date)
        .set("comment", orderInfo.comment)
        .set("teamId", orderInfo.team)
        .where("id=" + Number(orderInfo.id))
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}
exports.deleteOrder = function deleteOrder(orderId, callback)
{
    var sqlstring = squel.delete()
        .from("`" + "order" + "`")
        .where("id = " + orderId)
        .toString();
    pool.getConnection(function(err, connection)
    {
        connection.query(sqlstring, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqlstring);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}

exports.selectAllChanges = function selectAllChanges(userInfo, callback)
{
    var sqltest = squel.select()
        .from("`" + "change" + "`")
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + " " + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}

//add change
exports.addChange = function addChange(changeInfo, callback)
{
    var sqltest = squel.insert()
        .into("`" + "change" + "`")
        .set("AssetId", Number(changeInfo.assetId))
        .set("Type", changeInfo.type)
        .set("`" + "source" + "`", changeInfo.source)
        .set("sourceTeam", changeInfo.sourceTeam)
        .set("dest", changeInfo.dest)
        .set("destTeam", changeInfo.destTeam)
        .set("datetime", changeInfo.date)
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}

//add team
exports.addTeam = function addTeam(teamInfo, callback)
{
    var sqltest = squel.insert()
        .into("`" + "team" + "`")
        .set("name", teamInfo.name)
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}
exports.selectTeam = function selectTeam(teamInfo, callback)
{
    var sqltest = squel.select()
        .from("`" + "team" + "`")
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}
exports.deleteTeam = function deleteTeam(teamId, callback)
{
    var sqltest = squel.delete()
        .from("`" + "team" + "`")
        .where("id = " + teamId)
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}

exports.updateTeam = function updateTeam(teamInfo, callback)
    {
        var sqltest = squel.update()
            .table("`" + "team" + "`")
            .set("name", teamInfo.name)
            .where("id=" + teamInfo.id)
            .toString();
        pool.getConnection(function(err, connection)
        {
            // make the query
            connection.query(sqltest, function(err, results)
            {
                if (err)
                {
                    connection.release();
                    callback(true, err + sqltest);
                }
                else
                {
                    connection.release();
                    callback(false, results);
                }
            });
        });
    }
    //operation on the lab table
exports.addLab = function addLab(labInfo, callback)
{
    var sqltest = squel.insert()
        .into("`" + "location" + "`")
        .set("name", labInfo.name)
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}
exports.selectLab = function selectLab(labInfo, callback)
{
    var sqltest = squel.select()
        .from("`" + "location" + "`")
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}
exports.deleteLab = function deleteLab(labId, callback)
{
    var sqltest = squel.delete()
        .from("`" + "location" + "`")
        .where("id = " + labId)
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}

exports.updateLab = function updateLab(labInfo, callback)
{
    var sqltest = squel.update()
        .table("`" + "location" + "`")
        .set("name", labInfo.name)
        .where("id=" + labInfo.id)
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}

//operation on the type table
exports.addType = function addType(typeInfo, callback)
{
    var sqltest = squel.insert()
        .into("`" + "type" + "`")
        .set("name", typeInfo.name)
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}
exports.selectType = function selectType(typeInfo, callback)
{
    var sqltest = squel.select()
        .from("`" + "type" + "`")
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}
exports.deleteType = function deleteType(id, callback)
{
    var sqltest = squel.delete()
        .from("`" + "type" + "`")
        .where("id = " + id)
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}

exports.updateType = function updateType(typeInfo, callback)
{
    var sqltest = squel.update()
        .table("`" + "type" + "`")
        .set("name", typeInfo.name)
        .where("id=" + typeInfo.id)
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}

exports.selectServer = function selectLab(labInfo, callback)
{
    var sqltest = squel.select()
        .from("`" + "resource" + "`")
        .where("type=" + "Server")
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}

exports.selectAllRoles = function selectAllRoles(userInfo, callback)
{
    var sqltest = squel.select()
        .from("`" + "roletype" + "`")
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + " " + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}
exports.selectAllStatus = function selectAllStatus(userInfo, callback)
{
    var sqltest = squel.select()
        .from("`" + "status" + "`")
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + " " + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}

//operation on the template table
exports.addTemplate = function addTenmplate(templateInfo, callback)
{
    var sqltest = squel.insert()
        .into("`" + "template" + "`")
        .set("name", templateInfo.name)
        .set("type", templateInfo.type)
        .set("manufacturer", templateInfo.manu)
        .set("model", templateInfo.model)
        .set("size", templateInfo.size)
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}
exports.selectTemplate = function selectTemplate(typeInfo, callback)
{
    var sqltest = squel.select()
        .from("`" + "template" + "`")
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}
exports.selectOneTemplate = function selectOneTemplate(name, callback)
{
    var sqltest = squel.select()
        .from("`" + "template" + "`")
        .where("name = " + "'" + name + "'")
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}
exports.deleteTemplate = function deleteTemplate(id, callback)
{
    var sqltest = squel.delete()
        .from("`" + "template" + "`")
        .where("id = " + id)
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}

exports.updateTemplate = function updateTemplate(templateInfo, callback)
{
    var sqltest = squel.update()
        .table("`" + "template" + "`")
        .set("name", templateInfo.name)
        .set("type", templateInfo.type)
        .set("manufacturer", templateInfo.manu)
        .set("model", templateInfo.model)
        .set("size", templateInfo.size)
        .where("id=" + templateInfo.id)
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}


//operation on the detail

exports.addDetail = function addDetail(detailInfo, callback)
{
    var sqltest = squel.insert()
        .into("`" + "detail" + "`")
        .set("id", detailInfo.id)
        .set("name", detailInfo.name)
        .set("type", detailInfo.type)
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}
exports.selectDetail = function selectDetail(typeInfo, callback)
{
    var sqltest = squel.select()
        .from("`" + "detail" + "`")
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}
exports.selectDetailbyId = function selectDetailbyId(id, callback)
{
    var sqltest = squel.select()
        .from("`" + "detail" + "`")
        .where("id=" + id)
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}
exports.selectDetailbyJoin = function selectDetailbyJoin(userInfo, callback)
{
    var sqltest;
        switch (userInfo.role)
        {
            case 1:
                var sqltest = squel.select()
                .from("`" + "detail" + "`",'d')
                //.join("resource","detail.id = resource.id")
                .join(squel.select("id").from('resource'),'r',"d.id = r.id")
                .toString();
                                console.log(sqltest);
                break;
            case 2:
                var sqltest = squel.select()
                .from("`" + "detail" + "`",'d')
                .join(squel.select("id").from('resource'),'r',"d.id = r.id")
                .where("teamid = " + "'" + userInfo.teamid + "'").toString();
                console.log(sqltest);
                break;
            case 3:
                var sqltest = squel.select()
                .from("`" + "detail" + "`")
                .join(squel.select("id").from('resource'),'r',"d.id = r.id")
                .where("userid = " + "'" + userInfo.username + "'").toString();
                console.log(sqltest);
                break;
        }
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}


exports.selectOneDetail = function selectOneDetail(id, callback)
{
    var sqltest = squel.select()
        .from("`" + "detail" + "`")
        .where("id=" + id)
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}
exports.deleteDetail = function deleteDetail(id, callback)
{
    var sqltest = squel.delete()
        .from("`" + "detail" + "`")
        .where("id = " + id)
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}

exports.updateDetail = function updateDetail(detailInfo, callback)
{
    var sqltest = squel.update()
        .table("`" + "detail" + "`")
   //     .set("name", detailInfo.name)
        .set("barcode", detailInfo.barcode)
        .set("ip", detailInfo.ip)
        .set("description", detailInfo.description)
        .where("id=" + detailInfo.id)
        .toString();
    console.log(sqltest);
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}
exports.updatePartDetail = function updatePartDetail(detailInfo, callback)
{
    var sqltest = squel.update()
        .table("`" + "detail" + "`")
        .set("name", detailInfo.name)
        .set("type", detailInfo.type)
        .where("id=" + detailInfo.id)
        .toString();
    console.log(sqltest);
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}
exports.selectServerId = function selectServerId(userInfo, callback)
{
    switch (userInfo.role)
    {
        case 1:
            var sqltest = squel.select()
                .field("id")
                .from("resource")
                .where("type=" + "'" + "Server" + "'")
                .toString();
            break;
        case 2:
            var sqltest = squel.select()
                .field("id").from("resource")
                .where("teamid = " + "'" + userInfo.teamid + "'")
                .where("type=" + "'" + "Server" + "'")
                .toString();
            break;
        case 3:
            var sqltest = squel.select()
                .field("id")
                .from("resource")
                .where("userid = " + "'" + userInfo.userid + "'")
                .where("type=" + "'" + "Server" + "'")
                .toString();
            break;
    }
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });

}


exports.queryallusername = function queryallusername(results, callback)
{

    var sqltest = squel.select("username").from("user").toString();
    //var sqltest = squel.select().from("user").where("username = "+"'"+name+"'").where("password = "+"'"+password+"'"); 
    // get a connection from the pool
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
};

//operation on the position table
exports.addPosition = function addPosition(positionInfo, callback)
{
    var sqltest = squel.insert()
        .into("`" + "position" + "`")
        .set("name", positionInfo.name)
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}
exports.selectPosition = function selectPosition(positionInfo, callback)
{
    var sqltest = squel.select()
        .from("`" + "position" + "`")
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}
exports.deletePosition = function deletePosition(positionId, callback)
{
    var sqltest = squel.delete()
        .from("`" + "position" + "`")
        .where("id = " + positionId)
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}

exports.updatePosition = function updatePosition(positionInfo, callback)
{
    var sqltest = squel.update()
        .table("`" + "position" + "`")
        .set("name", positionInfo.name)
        .where("id=" + positionInfo.id)
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}
exports.selectServers = function selectServers(positionInfo, callback)
{
    var sqltest = squel.select()
        //        .field("id")
        .from("`" + "resource" + "`")
        .where("type = 'Server'")
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}


//operation on the model table
exports.addModel = function addModel(modelInfo, callback)
{
    var sqltest = squel.insert()
        .into("`" + "model" + "`")
        .set("name", modelInfo.name)
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}
exports.selectModel = function selectModel(modelInfo, callback)
{
    var sqltest = squel.select()
        .from("`" + "model" + "`")
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}
exports.deleteModel = function deleteModel(modelId, callback)
{
    var sqltest = squel.delete()
        .from("`" + "model" + "`")
        .where("id = " + modelId)
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}

exports.updateModel = function updateModel(modelInfo, callback)
{
    var sqltest = squel.update()
        .table("`" + "model" + "`")
        .set("name", modelInfo.name)
        .where("id=" + modelInfo.id)
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}

//operation on the size table
exports.addSize = function addSize(sizeInfo, callback)
{
    var sqltest = squel.insert()
        .into("`" + "size" + "`")
        .set("name", sizeInfo.name)
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}
exports.selectSize = function selectSize(sizeInfo, callback)
{
    var sqltest = squel.select()
        .from("`" + "size" + "`")
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}
exports.deleteSize = function deleteSize(sizeId, callback)
{
    var sqltest = squel.delete()
        .from("`" + "size" + "`")
        .where("id = " + sizeId)
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}

exports.updateSize = function updateSize(sizeInfo, callback)
{
    var sqltest = squel.update()
        .table("`" + "size" + "`")
        .set("name", sizeInfo.name)
        .where("id=" + sizeInfo.id)
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}


//operation on the manufacturer table
exports.addManu = function addManu(manuInfo, callback)
{
    var sqltest = squel.insert()
        .into("`" + "manufacturer" + "`")
        .set("name", manuInfo.name)
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}
exports.selectManu = function selectManu(manuInfo, callback)
{
    var sqltest = squel.select()
        .from("`" + "manufacturer" + "`")
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}
exports.deleteManu = function deleteManu(id, callback)
{
    var sqltest = squel.delete()
        .from("`" + "manufacturer" + "`")
        .where("id = " + id)
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}

exports.updateManu = function updateManu(manuInfo, callback)
{
    var sqltest = squel.update()
        .table("`" + "manufacturer" + "`")
        .set("name", manuInfo.name)
        .where("id=" + manuInfo.id)
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}

exports.selectTeamUsers = function selectTeamUsers(teamName, callback)
{
    var sqltest = squel.select()
        .from("user")
        .where("teamid = " + "'" + teamName + "'")
        .toString();
    //var sqltest = squel.select().from("user").where("username = "+"'"+name+"'").where("password = "+"'"+password+"'"); 
    // get a connection from the pool
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
};
exports.selectTeamUsers = function selectTeamUsers(teamName, callback)
{
    var sqltest = squel.select()
        .from("user")
        .where("teamid = " + "'" + teamName + "'")
        .toString();
    //var sqltest = squel.select().from("user").where("username = "+"'"+name+"'").where("password = "+"'"+password+"'"); 
    // get a connection from the pool
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
};

exports.IsManuNameExist = function IsManuNameExist(name, callback)
{
    var sqltest = squel.select()
        .from("manufacturer")
        .where("name = " + "'" + name + "'")
        .toString();
        console.log(sqltest);
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
};
exports.IsSizeNameExist = function IsSizeNameExist(name, callback)
{
    var sqltest = squel.select()
        .from("size")
        .where("name = " + "'" + name + "'")
        .toString();
        console.log(sqltest);
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
};
exports.IsModelNameExist = function IsModelNameExist(name, callback)
{
    var sqltest = squel.select()
        .from("`" + "model" + "`")
        .where("name = " + "'" + name + "'")
        .toString();
        console.log(sqltest);
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
};
exports.doesPositionNameExist = function doesPositionNameExist(name, callback)
{
    var sqltest = squel.select()
        .from("`" + "position" + "`")
        .where("name = " + "'" + name + "'")
        .toString();
        console.log(sqltest);
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
};

exports.doesTypeNameExist = function doesTypeNameExist(name, callback)
{
    var sqltest = squel.select()
        .from("`" + "type" + "`")
        .where("name = " + "'" + name + "'")
        .toString();
        console.log(sqltest);
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
};

exports.doesLocationNameExist = function doesLocationNameExist(name, callback)
{
    var sqltest = squel.select()
        .from("`" + "location" + "`")
        .where("name = " + "'" + name + "'")
        .toString();
        console.log(sqltest);
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
};

exports.doesTeamNameExist = function doesTeamNameExist(name, callback)
{
    var sqltest = squel.select()
        .from("`" + "team" + "`")
        .where("name = " + "'" + name + "'")
        .toString();
        console.log(sqltest);
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
};

exports.doesTemplateNameExist = function doesTemplateNameExist(name, callback)
{
    var sqltest = squel.select()
        .from("`" + "template" + "`")
        .where("name = " + "'" + name + "'")
        .toString();
        console.log(sqltest);
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
};

exports.doesUserNameExist = function doesUserNameExist(name, callback)
{
    var sqltest = squel.select()
        .from("`" + "user" + "`")
        .where("username = " + "'" + name + "'")
        .toString();
        console.log(sqltest);
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
};

exports.doesAssetNameExist = function doesAssetNameExist(name, callback)
{
    var sqltest = squel.select()
        .from("`" + "resource" + "`")
        .where("name = " + "'" + name + "'")
        .toString();
        console.log(sqltest);
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
};

exports.resetCheck = function resetCheck(id, callback)
{
    var sqltest = squel.update()
        .table("`" + "resource" + "`")
        .set("check", "Unchecked")
        .where("id=" + id)
        .toString();
    pool.getConnection(function(err, connection)
    {
        // make the query
        connection.query(sqltest, function(err, results)
        {
            if (err)
            {
                connection.release();
                callback(true, err + sqltest);
            }
            else
            {
                connection.release();
                callback(false, results);
            }
        });
    });
}