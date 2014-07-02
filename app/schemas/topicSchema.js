var mongoose = require('mongoose');

var topicSchema = new mongoose.Schema({
    title: String,
    tag: String,
    commentNum:{type:Number,default:0},
    poster: String,//发布者
    content: String,
    meta: {
        createOn:{
            type:Date,
            default:Date.now()
        },
        updateOne:{
            type:Date,
            default:Date.now()
        }
    }
});

topicSchema.pre('save',function(next) {
    if(this.isNew) {
        this.meta.createOn = this.meta.updateOn = Date.now();
    }else {
        this.meta.updateOn = Date.now();
    }

    next();
});

topicSchema.statics = {
    findAll: function(to) {
        return this
            .find({})
            .sort('meta.updateOn');
            exec(to);
    },
    findById:function(id,to) {
        return this
            .findOne({_id:id});
            exec(to);
    }
};

module.exports = topicSchema;