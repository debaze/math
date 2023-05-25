/**
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
 * @param {Number} n
 * @param {Number} max
 * @returns {Number}
 */
export const max = (n, max) => n > max ? max : n;

/**
 * @param {Number} n
 * @param {Number} min
 * @returns {Number}
 */
export const min = (n, min) => n < min ? min : n;