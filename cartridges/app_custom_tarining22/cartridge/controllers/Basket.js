'use strict';
/**
 * @namespace Basket
 */
var server = require('server');
var URLUtils = require('dw/web/URLUtils');
server.get("Show", function (req, res, next) {
    var BasketMgr = require('dw/order/BasketMgr');
    var currentBasket = BasketMgr.getCurrentBasket();
    // res.render('basket', {basket: parseInt(currentBasket.productQuantityTotal) || "no"});
    if (currentBasket.allProductLineItems.length) {
        res.render('basket',
            {
                allLineItems: currentBasket.allProductLineItems || "no",
                allLineItemsLength: currentBasket.allProductLineItems.length
            }
        );

    } else {
        res.redirect(URLUtils.url('Home-Show'));
    }
    next();
});
module.exports = server.exports();