import RowVector from "./RowVector";
import ColumnVector from "./ColumnVector";
import Logger from "../../Logging/Logger";
import InvalidParameterValueError from "../../Errors/InvalidParameterValue/InvalidParameterValueError";


export default class Matrix<Element> {

  public readonly rowsCount: number;
  public readonly columnsCount: number;


  protected readonly rows: Array<Array<Element>>;


  public static createEmptyOne<Element>(
    { rowsCount, columnsCount }: Readonly<{ rowsCount: number; columnsCount: number; }>
  ): Matrix<Element> {
    return new Matrix(
      Array.from(Array(rowsCount).keys()).map(
        (): Array<Element> => new Array(columnsCount)
      )
    );
  }

  public constructor(rowsDefinition: Array<Array<Element>>) {

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

      console.log("CHECKPOINT1");

      for (let rowIndex: number = 1; rowIndex < rowsCount; rowIndex++) {

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
  ): Element {

    const targetRowIndex: number = "rowIndex" in elementCoordinates ?
        elementCoordinates.rowIndex : elementCoordinates.rowNumber__numerationFrom1 - 1;

    if (targetRowIndex > this.rowsCount - 1) {
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


    const targetRow: Array<Element> = this.rows[targetRowIndex];

    const targetColumnIndex: number = "columnIndex" in elementCoordinates ?
        elementCoordinates.columnIndex : elementCoordinates.columnNumber__numerationFrom1 - 1;

    if (targetColumnIndex > this.columnsCount - 1) {
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

    return targetRow[targetColumnIndex];

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
      { value: Element; }
    >
  ): this {

    const targetRowIndex: number = "rowIndex" in elementCoordinates ?
        elementCoordinates.rowIndex : elementCoordinates.rowNumber__numerationFrom1 - 1;

    if (targetRowIndex > this.rowsCount - 1) {
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


    const targetRow: Array<Element> | undefined = this.rows[targetRowIndex];

    const targetColumnIndex: number = "columnIndex" in elementCoordinates ?
        elementCoordinates.columnIndex : elementCoordinates.columnNumber__numerationFrom1 - 1;

    if (targetColumnIndex > this.columnsCount - 1) {
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

  public getRow(
    coordinate: Readonly<{ index: number; } | { number__numerationFrom1: number; }>
  ): RowVector<Element> {
    const targetRowIndex: number = "index" in coordinate ? coordinate.index : coordinate.number__numerationFrom1;
    return RowVector.fromArray(this.rows[targetRowIndex]);
  }

  public getColumn(
    coordinate: Readonly<{ index: number; } | { number__numerationFrom1: number; }>
  ): ColumnVector<Element> {
    const targetColumnIndex: number = "index" in coordinate ? coordinate.index : coordinate.number__numerationFrom1;
    return ColumnVector.fromArray(
      /* eslint-disable-next-line id-length -- Nothing specific required for name of iterated variable in this case. */
      this.rows.map((row: Array<Element>): Element => row[targetColumnIndex])
    );
  }

  public to2DimensionalArray(): Array<Array<Element>> {
    /* eslint-disable-next-line id-length -- Nothing specific required for name of iterated variable in this case. */
    return [ ...this.rows.map((row: Array<Element>): Array<Element> => [ ...row ]) ];
  }

}
