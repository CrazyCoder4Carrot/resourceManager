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

        db.selectAllChanges(sess.results, function(err, queryResults)
        {
            if (queryResults)
            {
                res.render('change',
                {
                    allChangeInfo: queryResults,
                    moment: moment,
                    result:sess.results
                });
            }
            else
            {
                allChangeInfo = Null;
            }
        });
    }
    else
    {
        res.redirect('/login');
    }

});

module.exports = router;
