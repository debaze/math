import {Matrix3, Vector} from "./index.js";

export class Vector2 extends Vector {
	/**
	 * @param {IArguments} args
	 */
	static #construct(args) {
		if (args[0] instanceof Vector2) {
			return args[0];
		}

		const array = new Float32Array(2);

		array.set(args);

		return array;
	}

	/**
	 * @overload
	 * @param {...Number} elements
	 * 
	 * @overload
	 * @param {Vector2} vector
	 */
	constructor() {
		super(Vector2.#construct(arguments));
	}

	/**
	 * @param {Vector2} vector
	 */
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

	/**
	 * @param {Vector2} vector
	 */
	divide(vector) {
		if (vector[0] === 0 || vector[1] === 0) {
			throw new RangeError("Division by zero");
		}

		this[0] /= vector[0];
		this[1] /= vector[1];

		return this;
	}

	/**
	 * @param {Vector2} vector
	 */
	dot(vector) {
		return this[0] * vector[0] + this[1] * vector[1];
	}

	/**
	 * @param {Vector2} vector
	 */
	lerp(vector, multiplier) {
		this[0] += multiplier * (vector[0] - this[0]);
		this[1] += multiplier * (vector[1] - this[1]);

		return this;
	}

	/**
	 * @param {Vector2} vector
	 */
	multiply(vector) {
		this[0] *= vector[0];
		this[1] *= vector[1];

		return this;
	}

	/**
	 * @param {Matrix3} matrix
	 */
	multiplyMatrix(matrix) {
		const x = this[0];
		const y = this[1];

		this[0] = matrix[0] * x + matrix[3] * y + matrix[6];
		this[1] = matrix[1] * x + matrix[4] * y + matrix[7];

		return this;
	}

	multiplyScalar(scalar) {
		this[0] *= scalar;
		this[1] *= scalar;

		return this;
	}

	/**
	 * @param {Vector2} vector
	 */
	subtract(vector) {
		this[0] -= vector[0];
		this[1] -= vector[1];

		return this;
	}

	toString() {
		return `${this[0].toFixed(2)} ${this[1].toFixed(2)}`;
	}
}