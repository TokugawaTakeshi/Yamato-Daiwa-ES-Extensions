import { toLowerCamelCase } from "../../../Source";
import { strictEqual } from "assert";


describe("toLowerCamelCase", (): void => {

  it("Normal text has been converted correctly", (): void => {
    strictEqual(toLowerCamelCase("Waltz bad nymph for quick jigs vex"), "waltzBadNymphForQuickJigsVex");
  });

  it("Upper camel case has been converted correctly", (): void => {
    strictEqual(toLowerCamelCase("ExperimentalSample"), "experimentalSample");
    strictEqual(toLowerCamelCase("HTMLContent"), "htmlContent");
    strictEqual(toLowerCamelCase("IAmATeapot"), "iAmATeapot");
  });

  it("Lower camel case has been left such as", (): void => {
    const experimentalSample: string = "experimentalSample";
    strictEqual(toLowerCamelCase(experimentalSample), experimentalSample);
  });

  it("Kebab case has been converted correctly", (): void => {
    strictEqual(toLowerCamelCase("I-am-The-tasty-Kebab"), "iAmTheTastyKebab");
  });

  it("Snake case has been converted correctly", (): void => {
    strictEqual(toLowerCamelCase("I_AM_A_SNAKE"), "iAmASnake");
  });

});
