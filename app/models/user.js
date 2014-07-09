var models = require('../schemas');
var User = models.User;

/*
    添加和更新用户信息
 */
exports.addAndSave = function(email,password, callback) {
    var user = new User();
    user.email = email;
    user.password = password;
    user.save(callback);
};

/*
    根据email查询用户信息
 */
exports.findByEmail = function(email,callback) {
    User.find({email:email},callback);
};