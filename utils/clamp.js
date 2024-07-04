/**
 * @param {Number} a
 * @param {Number} b
 */
export function min(a, b) {
	if (a < b) {
		return a;
	}

	return b;
}

/**
 * @param {Number} a
 * @param {Number} b
 */
export function minInt(a, b) {
	return b + (a - b & a - b >> 31);
}

/**
 * @param {Number} a
 * @param {Number} b
 */
export function max(a, b) {
	if (a > b) {
		return a;
	}

	return b;
}

/**
 * @param {Number} a
 * @param {Number} b
 */
export function maxInt(a, b) {
	return a - (a - b & a - b >> 31);
}

/**
 * @param {Number} n
 * @param {Number} a Lower bound
 * @param {Number} b Upper bound
 */
export function clamp(n, a, b) {
	return min(max(n, a), b);
}

/**
 * @param {Number} a Start (t = 0)
 * @param {Number} b End (t = 1)
 * @param {Number} t Interpolator
 */
export function lerp(a, b, t) {
	return a + (b - a) * t;
}