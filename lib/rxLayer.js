const coap = require('coap');
const DEFAULT_PORT = 5683;

module.exports = class rxLayer {
    constructor(router, options) {
        let serverOptions = {
            type: 'udp4'
        }
        if (typeof options.port === 'number') {
            this.port = options.port;
        }
        else {
            this.port = DEFAULT_PORT;
        }
        this.server = coap.createServer(serverOptions);
        this.server.on('request', (req, res) => {
            this._onMessageReceived(req, res);
        });
        this.router = router;
    }

    start(callback) {
        this.server.listen(this.port, () => {
            console.log(`Listening on port ${this.port}`);
            callback();
        });
    }

    stop(callback) {
        this.server.close(callback);
    }

    _onMessageReceived(req, res) {
        let path = req.url.split('/')[1];
        let payload = req.payload.toString();
        if (typeof payload === 'string') {
            payload = JSON.parse(payload);
        }
        this.router.emit(path, payload);
        res.end();
    }

}