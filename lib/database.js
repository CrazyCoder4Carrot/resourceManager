var mysql = require('mysql');
var squel = require('squel');
var pool = mysql.createPool(
{
    host: '127.0.0.1',
    user: 'root',
    password: '!QAZ@WSX',
    database: 'resourcedb',
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
        .where("id="+ Number(userInfo.id))
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
            var sqltest = squel.select().from("user").where("teamid = " + "'" + results.teamid + "'").toString();
            break;
        case 3:
            callback(results);
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
exports.queryallusersName = function queryallusersName( results, callback)
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
        switch (userInfo.role)
        {
            case 1:
                var sqltest = squel.select().from("resource").toString();
                break;
            case 2:
                var sqltest = squel.select().from("resource").where("teamid = " + "'" + userInfo.teamid + "'").toString();
                break;
            case 3:
                var sqltest = squel.select().from("resource").where("userid = " + "'" + userInfo.userid + "'").toString();
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
    //insert resource
exports.insertResource = function insertResource(resourceInfo, callback)
{
    var sqltest = squel.insert()
        .into("resource")
        .set("name", resourceInfo.name)
        .set("type", resourceInfo.type)
        .set("size", resourceInfo.size)
        .set("serverId", Number(resourceInfo.serverId))
        .set("userId", resourceInfo.userId)
        .set("teamId", resourceInfo.teamId)
        .set("location", resourceInfo.location)
        .set("position", resourceInfo.position)
        .set("createtime", resourceInfo.createtime)
        .set("discard", Number(resourceInfo.discard))
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
        .set("type", resourceInfo.type)
        .set("size", resourceInfo.size)
        .set("serverId", Number(resourceInfo.serverId))
        .set("userId", resourceInfo.userId)
        .set("teamId", resourceInfo.teamId)
        .set("location", resourceInfo.location)
        .set("position", resourceInfo.position)
        .set("createtime", resourceInfo.createtime)
        .set("discard", Number(resourceInfo.discard))
        .where("id="+ Number(resourceInfo.id))
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
            .where("teamId=" + "'"+userInfo.teamid+"'")
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
exports.addOrder = function addOrder(orderInfo,callback)
{
    var sqltest = squel.insert()
        .into("`"+"order"+"`")
        .set("category",orderInfo.category)
        .set("vendor", orderInfo.vendor)
        .set("quantity",Number(orderInfo.quantity))
        .set("unitprice", Number(orderInfo.unitPrice))
        .set("`"+"order"+"`", orderInfo.order)
        .set("date", orderInfo.date)
        .set("comment",orderInfo.comment)
        .set("teamId",orderInfo.team)
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
exports.updateOrder = function addOrder(orderInfo,callback)
{
    var sqltest = squel.update()
        .table("`"+"order"+"`")
        .set("category",orderInfo.category)
        .set("vendor", orderInfo.vendor)
        .set("quantity",Number(orderInfo.quantity))
        .set("unitprice", Number(orderInfo.unitPrice))
        .set("`"+"order"+"`", orderInfo.order)
        .set("date", orderInfo.date)
        .set("comment",orderInfo.comment)
        .set("teamId",orderInfo.team)
        .where("id=" + orderInfo.id)
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
exports.addChange = function addChange(changeInfo,callback)
{
    var sqltest = squel.insert()
        .into("`" + "change" + "`")
        .set("AssetId",Number(changeInfo.assetId))
        .set("Type", changeInfo.type)
        .set("`"+"source"+"`", changeInfo.source)
        .set("dest", changeInfo.dest)
        .set("dest",changeInfo.date)
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
exports.addTeam = function addTeam(teamInfo,callback)
{
    var sqltest = squel.insert()
        .into("`" + "team" + "`")
        .set("name",teamInfo.name)
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
exports.selectTeam = function selectTeam(teamInfo,callback)
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
exports.deleteTeam = function deleteTeam(teamId,callback)
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

exports.updateTeam = function updateTeam(teamInfo,callback)
{
    var sqltest = squel.update()
        .table("`"+"team"+"`")
        .set("name",teamInfo.name)
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
exports.addLab = function addLab(teamInfo,callback)
{
    var sqltest = squel.insert()
        .into("`" + "lab" + "`")
        .set("name",teamInfo.name)
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
exports.selectLab = function selectLab(labInfo,callback)
{
    var sqltest = squel.select()
        .from("`" + "lab" + "`")
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
exports.deleteLab = function deleteLab(labId,callback)
{
    var sqltest = squel.delete()
        .from("`" + "lab" + "`")
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

exports.updateLab = function updateLab(labInfo,callback)
{
    var sqltest = squel.update()
        .table("`"+"lab"+"`")
        .set("name",labInfo.name)
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
exports.addType = function addType(typeInfo,callback)
{
    var sqltest = squel.insert()
        .into("`" + "type" + "`")
        .set("name",typeInfo.name)
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
exports.selectType = function selectType(typeInfo,callback)
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
exports.deleteType = function deleteType(id,callback)
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

exports.updateType = function updateType(typeInfo,callback)
{
    var sqltest = squel.update()
        .table("`"+"type"+"`")
        .set("name",typeInfo.name)
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

exports.selectServer = function selectLab(labInfo,callback)
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

//operation on the template table
exports.addTemplate = function addTenmplate(templateInfo,callback)
{
    var sqltest = squel.insert()
        .into("`" + "template" + "`")
        .set("name",templateInfo.name)
        .set("type",templateInfo.type)
        .set("manufacturer",templateInfo.manu)
        .set("model",templateInfo.model)
        .set("size",templateInfo.size)
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
exports.selectTemplate = function selectTemplate(typeInfo,callback)
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
exports.deleteTemplate = function deleteTemplate(id,callback)
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

exports.updateTemplate = function updateTemplate(templateInfo,callback)
{
    var sqltest = squel.update()
        .table("`"+"template"+"`")
        .set("name",templateInfo.name)
        .set("type",templateInfo.type)
        .set("manufacturer",templateInfo.manu)
        .set("model",templateInfo.model)
        .set("size",templateInfo.size)
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