var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var CommentSchema = new Schema({
    content: {type: String},
    topic_id: { type: ObjectId},//话题ID
    author_id: { type: ObjectId },//当前用户ID
    reply_id : { type: ObjectId },//回复父类ID
//    author_name: {type: String},//当前用户名
//    reply_name: {type:String},//回复父类名
    createOn: {type: Date, default: Date.now},
    updateOn: {type: Date,default: Date.now}
});

mongoose.model('Comment', CommentSchema);
