var sessionAction = require('./common/sessionAction');
var logger = require('../../common/log/logging').logger;
var Topic = require('../models').Topic;
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

    app.post('/topic/new',function(req,res) {
        var title = req.body.title.trim();
        var content = req.body.content;
        var tag = req.body.tag;
        var createBy = sessionAction.is_exist(req,res)._id;
        var createOn = new Date();
        Topic.addAndSave(title,content,tag,createBy,createOn,function(err) {
            if(err) {
                logger.log(err);
            }
            console.log('add topic success！');
            res.redirect('/');
        });
    });
}