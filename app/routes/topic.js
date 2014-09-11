var sessionAction = require('./common/sessionAction');
var logger = require('../middlewares/log/logging').logger;
var Topic = require('../models').Topic;
var Comment = require('../models').Comment;
var timeFormat = require('../middlewares/timeFormat');
module.exports = function (app) {
    var loadJsCss = require('../middlewares/loadJsCss');

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
    //新建话题
    app.post('/topic/new',function(req,res) {
        var title = req.body.title.trim();
        var content = req.body.content;
        var tag = req.body.tag;
        var createByName = req.session.nickname;
        var createBy = sessionAction.is_exist(req,res)._id;
        Topic.addAndSave(title,content,tag,createBy,createByName,function(err) {
            if(err) {
                logger.log(err);
            }
            console.log('add topic success！');
            res.redirect('/');
        });
    });

    //topic详细页面
    app.get('/topic/:id',function(req,res) {
        loadJsCss(req,res);
        var id = req.params.id;
        //console.log(id);
        var input = {};
        input.title = "09441";
        input.user = sessionAction.is_exist(req,res);
        Topic.findById(id,function(err,item) {
            if(err) {
                logger.log(err);
            }
            item.friendly_createOn = timeFormat.format_date(item.createOn,true);
            item.lookTime+= 1;
            item.save(function(err) {
                if(err) {
                    logger.log (err);
                }
            });
            input.item = item;
            Comment.findByTopicId(id,function(err,comlist) {
                if(err) {
                    logger.log(err);
                }
                for(var i=0;i<comlist.length;i++) {
                    comlist[i].friendly_createOn = timeFormat.format_date(comlist[i].createOn,true);
                }
                input.comlist = comlist;
                res.render('topic-detail',input);
            });
        });
    });
    //通过标签找topic列表
    app.get('/tag/:tag',function(req,res) {
        loadJsCss(req,res);
        var tag = req.params.tag;
        var input = {};
        input.title = "09441";
        input.user = sessionAction.is_exist(req,res);
        input.tag = tag;
        Topic.listByTagName(input.tag,function(err,listByTag) {
            if(err) {
                logger.log(err);
            }
            for(var i=0;i<listByTag.length;i++) {
                listByTag[i].friendly_createOn = timeFormat.format_date(listByTag[i].createOn,true);
            }
            input.listByTag = listByTag;
            res.render('topic-tag',input);
        });
    });

    //回复功能
    app.post('/comment',function(req,res) {
        //console.log(req.session);
        var topic_id = req.body.topic_id;
        var content = req.body.content;
        var reply_id = req.body.reply_id;
        var author_id = req.session._id;
        console.log(author_id);
        Comment.addAndSave(topic_id,author_id,reply_id,content,function(err,comment) {
            if(err) {
                logger.log(err);
            }
            console.info('comment success!');
            res.redirect('/topic/'+topic_id);
        });
    });

    //删除回复
    app.post('/comment/del',function(req,res) {
        var id = req.body.id;
        Comment.delete(id,function(err,flag) {
            if(err) {
                logger.log(err);
            }
            res.json(flag);
        });
    });

    //加载修改个人发布的话题页面
    app.get('/topic/:id/edit',function(req,res) {
        loadJsCss(req, res);
        var input = {};
        input.title = "09441";
        input.user = sessionAction.is_exist(req,res);
        var id = req.params.id;
        Topic.findById(id,function(err,item) {
            input.item = item;
            item.friendly_createOn = timeFormat.format_date(item.createOn,true);
            if(input.user.is_login == true) {
                res.render('topic-edit',input);
            }else {
                res.redirect('/login');
            }
        });
    });

    //修改个人发布的话题
    app.post('/topic/:id/edit',function(req,res) {
        Topic.update(req.body.id,req.body,function(err,item) {
            if(err) {
                logger.log(err);
            }
            res.redirect('/topic/' + item._id);
        });
    });
};