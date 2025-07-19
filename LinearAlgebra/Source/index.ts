/*!
 * @yamato-daiwa/es-extensions-linear-algebra v1.8
 * (c) 2023 Yamato Daiwa Co., Ltd.
 * Released under the MIT License.
 */


/* ━━━ Classes ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export { default as ColumnVector } from "./Classes/ColumnVector";
export { default as Matrix } from "./Classes/Matrix";
export type { default as ReadonlyColumnVector } from "./Classes/ReadonlyColumnVector";
export type { default as ReadonlyRowVector } from "./Classes/ReadonlyRowVector";
export { default as RowVector } from "./Classes/RowVector";

/* ━━━ Operations ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export { default as computeDotProduct } from "./Operations/computeDotProduct";
export { default as multiplyMatrices } from "./Operations/multiplyMatrices";
export { default as multiplyMatrixToColumnVector } from "./Operations/multiplyMatrixToColumnVector";
