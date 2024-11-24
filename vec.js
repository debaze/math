/**
 * @typedef {Object} Overload
 * @property {(a: import("./index.js").Vector, b: import("./index.js").Vector) => Number|import("./index.js").Vector} [cross]
 * @property {(a: import("./index.js").Vector, b: import("./index.js").Vector) => Number} dot
 * @property {(a: import("./index.js").Vector) => Number} length
 */

/**
 * @overload
 * @param {import("./index.js").Vector2} a
 * @param {import("./index.js").Vector2} b
 * @returns {Number}
 * 
 * @overload
 * @param {import("./index.js").Vector3} a
 * @param {import("./index.js").Vector3} b
 * @returns {import("./index.js").Vector3}
 */
export function cross(a, b) {
	const index = a.length - 2;

	return overloads[index].cross(a, b);
}

/**
 * @overload
 * @param {import("./index.js").Vector2} a
 * @param {import("./index.js").Vector2} b
 * @returns {Number}
 * 
 * @overload
 * @param {import("./index.js").Vector3} a
 * @param {import("./index.js").Vector3} b
 * @returns {Number}
 * 
 * @overload
 * @param {import("./index.js").Vector4} a
 * @param {import("./index.js").Vector4} b
 * @returns {Number}
 */
export function dot(a, b) {
	const index = a.length - 2;

	return overloads[index].dot(a, b);
}

/**
 * @overload
 * @param {import("./index.js").Vector} a
 * @returns {Number}
 * 
 * @overload
 * @param {import("./index.js").quat} a
 * @returns {Number}
 */
export function length(a) {
	const index = (a.length ?? 4) - 2;

	return overloads[index].length(a);
}

/**
 * @type {Overload[]}
 */
const overloads = [
	{
		/**
		 * @param {import("./index.js").Vector2} a
		 * @param {import("./index.js").Vector2} b
		 */
		cross(a, b) {
			return a.x * b.y - a.y * b.x;
		},
		/**
		 * @param {import("./index.js").Vector2} a
		 * @param {import("./index.js").Vector2} b
		 */
		dot(a, b) {
			return a.x * b.x + a.y * b.y;
		},
		/**
		 * @param {import("./index.js").Vector2} a
		 */
		length(a) {
			return a.magnitude();
		},
	},
	{
		/**
		 * @param {import("./index.js").Vector3} a
		 * @param {import("./index.js").Vector3} b
		 */
		cross(a, b) {
			return a.cross(b);
		},
		/**
		* @param {import("./index.js").Vector3} a
		* @param {import("./index.js").Vector3} b
		*/
		dot(a, b) {
			return a.x * b.x + a.y * b.y + a.z * b.z;
		},
		/**
		 * @param {import("./index.js").Vector3} a
		 */
		length(a) {
			return a.magnitude();
		},
	},
	{
		/**
		 * @param {import("./index.js").Vector4} a
		 * @param {import("./index.js").Vector4} b
		 */
		dot(a, b) {
			return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
		},
		/**
		 * @param {import("./index.js").Vector4} a
		 */
		length(a) {
			return a.magnitude();
		},
	},
];