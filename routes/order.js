var db = require('../lib/database');
var express = require('express');
var moment = require('moment');
var router = express.Router();

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
            category:req.body.category,
            vendor:req.body.vendor,
            quantity:req.body.quantity,
            unitPrice:req.body.unitPrice,
            order:req.body.order,
            date:req.body.date,
            comment:req.body.comment,
            team:req.body.team,
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
            id:req.body.id,
            category:req.body.category,
            vendor:req.body.vendor,
            quantity:req.body.quantity,
            unitPrice:req.body.unitPrice,
            order:req.body.order,
            date:req.body.date,
            comment:req.body.comment,
            team:req.body.team,
            id:req.body.id
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

module.exports = router;
