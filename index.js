import {Vector3} from "./index.js";

/**
 * @typedef {Vector3[]} Polytope
 */

/**
 * @typedef {Vector3[]} Simplex
 */

export {AABB} from "./AABB.js";
export {inverse, transpose} from "./mat.js";
export {Matrix} from "./Matrix.js";
export {Matrix3} from "./Matrix3.js";
export {Matrix4} from "./Matrix4.js";
export {quat, conjugate, multiply, normalize, toEulerAngles} from "./quat.js";
export {cross, dot, length} from "./vec.js";
export {Vector} from "./Vector.js";
export {Vector2} from "./Vector2.js";
export {Vector3} from "./Vector3.js";
export {Vector4} from "./Vector4.js";
export {clamp, lerp, max, min} from "./utils/clamp.js";

const pi = Math.PI;
/**
 * @deprecated Use {@link pi} instead.
 */
const PI = Math.PI;
const SQRT1_2 = Math.SQRT1_2;
const SQRT2 = Math.SQRT2;

export {pi, PI, SQRT1_2, SQRT2};

/**
 * @param {Number} n
 */
export function cos(n) {
	return Math.cos(n);
}

/**
 * @param {Number} n
 */
export function sin(n) {
	return Math.sin(n);
}

/**
 * @param {Number} n
 */
export function rad(n) {
	return n * pi / 180;
}