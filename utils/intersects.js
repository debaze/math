import {Vector2} from "../index.js";

/**
 * @param {Vector2} point
 * @param {Vector2} boxPosition
 * @param {Vector2} boxSize
 */
export function intersects(point, boxPosition, boxSize) {
	return (
		point[0] >= boxPosition[0] &&
		point[0] < boxPosition[0] + boxSize[0] &&
		point[1] >= boxPosition[1] &&
		point[1] < boxPosition[1] + boxSize[1]
	);
}