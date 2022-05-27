import MonthsNames from "../ConstantsAndEnumerations/MonthsNames";
import isNotUndefined from "../TypeGuards/Nullables/isNotUndefined";
import getDaysCountInSpecificMonth from "./getDaysCountInSpecificMonth";
import getMonthNameByNumber from "./getMonthNameByNumber";
import getYearOfPreviousMonth from "./getYearOfPreviousMonth";
import getYearOfNextMonth from "./getYearOfNextMonth";
import getPreviousMonthNumber from "./getPreviousMonthNumber";
import getNextMonthNumber from "./getNextMonthNumber";


class CalendarBuilder {

  private static readonly CELLS_IN_MATRIX: number = 42;

  private readonly dataFor42DaysMatrix: Array<CalendarBuilder.CalendarCellData> = [];

  private readonly targetYear: number;
  private readonly yearOfPreviousMonth: number;
  private readonly yearOfNextMonth: number;

  private readonly targetMonthNumber__numerationFrom0: number;
  private readonly previousMonthNumber__numerationFrom0: number;
  private readonly nextMonthNumber__numerationFrom0: number;

  private readonly numberOfFirstDayOfTargetMonthInWeek__numerationFrom0AsSunday: number;
  private readonly daysInTargetMonth: number;
  private readonly daysInPreviousMonth: number;
  private readonly cellNumberOfLastDayInTargetMonth__numerationFrom0: number;


  public static generateDataFor42DaysMatrix(
    parametersObject: CalendarBuilder.ParametersObject
  ): Array<CalendarBuilder.CalendarCellData> {
    return new CalendarBuilder(parametersObject).
        fillMatrixByDaysOfTargetMonth().
        fillMatrixByDaysOfPreviousMonth().
        fillMatrixDyDaysOfNextMonth().
        dataFor42DaysMatrix;
  }


  private constructor(parametersObject: CalendarBuilder.ParametersObject) {

    this.targetYear = parametersObject.targetYear;
    this.targetMonthNumber__numerationFrom0 = "targetMonthNumber__numerationFrom0" in parametersObject ?
        parametersObject.targetMonthNumber__numerationFrom0 : parametersObject.targetMonthNumber__numerationFrom1 - 1;

    this.yearOfPreviousMonth = getYearOfPreviousMonth({
      referenceYear: this.targetYear, referenceMonthNumber__numerationFrom0: this.targetMonthNumber__numerationFrom0
    });
    this.yearOfNextMonth = getYearOfNextMonth({
      referenceYear: this.targetYear, referenceMonthNumber__numerationFrom0: this.targetMonthNumber__numerationFrom0
    });

    this.previousMonthNumber__numerationFrom0 = getPreviousMonthNumber({
      referenceYear: this.targetYear,
      referenceMonthNumber__numerationFrom0: this.targetMonthNumber__numerationFrom0,
      firstMonthNumberInRelationToReturnableValue: 0
    });
    this.nextMonthNumber__numerationFrom0 = getNextMonthNumber({
      referenceYear: this.targetYear,
      referenceMonthNumber__numerationFrom0: this.targetMonthNumber__numerationFrom0,
      firstMonthNumberInRelationToReturnableValue: 0
    });

    this.numberOfFirstDayOfTargetMonthInWeek__numerationFrom0AsSunday = new Date(
      this.targetYear, this.targetMonthNumber__numerationFrom0
    ).getDay();

    this.daysInTargetMonth = getDaysCountInSpecificMonth({
      year: this.targetYear, monthNumber__numerationFrom0: this.targetMonthNumber__numerationFrom0
    });

    this.daysInPreviousMonth = getDaysCountInSpecificMonth({
      year: this.yearOfPreviousMonth,
      monthNumber__numerationFrom0: getPreviousMonthNumber({
        referenceYear: this.targetYear,
        referenceMonthNumber__numerationFrom0: this.targetMonthNumber__numerationFrom0,
        firstMonthNumberInRelationToReturnableValue: 0
      })
    });

    this.cellNumberOfLastDayInTargetMonth__numerationFrom0 = this.numberOfFirstDayOfTargetMonthInWeek__numerationFrom0AsSunday +
        this.daysInTargetMonth - 1;
  }

