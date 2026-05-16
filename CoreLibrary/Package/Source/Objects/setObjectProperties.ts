import splitString from "../Strings/splitString";
import isNonNullObject from "../TypeGuards/Objects/isNonNullObject";
import isUndefined from "../TypeGuards/EmptyTypes/isUndefined";
import isStringifiedNonNegativeIntegerOfRegularNotation from "../Numbers/isStringifiedNonNegativeIntegerOfRegularNotation";


export default function setObjectProperties<TargetObject extends object>(
  targetObject: TargetObject,
  order:
      Readonly<{
        [dotSeparatedFullyQualifiedName: string]:
            Readonly<PropertyDescriptor & { mustCreateParentsObjectsIfNotPresent?: boolean; }>;
      }>
): void {

  for (const [ fullyQualifiedName, propertyDescriptor ] of Object.entries(order)) {

    const targetPropertyPathSegments: Array<string> = splitString(fullyQualifiedName, ".");

    let objectOfCurrentDepthLevel: object = targetObject;

    for (
      let depthLevel__numerationFrom1: number = 1;
      depthLevel__numerationFrom1 <= targetPropertyPathSegments.length;
      depthLevel__numerationFrom1++
    ) {

      const isLastDepthLevel: boolean = depthLevel__numerationFrom1 === targetPropertyPathSegments.length;
      const propertyKeyForCurrentDepthLevel: string = targetPropertyPathSegments[depthLevel__numerationFrom1 - 1];

      let valueOfNextDepthLevel: unknown =
          Reflect.get(
            objectOfCurrentDepthLevel,
            propertyKeyForCurrentDepthLevel
          );

      if (isLastDepthLevel) {

        /* eslint-disable-next-line max-depth --
         * In this case the extracting only this part to another function hardly will make the code more maintainable. */
        if (isNonNullObject(objectOfCurrentDepthLevel)) {

          Object.defineProperty(
            objectOfCurrentDepthLevel,
            propertyKeyForCurrentDepthLevel,
            {
              value: propertyDescriptor.value,
              enumerable: propertyDescriptor.enumerable ?? true,
              configurable: propertyDescriptor.configurable ?? true,
              writable: propertyDescriptor.writable ?? true
            }
          );

        } else {

          return;

        }

      } else if (isNonNullObject(valueOfNextDepthLevel)) {

        objectOfCurrentDepthLevel = valueOfNextDepthLevel;

      } else if (isUndefined(valueOfNextDepthLevel) && propertyDescriptor.mustCreateParentsObjectsIfNotPresent === true) {

        const propertyKeyForNextDepthLevel: string = targetPropertyPathSegments[depthLevel__numerationFrom1];
        valueOfNextDepthLevel = isStringifiedNonNegativeIntegerOfRegularNotation(propertyKeyForNextDepthLevel) ? [] : {};

        Object.defineProperty(
          objectOfCurrentDepthLevel,
          propertyKeyForCurrentDepthLevel,
          {
            value: valueOfNextDepthLevel,
            enumerable: true,
            configurable: true,
            writable: true
          }
        );

        /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
         * The empty object has been assigned in this scope. */
        objectOfCurrentDepthLevel = valueOfNextDepthLevel as object;

      } else {

        return;

      }

    }

  }

}
