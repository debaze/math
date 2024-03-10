import {Vector} from "./index.js";

export class Vector4 extends Vector {
	/**
	 * @overload
	 * @param {...Number} elements
	 * 
	 * @overload
	 * @param {Vector4} vector
	 */
	constructor() {
		super(arguments[0] instanceof Vector4 ? arguments[0] : [arguments[0], arguments[1], arguments[2], arguments[3]]);
	}

	add(vector) {
		this[0] += vector[0];
		this[1] += vector[1];
		this[2] += vector[2];
		this[3] += vector[3];

		return this;
	}

	addScalar(scalar) {
		this[0] += scalar;
		this[1] += scalar;
		this[2] += scalar;
		this[3] += scalar;

		return this;
	}

	/**
	 * @deprecated
	 */
	clone() {
		return new Vector4(this[0], this[1], this[2], this[3]);
	}

	divide(vector) {
		if (vector[0] === 0 || vector[1] === 0 || vector[2] === 0 || vector[3] === 0) {
			throw new RangeError("Division by zero");
		}

		this[0] /= vector[0];
		this[1] /= vector[1];
		this[2] /= vector[2];
		this[3] /= vector[3];

		return this;
	}

	dot(vector) {
		return this[0] * vector[0] + this[1] * vector[1] + this[2] * vector[2] + this[3] * vector[3];
	}

	floor() {
		this[0] |= 0;
		this[1] |= 0;
		this[2] |= 0;
		this[3] |= 0;

		return this;
	}

	isNull() {
		return this[0] === 0 && this[1] === 0 && this[2] === 0 && this[3] === 0;
	}

	lerp(vector, multiplier) {
		this[0] += multiplier * (vector[0] - this[0]);
		this[1] += multiplier * (vector[1] - this[1]);
		this[2] += multiplier * (vector[2] - this[2]);
		this[3] += multiplier * (vector[3] - this[3]);

		return this;
	}

	multiply(vector) {
		this[0] *= vector[0];
		this[1] *= vector[1];
		this[2] *= vector[2];
		this[3] *= vector[3];

		return this;
	}

	multiplyScalar(scalar) {
		this[0] *= scalar;
		this[1] *= scalar;
		this[2] *= scalar;
		this[3] *= scalar;

		return this;
	}

	subtract(vector) {
		this[0] -= vector[0];
		this[1] -= vector[1];
		this[2] -= vector[2];
		this[3] -= vector[3];

		return this;
	}

	toString() {
		return `${this[0].toFixed(2)} ${this[1].toFixed(2)} ${this[2].toFixed(2)} ${this[3].toFixed(2)}`;
	}
}