const rxLayer = require('./rxLayer.js');
const txLayer = require('./txLayer.js');
const dataLayer = require('./dataLayer');
const EventEmitter = require('events');

module.exports = class IoTP2P {
    constructor(options) {
        if (typeof options === 'undefined') {
            options = {};
        }
        if (Array.isArray(options.peers)) {
            this.peers = options.peers;
        }
        else {
            this.peers = [];
        }
        if (typeof options.syncPath === 'string') {
            this.path = options.syncPath;
        }
        else {
            this.path = 'sync';
        }
        this.router = new EventEmitter();
        this.rxLayer = new rxLayer(this.router, options);
        this.txLayer = new txLayer(this.path, options);
        this.dataLayer = new dataLayer(options);
        //Sync Data From Peer
        this.router.on(this.path, (data) => {
            this.dataLayer.set(data);
        });
    }

    /**
     * Start P2P Server
     * @param {function} callback 
     */
    start(callback) {
        this.rxLayer.start(callback);
    }
    /**
     * Stop P2P Server
     * @param {function} callback 
     */
    stop(callback) {
        this.rxLayer.stop(callback);
    }
    /**
     * Get Data
     */
    get() {
        return this.dataLayer.get();
    }
    /**
     * Set data and emit to peers
     * @param {*} data 
     */
    set(data) {
        if (data) {
            this.dataLayer.set(data);
            this.peers.forEach((peer) => {
                this.txLayer.post(peer, this.dataLayer.get(), () => {
                    console.log('Sent To Peer!');
                });
            });
        }
    }
}