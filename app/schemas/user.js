var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {type: String,index: true},
    password: String,
    nickname: {type:String, index:true}
});

mongoose.model('User', UserSchema);
