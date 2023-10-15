/**
 * @abstract
 */
export class Vector extends Float32Array {
	/**
	 * @param {Number} dimension
	 * @param {Number[]} elements
	 */
	constructor(dimension, elements) {
		super(dimension);

		this.set(elements);
	}

	/**
	 * @abstract
	 * @param {Vector} vector
	 * @returns {this}
	 */
	add(vector) {
		throw new Error("Not implemented");
	}

	/**
	 * @abstract
	 * @param {Number} scalar
	 * @returns {this}
	 */
	addScalar(scalar) {
		throw new Error("Not implemented");
	}

	/**
	 * @abstract
	 * @returns {Vector}
	 */
	clone() {
		throw new Error("Not implemented");
	}

	/**
	 * @abstract
	 * @param {Vector} vector
	 * @returns {this}
	 * @throws {RangeError}
	 */
	divide(vector) {
		throw new Error("Not implemented");
	}

	/**
	 * @param {Number} scalar
	 * @returns {this}
	 * @throws {RangeError}
	 */
	divideScalar(scalar) {
		if (scalar === 0) {
			throw RangeError("Division by zero");
		}

		return this.multiplyScalar(1 / scalar);
	}

	/**
	 * @abstract
	 * @param {Vector} vector
	 * @returns {Number}
	 */
	dot(vector) {
		throw new Error("Not implemented");
	}

	/**
	 * @abstract
	 * @returns {this}
	 */
	floor() {
		throw new Error("Not implemented");
	}

	/**
	 * @abstract
	 * @param {Vector} vector
	 * @param {Number} multiplier
	 * @returns {this}
	 */
	lerp(vector, multiplier) {
		throw new Error("Not implemented");
	}

	/**
	 * @returns {Number}
	 */
	magnitude() {
		return Math.sqrt(this.dot(this));
	}

	/**
	 * @abstract
	 * @param {Vector} vector
	 * @returns {this}
	 */
	multiply(vector) {
		throw new Error("Not implemented");
	}

	/**
	 * @abstract
	 * @param {Number} scalar
	 * @returns {this}
	 */
	multiplyScalar(scalar) {
		throw new Error("Not implemented");
	}

	/**
	 * @returns {this}
	 */
	normalize() {
		const magnitude = this.magnitude();

		if (magnitude === 0) {
			return this.subtract(this);
		}

		return this.divideScalar(magnitude);
	}

	/**
	 * @abstract
	 * @param {Vector} vector
	 * @returns {this}
	 */
	subtract(vector) {
		throw new Error("Not implemented");
	}

	/**
	 * @param {Number} scalar
	 * @returns {this}
	 */
	subtractScalar(scalar) {
		return this.addScalar(-scalar);
	}

	/**
	 * @param {Vector} vector
	 * @returns {Number}
	 */
	to(vector) {
		return vector.clone().subtract(this).magnitude();
	}

	/**
	 * @returns {String}
	 */
	toString() {
		throw new Error("Not implemented");
	}
}