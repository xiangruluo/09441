module.exports = function (app) {
    var loadJsCss = require('../../common/middleware/loadJsCss');
    app.get('/signin',function(req, res) {
        loadJsCss(req, res);
        res.render('signin',{
            title:'09441'
        });
    });
}