/* global NodeJS -- It is the known ESLint issue: https://github.com/Chatie/eslint-config/issues/45 */

import ErrnoException = NodeJS.ErrnoException;
import {
  isArbitraryObject,
  isNumber,
  isString,
  isUndefined
} from "@yamato-daiwa/es-extensions";


export default function isErrnoException(error: unknown): error is ErrnoException {
  return isArbitraryObject(error) &&
    error instanceof Error &&
    (isNumber(error.errno, { mustConsiderNaN_AsNumber: false }) || isUndefined(error.errno)) &&
    (isString(error.code) || isUndefined(error.code)) &&
    (isString(error.path) || isUndefined(error.path)) &&
    (isString(error.syscall) || isUndefined(error.syscall));
}
