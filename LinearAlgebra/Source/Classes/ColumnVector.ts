import type ReadonlyColumnVector from "./ReadonlyColumnVector";
import {
  isNaturalNumber,
  isNumber,
  InvalidParameterValueError,
  Logger
} from "@yamato-daiwa/es-extensions";


export default class ColumnVector<ElementType> extends Array<ElementType> implements ReadonlyColumnVector<ElementType> {

  public constructor(elements: ReadonlyArray<ElementType>) {

    /* [ Theory ] `super(...elements)` can cause error when `elements` has only one non-integer element. */
    super();

    this.push(...elements);

  }


  public getElementAt__numerationFrom1(targetElementNumber__numerationFrom1: number): ElementType {

    if (!isNaturalNumber(targetElementNumber__numerationFrom1)) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterNumber: 1,
          parameterName: "targetElementNumber__numerationFrom1",
          messageSpecificPart: [
            "Target element number must be the natural number ",
            isNumber(targetElementNumber__numerationFrom1) ?
                `while has value ${ targetElementNumber__numerationFrom1 } which is not the natural number.` :
                `while has type "${ typeof targetElementNumber__numerationFrom1 }".`
          ].join(" ")

        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "ColumnVector.getElementAt__numerationFrom1(targetElementNumber__numerationFrom1)"
      });
    }


    if (targetElementNumber__numerationFrom1 > this.length) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterNumber: 1,
          parameterName: "targetElementNumber__numerationFrom1",
          messageSpecificPart:
              `Element number ${ targetElementNumber__numerationFrom1 } (numeration from 1) requested while target ` +
                `ColumnVector has ${ this.length } elements.`

        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "ColumnVector.getElementAt__numerationFrom1(targetElementNumber__numerationFrom1)"
      });
    }

    return this[targetElementNumber__numerationFrom1 - 1];

  }

}
