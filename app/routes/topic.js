module.exports = function (app) {
    var loadJsCss = require('../../common/middleware/loadJsCss');
    app.get('/topic/new',function(req, res) {
        loadJsCss(req, res);
        res.render('topic',{
            title:'09441'
        });
    });
}