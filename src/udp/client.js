const dgram = require('dgram');

const { PORT, HOST } = require('./config');

class UDPClient {
	constructor(port = 0, host = '') {
		this.socket = dgram.createSocket('udp4');
		this.port = port === 0 ? PORT : port;
		this.host = host === '' ? HOST : host;
	}

	send(msg = '') {
        if (msg !== '') {
			this.socket.send(
				msg,
				0,
				msg.length,
				this.port,
				this.host,
				(error, bytes) => {
					if (error) {
						throw error;
					}
					return bytes;
				}
			);
		}
	}

	messageListener(channel = '', callback) {
		this.socket.on(channel, callback);
	}

	close() {
		this.socket.close();
	}
}

module.exports = { UDPClient };
