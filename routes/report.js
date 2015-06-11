var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next)
{
    var sess = req.session;
    if (sess.results)
    {
        res.render('report',
        {
            result: sess.results
        });
    }
    else
    {
        res.redirect('login');
    }

});

module.exports = router;
