'use strict';

/**
 * @namespace Home
 */

var server = require('server');
server.extend(module.superModule)
server.append('Show', function (req, res, next) {
    const viewData = res.getViewData()

    // this.on('route:BeforeComplete',(req, res, next)=>{
    //     res.render('test', {sampleText: "route before complete"})
    // })


    viewData.userData = [
        {
            id: '1', text: 'this is prepended params data one ', imageUrl: "https://wallpaperaccess.com/full/1684793.png", url: 'Test-Show'
        },
        {
            id: '2', text: 'this is prepended params data two', url: 'Test-Show'
        },
        {
            id: '3', text: "this is prepended params data two", url: "Test-Show"
        }
    ]
    res.setViewData(viewData)
    next();
});

server.prepend('Show', function (req, res, next) {
    const viewData = res.getViewData()
    viewData.params1 = "prepended params"
    res.setViewData(viewData)
    next();
});


// server.replace("Show", (req, res, next) => {
//     res.render("test", { sampleText: "Sample Text2" })
//     next()
// })

module.exports = server.exports();
