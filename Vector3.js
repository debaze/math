import {Vector} from "./index.js";

export class Vector3 extends Vector {
	/**
	 * @param {IArguments} args
	 */
	static #construct(args) {
		if (args[0] instanceof Vector3) {
			return args[0];
		}

		const array = new Float32Array(3);

		array.set(args);

		return array;
	}

	/**
	 * @overload
	 * @param {...Number} elements
	 * 
	 * @overload
	 * @param {Vector3} vector
	 */
	constructor() {
		super(Vector3.#construct(arguments));
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

	/**
	 * @deprecated
	 */
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