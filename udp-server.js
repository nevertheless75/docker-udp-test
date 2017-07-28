const commandLineArgs = require('command-line-args');

const optionDefinitions = [
    { name: 'host', alias: 'h', type: String },
    { name: 'port',  alias: 'p', type: Number }
];

const options = commandLineArgs(optionDefinitions);

var dgram = require('dgram');

var PORT = 47809;
if (options.port)
    PORT = options.port;
var HOST =  '0.0.0.0';
if (options.host)
    HOST = options.host;

var server = dgram.createSocket('udp4');

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port +' - ' + message);

});

server.bind(PORT, HOST);
