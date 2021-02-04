const { UDPClient } = require('./udp/client');
const { getLinearFunction } = require('./getLinearFunction');
const { setups } = require('./equationSetup');

const x1 = 0;
const x2 = 2;
let actualSetup = 0;
let actualEquation = 0;
let msg;

const client = new UDPClient();

/*const timer = setInterval(() => {
	if (actualSetup < setups.length) {
		console.log(actualSetup);
		msg = Buffer.from(
			`${setups[actualSetup][actualEquation].number};${x1}`
		);
		client.send(msg);
		msg = Buffer.from(
			`${setups[actualSetup][actualEquation].number};${x2}`
		);

		actualSetup++;

		if (actualEquation == 0) {
			actualEquation++;
		} else {
			actualEquation = 0;
		}
	} else {
		clearInterval(timer);
	}
}, actualSetup * 50);*/

setTimeout(() => {
	actualEquation = 0;
	msg = Buffer.from(`${setups[4][0].number};${x1}`);
	client.send(msg);
}, 10);

setTimeout(() => {
	msg = Buffer.from(`${setups[4][0].number};${x2}`);
	client.send(msg);
}, 20);

setTimeout(() => {
	actualEquation = 1;
	msg = Buffer.from(`${setups[4][1].number};${x1}`);
	client.send(msg);
}, 30);

setTimeout(() => {
	msg = Buffer.from(`${setups[4][1].number};${x2}`);
	client.send(msg);
}, 40);

client.messageListener('message', (msg) => {
	if (setups[4][actualEquation].y1 == 0) {
		setups[4][actualEquation].y1 = parseFloat(msg);
	} else {
		setups[4][actualEquation].y2 = parseFloat(msg);
		const { a, b } = getLinearFunction([
			{ x: x1, y: setups[4][actualEquation].y1 },
			{ x: x2, y: setups[4][actualEquation].y2 },
		]);
		setups[4][actualEquation].a = a;
		setups[4][actualEquation].b = b;
		setups[4][
			actualEquation
		].string = `f(x) = ${setups[4][actualEquation].a} * x + ${setups[4][actualEquation].b}`;
	}
});

setTimeout(() => {
	console.log(setups[4]);
}, 50);
