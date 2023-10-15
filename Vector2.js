import {Vector} from "./index.js";

export class Vector2 extends Vector {
	/**
	 * @param {...Number} elements
	 */
	constructor(...elements) {
		super(2, elements);
	}

	/**
	 * @inheritdoc
	 */
	add(vector) {
		this[0] += vector[0];
		this[1] += vector[1];

		return this;
	}

	/**
	 * @inheritdoc
	 */
	addScalar(scalar) {
		this[0] += scalar;
		this[1] += scalar;

		return this;
	}

	/**
	 * @inheritdoc
	 */
	clone() {
		return new Vector2(this[0], this[1]);
	}

	/**
	 * @inheritdoc
	 */
	divide = function(vector) {
		if (vector[0] === 0 || vector[1] === 0) {
			throw new RangeError("Division by zero");
		}

		this[0] /= vector[0];
		this[1] /= vector[1];

		return this;
	}

	/**
	 * @inheritdoc
	 */
	dot(vector) {
		return this[0] * vector[0] + this[1] * vector[1];
	}

	/**
	 * @inheritdoc
	 */
	floor() {
		this[0] |= 0;
		this[1] |= 0;

		return this;
	}

	/**
	 * @inheritdoc
	 */
	lerp(vector, multiplier) {
		this[0] += multiplier * (vector[0] - this[0]);
		this[1] += multiplier * (vector[1] - this[1]);

		return this;
	}

	/**
	 * @inheritdoc
	 */
	multiply(vector) {
		this[0] *= vector[0];
		this[1] *= vector[1];

		return this;
	}

	/**
	 * @inheritdoc
	 */
	multiplyScalar(scalar) {
		this[0] *= scalar;
		this[1] *= scalar;

		return this;
	}

	/**
	 * @inheritdoc
	 */
	normalize() {
		const magnitude = this.magnitude();

		if (magnitude === 0) {
			return this.subtract(this);
		}

		return this.divideScalar(magnitude);
	}

	/**
	 * @inheritdoc
	 */
	subtract(vector) {
		this[0] -= vector[0];
		this[1] -= vector[1];

		return this;
	}

	/**
	 * @inheritdoc
	 */
	toString() {
		return `${this[0].toFixed(2)} ${this[1].toFixed(2)}`;
	}
}