  private fillMatrixByDaysOfTargetMonth(): CalendarBuilder {

    let dayForCurrentCell: number = 1;
    const cachedMonthName: MonthsNames = getMonthNameByNumber({
      targetMonthNumber: this.targetMonthNumber__numerationFrom0, numerationFrom: 0
    });

    for (
      let cellNumber__numerationFrom0AsSunday: number = this.numberOfFirstDayOfTargetMonthInWeek__numerationFrom0AsSunday;
      cellNumber__numerationFrom0AsSunday <= this.cellNumberOfLastDayInTargetMonth__numerationFrom0;
      cellNumber__numerationFrom0AsSunday++
    ) {

      this.dataFor42DaysMatrix[cellNumber__numerationFrom0AsSunday] = {
        year: this.targetYear,
        month__numerationFrom0: this.targetMonthNumber__numerationFrom0,
        month__numerationFrom1: this.targetMonthNumber__numerationFrom0 + 1,
        monthName: cachedMonthName,
        dayOfMonth: dayForCurrentCell
      };

      dayForCurrentCell = dayForCurrentCell + 1;
    }

    return this;
  }

  private fillMatrixByDaysOfPreviousMonth(): CalendarBuilder {

    if (this.numberOfFirstDayOfTargetMonthInWeek__numerationFrom0AsSunday === 0) {
      return this;
    }


    let dayForCurrentCell: number = this.daysInPreviousMonth;

    for (
      let cellNumber__numerationFrom0AsSunday: number = this.numberOfFirstDayOfTargetMonthInWeek__numerationFrom0AsSunday - 1;
      cellNumber__numerationFrom0AsSunday >= 0;
      cellNumber__numerationFrom0AsSunday--
    ) {

      this.dataFor42DaysMatrix[cellNumber__numerationFrom0AsSunday] = {
        year: this.yearOfPreviousMonth,
        month__numerationFrom0: this.previousMonthNumber__numerationFrom0,
        get month__numerationFrom1(): number { return this.month__numerationFrom0 + 1; },
        get monthName(): MonthsNames {
          return getMonthNameByNumber({
            targetMonthNumber: this.month__numerationFrom0, numerationFrom: 0
          });
        },
        dayOfMonth: dayForCurrentCell
      };
      dayForCurrentCell = dayForCurrentCell - 1;
    }

    return this;
  }

  private fillMatrixDyDaysOfNextMonth(): CalendarBuilder {

    if (isNotUndefined(this.dataFor42DaysMatrix[CalendarBuilder.CELLS_IN_MATRIX - 1])) {
      return this;
    }


    let dayForCurrentCell: number = 1;

    for (
      let cellNumber__numerationFrom0AsSunday: number = this.cellNumberOfLastDayInTargetMonth__numerationFrom0 + 1;
      cellNumber__numerationFrom0AsSunday <= CalendarBuilder.CELLS_IN_MATRIX - 1;
      cellNumber__numerationFrom0AsSunday++
    ) {

      this.dataFor42DaysMatrix[cellNumber__numerationFrom0AsSunday] = {
        year: this.yearOfNextMonth,
        month__numerationFrom0: this.nextMonthNumber__numerationFrom0,
        get month__numerationFrom1(): number { return this.month__numerationFrom0 + 1; },
        get monthName(): MonthsNames {
          return getMonthNameByNumber({
            targetMonthNumber: this.month__numerationFrom0, numerationFrom: 0
          });
        },
        dayOfMonth: dayForCurrentCell
      };
      dayForCurrentCell = dayForCurrentCell + 1;
    }

    return this;
  }
}


namespace CalendarBuilder {

  export type CalendarCellData = {
    readonly year: number;
    readonly month__numerationFrom0: number;
    readonly month__numerationFrom1: number;
    readonly monthName: MonthsNames;
    readonly dayOfMonth: number;
  };

  export type ParametersObject = {
    targetYear: number;
  } & (
    { targetMonthNumber__numerationFrom0: number; } |
    { targetMonthNumber__numerationFrom1: number; }
  );
}


export default CalendarBuilder;
