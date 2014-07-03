var loadJsCss = require('../../common/middleware/loadJsCss'),
    user = require('./user'),
    topic = require('./topic'),
    tag = require('./tag');

module.exports = function(app) {
    //首页路由
    app.get('/',function(req,res) {
        loadJsCss(req, res);
        res.render('index', { title: '09441' });
    });
    //调用其他路由文件
    user(app);
    topic(app);
    tag(app);
};

