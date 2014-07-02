var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: {type: String,index: true},
    nickname: {type: String,default: ''},
    password: String,
    age: {type: Number,min: 10,max: 40,index: true,default: ''},
    sex: {type: String,default: girl},
    intro: String,
    meta: {
        createOn: {
            type:Date,
            default: Date.now()
        },
        lastLoginOn: {
            type:Date,
            default:Date.now()
        }
    }
});

module.exports = userSchema;