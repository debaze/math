/**
 * @todo Switch to branchless design
 * 
 * @param {Number} n
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
export function clamp(n, min, max) {
	if (n < min) return min;
	if (n > max) return max;

	return n;
}

/**
 * @todo Switch to branchless design
 * 
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
export const max = (a, b) => a > b ? a : b;

/**
 * @todo Switch to branchless design
 * 
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
export const min = (a, b) => a > b ? b : a;