'use strict';
var processInclude = require('./util');

$(document).ready(function (param) {
    console.log(param);
    processInclude(require('./cart/cart'));
});
