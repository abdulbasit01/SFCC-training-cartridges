'use strict';
var server = require('server');
server.post('Start', server.middleware.https, function (req, res, next) {
    var nickname = req.form.nickname;
    res.render('SFRAResultTemplate', {
        nickname: nickname
    });
    next();
});
module.exports = server.exports();
