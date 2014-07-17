var models = require('../schemas');
var User = models.User;

/*
    添加和更新用户信息
 */
exports.addAndSave = function(email,password,nickname,callback) {
    var user = new User();
    user.email = email;
    user.password = password;
    user.nickname = nickname;
    user.save(callback);
};

/*
    根据email查询用户信息
 */
exports.findByEmail = function(email,callback) {
    User.find({email:email},callback);
};

/*
    通过email和密码查询用户信息
 */
exports.login = function(email,password,callback) {
    User.find({email:email,password:password},callback);
};
