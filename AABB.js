/**
 * @typedef {Object} AabbDescriptor
 * @property {import("./index.js").Vector2} position
 * @property {import("./index.js").Vector2} size
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
	 * @param {import("./index.js").Vector2} point
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