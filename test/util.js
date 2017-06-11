//Make multi process test util
var path = require('path');
var fork = require('child_process').fork;
var lib = require('../')


var startIotP2p = function (options, done) {
    var testInstance = new lib(options);
    testInstance.start(function () {
        done(testInstance);
    });
}

module.exports = {
    startIotP2p: startIotP2p
}