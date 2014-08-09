var models = require('../schemas');
var Comment = models.Comment;

/*
 添加和更新回复
 */
exports.addAndSave = function(topic_id,author_id,reply_id,content,callback) {
    var comment = new Comment();
    comment.topic_id = topic_id;
    comment.author_id = author_id;
    comment.reply_id = reply_id;
    comment.content = content;
    comment.save(callback);
};

/*
    查询所有回复信息按创建时间排序
 */
exports.findAll = function(callback) {
    Comment.find({}).sort({'createOn': 'desc'}).exec(callback);
};

/*
    根据topic_id查询Comment列表
 */
exports.findByTopicId = function(topic_id,callback) {
    Comment.find({topic_id:topic_id}).sort({'createOn': 'asc'}).exec(callback);
};

/*
    删除回复
 */
exports.delete = function(id,callback) {
    Comment.remove({_id:id},callback);
};

