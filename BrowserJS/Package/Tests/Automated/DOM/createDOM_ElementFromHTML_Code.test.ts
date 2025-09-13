import createDOM_ElementFromHTML_Code from "../../../Source/DOM/createDOM_ElementFromHTML_Code";

import Testing from "node:test";
import Assert from "assert";
import provideMockBrowserEnvironment from "jsdom-global";

import { InvalidParameterValueError, ImproperUsageError, Logger } from "@yamato-daiwa/es-extensions";


provideMockBrowserEnvironment();

Promise.all([

  Testing.test(
    "Simplest example",
    (): void => {
      Assert.strictEqual(createDOM_ElementFromHTML_Code("<div></div>") instanceof Element, true);
    }
  ),

  Testing.test(
    "Single quotations support check",
    (): void => {
      Assert.strictEqual(createDOM_ElementFromHTML_Code("<div class='TestClass'></div>").className, "TestClass");
    }
  ),

  Testing.test(
    "rootDOM_ElementSubtype option checking",
    (): void => {
      Assert.strictEqual(
        createDOM_ElementFromHTML_Code({
          HTML_Code: "<div></div>",
          rootDOM_ElementSubtype: HTMLDivElement
        }) instanceof HTMLDivElement,
        true
      );
    }
  ),

  Testing.suite(
    "Errored scenarios",
    async (): Promise<void> => {

      await Promise.all([

        Testing.test(
          "No elements",
          (): void => {
            Assert.throws(
              (): void => {
                createDOM_ElementFromHTML_Code({
                  HTML_Code: "",
                  rootDOM_ElementSubtype: HTMLUListElement
                });
              },
              {
                name: InvalidParameterValueError.NAME
              }
            );
          }
        ),

        Testing.test(
          "Multiple root elements",
          (): void => {
            Assert.throws(
              (): void => {
                createDOM_ElementFromHTML_Code({
                  HTML_Code: "<ul><li></li></ul><p></p>",
                  rootDOM_ElementSubtype: HTMLUListElement
                });
              },
              {
                name: ImproperUsageError.NAME
              }
            );
          }
        ),

        Testing.test(
          "Expected and actual elements' subtypes mismatch",
          (): void => {
            Assert.throws(
              (): void => {
                createDOM_ElementFromHTML_Code({
                  HTML_Code: "<div></div>",
                  rootDOM_ElementSubtype: HTMLInputElement
                });
              },
              {
                name: InvalidParameterValueError.NAME
              }
            );
          }
        )

      ]);

    }
  )

]).catch(Logger.logPromiseError);
