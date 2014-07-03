var mongoose = require('mongoose');

var userSchema = require('../schemas/userSchema');
var user = mongoose.model('user',userSchema);

module.export = user;

