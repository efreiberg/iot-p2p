const coap = require('coap');

module.exports = class txLayer {
    constructor(path, options) {
        this.txPath = path;
    }

    post(config, data, callback) {
        let coapConfig = { port: config.port, host: config.host, method: 'POST', pathname: this.txPath, payload: data };
        let req = coap.request(coapConfig);
        //console.log(`Sending Request To ${config.host}:${config.port}`);
        req.on('response', function (res) {
            callback(null);
        });
        req.write(JSON.stringify(data), () => {
            req.end();
        });
    }
}