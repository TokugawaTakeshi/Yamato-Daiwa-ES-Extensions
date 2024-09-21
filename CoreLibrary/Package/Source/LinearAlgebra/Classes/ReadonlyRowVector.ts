import isNaturalNumber from "../../TypeGuards/Numbers/isNaturalNumber";
import Logger from "../../Logging/Logger";
import InvalidParameterValueError from "../../Errors/InvalidParameterValue/InvalidParameterValueError";
import isNumber from "../../TypeGuards/Numbers/isNumber";


export default class ReadonlyRowVector<ElementType> extends Array<ElementType> implements ReadonlyArray<ElementType> {

  public static fromArray<ElementType>(array: ReadonlyArray<ElementType>): ReadonlyRowVector<ElementType> {
    return new ReadonlyRowVector(...array);
  }


  public constructor(...elements: ReadonlyArray<ElementType>) {
    super(...elements);
  }


  public getElementAt__numerationFrom1(targetElementNumber__numerationFrom1: number): ElementType {

    if (!isNaturalNumber(targetElementNumber__numerationFrom1)) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterNumber: 1,
          parameterName: "targetElementNumber__numerationFrom1",
          messageSpecificPart: [
            "Target element number must be the natural number ",
            ...isNumber(targetElementNumber__numerationFrom1) ?
                `while has value ${ targetElementNumber__numerationFrom1 } which is not the natural number.` :
                `while has type "${ typeof targetElementNumber__numerationFrom1 }".`
          ].join(" ")

        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "RowVector.getElementAt__numerationFrom1(targetElementNumber__numerationFrom1)"
      });
    }


    if (targetElementNumber__numerationFrom1 > this.length) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterNumber: 1,
          parameterName: "targetElementNumber__numerationFrom1",
          messageSpecificPart:
              `Element number ${ targetElementNumber__numerationFrom1 } (numeration from 1) requested while target ` +
                `RowVector has ${ this.length } elements.`

        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "RowVector.getElementAt__numerationFrom1(targetElementNumber__numerationFrom1)"
      });
    }

    return this[targetElementNumber__numerationFrom1 - 1];

  }

}
