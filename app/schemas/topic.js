var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopicSchema = new Schema({
    title: {type: String,index: true},
    content: String,
    tag: {type: String,index: true},
    createBy: String,
    createOn: {type: Date, default: Date.now},
    lookTime: {type: Number,default: 0}
});

mongoose.model('Topic', TopicSchema);
