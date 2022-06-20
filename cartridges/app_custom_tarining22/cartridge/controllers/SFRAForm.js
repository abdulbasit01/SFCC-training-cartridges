'use strict';


/**

 * @namespace SFRAForm

 */
var server = require('server');

server.get('Start', server.middleware.https, function (req, res, next) {
    var SFRAhelloform = server.forms.getForm('SFRAFormDef');
    // SFRAhelloform.clear();
    res.render('SFRAFormTemplate', {
        SFRAhelloform: SFRAhelloform
    });
    next();
});

module.exports = server.exports();
