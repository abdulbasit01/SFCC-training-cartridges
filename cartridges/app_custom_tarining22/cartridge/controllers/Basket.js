'use strict';
/**
 * @namespace Basket
 */
var server = require('server');
server.get("Show", function (req, res, next) {
    var BasketMgr = require('dw/order/BasketMgr');
    var currentBasket = BasketMgr.getCurrentBasket();
    var allLineItems = currentBasket.allProductLineItems;
    // res.render('basket', {basket: parseInt(currentBasket.productQuantityTotal) || "no"});
    res.render('basket',
        {
            allLineItems: allLineItems || "no",
            allLineItemsLength: allLineItems.length
        }
    );
    next();
});
module.exports = server.exports();