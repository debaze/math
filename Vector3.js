import {Matrix3, Matrix4, Vector} from "./index.js";

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

	get x() {
		return this[0];
	}

	/**
	 * @param {Number} x
	 */
	set x(x) {
		this[0] = x;
	}

	get y() {
		return this[1];
	}

	/**
	 * @param {Number} y
	 */
	set y(y) {
		this[1] = y;
	}

	get z() {
		return this[2];
	}

	/**
	 * @param {Number} z
	 */
	set z(z) {
		this[2] = z;
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
	 * @overload
	 * @param {import("./index.js").Matrix3} m
	 * 
	 * @overload
	 * @param {import("./index.js").Matrix4} m
	 */
	multiplyMatrix() {
		const m = arguments[0];

		if (m instanceof Matrix3) {
			return this.#multiplyMatrix3(m);
		}

		if (m instanceof Matrix4) {
			return this.#multiplyMatrix4(m);
		}
	}

	/**
	 * @param {import("./index.js").quat} q
	 */
	multiplyQuaternion(q) {
		const [vx, vy, vz] = this;

		const qi = q.x, qj = q.y, qk = q.z, qs = q.w;

		const tx = 2 * (qj * vz - qk * vy);
		const ty = 2 * (qk * vx - qi * vz);
		const tz = 2 * (qi * vy - qj * vx);

		this[0] = vx + qs * tx + qj * tz - qk * ty;
		this[1] = vy + qs * ty + qk * tx - qi * tz;
		this[2] = vz + qs * tz + qi * ty - qj * tx;

		return this;
	}

	multiplyScalar(scalar) {
		this[0] *= scalar;
		this[1] *= scalar;
		this[2] *= scalar;

		return this;
	}

	reset() {
		this[0] = 0;
		this[1] = 0;
		this[2] = 0;

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

	/**
	 * @param {import("./index.js").Matrix4} matrix
	 */
	#multiplyMatrix4(matrix) {
		const x = this[0];
		const y = this[1];
		const z = this[2];
		const w = 1 / (matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15]);

		this[0] = (matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12]) * w;
		this[1] = (matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13]) * w;
		this[2] = (matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14]) * w;

		return this;
	}

	/**
	 * @param {import("./index.js").Matrix3} m
	 */
	#multiplyMatrix3(m) {
		const x = this[0];
		const y = this[1];
		const z = this[2];

		this[0] = m[0] * x + m[3] * y + m[6] * z;
		this[1] = m[1] * x + m[4] * y + m[7] * z;
		this[2] = m[2] * x + m[5] * y + m[8] * z;

		return this;
	}
}