var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');


var logging = require('./common/log/logging');
var logger = logging.logger;

var routes = require('./routes/index');
var app = express();

app.set('title', '09441');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3001);

app.use(favicon(__dirname + '/public/img/favicon.ico'));
//app.use(favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/topic',routes);
app.use('/signin',routes);
app.use('/tags',routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
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
