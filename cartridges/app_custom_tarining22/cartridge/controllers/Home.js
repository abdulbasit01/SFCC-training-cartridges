// 'use strict';

// /**
//  * @namespace Home
//  */

// var server = require('server');
// server.extend(module.superModule)
// server.append('Show', function (req, res, next) {
//     const viewData = res.getViewData()

//     // this.on('route:BeforeComplete',(req, res, next)=>{
//     //     res.render('test', {sampleText: "route before complete"})
//     // })


//     viewData.userData = [
//         {
//             id: '1', text: 'this is prepended params data one ', imageUrl: "https://wallpaperaccess.com/full/1684793.png", url: 'Test-Show'
//         },
//         {
//             id: '2', text: 'this is prepended params data two', url: 'Test-Show'
//         },
//         {
//             id: '3', text: "this is prepended params data two", url: "Test-Show"
//         }
//     ]
//     res.setViewData(viewData)
//     next();
// });

// server.prepend('Show', function (req, res, next) {
//     const viewData = res.getViewData()
//     viewData.params1 = "prepended params"
//     res.setViewData(viewData)
//     next();
// });


// // server.replace("Show", (req, res, next) => {
// //     res.render("test", { sampleText: "Sample Text2" })
// //     next()
// // })

// module.exports = server.exports();

'use strict';

/**
 * @namespace Home
 */

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');

/**
 * Any customization on this endpoint, also requires update for Default-Start endpoint
 */
/**
 * Home-Show : This endpoint is called when a shopper navigates to the home page
 * @name Base/Home-Show
 * @function
 * @memberof Home
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - cache.applyDefaultCache
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get('Show', consentTracking.consent, cache.applyDefaultCache, function (req, res, next) {
    var Site = require('dw/system/Site');
    var PageMgr = require('dw/experience/PageMgr');
    var pageMetaHelper = require('*/cartridge/scripts/helpers/pageMetaHelper');

    pageMetaHelper.setPageMetaTags(req.pageMetaData, Site.current);

    var page = PageMgr.getPage('homepage');

    if (page && page.isVisible()) {
        res.page('homepage');
    } else {
        res.render('home/homePage');
    }
    next();
}, pageMetaData.computedPageMetaData);

server.get('ErrorNotFound', function (req, res, next) {
    res.setStatusCode(404);
    res.render('error/notFound');
    next();
});

module.exports = server.exports();
