import {
  getExpectedToBeSingleChildOfTemplateElement,
  createDOM_ElementFromHTML_Code,
  getExpectedToBeSingleDOM_Element
} from "../../../Source";
import Testing from "node:test";
import Assert from "assert";
import { Logger } from "@yamato-daiwa/es-extensions";
import provideMockBrowserEnvironment from "jsdom-global";


/* [ Waring ] Currently, the tests does not work because of JSDOM issue.
*  https://github.com/jsdom/jsdom/issues/1769  */

provideMockBrowserEnvironment();


const sampleDOM: Element = createDOM_ElementFromHTML_Code(
  "<div><template id='CardTemplate'><li class='Card'></li></template></div>"
);

Promise.all([

  Testing.test(
    "Retrieving by pre-picked HTML element",
    (): void => {

      const templateElement: HTMLTemplateElement = getExpectedToBeSingleDOM_Element({
        selector: "#CardTemplate",
        contextElement: sampleDOM,
        expectedDOM_ElementSubtype: HTMLTemplateElement
      });

      Assert.strictEqual(
        getExpectedToBeSingleChildOfTemplateElement({ templateElement }).className,
        "Card"
      );

    }
  ),

  Testing.test(
    "Retrieving by selector",
    (): void => {

      Assert.strictEqual(
        getExpectedToBeSingleChildOfTemplateElement({
          templateElementSelector: "#CardTemplate",
          contextElement: sampleDOM
        }).className,
        "Card"
      );

    }
  )

]).catch(Logger.logPromiseError);
