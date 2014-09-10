var sessionAction = require('./common/sessionAction');
var logger = require('../middlewares/log/logging').logger


module.exports = function (app) {
    var loadJsCss = require('../middlewares/loadJsCss');
    app.get('/test',function(req, res) {
        loadJsCss(req, res);
        var input = {};
        input.title = "09441";
        input.user = sessionAction.is_exist(req,res);
        res.render('test',input);
    });
}