var sessionAction = require('./common/sessionAction');
module.exports = function (app) {
    var loadJsCss = require('../middlewares/loadJsCss');
    app.get('/tags',function(req, res) {
        loadJsCss(req, res);
        var input = {};
        input.title = "09441";
        input.user = sessionAction.is_exist(req,res);
        res.render('tags',input);
    });
}