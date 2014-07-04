var settings = require('./settings');
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var mongoose = require('mongoose');

//连接数据库
mongoose.connect('mongodb://'+settings.mongodb.host+'/'+settings.mongodb.database);

var app = express();
var routes = require('./app/routes');
routes(app);
//require('./app/routes')(app);

app.set('title', '09441');
//模板引擎
app.set('views', path.join(__dirname + '/app/', 'views'));
app.set('view engine', 'ejs');
app.set('port', 3001);

app.use(favicon(__dirname + '/public/img/favicon.ico'));
//app.use(favicon());
//生成日志文件
var logging = require('./common/log/logging');
var logger = logging.logger;

app.use(logging.applogger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//扑捉404页面
app.use(function(req, res, next) {
    var err = new Error('没有页面，逗比。');
    err.status = 404;
    next(err);
});


app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var server = http.createServer(app).listen(app.get('port'), '127.0.0.1', function(){
    logger.info('The server is listening on port ' + app.get('port'));
});


module.exports = app;
