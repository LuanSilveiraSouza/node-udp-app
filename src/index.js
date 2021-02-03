const dgram = require('dgram');
const socket = dgram.createSocket('udp4');

const { UDPClient } = require('./udp/client');

const equation = 9;
const x = 2;
const msg = Buffer.from(`${equation};${x}`);

const client = new UDPClient();

client.send(msg);

client.messageListener('message', (msg) => {
	console.log(msg.toString());
});

/*
socket.send(msg, 0, msg.length, port, host, (error, bytes) => {
	if (error) {
		throw err;
	}
});

socket.on('message', (msg) => {
	console.log(`Equation ${equation}; f(${x}) = ${msg.toString()}`);
	socket.close();
});
*/
