import { toScreamingSnakeCase, Logger } from "../../../Source";
import Testing from "node:test";
import Assert from "assert";


Promise.all([

  Testing.test(
    "Normal text has been converted correctly",
    (): void => {
      Assert.strictEqual(toScreamingSnakeCase("Waltz bad nymph for quick jigs vex"), "WALTZ_BAD_NYMPH_FOR_QUICK_JIGS_VEX");
    }
  ),

  Testing.test(
    "Upper camel case has been converted correctly",
    (): void => {
      Assert.strictEqual(toScreamingSnakeCase("ExperimentalSample"), "EXPERIMENTAL_SAMPLE");
      Assert.strictEqual(toScreamingSnakeCase("HTMLContent"), "HTML_CONTENT");
      Assert.strictEqual(toScreamingSnakeCase("IAmATeapot"), "I_AM_A_TEAPOT");
    }
  ),

  Testing.test(
    "Lower camel case has been left such as",
    (): void => {
      const experimentalSample: string = "EXPERIMENTAL_SAMPLE";
      Assert.strictEqual(toScreamingSnakeCase(experimentalSample), experimentalSample);
    }
  ),

  Testing.test(
    "Kebab case has been converted correctly",
    (): void => {
      Assert.strictEqual(toScreamingSnakeCase("I-am-The-tasty-Kebab"), "I_AM_THE_TASTY_KEBAB");
    }
  ),

  Testing.test(
    "Snake case has been converted correctly",
    (): void => {
      Assert.strictEqual(toScreamingSnakeCase("I_AM_A_SNAKE"), "I_AM_A_SNAKE");
    }
  )

]).catch(Logger.logPromiseError);
