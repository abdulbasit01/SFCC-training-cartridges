'use strict';



/**

 * @namespace Test

 */



var server = require('server');



server.get("Show", function (req, res, next) {

    res.render('test', {sampleText: "Sample Text"});

    next();

});



module.exports = server.exports();