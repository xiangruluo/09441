module.exports = function (app) {
    var loadJsCss = require('../../common/middleware/loadJsCss');
    app.get('/tags',function(req, res) {
        loadJsCss(req, res);
        res.render('tags',{
            title:'09441'
        });
    });
}