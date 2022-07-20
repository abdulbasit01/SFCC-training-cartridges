'use strict';



/**

 * @namespace Test

 */



var server = require('server');
var URLUtils = require('dw/web/URLUtils');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var Logger = require('dw/system/Logger');
var Resource = require('dw/web/Resource')
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var gbError = "";
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
            var Transaction = require('dw/system/Transaction');

            this.on('route:BeforeComplete', function (req, res) {
                try {
                    Transaction.wrap(function () {
                        var co = CustomObjectMgr.createCustomObject('surveyForm', newsletterForm.email.value);
                        co.custom.firstName = newsletterForm.fname.value;
                        co.custom.lastName = newsletterForm.lname.value;
                        co.custom.organization = newsletterForm.organization.value;
                        co.custom.primaryIntrest = newsletterForm.primaryintrest.value;
                        co.custom.merketingEmail = newsletterForm.marketingemial.checked;
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
                        dw.system.HookMgr.callHook('survey.email', 'send', newsletterForm.email.value);

                    })
                } catch (error) {
                    var err = error;
                    gbError = err.javaMessage
                    if (err.javaName === "MetaDataException") {
                        res.json({
                            success: false,
                            error: [Resource.msg('error.surveyfilled', 'newsletter', null)]
                        });
                    }
                    else {
                        Logger.getLogger("survey_form").error(Resource.msg(err, 'newsletter', null));
                        res.setStatusCode(500);
                        res.json({
                            errorMessage: err,
                            error: true,
                            redirectUrl: URLUtils.url('Survey-Error').toString()
                        });
                    }
                }
            })

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
        res.render('/survey/failure', {
            gbError: gbError,
            newsletterForm: server.forms.getForm('newsletter'),
            errorMsg: Resource.msg('error.customobjectmissing', 'newsletter', null),
            continueUrl: URLUtils.url('Survey-Show').toString()
        });

        next();
    }
)
module.exports = server.exports();