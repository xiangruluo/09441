var sessionAction = require('./common/sessionAction');
var logger = require('../../common/log/logging').logger;
module.exports = function (app) {
    var loadJsCss = require('../../common/middleware/loadJsCss');

    app.get('/topic/new',function(req,res) {
        loadJsCss(req, res);
        var input = {};
        input.title = "09441";
        input.user = sessionAction.is_exist(req,res);
        if(input.user.is_login == true) {
            res.render('topic',input);
        }else {
            res.redirect('/login?to=/topic/new');
        }
    });
}