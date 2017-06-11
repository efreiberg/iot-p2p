/**
 * Simple Test Case
 */
const assert = require('chai').assert;
const lib = require('../util');
const serverConfigs = [{ host: 'localhost', port: 5683 }, { host: 'localhost', port: 5684 }];
const activeServers = [];
const PEER_TIMEOUT = 1000;

describe('Simple P2P Test', function () {
    this.timeout(10 * 1000);
    before((done) => {
        let startTest = function (ok) {
            if (activeServers.length !== serverConfigs.length) {
                return;
            }
            else {
                ok();
            }
        }
        serverConfigs.forEach(function (config, idx) {
            let peers = serverConfigs.filter((config, _idx) => {
                return _idx !== idx;
            });
            lib.startIotP2p({ port: config.port, peers: peers }, (instance) => {
                activeServers.push(instance);
                startTest(done);
            });
        });
    });
    it("Set data on 1st instance, ensure written to peers", (done) => {
        let testData = { 'foo': 'bar' };
        let instance1 = activeServers[0];
        instance1.set(testData);
        //Give time to have peers sync and check results
        setTimeout(() => {
            activeServers.forEach((server) => {
                assert.deepEqual(server.get(), testData);
            });
            done();
        }, PEER_TIMEOUT);
    })
})

