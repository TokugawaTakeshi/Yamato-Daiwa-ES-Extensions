import { strictEqual } from "assert";
import { toScreamingSnakeCase } from "../../Source";


describe("toScreamingSnakeCase", (): void => {

  it("Normal text has been converted correctly", (): void => {
    strictEqual(toScreamingSnakeCase("Waltz bad nymph for quick jigs vex"), "WALTZ_BAD_NYMPH_FOR_QUICK_JIGS_VEX");
  });

  it("Upper camel case has been converted correctly", (): void => {
    strictEqual(toScreamingSnakeCase("ExperimentalSample"), "EXPERIMENTAL_SAMPLE");
    strictEqual(toScreamingSnakeCase("HTMLContent"), "HTML_CONTENT");
    strictEqual(toScreamingSnakeCase("IAmATeapot"), "I_AM_A_TEAPOT");
  });

  it("Lower camel case has been left such as", (): void => {
    const experimentalSample: string = "EXPERIMENTAL_SAMPLE";
    strictEqual(toScreamingSnakeCase(experimentalSample), experimentalSample);
  });

  it("Kebab case has been converted correctly", (): void => {
    strictEqual(toScreamingSnakeCase("I-am-The-tasty-Kebab"), "I_AM_THE_TASTY_KEBAB");
  });

  it("Snake case has been converted correctly", (): void => {
    strictEqual(toScreamingSnakeCase("I_AM_A_SNAKE"), "I_AM_A_SNAKE");
  });

});
