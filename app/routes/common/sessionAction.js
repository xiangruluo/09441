var sessionAction = {
    /*
        判断session是否存在(是否登录)
     */
    is_exist:function(req,res) {
        var user = {};
        if(req.session._id && req.session.email) {
            user._id = req.session._id;
            user.email = req.session.email;
            user.nickname = req.session.nickname;
            user.is_login = true;
        }else {
            user.is_login = false;
        }
        return user;
    },

    /*
        存入session(登录的时候将用户信息存入session)
     */
    push:function(id,email,nickname,req) {
        req.session._id = id;
        req.session.email = email;
        req.session.nickname = nickname;
    },

    /*
        清空session
     */
    clear:function(req) {
        delete req.session._id;
        delete req.session.email;
        delete req.session.is_login;
        delete req.session.nickname;
        if(req.session._id == undefined && req.session.email == undefined && req.session.is_login == undefined && req.session.nickname == undefined) {
            return true;
        }else {
            return false;
        }
    }

};

module.exports = sessionAction;