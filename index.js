export {AABB} from "./AABB.js";
export {inverse, transpose} from "./mat.js";
export {Matrix} from "./Matrix.js";
export {Matrix3} from "./Matrix3.js";
export {Matrix4} from "./Matrix4.js";
export {quat, conjugate, multiply, normalize, toEulerAngles} from "./quat.js";
export {cross, distance, dot, length, negate} from "./vec.js";
export {Vector} from "./Vector.js";
export {Vector2} from "./Vector2.js";
export {Vector3} from "./Vector3.js";
export {Vector4} from "./Vector4.js";
export {clamp, lerp, max, min} from "./utils/clamp.js";

export * from "./trig.js";

const pi = Math.PI;
const SQRT1_2 = Math.SQRT1_2;
const SQRT2 = Math.SQRT2;

export {pi, SQRT1_2, SQRT2};

/**
 * @param {Number} a
 */
export function cos(a) {
	return Math.cos(a);
}

/**
 * @param {Number} a
 */
export function sin(a) {
	return Math.sin(a);
}

/**
 * @param {Number} a
 */
export function sqrt(a) {
	return Math.sqrt(a);
}