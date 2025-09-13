import { toLowerCamelCase, Logger } from "../../../Source";
import Testing from "node:test";
import Assert from "assert";


Promise.all([

  Testing.test(
    "Normal text has been converted correctly",
    (): void => {
      Assert.strictEqual(toLowerCamelCase("Waltz bad nymph for quick jigs vex"), "waltzBadNymphForQuickJigsVex");
    }
  ),

  Testing.test(
    "Upper camel case has been converted correctly",
    (): void => {
      Assert.strictEqual(toLowerCamelCase("ExperimentalSample"), "experimentalSample");
      Assert.strictEqual(toLowerCamelCase("HTMLContent"), "htmlContent");
      Assert.strictEqual(toLowerCamelCase("IAmATeapot"), "iAmATeapot");
    }
  ),

  Testing.test(
    "Lower camel case has been left such as",
    (): void => {
      const experimentalSample: string = "experimentalSample";
      Assert.strictEqual(toLowerCamelCase(experimentalSample), experimentalSample);
    }
  ),

  Testing.test(
    "Kebab case has been converted correctly",
    (): void => {
      Assert.strictEqual(toLowerCamelCase("I-am-The-tasty-Kebab"), "iAmTheTastyKebab");
    }
  ),

  Testing.test(
    "Snake case has been converted correctly",
    (): void => {
      Assert.strictEqual(toLowerCamelCase("I_AM_A_SNAKE"), "iAmASnake");
    }
  )

]).catch(Logger.logPromiseError);
