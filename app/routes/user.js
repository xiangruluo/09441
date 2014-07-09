var logger = require('../../common/log/logging').logger;
var User = require('../models').User;

module.exports = function (app) {
    var loadJsCss = require('../../common/middleware/loadJsCss');
    app.get('/signin',function(req, res) {
        loadJsCss(req, res);
        res.render('signin',{
            title:'09441'
        });
    });

    app.post('/signin/save',function(req, res) {
        var email = req.body.email;
        var password = req.body.password.trim();
        User.addAndSave(email,password,function(err) {
            if(err) {
                logger.log(err);
            }
            console.log('register success!');
            res.redirect('/');
        });
    });
}