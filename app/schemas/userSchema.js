var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: {type: String,index: true},
    nickname: {type: String,default: ''},
    password: String,
    age: {type: Number,min: 10,max: 40,index: true,default: ''},
    sex: {type: String,default:'girl'},
    intro: String,
    meta: {
        createOn: {
            type:Date,
            default: Date.now()
        },
        updateOn: {
            type:Date,
            default:Date.now()
        },
        lastLoginOn: {
            type:Date,
            default:Date.now()
        }
    }
});

userSchema.pre('save',function(next) {
    if(this.isNew) {
        this.meta.createOn = this.meta.updateOn = Date.now();
    }else {
        this.meta.updateOn = Date.now();
    }

    next();
});

userSchema.statics = {
    findAll: function(user) {
        return this
            .find({})
            .sort('meta.createOn');
        exec(user);
    },
    findById:function(id,user) {
        return this
            .findOne({_id:id});
        exec(user);
    }
};

module.exports = userSchema;