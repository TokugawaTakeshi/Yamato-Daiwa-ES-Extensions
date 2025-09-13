import ColumnVector from "../Classes/ColumnVector";
import {InvalidParameterValueError, Logger} from "@yamato-daiwa/es-extensions";

export default function createColumnVectorFrom2DimensionalArray<ElementType>(
  target2DimensionalArray: ReadonlyArray<ReadonlyArray<ElementType>>
): ColumnVector<ElementType> {

  if (target2DimensionalArray.length === 0) {
    return new ColumnVector([]);
  }


  const elementsOfColumnVector: Array<ElementType> = [];

  for (const [ index, nestedArray ] of target2DimensionalArray.entries()) {

    if (nestedArray.length !== 1) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterNumber: 1,
          parameterName: "target2DimensionalArray",
          messageSpecificPart:
              "Each nested array of target one must have exactly one element while the nested array number " +
                `${ index + 1 } has ${ nestedArray.length } ones.`
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "createColumnVectorFrom2DimensionalArray(target2DimensionalArray)",
      });
    }

    elementsOfColumnVector.push(nestedArray[0]);

  }

  return new ColumnVector(elementsOfColumnVector);

}
