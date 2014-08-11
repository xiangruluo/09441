var models = require('../schemas');
var Topic = models.Topic;

/*
    添加和更新话题信息
 */
exports.addAndSave = function(title,content,tag,createBy,createByName,callback) {
    var topic = new Topic();
    topic.title = title;
    topic.content = content;
    topic.tag = tag;
    topic.createBy = createBy;
    topic.createByName = createByName;
    topic.save(callback);
};

/*
    查询话题列表
 */
exports.listAll = function(callback) {
    Topic.find({}).sort({'createOn': 'desc'}).exec(callback);
};

/*
    查询当前登录的人的topic列表
 */
exports.listByUserId = function(uid,callback) {
    Topic.find({'createBy':uid}).sort({'createOn': 'desc'}).exec(callback);
};
/*
    通过ID查询
 */
exports.findById = function(id,callback) {
    Topic.findOne({'_id':id},callback);
};
/*
    通过标签名来查找topic列表
 */
exports.listByTagName = function(tag,callback) {
    Topic.find({'tag':tag}).sort({'createOn': 'desc'}).exec(callback);
};

/*
    修改话题内容
 */
exports.update = function(id,obj,callback) {
    Topic.findOne({'_id':id},function(err,topic){
        if (err || !topic) {
            return callback(err);
        }
        topic.content = obj.content;
        topic.updateOn = new Date();
        topic.save(callback);
    });
};


