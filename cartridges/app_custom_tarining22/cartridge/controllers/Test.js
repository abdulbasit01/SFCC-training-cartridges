'use strict';
/**
 * @namespace Test
 */
var server = require('server');
var URLUtils = require('dw/web/URLUtils');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var xmlObjectSchema = server.forms.getForm('test');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
server.get("Show", server.middleware.https, csrfProtection.generateToken, function (req, res, next) {

    var continueUrl = URLUtils.url('Test-Handler');
    xmlObjectSchema.clear();
    res.render('test/test',
        {
            sampleText: "Sample Text",
            xmlObjectSchema: xmlObjectSchema,
            continueUrl: continueUrl

        }
    );
    next();
});

server.post("Handler", server.middleware.https, csrfProtection.generateToken, function (req, res, next) {
    if (xmlObjectSchema.valid) {
        var lengthOfCustomObject = +(CustomObjectMgr.getAllCustomObjects('practiceForm').count) + 1;
        var co = CustomObjectMgr.createCustomObject('practiceForm', String(lengthOfCustomObject));
        co.custom.firstName = xmlObjectSchema.firstName.value;
        co.custom.lastName = xmlObjectSchema.lastName.value;
        res.render('test/testresult',
            {
                xmlObjectSchema: xmlObjectSchema,
                lengthOfCustomObject: String(lengthOfCustomObject)

            }
        )
    }
    next()
})

module.exports = server.exports();