var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {type: String,index: true},
    password: String
});

mongoose.model('User', UserSchema);
