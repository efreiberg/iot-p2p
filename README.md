# iot-p2p
Peer data syncronization over COAP.

## Create IoT P2P Server
 ```
 let IoTP2P = new require('iot-p2p');
 let instance = new IoTP2P(options)   
  ```
### Options
  * `peers<Array>` Array of peer connection information objects.  Ex. ``` { port: 6000, host: 'localhost' }```
  * `port<number>` Incoming requests port.  `Default: 5683`

### Methods
  * `start(callback)` Start IoT-P2p server
  * `stop(callback)` Stop IoT-P2p server
  * `get()` Get stored data.
  * `set(data)`  Set data and distribute to peers.
