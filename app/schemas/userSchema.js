var mongoose = require('mongoose');

var Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    email: {type: String,index: true},
    password: String
});

//userSchema.pre('save',function(next) {
//    if(this.isNew) {
//        this.meta.createOn = this.meta.updateOn = Date.now();
//    }else {
//        this.meta.updateOn = Date.now();
//    }
//
//    next();
//});

userSchema.statics = {
    findAll: function(cb) {
        return this
            .find({});
//            .sort('meta.createOn');
        exec(cb);
    },
    findById:function(id,cb) {
        return this
            .findOne({_id:id});
        exec(cb);
    }
};

module.exports = userSchema;