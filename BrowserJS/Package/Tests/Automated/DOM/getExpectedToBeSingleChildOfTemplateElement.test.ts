import {
  getExpectedToBeSingleChildOfTemplateElement,
  createDOM_ElementFromHTML_Code,
  getExpectedToBeSingleDOM_Element
} from "../../../Source";
import Assert from "assert";
import provideMockBrowserEnvironment from "jsdom-global";


/* [ Waring ] Currently, the tests does not work because of JSDOM issue.
*  https://github.com/jsdom/jsdom/issues/1769  */
describe("getExpectedToBeSingleChildOfTemplateElement", (): void => {

  provideMockBrowserEnvironment();

  const sampleDOM: Element = createDOM_ElementFromHTML_Code(
    "<div><template id='CardTemplate'><li class='Card'></li></template></div>"
  );

  describe("Simplest usage", (): void => {

    it("Retrieving by pre-picked HTML element", (): void => {

      const templateElement: HTMLTemplateElement = getExpectedToBeSingleDOM_Element({
        selector: "#CardTemplate",
        contextElement: sampleDOM,
        expectedDOM_ElementSubtype: HTMLTemplateElement
      });

      Assert.strictEqual(
        getExpectedToBeSingleChildOfTemplateElement({ templateElement }).className,
        "Card"
      );

    });

    it("Retrieving by selector", (): void => {

      Assert.strictEqual(
        getExpectedToBeSingleChildOfTemplateElement({
          templateElementSelector: "#CardTemplate",
          contextElement: sampleDOM
        }).className,
        "Card"
      );

    });

  });

});
