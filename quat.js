import {cos, length, sin, Vector3} from "./index.js";

export class quat {
	static identity() {
		return new quat(0, 0, 0, 1);
	}

	/**
	 * @param {import("./index.js").Vector3} eulerAngles
	 */
	static fromEulerAngles(eulerAngles) {
		const [x, y, z] = eulerAngles;

		const c1 = cos(x * 0.5);
		const c2 = cos(y * 0.5);
		const c3 = cos(z * 0.5);
		const s1 = sin(x * 0.5);
		const s2 = sin(y * 0.5);
		const s3 = sin(z * 0.5);

		return new quat(
			s1 * c2 * c3 + c1 * s2 * s3,
			c1 * s2 * c3 - s1 * c2 * s3,
			c1 * c2 * s3 + s1 * s2 * c3,
			c1 * c2 * c3 - s1 * s2 * s3,
		);
	}

	/**
	 * @param {import("./index.js").Vector3} axis
	 * @param {Number} angle
	 */
	static fromAxisAngle(axis, angle) {
		const ha = angle * 0.5;
		const sa = sin(ha);

		return new quat(
			axis[0] * sa,
			axis[1] * sa,
			axis[2] * sa,
			cos(ha),
		);
	}

	x;
	y;
	z;
	w;

	/**
	 * @overload
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} z
	 * @param {Number} w
	 * 
	 * @overload
	 * @param {quat} q
	 */
	constructor() {
		if (!(arguments[0] instanceof quat)) {
			this.x = arguments[0];
			this.y = arguments[1];
			this.z = arguments[2];
			this.w = arguments[3];
		} else {
			this.x = arguments[0].x;
			this.y = arguments[0].y;
			this.z = arguments[0].z;
			this.w = arguments[0].w;
		}
	}
}

/**
 * @param {quat} q
 */
export function conjugate(q) {
	return new quat(-q.x, -q.y, -q.z, q.w);
}

/**
 * @overload
 * @param {import("./index.js").Vector3} v
 * @param {quat} q
 * @returns {import("./index.js").Vector3}
 * 
 * @overload
 * @param {quat} q1
 * @param {quat} q2
 * @returns {quat}
 */
export function multiply() {
	if (arguments[0] instanceof quat) {
		return multiplyQuaternionQuaternion.apply(null, arguments);
	} else {
		return multiplyVectorQuaternion.apply(null, arguments);
	}
}

/**
 * @param {quat} q1
 * @param {quat} q2
 */
function multiplyQuaternionQuaternion(q1, q2) {
	const ax = q1.x;
	const ay = q1.y;
	const az = q1.z;
	const aw = q1.w;
	const bx = q2.x;
	const by = q2.y;
	const bz = q2.z;
	const bw = q2.w;

	return new quat(
		aw * bx + ax * bw + ay * bz - az * by,
		aw * by - ax * bz + ay * bw + az * bx,
		aw * bz + ax * by - ay * bx + az * bw,
		aw * bw - ax * bx - ay * by - az * bz,
	);
}

/**
 * @param {import("./index.js").Vector3} v
 * @param {quat} q
 */
function multiplyVectorQuaternion(v, q) {
	const qv = new quat(v[0], v[1], v[2], 0);
	const result = multiplyQuaternionQuaternion(multiplyQuaternionQuaternion(conjugate(q), qv), q);

	return new Vector3(result.x, result.y, result.z);
}

/**
 * @param {quat} q
 */
export function normalize(q) {
	const l = length(q);

	if (l === 0) {
		return new quat(0, 0, 0, 0);
	}

	const invLength = 1 / l;

	return new quat(q.x * invLength, q.y * invLength, q.z * invLength, q.w * invLength);
}

/**
 * @param {quat} q
 */
export function toEulerAngles(q) {
	const xx = q.x;
	const yy = q.y;
	const zz = q.z;
	const ww = q.w;
	const xsq = xx * xx;
	const ysq = yy * yy;
	const zsq = zz * zz;

	return new Vector3(
		Math.atan2(2.0 * (xx * ww - yy * zz), 1.0 - 2.0 * (xsq + zsq)),
		Math.atan2(2.0 * (yy * ww + xx * zz), 1.0 - 2.0 * (ysq + zsq)),
		Math.asin(2.0 * (xx * yy + zz * ww)),
	);
}