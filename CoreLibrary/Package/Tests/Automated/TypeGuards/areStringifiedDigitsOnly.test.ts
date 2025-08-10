import { areStringifiedDigitsOnly, Logger } from "../../../Source";
import Testing from "node:test";
import Assert from "assert";


Promise.all([

  Testing.test(
    "Must return true for a string with only digits",
    (): void => {
      Assert.strictEqual(areStringifiedDigitsOnly("123"), true);
    }
  ),

  Testing.test(
    "Must return true for a string with leading zero digits",
    (): void => {
      Assert.strictEqual(areStringifiedDigitsOnly("032"), true);
    }
  ),

  Testing.test(
    "Must return false for a non-string input (number)",
    (): void => {
      Assert.strictEqual(areStringifiedDigitsOnly(123), false);
    }
  ),

  Testing.test(
    "Must return false for a string with scientific notation",
    (): void => {
      Assert.strictEqual(areStringifiedDigitsOnly("03e"), false);
    }
  ),

  Testing.test(
    "Must return false for a string with non-digit characters",
    (): void => {
      Assert.strictEqual(areStringifiedDigitsOnly("ab1"), false);
    }
  )

]).catch(Logger.logPromiseError);
