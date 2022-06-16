'use strict';


/**

 * @namespace Xyz

 */
var server = require('server');
var URLUtils = require('dw/web/URLUtils');


server.get("Start", function (req, res, next) {
    res.render('SFRAFormTemplate');
    next();

});



module.exports = server.exports();