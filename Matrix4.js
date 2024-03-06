import {Matrix, PI, Vector3} from "./index.js";

export class Matrix4 extends Matrix {
	static identity() {
		return new Matrix4(
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1,
		);
	}

	/**
	 * @param {Vector3} eye
	 * @param {Vector3} target (will be altered by this method)
	 * @param {Vector3} up
	 * @returns {Matrix4}
	 */
	static lookAt(eye, target, up) {
		const z = target.subtract(eye).normalize();
		const x = up.cross(z).normalize();
		const y = z.cross(x);

		return new Matrix4(
			x[0], y[0], z[0], 0,
			x[1], y[1], z[1], 0,
			x[2], y[2], z[2], 0,
			-x.dot(eye), -y.dot(eye), -z.dot(eye), 1,
		);
	}

	static orthographic(vector) {
		if (vector[0] === 0 || vector[1] === 0 || vector[2] === 0) {
			throw new RangeError("Division by zero");
		}

		return new Matrix4(
			2 / vector[0], 0, 0, 0,
			0, -2 / vector[1], 0, 0,
			0, 0, 2 / vector[2], 0,
			-1, 1, 0, 1,
		);
	}

	/**
	 * Returns a perspective projection matrix.
	 * 
	 * @param {Number} fieldOfView In radians
	 * @param {Number} aspectRatio
	 * @param {Number} nearPlane
	 * @param {Number} farPlane
	 * @param {Number} coordinateSystem 1 for left-handed, -1 for right-handed
	 * @param {Number} [bias]
	 * @returns {Matrix4}
	 */
	static perspective(fieldOfView, aspectRatio, nearPlane, farPlane, coordinateSystem, bias = PI * .5) {
		const f = Math.tan(bias - fieldOfView * .5);
		const range = farPlane - nearPlane;

		return new Matrix4(
			f / aspectRatio, 0, 0, 0,
			0, f, 0, 0,
			0, 0, farPlane / range, coordinateSystem,
			0, 0, -coordinateSystem * nearPlane * farPlane / range, 0,
		);
	}

	/**
	 * @param {Vector3} vector
	 * @returns {Matrix4}
	 */
	static rotation(vector) {
		let c = Math.cos(vector[0]);
		let s = Math.sin(vector[0]);

		const matrix = new Matrix4(
			1, 0, 0, 0,
			0, c, s, 0,
			0, -s, c, 0,
			0, 0, 0, 1,
		);

		c = Math.cos(vector[1]);
		s = Math.sin(vector[1]);

		matrix.multiply(new Matrix4(
			c, 0, -s, 0,
			0, 1, 0, 0,
			s, 0, c, 0,
			0, 0, 0, 1,
		));

		c = Math.cos(vector[2]);
		s = Math.sin(vector[2]);

		matrix.multiply(new Matrix4(
			c, s, 0, 0,
			-s, c, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1,
		));

		return matrix;
	}

	static translation(vector) {
		return new Matrix4(
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			vector[0], vector[1], vector[2], 1,
		);
	}

	static scale(vector) {
		return new Matrix4(
			vector[0], 0, 0, 0,
			0, vector[1], 0, 0,
			0, 0, vector[2], 0,
			0, 0, 0, 1,
		);
	}

	/**
	 * @overload
	 * @param {...Number} elements
	 * 
	 * @overload
	 * @param {Matrix4} matrix
	 */
	constructor() {
		super(arguments[0] instanceof Matrix4 ? arguments[0] : [...arguments].slice(0, 16));
	}

	/**
	 * @deprecated
	 */
	clone() {
		return new Matrix4(this[0], this[1], this[2], this[3], this[4], this[5], this[6], this[7], this[8], this[9], this[10], this[11], this[12], this[13], this[14], this[15]);
	}

