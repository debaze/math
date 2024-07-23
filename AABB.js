import {Vector2} from "./index.js";

/**
 * @typedef {Object} AabbDescriptor
 * @property {Vector2} position
 * @property {Vector2} size
 */

export class AABB {
	#position;
	#size;

	/**
	 * @param {AabbDescriptor} descriptor
	 */
	constructor(descriptor) {
		this.#position = descriptor.position;
		this.#size = descriptor.size;
	}

	getPosition() {
		return this.#position;
	}

	getSize() {
		return this.#size;
	}

	/**
	 * @param {Vector2} point
	 */
	intersectsPoint(point) {
		return (
			point[0] >= this.#position[0] &&
			point[0] < this.#position[0] + this.#size[0] &&
			point[1] >= this.#position[1] &&
			point[1] < this.#position[1] + this.#size[1]
		);
	}
}