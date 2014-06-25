(function() {
    require.config({
        baseUrl : './public/js',
        paths : {
            jquery : '../components/jquery/jquery.min',
            bootstrap : '../components/bootstrap/bootstrap.min'
        },
        shim : {
            bootstrap : {
                deps : [ 'jquery' ],
                exports : 'bootstrap'
            }
        }

    });
    require(['bootstrap' ], function() {
        //console.log(all loaded);
    });
})(this);