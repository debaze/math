import {Matrix, PI, quat, Vector3} from "./index.js";

export class Matrix4 extends Matrix {
	/**
	 * @param {IArguments} args
	 */
	static #construct(args) {
		if (args[0] instanceof Matrix4) {
			return args[0];
		}

		const array = new Float32Array(16);

		array.set(args);

		return array;
	}

	static identity() {
		return new Matrix4(
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1,
		);
	}

	/**
	 * Computes a left-handed LookAt matrix.
	 * 
	 * @param {Vector3} position
	 * @param {Vector3} direction
	 * @param {Vector3} up
	 */
	static lookAt(position, direction, up) {
		const z = new Vector3(direction).subtract(position).normalize();
		const x = up.cross(z).normalize();
		const y = z.cross(x);

		return new Matrix4(
			x[0], y[0], z[0], 0,
			x[1], y[1], z[1], 0,
			x[2], y[2], z[2], 0,
			-x.dot(position), -y.dot(position), -z.dot(position), 1,
		);
	}

	/**
	 * Computes a right-handed LookAt matrix.
	 * 
	 * @param {Vector3} position
	 * @param {Vector3} direction
	 * @param {Vector3} up
	 */
	static lookAtRightHanded(position, direction, up) {
		const z = new Vector3(position).subtract(direction).normalize();
		const x = up.cross(z).normalize();
		const y = z.cross(x);

		return new Matrix4(
			x[0], y[0], z[0], 0,
			x[1], y[1], z[1], 0,
			x[2], y[2], z[2], 0,
			-x.dot(position), -y.dot(position), -z.dot(position), 1,
		);
	}

	/**
	 * Computes a LookAt matrix where the direction is relative to the position.
	 * 
	 * @param {Vector3} position
	 * @param {Vector3} direction (normalized)
	 * @param {Vector3} up
	 */
	static lookAtRelative(position, direction, up) {
		const z = direction;
		const x = up.cross(z).normalize();
		const y = z.cross(x);

		return new Matrix4(
			x[0], y[0], z[0], 0,
			x[1], y[1], z[1], 0,
			x[2], y[2], z[2], 0,
			-x.dot(position), -y.dot(position), -z.dot(position), 1,
		);
	}

	/**
	 * Returns a left-handed orthographic projection matrix.
	 * 
	 * @param {Number} l Left
	 * @param {Number} r Right
	 * @param {Number} b Bottom
	 * @param {Number} t Top
	 * @param {Number} n Near
	 * @param {Number} f Far
	 */
	static orthographic(l, r, b, t, n, f) {
		const lr = r - l;
		const bt = t - b;
		const nf = f - n;
	
		return new Matrix4(
			2 / lr, 0, 0, -(l + r) / lr,
			0, 2 / bt, 0, -(b + t) / bt,
			0, 0, 2 / nf, -(n + f) / nf,
			0, 0, 0, 1
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

	/**
	 * @param {Vector3} vector
	 */
	static translation(vector) {
		return new Matrix4(
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			vector[0], vector[1], vector[2], 1,
		);
	}

	/**
	 * @param {Vector3} vector
	 */
	static scale(vector) {
		return new Matrix4(
			vector[0], 0, 0, 0,
			0, vector[1], 0, 0,
			0, 0, vector[2], 0,
			0, 0, 0, 1,
		);
	}

	/**
	 * @param {quat} q
	 */
	static fromQuaternion(q) {
		const qx = q.x;
		const qy = q.y;
		const qz = q.z;
		const qw = q.w;

		const x2 = qx + qx;
		const y2 = qy + qy;
		const z2 = qz + qz;
		const x2x = x2 * qx;
		const x2y = x2 * qy;
		const x2z = x2 * qz;
		const x2w = x2 * qw;
		const y2y = y2 * qy;
		const y2z = y2 * qz;
		const y2w = y2 * qw;
		const z2z = z2 * qz;
		const z2w = z2 * qw;

		const result = new Matrix4();

		result[0] = 1.0 - (y2y + z2z);
		result[1] = x2y - z2w;
		result[2] = x2z + y2w;
		result[3] = 0.0;

		result[4] = x2y + z2w;
		result[5] = 1.0 - (x2x + z2z);
		result[6] = y2z - x2w;
		result[7] = 0.0;

		result[8] = x2z - y2w;
		result[9] = y2z + x2w;
		result[10] = 1.0 - (x2x + y2y);
		result[11] = 0.0;

		result[12] = 0.0;
		result[13] = 0.0;
		result[14] = 0.0;
		result[15] = 1.0;

		return result;
	}

	/**
	 * @overload
	 * @param {...Number} elements
	 * 
	 * @overload
	 * @param {Matrix4} matrix
	 */
	constructor() {
		super(Matrix4.#construct(arguments));
	}

	/**
	 * @param {Matrix4} matrix
	 */
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

	asWebGPULayout() {
		return new Float32Array(this);
	}
}