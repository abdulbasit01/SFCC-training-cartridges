'use strict';
/**
 * @namespace Basket
 */
var server = require('server');
// bad practice
server.get("Show", function (req, res, next) {
    var BasketMgr = require('dw/order/BasketMgr');
    
    var CartModel = require('*/cartridge/models/cart');

    
    var currentBasket = BasketMgr.getCurrentBasket();
    
    var basketModel = new CartModel(currentBasket);

    res.render('basket', { basketModel });
    
    next();
});

module.exports = server.exports();
// var currentBasket = BasketMgr.getCurrentBasket();

// res.render('basket', {basket: parseInt(currentBasket.productQuantityTotal) || "no"});
// allProductLineItems gives the list of all the items that are either dependant or not but getProductLineItems() method gives the product that are not dependant on any of the product in the line
// if (currentBasket && currentBasket.getProductLineItems() && currentBasket.getProductLineItems().length) {
//     res.render('basket',
//         {
//             allLineItems: currentBasket.getProductLineItems() || "no",
//             allLineItemsLength: currentBasket.getProductLineItems().length
//         }
//     );

// }
// uses this if else block because when the cart is empty the page crashed
// else {
//     res.redirect(URLUtils.url('Home-Show'));
// }