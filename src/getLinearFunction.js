const getLinearFunction = (
	setup = [
		{ x: 0, y: 0 },
		{ x: 1, y: 1 },
	]
) => {
	const equation = { a: 0, b: 0 };
	if (setup[0].x === 0) {
		equation.b = setup[0].y;
		if (setup[0].x !== setup[1].x) {
			equation.a = (setup[1].y - equation.b) / setup[1].x;
		}
	}
	return equation;
};

module.exports = { getLinearFunction };
