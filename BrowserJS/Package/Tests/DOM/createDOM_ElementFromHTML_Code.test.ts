import createDOM_ElementFromHTML_Code from "../../Source/DOM/createDOM_ElementFromHTML_Code";

import { strictEqual, throws } from "assert";
import provideMockBrowserEnvironment from "jsdom-global";

import {
  InvalidParameterValueError,
  ImproperUsageError,
  UnexpectedEventError
} from "@yamato-daiwa/es-extensions";


describe("createDOM_ElementFromHTML_Code", (): void => {

  provideMockBrowserEnvironment();

  it("Simplest example", (): void => {
    strictEqual(createDOM_ElementFromHTML_Code("<div></div>") instanceof Element, true);
  });

  it("Single quotations support check", (): void => {
    strictEqual(createDOM_ElementFromHTML_Code("<div class='TestClass'></div>").className, "TestClass");
  });

  it("rootDOM_ElementSubtype option checking", (): void => {
    strictEqual(createDOM_ElementFromHTML_Code({
      HTML_Code: "<div></div>",
      rootDOM_ElementSubtype: HTMLDivElement
    }) instanceof HTMLDivElement, true);
  });


  describe("Errored scenarios", (): void => {

    it("No elements", (): void => {
      throws(
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
    });

    it("Multiple root elements", (): void => {
      throws(
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
    });

    it("Expected and actual elements' subtypes mismatch", (): void => {
      throws(
        (): void => {
          createDOM_ElementFromHTML_Code({
            HTML_Code: "<div></div>",
            rootDOM_ElementSubtype: HTMLInputElement
          });
        },
        {
          name: UnexpectedEventError.NAME
        }
      );
    });
  });
});
