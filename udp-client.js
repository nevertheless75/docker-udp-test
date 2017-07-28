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

var message = new Buffer('Wurstsalat! Send to ' + HOST + ":" + PORT);

var client = dgram.createSocket('udp4');
client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST +':'+ PORT);
    client.close();
});
