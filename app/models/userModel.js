require('../schemas/db');
var userSchema = require('../schemas/userSchema');

mongoose.model('user',userSchema);
var user = mongoose.model('user');

module.exports = user;

