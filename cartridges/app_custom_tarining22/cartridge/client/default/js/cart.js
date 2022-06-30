'use strict';
var processInclude = require('base/util');

$(document).ready(function (param) {
    console.log(param);
    processInclude(require('base/cart/cart'));
});
