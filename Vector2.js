import {Vector} from "./index.js";

export class Vector2 extends Vector {
	/**
	 * @param {...Number} elements
	 */
	constructor(...elements) {
		super(2, elements);
	}

	add(vector) {
		this[0] += vector[0];
		this[1] += vector[1];

		return this;
	}

	addScalar(scalar) {
		this[0] += scalar;
		this[1] += scalar;

		return this;
	}

	clone() {
		return new Vector2(this[0], this[1]);
	}

	divide(vector) {
		if (vector[0] === 0 || vector[1] === 0) {
			throw new RangeError("Division by zero");
		}

		this[0] /= vector[0];
		this[1] /= vector[1];

		return this;
	}

	dot(vector) {
		return this[0] * vector[0] + this[1] * vector[1];
	}

	floor() {
		this[0] |= 0;
		this[1] |= 0;

		return this;
	}

	isNull() {
		return this[0] === 0 && this[1] === 0;
	}

	lerp(vector, multiplier) {
		this[0] += multiplier * (vector[0] - this[0]);
		this[1] += multiplier * (vector[1] - this[1]);

		return this;
	}

	multiply(vector) {
		this[0] *= vector[0];
		this[1] *= vector[1];

		return this;
	}

	multiplyScalar(scalar) {
		this[0] *= scalar;
		this[1] *= scalar;

		return this;
	}

	subtract(vector) {
		this[0] -= vector[0];
		this[1] -= vector[1];

		return this;
	}

	toString() {
		return `${this[0].toFixed(2)} ${this[1].toFixed(2)}`;
	}
}