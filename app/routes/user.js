var userModel = require('../models/userModel');

module.exports = function (app) {
    var loadJsCss = require('../../common/middleware/loadJsCss');
    app.get('/signin',function(req, res) {
        loadJsCss(req, res);
        res.render('signin',{
            title:'09441'
        });
    });

    app.post('/signin',function(req, res) {
        console.log(1);
        var user = new userModel();
        console.log(user);
        user.email = req.body.email;
        user.password = req.body.password;
        console.log(user);
        user.meta.createOn = Date.now();
        user.meta.updateOn = Date.now();
        user.meta.lastLoginOn = Date.now();
        console.log(2);
        user.save(function(err) {
            console.log(3);
            if(err) {
                console.error('错误:'+err);
            }
            console.log('注册成功！');
            res.redirect('/');
        });
    });
}