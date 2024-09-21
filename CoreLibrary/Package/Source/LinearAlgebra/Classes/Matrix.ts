import isUndefined from "../../TypeGuards/Nullables/isUndefined";
import Logger from "../../Logging/Logger";
import InvalidParameterValueError from "../../Errors/InvalidParameterValue/InvalidParameterValueError";


export default class Matrix {

  public readonly rowsCount: number;
  public readonly columnsCount: number;


  protected readonly rows: Array<Array<number>>;


  public static createEmptyOne(
    { rowsCount, columnsCount }: Readonly<{ rowsCount: number; columnsCount: number; }>
  ): Matrix {

    const rowsDefinition: Array<Array<number>> = new Array(rowsCount);

    for (let rowIndex: number = 0; rowIndex <= columnsCount; rowIndex++) {
      rowsDefinition[rowIndex] = new Array(columnsCount);
    }

    return new Matrix(rowsDefinition);

  }

  public constructor(rowsDefinition: Array<Array<number>>) {

    if (rowsDefinition.length === 0) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterNumber: 1,
          parameterName: "rowsDefinitions",
          messageSpecificPart: "At least one row must be defined while passed array is empty."
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "Matrix.constructor(rowsDefinition)"
      });
    }


    const rowsCount: number = rowsDefinition.length;
    const elementsCountInFirstRow: number = rowsDefinition[0].length;

    if (rowsCount > 1) {

      for (let rowIndex: number = 1; rowIndex <= rowsCount; rowIndex++) {

        const elementsCountInCurrentRow: number = rowsDefinition[rowIndex].length;

        if (elementsCountInCurrentRow !== elementsCountInFirstRow) {

          Logger.throwErrorAndLog({
            errorInstance: new InvalidParameterValueError({
              parameterNumber: 1,
              parameterName: "rowsDefinitions",
              messageSpecificPart:
                  `If first row has ${ elementsCountInFirstRow } elements, all rows must have ` +
                    `${ elementsCountInFirstRow } elements, while row with index ${ rowIndex } has ` +
                    `${ elementsCountInCurrentRow } elements.`
            }),
            title: InvalidParameterValueError.localization.defaultTitle,
            occurrenceLocation: "Matrix.constructor(rowsDefinition)"
          });

        }

      }

    }


    this.rowsCount = rowsCount;
    this.columnsCount = elementsCountInFirstRow;

    this.rows = rowsDefinition;

  }


  public getElement(
    elementCoordinates: Readonly<
      (
        { rowIndex: number; } |
        { rowNumber__numerationFrom1: number; }
      ) &
      (
        { columnIndex: number; } |
        { columnNumber__numerationFrom1: number; }
      )
    >
  ): number {

    const targetRowIndex: number = "rowIndex" in elementCoordinates ?
        elementCoordinates.rowIndex : elementCoordinates.rowNumber__numerationFrom1 - 1;

    const targetRow: Array<number> | undefined = this.rows[targetRowIndex];

    if (isUndefined(targetRow)) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterNumber: 1,
          parameterName: "elementCoordinates",
          messageSpecificPart:
              `The element of row number ${ targetRowIndex + 1 } requested while target matrix has ` +
                `${ this.rowsCount } rows.`
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "matrix.getElement(elementCoordinates)"
      });
    }


    const targetColumnIndex: number = "columnIndex" in elementCoordinates ?
        elementCoordinates.columnIndex : elementCoordinates.columnNumber__numerationFrom1 - 1;

    const targetElement: number | undefined = targetRow[targetColumnIndex];

    if (isUndefined(targetRow)) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterNumber: 1,
          parameterName: "elementCoordinates",
          messageSpecificPart:
              `The element of column number ${ targetColumnIndex + 1 } requested while target matrix has ` +
              `${ this.columnsCount } columns.`
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "matrix.getElement(elementCoordinates)"
      });
    }


    return targetElement;

  }

  public setElement(
    elementCoordinates: Readonly<
      (
        (
          { rowIndex: number; } |
          { rowNumber__numerationFrom1: number; }
        ) &
        (
          { columnIndex: number; } |
          { columnNumber__numerationFrom1: number; }
        )
      ) &
      { value: number; }
    >
  ): this {

    const targetRowIndex: number = "rowIndex" in elementCoordinates ?
        elementCoordinates.rowIndex : elementCoordinates.rowNumber__numerationFrom1 - 1;

    const targetRow: Array<number> | undefined = this.rows[targetRowIndex];

    if (isUndefined(targetRow)) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterNumber: 1,
          parameterName: "elementCoordinates",
          messageSpecificPart:
              `The element of row number ${ targetRowIndex + 1 } requested while target matrix has ` +
                `${ this.rowsCount } rows.`
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "matrix.setElement(elementCoordinates)"
      });
    }


    const targetColumnIndex: number = "columnIndex" in elementCoordinates ?
        elementCoordinates.columnIndex : elementCoordinates.columnNumber__numerationFrom1 - 1;

    if (isUndefined(targetRow[targetColumnIndex])) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterNumber: 1,
          parameterName: "elementCoordinates",
          messageSpecificPart:
              `The element of column number ${ targetColumnIndex + 1 } requested while target matrix has ` +
              `${ this.columnsCount } columns.`
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "matrix.setElement(elementCoordinates)"
      });
    }

    targetRow[targetColumnIndex] = elementCoordinates.value;

    return this;

  }

}
