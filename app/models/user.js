var models = require('../schemas');
var User = models.User;

/*
    添加和更新用户信息
 */
exports.addAndSave = function (email,password, callback) {
    var user = new User();
    user.email = email;
    user.password = password;
    user.save(callback);
};