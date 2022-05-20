'use strict';



/**

 * @namespace Hello

 */



var server = require('server');



server.get("Start", function (req, res, next) {

    res.render('helloWorld', {param1 : Site.current.name});
    next();

});



module.exports = server.exports();