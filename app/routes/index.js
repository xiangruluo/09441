var express = require('express');
var router = express.Router();
var loadJsCss = require('../../common/middleware/loadJsCss');

router.get('/', function(req, res) {
    loadJsCss(req, res);
    res.render('index', { title: '09441' });
});

router.get('/signin', function(req, res) {
    loadJsCss(req, res);
    res.render('signin', { title: '09441' });
});

router.get('/topic/new', function(req, res) {
    loadJsCss(req, res);
    res.render('topic', { title: '09441' });
});

router.get('/tags', function(req, res) {
    loadJsCss(req, res);
    res.render('tags', { title: '09441' });
});

module.exports = router;
