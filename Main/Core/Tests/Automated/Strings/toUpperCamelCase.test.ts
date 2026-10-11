import { Logger, toUpperCamelCase } from "../../../Source";
import Testing from "node:test";
import Assert from "assert";


Promise.all([

  Testing.test(
    "Normal text has been converted correctly",
    (): void => {
      Assert.strictEqual(toUpperCamelCase("Waltz bad nymph for quick jigs vex"), "WaltzBadNymphForQuickJigsVex");
    }
  ),

  Testing.test(
    "Upper camel case has been converted correctly",
    (): void => {
      Assert.strictEqual(toUpperCamelCase("ExperimentalSample"), "ExperimentalSample");
      Assert.strictEqual(toUpperCamelCase("HTMLContent"), "HtmlContent");
      Assert.strictEqual(toUpperCamelCase("IAmATeapot"), "IAmATeapot");
    }
  ),

  Testing.test(
    "Lower camel case has been left such as",
    (): void => {
      const experimentalSample: string = "ExperimentalSample";
      Assert.strictEqual(toUpperCamelCase(experimentalSample), experimentalSample);
    }
  ),

  Testing.test(
    "Kebab case has been converted correctly",
    (): void => {
      Assert.strictEqual(toUpperCamelCase("I-am-The-tasty-Kebab"), "IAmTheTastyKebab");
    }
  ),

  Testing.test(
    "Snake case has been converted correctly",
    (): void => {
      Assert.strictEqual(toUpperCamelCase("I_AM_A_SNAKE"), "IAmASnake");
    }
  )

]).catch(Logger.logPromiseError);
