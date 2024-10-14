import {Vector} from "./index.js";

/**
 * @abstract
 */
export class Matrix extends Float32Array {
	/**
	 * @abstract
	 * @returns {Matrix}
	 */
	static identity() {
		throw new Error("Not implemented");
	}

	/**
	 * @abstract
	 * @param {Vector} vector
	 * @returns {Matrix}
	 */
	static translation(vector) {
		throw new Error("Not implemented");
	}

	/**
	 * @abstract
	 * @param {Vector} vector
	 * @returns {Matrix}
	 */
	static scale(vector) {
		throw new Error("Not implemented");
	}

	/**
	 * @abstract
	 * @returns {this}
	 */
	invert() {
		throw new Error("Not implemented");
	}

	/**
	 * @abstract
	 * @param {Matrix} matrix
	 * @returns {this}
	 */
	multiply(matrix) {
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
	 * @abstract
	 * @returns {this}
	 */
	transpose() {
		throw new Error("Not implemented");
	}

	/**
	 * @returns {Float32Array}
	 */
	asWebGPULayout() {
		throw new Error("Not implemented");
	}
}