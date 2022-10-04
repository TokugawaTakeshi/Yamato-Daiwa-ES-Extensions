import { toUpperCamelCase } from "../../../Source";
import { strictEqual } from "assert";


describe("toUpperCamelCase", (): void => {

  it("Normal text has been converted correctly", (): void => {
    strictEqual(toUpperCamelCase("Waltz bad nymph for quick jigs vex"), "WaltzBadNymphForQuickJigsVex");
  });

  it("Upper camel case has been converted correctly", (): void => {
    strictEqual(toUpperCamelCase("ExperimentalSample"), "ExperimentalSample");
    strictEqual(toUpperCamelCase("HTMLContent"), "HtmlContent");
    strictEqual(toUpperCamelCase("IAmATeapot"), "IAmATeapot");
  });

  it("Lower camel case has been left such as", (): void => {
    const experimentalSample: string = "ExperimentalSample";
    strictEqual(toUpperCamelCase(experimentalSample), experimentalSample);
  });

  it("Kebab case has been converted correctly", (): void => {
    strictEqual(toUpperCamelCase("I-am-The-tasty-Kebab"), "IAmTheTastyKebab");
  });

  it("Snake case has been converted correctly", (): void => {
    strictEqual(toUpperCamelCase("I_AM_A_SNAKE"), "IAmASnake");
  });

});
