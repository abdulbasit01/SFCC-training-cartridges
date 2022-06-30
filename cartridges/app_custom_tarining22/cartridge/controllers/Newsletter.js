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
        // var continueUrl = URLUtils.url('Newsletter-Show');
        // Perform any server-side validation before this point, and invalidate form accordingly
        // if (newsletterForm.valid) {
        //     // Send back a success status, and a redirect to another route
        //     res.render('/newsletter/newslettersuccess', {
        //         continueUrl: continueUrl,
        //         newsletterForm: newsletterForm
        //     });
        // } else {
        //     // Handle server-side validation errors here: this is just an example
        //     res.render('/newsletter/newslettererror', {
        //         errorMsg: dw.web.Resource.msg('error.crossfieldvalidation', 'newsletter', null),
        //         continueUrl: continueUrl
        //     });
        // }
        if (newsletterForm.valid) {
            res.json({
                success: true,
                redirectUrl: URLUtils.url('Newsletter-Success').toString()
            });
        } else {
            res.setStatusCode(500);
            res.json({
                error: true,
                redirectUrl: URLUtils.url('Error-Start').toString()
            });
        }

        next();
    }
);
server.get(
    'Success',
    server.middleware.https,
    function (req, res, next) {
        res.render('/newsletter/newslettersuccess', {
            // continueUrl: URLUtils.url('Newsletter-Show'),
            newsletterForm: server.forms.getForm('newsletter')
        });

        next();
    }
);
module.exports = server.exports();
