import { toLowerCamelCase } from "../../../Source";
import Assert from "assert";


describe("toLowerCamelCase", (): void => {

  it("Normal text has been converted correctly", (): void => {
    Assert.strictEqual(toLowerCamelCase("Waltz bad nymph for quick jigs vex"), "waltzBadNymphForQuickJigsVex");
  });

  it("Upper camel case has been converted correctly", (): void => {
    Assert.strictEqual(toLowerCamelCase("ExperimentalSample"), "experimentalSample");
    Assert.strictEqual(toLowerCamelCase("HTMLContent"), "htmlContent");
    Assert.strictEqual(toLowerCamelCase("IAmATeapot"), "iAmATeapot");
  });

  it("Lower camel case has been left such as", (): void => {
    const experimentalSample: string = "experimentalSample";
    Assert.strictEqual(toLowerCamelCase(experimentalSample), experimentalSample);
  });

  it("Kebab case has been converted correctly", (): void => {
    Assert.strictEqual(toLowerCamelCase("I-am-The-tasty-Kebab"), "iAmTheTastyKebab");
  });

  it("Snake case has been converted correctly", (): void => {
    Assert.strictEqual(toLowerCamelCase("I_AM_A_SNAKE"), "iAmASnake");
  });

});
