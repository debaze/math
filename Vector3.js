import {Matrix4, Vector} from "./index.js";

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

	/**
	 * @param {Vector3} vector
	 */
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
	 * @param {Vector3} vector
	 */
	cross(vector) {
		return new Vector3(
			this[1] * vector[2] - this[2] * vector[1],
			this[2] * vector[0] - this[0] * vector[2],
			this[0] * vector[1] - this[1] * vector[0],
		);
	}

	/**
	 * @param {Vector3} vector
	 */
	divide(vector) {
		if (vector[0] === 0 || vector[1] === 0 || vector[2] === 0) {
			throw new RangeError("Division by zero");
		}

		this[0] /= vector[0];
		this[1] /= vector[1];
		this[2] /= vector[2];

		return this;
	}

	/**
	 * @param {Vector3} vector
	 */
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

	/**
	 * @param {Vector3} vector
	 */
	lerp(vector, multiplier) {
		this[0] += multiplier * (vector[0] - this[0]);
		this[1] += multiplier * (vector[1] - this[1]);
		this[2] += multiplier * (vector[2] - this[2]);

		return this;
	}

	/**
	 * @param {Vector3} vector
	 */
	multiply(vector) {
		this[0] *= vector[0];
		this[1] *= vector[1];
		this[2] *= vector[2];

		return this;
	}

	/**
	 * @param {Matrix4} matrix
	 */
	multiplyMatrix(matrix) {
		const x = this[0];
		const y = this[1];
		const z = this[2];
		const w = 1 / (matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15]);

		this[0] = (matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12]) * w;
		this[1] = (matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13]) * w;
		this[2] = (matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14]) * w;

		return this;
	}

	multiplyScalar(scalar) {
		this[0] *= scalar;
		this[1] *= scalar;
		this[2] *= scalar;

		return this;
	}

	/**
	 * @param {Vector3} vector
	 */
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