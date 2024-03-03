import {Vector} from "./index.js";

export class Vector3 extends Vector {
	/**
	 * @param {...Number} elements
	 */
	constructor(...elements) {
		super(3, elements);
	}

	add(vector) {
		this[0] += vector[0];
		this[1] += vector[1];
		this[2] += vector[2];

		return this;
	}

	addScalar(scalar) {
		this[0] += scalar;
		this[1] += scalar;
		this[2] += scalar;

		return this;
	}

	clone() {
		return new Vector3(this[0], this[1], this[2]);
	}

	/**
	 * @param {Vector3} vector
	 * @returns {Vector3}
	 */
	cross(vector) {
		return new Vector3(
			this[1] * vector[2] - this[2] * vector[1],
			this[2] * vector[0] - this[0] * vector[2],
			this[0] * vector[1] - this[1] * vector[0],
		);
	}

	divide(vector) {
		if (vector[0] === 0 || vector[1] === 0 || vector[2] === 0) {
			throw new RangeError("Division by zero");
		}

		this[0] /= vector[0];
		this[1] /= vector[1];
		this[2] /= vector[2];

		return this;
	}

	dot(vector) {
		return this[0] * vector[0] + this[1] * vector[1] + this[2] * vector[2];
	}

	floor() {
		this[0] |= 0;
		this[1] |= 0;
		this[2] |= 0;

		return this;
	}

	isNull() {
		return this[0] === 0 && this[1] === 0 && this[2] === 0;
	}

	lerp(vector, multiplier) {
		this[0] += multiplier * (vector[0] - this[0]);
		this[1] += multiplier * (vector[1] - this[1]);
		this[2] += multiplier * (vector[2] - this[2]);

		return this;
	}

	multiply(vector) {
		this[0] *= vector[0];
		this[1] *= vector[1];
		this[2] *= vector[2];

		return this;
	}

	multiplyScalar(scalar) {
		this[0] *= scalar;
		this[1] *= scalar;
		this[2] *= scalar;

		return this;
	}

	subtract(vector) {
		this[0] -= vector[0];
		this[1] -= vector[1];
		this[2] -= vector[2];

		return this;
	}

	toString() {
		return `${this[0].toFixed(2)} ${this[1].toFixed(2)} ${this[2].toFixed(2)}`;
	}
}