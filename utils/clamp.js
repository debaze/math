/**
 * @param {Number} a
 * @param {Number} b
 */
export function max(a, b) {
	return a - (a - b & a - b >> 31);
}

/**
 * @param {Number} a
 * @param {Number} b
 */
export function min(a, b) {
	return b + (a - b & a - b >> 31);
}

/**
 * @param {Number} n
 * @param {Number} a Lower bound
 * @param {Number} b Upper bound
 */
export function clamp(n, a, b) {
	return min(max(n, a), b);
}