	invert() {
		const
			a00 = this[0],
			a10 = this[1],
			a20 = this[2],
			a30 = this[3],
			a01 = this[4],
			a11 = this[5],
			a21 = this[6],
			a31 = this[7],
			a02 = this[8],
			a12 = this[9],
			a22 = this[10],
			a32 = this[11],
			a03 = this[12],
			a13 = this[13],
			a23 = this[14],
			a33 = this[15],
			b00 = a12 * a23 * a31 - a13 * a22 * a31 + a13 * a21 * a32 - a11 * a23 * a32 - a12 * a21 * a33 + a11 * a22 * a33,
			b01 = a03 * a22 * a31 - a02 * a23 * a31 - a03 * a21 * a32 + a01 * a23 * a32 + a02 * a21 * a33 - a01 * a22 * a33,
			b02 = a02 * a13 * a31 - a03 * a12 * a31 + a03 * a11 * a32 - a01 * a13 * a32 - a02 * a11 * a33 + a01 * a12 * a33,
			b03 = a03 * a12 * a21 - a02 * a13 * a21 - a03 * a11 * a22 + a01 * a13 * a22 + a02 * a11 * a23 - a01 * a12 * a23,
			d = a00 * b00 + a10 * b01 + a20 * b02 + a30 * b03;

		if (d === 0) {
			return this.multiplyScalar(0);
		}

		this[0] = b00;
		this[1] = a13 * a22 * a30 - a12 * a23 * a30 - a13 * a20 * a32 + a10 * a23 * a32 + a12 * a20 * a33 - a10 * a22 * a33;
		this[2] = a11 * a23 * a30 - a13 * a21 * a30 + a13 * a20 * a31 - a10 * a23 * a31 - a11 * a20 * a33 + a10 * a21 * a33;
		this[3] = a12 * a21 * a30 - a11 * a22 * a30 - a12 * a20 * a31 + a10 * a22 * a31 + a11 * a20 * a32 - a10 * a21 * a32;
		this[4] = b01;
		this[5] = a02 * a23 * a30 - a03 * a22 * a30 + a03 * a20 * a32 - a00 * a23 * a32 - a02 * a20 * a33 + a00 * a22 * a33;
		this[6] = a03 * a21 * a30 - a01 * a23 * a30 - a03 * a20 * a31 + a00 * a23 * a31 + a01 * a20 * a33 - a00 * a21 * a33;
		this[7] = a01 * a22 * a30 - a02 * a21 * a30 + a02 * a20 * a31 - a00 * a22 * a31 - a01 * a20 * a32 + a00 * a21 * a32;
		this[8] = b02;
		this[9] = a03 * a12 * a30 - a02 * a13 * a30 - a03 * a10 * a32 + a00 * a13 * a32 + a02 * a10 * a33 - a00 * a12 * a33;
		this[10] = a01 * a13 * a30 - a03 * a11 * a30 + a03 * a10 * a31 - a00 * a13 * a31 - a01 * a10 * a33 + a00 * a11 * a33;
		this[11] = a02 * a11 * a30 - a01 * a12 * a30 - a02 * a10 * a31 + a00 * a12 * a31 + a01 * a10 * a32 - a00 * a11 * a32;
		this[12] = b03;
		this[13] = a02 * a13 * a20 - a03 * a12 * a20 + a03 * a10 * a22 - a00 * a13 * a22 - a02 * a10 * a23 + a00 * a12 * a23;
		this[14] = a03 * a11 * a20 - a01 * a13 * a20 - a03 * a10 * a21 + a00 * a13 * a21 + a01 * a10 * a23 - a00 * a11 * a23;
		this[15] = a01 * a12 * a20 - a02 * a11 * a20 + a02 * a10 * a21 - a00 * a12 * a21 - a01 * a10 * a22 + a00 * a11 * a22;

		return this.multiplyScalar(1 / d);
	}

	multiply(matrix) {
		const
			a00 = this[0],
			a10 = this[1],
			a20 = this[2],
			a30 = this[3],
			a01 = this[4],
			a11 = this[5],
			a21 = this[6],
			a31 = this[7],
			a02 = this[8],
			a12 = this[9],
			a22 = this[10],
			a32 = this[11],
			a03 = this[12],
			a13 = this[13],
			a23 = this[14],
			a33 = this[15],
			b00 = matrix[0],
			b10 = matrix[1],
			b20 = matrix[2],
			b30 = matrix[3],
			b01 = matrix[4],
			b11 = matrix[5],
			b21 = matrix[6],
			b31 = matrix[7],
			b02 = matrix[8],
			b12 = matrix[9],
			b22 = matrix[10],
			b32 = matrix[11],
			b03 = matrix[12],
			b13 = matrix[13],
			b23 = matrix[14],
			b33 = matrix[15];

		this[0] = a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30;
		this[1] = a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30;
		this[2] = a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30;
		this[3] = a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30;
		this[4] = a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31;
		this[5] = a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31;
		this[6] = a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31;
		this[7] = a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31;
		this[8] = a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32;
		this[9] = a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32;
		this[10] = a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32;
		this[11] = a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32;
		this[12] = a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33;
		this[13] = a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33;
		this[14] = a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33;
		this[15] = a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33;

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
		this[9] *= scalar;
		this[10] *= scalar;
		this[11] *= scalar;
		this[12] *= scalar;
		this[13] *= scalar;
		this[14] *= scalar;
		this[15] *= scalar;

		return this;
	}

	transpose() {
		let element = this[1];
		this[1] = this[4];
		this[4] = element;
		element = this[2];
		this[2] = this[8];
		this[8] = element;
		element = this[3];
		this[3] = this[12];
		this[12] = element;
		element = this[6];
		this[6] = this[9];
		this[9] = element;
		element = this[7];
		this[7] = this[13];
		this[13] = element;
		element = this[11];
		this[11] = this[14];
		this[14] = element;

		return this;
	}
}