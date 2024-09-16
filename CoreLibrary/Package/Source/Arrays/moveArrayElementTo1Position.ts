import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";


export default function moveArrayElementTo1Position<ArrayElement>(
  compoundParameter:
      (
        {
          mutably: true;
          targetArray: Array<ArrayElement>;
        } |
        {
          mutably: false;
          targetArray: ReadonlyArray<ArrayElement>;
        }
      ) &
      (
        { targetElementNumber__numerationFrom0: number; } |
        { targetElementNumber__numerationFrom1: number; }
      ) &
      {
        toLeft: boolean;
        errorMustBeThrownIf: Readonly<{
          elementsCountIsLessThan2: boolean;
          targetElementNumberIsOutOfRange: boolean;
        }>;
      }
): Array<ArrayElement> {

  if (compoundParameter.targetArray.length < 2) {

    if (compoundParameter.errorMustBeThrownIf.elementsCountIsLessThan2) {

      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterNumber: 1,
          parameterName: "compoundParameter",
          messageSpecificPart:
              "Target array must contain at least 2 elements while actually contains " +
                  `${ compoundParameter.targetArray.length }. ` +
              "This situation is being considered as an error when \"errorMustBeThrownIf.elementsCountIsLessThan2\" " +
                "flag has been set to \"true\"."
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "moveArrayElementTo1Position(compoundParameter)"
      });

    }


    /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
    * When `mutably` option is falsy, it is being assumed that array is immutable only for this function but
    *   once value returned it must be a mutable array. */
    return compoundParameter.targetArray as Array<ArrayElement>;

  }


  const workpiece: Array<ArrayElement> = compoundParameter.mutably ?
      compoundParameter.targetArray : [ ...compoundParameter.targetArray ];

  const targetElementNumber__numerationFrom0: number =
      "targetElementNumber__numerationFrom0" in compoundParameter ?
          compoundParameter.targetElementNumber__numerationFrom0 :
          compoundParameter.targetElementNumber__numerationFrom1 - 1;

  if (targetElementNumber__numerationFrom0 < 0 || targetElementNumber__numerationFrom0 > workpiece.length) {

    if (compoundParameter.errorMustBeThrownIf.targetElementNumberIsOutOfRange) {

      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterNumber: 1,
          parameterName: "compoundParameter",
          messageSpecificPart:
              "Target element number is out of range. " +
              "This situation is being considered as an error when " +
                  "\"errorMustBeThrownIf.targetElementNumberIsOutOfRange\" flag has been set to \"true\"."
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "moveArrayElementTo1Position(compoundParameter)"
      });

    }

    return workpiece;

  }


  if (targetElementNumber__numerationFrom0 === 0 && compoundParameter.toLeft) {

    const firstElement: ArrayElement = workpiece[0];

    workpiece.shift();
    workpiece.push(firstElement);

    return workpiece;

  } else if (targetElementNumber__numerationFrom0 === workpiece.length - 1 && !compoundParameter.toLeft) {

    const indexOfLastElement: number = workpiece.length - 1;
    const lastElement: ArrayElement = workpiece[indexOfLastElement];

    workpiece.pop();
    workpiece.unshift(lastElement);

    return workpiece;

  }


  const indexOfElementWhichWillBeOusted: number = compoundParameter.toLeft ?
      targetElementNumber__numerationFrom0 - 1 : targetElementNumber__numerationFrom0 + 1;
  const elementWhichWillBeOusted: ArrayElement = workpiece[indexOfElementWhichWillBeOusted];

  workpiece[indexOfElementWhichWillBeOusted] = workpiece[targetElementNumber__numerationFrom0];
  workpiece[targetElementNumber__numerationFrom0] = elementWhichWillBeOusted;

  return workpiece;

}
