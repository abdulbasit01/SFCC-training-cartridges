'use strict';



/**

 * @namespace Test

 */



var server = require('server');
var URLUtils = require('dw/web/URLUtils');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
server.get("Show", server.middleware.https, csrfProtection.generateToken, function (req, res, next) {
    var newsletterForm = server.forms.getForm('survey');
    var continueUrl = URLUtils.url('Survey-Handler');
    newsletterForm.clear();
    res.render('/survey/survey', {
        continueUrl: continueUrl,
        newsletterForm: newsletterForm
    });

    next();

});


server.post(
    'Handler',
    server.middleware.https,
    csrfProtection.validateAjaxRequest,
    function (req, res, next) {
        var newsletterForm = server.forms.getForm('survey');
        if (newsletterForm.valid) {
            res.json({
                success: true,
                newsletterForm: [
                    { fname: newsletterForm.fname.htmlValue },
                    { lname: newsletterForm.lname.htmlValue },
                    { email: newsletterForm.email.htmlValue },
                    { organization: newsletterForm.organization.htmlValue },
                    { primaryintrest: newsletterForm.primaryintrest.htmlValue }
                ],
                redirectUrl: URLUtils.url('Survey-Success').toString()
            });
        } else {
            res.setStatusCode(500);
            res.json({
                error: true,
                redirectUrl: URLUtils.url('Survey-Error').toString()
            });
        }

        next();
    }
);
server.get(
    'Success',
    server.middleware.https,
    function (req, res, next) {
        var newsletterForm = server.forms.getForm('survey')
        res.render('/survey/success', {
            newsletterForm: newsletterForm
        });

        next();
    }
);
server.get(
    "Error",
    server.middleware.https,
    function (req, res, next) {
        var newsletterForm = server.forms.getForm('survey')
        res.render('/survey/failure', {
            newsletterForm: newsletterForm
        });

        next();
    }
)
module.exports = server.exports();