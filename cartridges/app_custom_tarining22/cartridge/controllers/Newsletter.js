'use strict';


var server = require('server');
var URLUtils = require('dw/web/URLUtils');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var Logger = require('dw/system/Logger');
var Resource = require('dw/web/Resource')
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

        if (newsletterForm.valid) {
            var Transaction = require('dw/system/Transaction');
            this.on('route:BeforeComplete', function (req, res) {
                try {
                    Transaction.wrap(
                        function () {
                            var CustomObjectMgr = require('dw/object/CustomObjectMgr');
                            var co = CustomObjectMgr.createCustomObject('NewsletterSubscription', newsletterForm.email.value);
                            co.custom.firstName = newsletterForm.fname.value;
                            co.custom.lastName = newsletterForm.lname.value;

                            res.json({
                                success: true,
                                redirectUrl: URLUtils.url('Newsletter-Success').toString()
                            });
                            dw.system.HookMgr.callHook('newsletter.email', 'send', newsletterForm.email.value);
                        }
                    );
                }
                catch (e) {
                    var err = e;
                    if (err.javaName === "MetaDataException") {
                        res.json({
                            success: false,
                            error: [Resource.msg('error.subscriptionexists', 'newsletter', null)]
                        });
                    } else {
                        Logger.getLogger("newsletter_subscription").error(Resource.msg(err, 'newsletter', null));
                        // Show general error page: there is nothing else to do
                        res.setStatusCode(500);
                        res.json({
                            error: true,
                            redirectUrl: URLUtils.url('Newsletter-Error').toString()
                        });
                    }
                }

            });
        } else {
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

server.get(
    "Error",
    server.middleware.https,
    function (req, res, next) {
        res.render('/newsletter/newslettererror', {
            newsletterForm: server.forms.getForm('newsletter'),
            errorMsg: Resource.msg('error.customobjectmissing', 'newsletter', null)
        });

        next();
    }
)
module.exports = server.exports();
