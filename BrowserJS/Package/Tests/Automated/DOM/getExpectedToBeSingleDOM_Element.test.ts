import getExpectedToBeSingleDOM_Element from "../../../Source/DOM/getExpectedToBeSingleDOM_Element";
import createDOM_ElementFromHTML_Code from "../../../Source/DOM/createDOM_ElementFromHTML_Code";

import Assert from "assert";
import provideMockBrowserEnvironment from "jsdom-global";

import { DOM_ElementRetrievingFailedError, UnexpectedEventError } from "@yamato-daiwa/es-extensions";


describe("getExpectedToBeSingleDOM_Element", (): void => {

  provideMockBrowserEnvironment();

  it("Simplest example", (): void => {

    const sample: Element = createDOM_ElementFromHTML_Code(
      "<div class='ActionBar'><button type='button' class='Button'></button></div>"
    );

    Assert.strictEqual(
      getExpectedToBeSingleDOM_Element({
        selector: ".Button",
        context: sample
      }) instanceof Element, true
    );
  });

  it("targetDOM_ElementSubtype option checking", (): void => {

    const sample: Element = createDOM_ElementFromHTML_Code(
      "<div class='ActionBar'><button type='button' class='Button'></button></div>"
    );

    Assert.strictEqual(
      getExpectedToBeSingleDOM_Element({
        selector: ".Button",
        context: sample,
        expectedDOM_ElementSubtype: HTMLButtonElement
      }) instanceof HTMLButtonElement, true
    );
  });


  describe("Errored scenarios", (): void => {

    it("No such element", (): void => {

      const sample: Element = createDOM_ElementFromHTML_Code(
        "<div class='ActionBar'><button type='button' class='Button'></button></div>"
      );

      Assert.throws(
        (): void => {
          getExpectedToBeSingleDOM_Element({
            selector: ".InputField",
            context: sample
          });
        },
        {
          name: DOM_ElementRetrievingFailedError.NAME
        }
      );
    });

    it("Expected and actual elements' subtypes mismatch", (): void => {

      const sample: Element = createDOM_ElementFromHTML_Code(
          "<div class='ActionBar'><button type='button' class='Button'></button></div>"
      );

      Assert.throws(
        (): void => {
          getExpectedToBeSingleDOM_Element({
            selector: ".Button",
            context: sample,
            expectedDOM_ElementSubtype: HTMLInputElement
          });
        },
        {
          name: UnexpectedEventError.NAME
        }
      );
    });
  });

});
