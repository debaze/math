import {Matrix} from "./index.js";

export class Matrix3 extends Matrix {
	static identity() {
		return new Matrix3(
			1, 0, 0,
			0, 1, 0,
			0, 0, 1,
		);
	}

	static orthographic(vector) {
		if (vector[0] === 0 || vector[1] === 0) {
			throw new RangeError("Division by zero");
		}

		return new Matrix3(
			2 / vector[0], 0, 0,
			0, -2 / vector[1], 0,
			-1, 1, 1,
		);
	}

	/**
	 * @param {Number} scalar
	 * @returns {Matrix3}
	 */
	static rotation(scalar) {
		const c = Math.cos(scalar);
		const s = Math.sin(scalar);

		return new Matrix3(
			c, -s, 0,
			s, c, 0,
			0, 0, 1,
		);
	}

	static translation(vector) {
		return new Matrix3(
			1, 0, 0,
			0, 1, 0,
			vector[0], vector[1], 1,
		);
	}

	static scale(vector) {
		return new Matrix3(
			vector[0], 0, 0,
			0, vector[1], 0,
			0, 0, 1,
		);
	}

	/**
	 * @overload
	 * @param {...Number} elements
	 * 
	 * @overload
	 * @param {Matrix3} matrix
	 */
	constructor() {
		super(arguments[0] instanceof Matrix3 ? arguments[0] : [arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8]]);
	}

	/**
	 * @deprecated
	 */
	clone() {
		return new Matrix3(this[0], this[1], this[2], this[3], this[4], this[5], this[6], this[7], this[8]);
	}

	invert() {
		const
			a00 = this[0],
			a10 = this[1],
			a20 = this[2],
			a01 = this[3],
			a11 = this[4],
			a21 = this[5],
			a02 = this[6],
			a12 = this[7],
			a22 = this[8],
			b00 = a22 * a11 - a21 * a12,
			b01 = a21 * a02 - a22 * a01,
			b02 = a12 * a01 - a11 * a02,
			d = a00 * b00 + a10 * b01 + a20 * b02;

		if (d === 0) {
			return this.multiplyScalar(0);
		}

		this[0] = b00;
		this[1] = a20 * a12 - a22 * a10;
		this[2] = a21 * a10 - a20 * a11;
		this[3] = b01;
		this[4] = a22 * a00 - a20 * a02;
		this[5] = a20 * a01 - a21 * a00;
		this[6] = b02;
		this[7] = a10 * a02 - a12 * a00;
		this[8] = a11 * a00 - a10 * a01;

		return this.multiplyScalar(1 / d);
	}

	multiply(matrix) {
		const
			a00 = this[0],
			a10 = this[1],
			a20 = this[2],
			a01 = this[3],
			a11 = this[4],
			a21 = this[5],
			a02 = this[6],
			a12 = this[7],
			a22 = this[8],
			b00 = matrix[0],
			b10 = matrix[1],
			b20 = matrix[2],
			b01 = matrix[3],
			b11 = matrix[4],
			b21 = matrix[5],
			b02 = matrix[6],
			b12 = matrix[7],
			b22 = matrix[8];

		this[0] = a00 * b00 + a01 * b10 + a02 * b20;
		this[1] = a10 * b00 + a11 * b10 + a12 * b20;
		this[2] = a20 * b00 + a21 * b10 + a22 * b20;
		this[3] = a00 * b01 + a01 * b11 + a02 * b21;
		this[4] = a10 * b01 + a11 * b11 + a12 * b21;
		this[5] = a20 * b01 + a21 * b11 + a22 * b21;
		this[6] = a00 * b02 + a01 * b12 + a02 * b22;
		this[7] = a10 * b02 + a11 * b12 + a12 * b22;
		this[8] = a20 * b02 + a21 * b12 + a22 * b22;

		return this;
	}

	multiplyScalar(scalar) {
		this[0] *= scalar;
		this[1] *= scalar;
		this[2] *= scalar;
		this[3] *= scalar;
		this[4] *= scalar;
		this[5] *= scalar;
		this[6] *= scalar;
		this[7] *= scalar;
		this[8] *= scalar;

		return this;
	}

	transpose() {
		let element = this[1];
		this[1] = this[3];
		this[3] = element;
		element = this[2];
		this[2] = this[6];
		this[6] = element;
		element = this[5];
		this[5] = this[7];
		this[7] = element;

		return this;
	}
}