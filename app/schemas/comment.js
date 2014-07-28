var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var CommentSchema = new Schema({
    title: {type: String,index: true},
    content: {type: String},
    tag: {type: String,index: true},
    createBy: {type: ObjectId},
    createByName: {type: String},
    createOn: {type: Date, default: Date.now},
    lookTime: {type: Number,default: 0}
});

mongoose.model('Comment', CommentSchema);
