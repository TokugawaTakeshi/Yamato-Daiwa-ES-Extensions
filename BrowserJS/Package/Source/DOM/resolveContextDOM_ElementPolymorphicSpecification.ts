import getExpectedToBeSingleDOM_Element from "./getExpectedToBeSingleDOM_Element";
import { isUndefined } from "@yamato-daiwa/es-extensions";


export default function resolveContextDOM_ElementPolymorphicSpecification(
  contextElement?: ParentNode | Readonly<{ selector: string; }>
): ParentNode | null {

  if (isUndefined(contextElement)) {
    return null;
  }


  if ("selector" in contextElement) {
    return getExpectedToBeSingleDOM_Element({ selector: contextElement.selector });
  }


  return contextElement;

}
