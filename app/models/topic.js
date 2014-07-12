var models = require('../schemas');
var Topic = models.Topic;

/*
    添加和更新话题信息
 */
exports.addAndSave = function(title,content,tag,createBy,createOn,callback) {
    var topic = new Topic();
    topic.title = title;
    topic.content = content;
    topic.tag = tag;
    topic.createBy = createBy;
    topic.createOn = createOn;
    topic.save(callback);
};

/*
    查询话题列表
 */
exports.listAll = function(callback) {
    Topic.find({},callback);
};


