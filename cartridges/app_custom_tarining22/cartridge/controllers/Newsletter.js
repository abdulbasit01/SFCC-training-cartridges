'use strict';


var server = require('server');
var URLUtils = require('dw/web/URLUtils');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
server.get('Show', server.middleware.https, csrfProtection.generateToken, function (req, res, next) {
    var newsletterForm = server.forms.getForm('newsletter');
    var continueUrl = URLUtils.url('Newsletter-Handler');
    newsletterForm.clear();

    res.render('/newsletter/newslettersignup', {
        actionUrl: continueUrl,
        newsletterForm: newsletterForm
    });
    next();
});

server.post(
    'Handler',
    server.middleware.https,
    csrfProtection.validateAjaxRequest,
    function (req, res, next) {
        var newsletterForm = server.forms.getForm('newsletter');
        var continueUrl = URLUtils.url('Newsletter-Show');

        // Perform any server-side validation before this point, and invalidate form accordingly
        if (newsletterForm.valid) {
            // Send back a success status, and a redirect to another route
            res.render('/newsletter/newslettersuccess', {
                continueUrl: continueUrl,
                newsletterForm: newsletterForm
            });
        } else {
            // Handle server-side validation errors here: this is just an example
            res.render('/newsletter/newslettererror', {
                errorMsg: dw.web.Resource.msg('error.crossfieldvalidation', 'newsletter', null),
                continueUrl: continueUrl
            });
        }

        next();
    }
);
module.exports = server.exports();
