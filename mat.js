import {Matrix3, Matrix4} from "./index.js";

/**
 * @overload
 * @param {Matrix3} m
 * @returns {Matrix3}
 * 
 * @overload
 * @param {Matrix4} m
 * @returns {Matrix4}
 */
export function inverse() {
	const m = arguments[0];

	if (m instanceof Matrix3) {
		return inverseMatrix3(m);
	}

	if (m instanceof Matrix4) {
		return inverseMatrix4(m);
	}
}

/**
 * @overload
 * @param {Matrix3} m
 * 
 * @overload
 * @param {Matrix4} m
 */
export function transpose() {
	const m = arguments[0];

	if (m instanceof Matrix3) {
		return transposeMatrix3(m);
	}

	if (m instanceof Matrix4) {
		return transposeMatrix4(m);
	}
}

/**
 * @param {Matrix3} m
 */
function inverseMatrix3(m) {
	const a00 = m[0];
	const a10 = m[1];
	const a20 = m[2];
	const a01 = m[3];
	const a11 = m[4];
	const a21 = m[5];
	const a02 = m[6];
	const a12 = m[7];
	const a22 = m[8];
	const b00 = a22 * a11 - a21 * a12;
	const b01 = a21 * a02 - a22 * a01;
	const b02 = a12 * a01 - a11 * a02;
	const d = a00 * b00 + a10 * b01 + a20 * b02;

	return new Matrix3(
		b00,
		a20 * a12 - a22 * a10,
		a21 * a10 - a20 * a11,
		b01,
		a22 * a00 - a20 * a02,
		a20 * a01 - a21 * a00,
		b02,
		a10 * a02 - a12 * a00,
		a11 * a00 - a10 * a01,
	).multiplyScalar(1 / d);
}

/**
 * Adapted from {@link https://github.com/gpuweb/gpuweb/issues/4115#issuecomment-2266254366}.
 * 
 * @param {Matrix4} m
 */
function inverseMatrix4(m) {
	const a00 = m[0];
	const a01 = m[1];
	const a02 = m[2];
	const a03 = m[3];
	const a10 = m[4];
	const a11 = m[5];
	const a12 = m[6];
	const a13 = m[7];
	const a20 = m[8];
	const a21 = m[9];
	const a22 = m[10];
	const a23 = m[11];
	const a30 = m[12];
	const a31 = m[13];
	const a32 = m[14];
	const a33 = m[15];

	const b00 = a00 * a11 - a01 * a10;
	const b01 = a00 * a12 - a02 * a10;
	const b02 = a00 * a13 - a03 * a10;
	const b03 = a01 * a12 - a02 * a11;
	const b04 = a01 * a13 - a03 * a11;
	const b05 = a02 * a13 - a03 * a12;
	const b06 = a20 * a31 - a21 * a30;
	const b07 = a20 * a32 - a22 * a30;
	const b08 = a20 * a33 - a23 * a30;
	const b09 = a21 * a32 - a22 * a31;
	const b10 = a21 * a33 - a23 * a31;
	const b11 = a22 * a33 - a23 * a32;

	const d = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

	return new Matrix4(
		a11 * b11 - a12 * b10 + a13 * b09,
		a02 * b10 - a01 * b11 - a03 * b09,
		a31 * b05 - a32 * b04 + a33 * b03,
		a22 * b04 - a21 * b05 - a23 * b03,
		a12 * b08 - a10 * b11 - a13 * b07,
		a00 * b11 - a02 * b08 + a03 * b07,
		a32 * b02 - a30 * b05 - a33 * b01,
		a20 * b05 - a22 * b02 + a23 * b01,
		a10 * b10 - a11 * b08 + a13 * b06,
		a01 * b08 - a00 * b10 - a03 * b06,
		a30 * b04 - a31 * b02 + a33 * b00,
		a21 * b02 - a20 * b04 - a23 * b00,
		a11 * b07 - a10 * b09 - a12 * b06,
		a00 * b09 - a01 * b07 + a02 * b06,
		a31 * b01 - a30 * b03 - a32 * b00,
		a20 * b03 - a21 * b01 + a22 * b00,
	).multiplyScalar(1 / d);
}

/**
 * @param {Matrix3} m
 */
function transposeMatrix3(m) {
	return new Matrix3(
		m[0], m[3], m[6],
		m[1], m[4], m[7],
		m[2], m[5], m[8],
	);
}

/**
 * @param {Matrix4} m
 */
function transposeMatrix4(m) {
	return new Matrix3(
		m[0],  m[4],  m[8],  m[12],
		m[1],  m[5],  m[9],  m[13],
		m[2],  m[6],  m[10], m[14],
		m[3],  m[7],  m[11], m[15],
	);
}