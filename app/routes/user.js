var logger = require('../../common/log/logging').logger;
var userModel = require('../models/userModel');

module.exports = function (app) {
    var loadJsCss = require('../../common/middleware/loadJsCss');
    app.get('/signin',function(req, res) {
        loadJsCss(req, res);
        res.render('signin',{
            title:'09441'
        });
    });

    app.post('/signin/save',function(req, res) {
        console.log(1);
        console.log(req.params);
        console.log(req.body);
    });
}