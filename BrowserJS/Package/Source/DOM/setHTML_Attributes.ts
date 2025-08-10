import { isNumber } from "@yamato-daiwa/es-extensions";


export default function setHTML_Attributes(
  targetElement: Element, attributes: Readonly<{ [attribute: string]: string | number; }>
): void {

  for (const [ attributeKey, attributeValue ] of Object.entries(attributes)) {
    targetElement.setAttribute(
      attributeKey,
      isNumber(attributeValue, { mustConsiderNaN_AsNumber: true }) ? attributeValue.toString() : attributeValue
    );
  }

}
