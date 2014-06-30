//为页面注入css和js
var hander = function (req, res) {
    res.locals.asset = {
        mainCss: '/build/css/main.css',
        mainJs: '/build/js/main.min.js'
    };
};

module.exports = hander;