import getExpectedToBeSingleDOM_Element from "../../Source/DOM/getExpectedToBeSingleDOM_Element";
import createDOM_ElementFromHTML_Code from "../../Source/DOM/createDOM_ElementFromHTML_Code";

import { strictEqual, throws } from "assert";
import provideMockBrowserEnvironment from "jsdom-global";

import { DOM_ElementRetrievingFailedError, UnexpectedEventError } from "@yamato-daiwa/es-extensions";


describe("getExpectedToBeSingleDOM_Element", (): void => {

  provideMockBrowserEnvironment();

  it("Simplest example", (): void => {

    const sample: Element = createDOM_ElementFromHTML_Code(
        "<div class='Container'><button type='button' class='Button'></button></div>"
    );

    strictEqual(
      getExpectedToBeSingleDOM_Element({
        selector: ".Button",
        context: sample
      }) instanceof Element, true
    );
  });

  it("targetDOM_ElementSubtype option checking", (): void => {

    const sample: Element = createDOM_ElementFromHTML_Code(
      "<div class='Container'><button type='button' class='Button'></button></div>"
    );

    strictEqual(
      getExpectedToBeSingleDOM_Element({
        selector: ".Button",
        context: sample,
        targetDOM_ElementSubtype: HTMLButtonElement
      }) instanceof HTMLButtonElement, true
    );
  });


  describe("Errored scenarios", (): void => {

    it("No such element", (): void => {

      const sample: Element = createDOM_ElementFromHTML_Code(
        "<div class='Container'><button type='button' class='Button'></button></div>"
      );

      throws(
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

    it("Multiple elements found", (): void => {

      const sample: Element = createDOM_ElementFromHTML_Code(
        `
          <div class='Container'>
            <button type='button' class='Button'></button>
            <button type='button' class='Button'></button>
          </div>`
      );

      throws(
        (): void => {
          getExpectedToBeSingleDOM_Element({
            selector: ".InputField",
            context: sample
          });
        },
        {
          name: UnexpectedEventError.NAME
        }
      );
    });

    it("Expected and actual elements' subtypes mismatch", (): void => {

      const sample: Element = createDOM_ElementFromHTML_Code(
          "<div class='Container'><button type='button' class='Button'></button></div>"
      );

      throws(
        (): void => {
          getExpectedToBeSingleDOM_Element({
            selector: ".Button",
            context: sample,
            targetDOM_ElementSubtype: HTMLInputElement
          });
        },
        {
          name: DOM_ElementRetrievingFailedError.NAME
        }
      );
    });
  });
});
