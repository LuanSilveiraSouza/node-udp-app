const { UDPClient } = require('./udp/client');
const { getLinearFunction } = require('./getLinearFunction');
const { setups } = require('./equationSetup');

const client = new UDPClient();
const responses = [];
const x1 = 0;
const x2 = 2;

function sendMessages() {
	let msg;
	setups.forEach((setup) => {
		msg = Buffer.from(`${setup[0].number};${x1}`);
		client.send(msg);
		msg = Buffer.from(`${setup[0].number};${x2}`);
		client.send(msg);

		msg = Buffer.from(`${setup[1].number};${x1}`);
		client.send(msg);
		msg = Buffer.from(`${setup[1].number};${x2}`);
		client.send(msg);
	});
}

function discoverEquations() {
	let equation;
	setups.forEach((setup) => {
		equation = getLinearFunction([
			{ x: x1, y: setup[0].y1 },
			{ x: x2, y: setup[0].y2 },
		]);
		setup[0].a = equation.a;
		setup[0].b = equation.b;

		equation = getLinearFunction([
			{ x: x1, y: setup[1].y1 },
			{ x: x2, y: setup[1].y2 },
		]);
		setup[1].a = equation.a;
		setup[1].b = equation.b;
	});
}

(function main() {
	sendMessages();

	client.messageListener('message', (msg) => {
		responses.push(parseFloat(msg));

		if (responses.length >= 20) {
			setups.forEach((setup, index) => {
				setup[0].y1 = responses[index * 4];
				setup[0].y2 = responses[index * 4 + 1];
				setup[1].y1 = responses[index * 4 + 2];
				setup[1].y2 = responses[index * 4 + 3];
			});

			discoverEquations();	
		}
	});
})();
