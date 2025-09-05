import getExpectedToBeSingleDOM_Element from "../../../Source/DOM/getExpectedToBeSingleDOM_Element";
import createDOM_ElementFromHTML_Code from "../../../Source/DOM/createDOM_ElementFromHTML_Code";

import Testing from "node:test";
import Assert from "assert";
import provideMockBrowserEnvironment from "jsdom-global";

import { DOM_ElementRetrievingFailedError, Logger, UnexpectedEventError } from "@yamato-daiwa/es-extensions";


provideMockBrowserEnvironment();

Promise.all([

  Testing.test(
    "Simplest example",
    (): void => {

      const sample: Element = createDOM_ElementFromHTML_Code(
        "<div class='ActionBar'><button type='button' class='Button'></button></div>"
      );

      Assert.strictEqual(
        getExpectedToBeSingleDOM_Element({
          selector: ".Button",
          contextElement: sample
        }) instanceof Element, true
      );

    }
  ),

  Testing.test(
    "targetDOM_ElementSubtype option checking",
    (): void => {

      const sample: Element = createDOM_ElementFromHTML_Code(
        "<div class='ActionBar'><button type='button' class='Button'></button></div>"
      );

      Assert.strictEqual(
        getExpectedToBeSingleDOM_Element({
          selector: ".Button",
          contextElement: sample,
          expectedDOM_ElementSubtype: HTMLButtonElement
        }) instanceof HTMLButtonElement,
        true
      );

    }
  ),

  Testing.suite(
    "Errored scenarios",
    async (): Promise<void> => {

      await Promise.all([

        Testing.test(
        "No such element",
          (): void => {

            const sample: Element = createDOM_ElementFromHTML_Code(
              "<div class='ActionBar'><button type='button' class='Button'></button></div>"
            );

            Assert.throws(
              (): void => {
                getExpectedToBeSingleDOM_Element({
                  selector: ".InputField",
                  contextElement: sample
                });
              },
              {
                name: DOM_ElementRetrievingFailedError.NAME
              }
            );
          }
        ),

        Testing.test(
          "Expected and actual elements' subtypes mismatch",
          (): void => {

            const sample: Element = createDOM_ElementFromHTML_Code(
              "<div class='ActionBar'><button type='button' class='Button'></button></div>"
            );

            Assert.throws(
              (): void => {
                getExpectedToBeSingleDOM_Element({
                  selector: ".Button",
                  contextElement: sample,
                  expectedDOM_ElementSubtype: HTMLInputElement
                });
              },
              {
                name: UnexpectedEventError.NAME
              }
            );

          }
        )

      ]);

    }
  )

]).catch(Logger.logPromiseError);
