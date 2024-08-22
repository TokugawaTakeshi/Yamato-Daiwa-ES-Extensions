import { DAYS_COUNT_IN_WEEK, DaysOfWeekNames, type MonthsNames } from "fundamental-constants";

import getDaysCountInSpecificMonth from "./getDaysCountInSpecificMonth";
import getYearOfPreviousMonth from "./getYearOfPreviousMonth";
import getYearOfNextMonth from "./getYearOfNextMonth";
import getPreviousMonthNumber from "./getPreviousMonthNumber";
import getNextMonthNumber from "./getNextMonthNumber";
import getMonthNameByNumber from "./getMonthNameByNumber";
import getMonthNumberByName from "./getMonthNumberByName";

import twoDimensionalizeArray from "../Arrays/twoDimensionalizeArray";
import getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne from
    "../Arrays/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne";

import isNotUndefined from "../TypeGuards/Nullables/isNotUndefined";


class CalendarBuilder {

  private static readonly CELLS_COUNT_IN_MATRIX: number = 42;

  private readonly dataFor42DaysMatrix: Array<CalendarBuilder.CalendarCellData> =
      new Array(CalendarBuilder.CELLS_COUNT_IN_MATRIX);

  private readonly targetYear: number;
  private readonly targetMonthNumber__numerationFrom0: number;

  private readonly cellIndexOfFirstDayInTargetMonth: number;
  private readonly cellIndexOfLastDayInTargetMonth: number;

  private readonly daysOfWeekData__0thElementIsFirstDayOfWeek: ReadonlyArray<CalendarBuilder.DayData>;


  public static generateDataFor42DaysMatrix(
    compoundParameter: CalendarBuilder.CompoundParameter
  ): Array<CalendarBuilder.CalendarCellData> {
    return new CalendarBuilder(compoundParameter).
        fillMatrixByDaysOfTargetMonth().
        fillMatrixByDaysOfPreviousMonth().
        fillMatrixDyDaysOfNextMonth().
        dataFor42DaysMatrix;
  }

  public static generateDataFor6x7DaysMatrix(
    compoundParameter: CalendarBuilder.CompoundParameter
  ): Array<Array<CalendarBuilder.CalendarCellData>> {
    return twoDimensionalizeArray({
      targetFlatArray: CalendarBuilder.generateDataFor42DaysMatrix(compoundParameter),
      elementsCountPerNestedArray: 7
    });
  }


  /* [ Performance ] Do not store to class fields the variables which required only in one method. */
  private constructor(compoundParameter: CalendarBuilder.CompoundParameter) {

    this.targetYear = compoundParameter.targetYear;


    if ("targetMonthName" in compoundParameter) {
      this.targetMonthNumber__numerationFrom0 = getMonthNumberByName({
        targetMonthName: compoundParameter.targetMonthName, numerationFrom: 0
      });
    } else if ("targetMonthNumber__numerationFrom1" in compoundParameter) {
      this.targetMonthNumber__numerationFrom0 = compoundParameter.targetMonthNumber__numerationFrom1 - 1;
    } else {
      this.targetMonthNumber__numerationFrom0 = compoundParameter.targetMonthNumber__numerationFrom0;
    }


    let firstDayOfWeek__numerationFrom0ForSunday: number;

    if ("firstDayOfWeek" in compoundParameter) {

      /* eslint-disable @typescript-eslint/no-magic-numbers --
       * Each numeric value only being assigned to variable with clear name. */
      switch (compoundParameter.firstDayOfWeek) {
        case DaysOfWeekNames.sunday: firstDayOfWeek__numerationFrom0ForSunday = 0; break;
        case DaysOfWeekNames.monday: firstDayOfWeek__numerationFrom0ForSunday = 1; break;
        case DaysOfWeekNames.tuesday: firstDayOfWeek__numerationFrom0ForSunday = 2; break;
        case DaysOfWeekNames.wednesday: firstDayOfWeek__numerationFrom0ForSunday = 3; break;
        case DaysOfWeekNames.thursday: firstDayOfWeek__numerationFrom0ForSunday = 4; break;
        case DaysOfWeekNames.friday: firstDayOfWeek__numerationFrom0ForSunday = 5; break;
        case DaysOfWeekNames.saturday: firstDayOfWeek__numerationFrom0ForSunday = 6; break;
      }
      /* eslint-enable @typescript-eslint/no-magic-numbers */

    } else if ("firstDayOfWeek__numerationFrom1ForSunday" in compoundParameter) {
      firstDayOfWeek__numerationFrom0ForSunday = compoundParameter.firstDayOfWeek__numerationFrom1ForSunday - 1;
    } else {
      firstDayOfWeek__numerationFrom0ForSunday = compoundParameter.firstDayOfWeek__numerationFrom0ForSunday;
    }

    const daysOfWeekNumbers__0thElementIsFirstDayOfWeek__numerationFrom0ForSunday: Array<number> = [
      firstDayOfWeek__numerationFrom0ForSunday
    ];

    let iteratedDayOfWeekNumber__numerationFrom0ForSunday: number = firstDayOfWeek__numerationFrom0ForSunday;

    for (let index: number = 1; index < DAYS_COUNT_IN_WEEK; index++) {

      iteratedDayOfWeekNumber__numerationFrom0ForSunday =
          iteratedDayOfWeekNumber__numerationFrom0ForSunday === DAYS_COUNT_IN_WEEK - 1 ?
              0 : iteratedDayOfWeekNumber__numerationFrom0ForSunday + 1;

      daysOfWeekNumbers__0thElementIsFirstDayOfWeek__numerationFrom0ForSunday[index] =
          iteratedDayOfWeekNumber__numerationFrom0ForSunday;

    }

    this.daysOfWeekData__0thElementIsFirstDayOfWeek =
        daysOfWeekNumbers__0thElementIsFirstDayOfWeek__numerationFrom0ForSunday.
        map(
          (dayOfWeekNumber__numerationFrom0ForSunday: number): CalendarBuilder.DayData =>
              ({

                dayOfWeekNumber__numerationFrom0ForSunday,

                /* [ Error prevention ]
                 * `Object.values(DaysOfWeekNames)[dayOfWeekNumber__numerationFrom0ForSunday]` is cleaner but not save
                 *    because the correct order of values is not guaranteed. */
                dayOfWeekName: [
                  DaysOfWeekNames.sunday,
                  DaysOfWeekNames.monday,
                  DaysOfWeekNames.tuesday,
                  DaysOfWeekNames.wednesday,
                  DaysOfWeekNames.thursday,
                  DaysOfWeekNames.friday,
                  DaysOfWeekNames.saturday
                ][dayOfWeekNumber__numerationFrom0ForSunday]

              })
        );


    const dayOfWeekNumberOfFirstDayInTargetMonth__numerationFrom0ForSunday: number =
        new Date(this.targetYear, this.targetMonthNumber__numerationFrom0, 1).getDay();

    this.cellIndexOfFirstDayInTargetMonth = getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
      daysOfWeekNumbers__0thElementIsFirstDayOfWeek__numerationFrom0ForSunday,
      (daysOfWeekNumber__0thElementIsFirstDayOfWeek__numerationFrom0AsSunday: number): boolean =>
          daysOfWeekNumber__0thElementIsFirstDayOfWeek__numerationFrom0AsSunday ===
              dayOfWeekNumberOfFirstDayInTargetMonth__numerationFrom0ForSunday,
      { mustThrowErrorIfElementNotFoundOrMatchesAreMultiple: true }
    );

    this.cellIndexOfLastDayInTargetMonth =
        this.cellIndexOfFirstDayInTargetMonth +
        getDaysCountInSpecificMonth({
          year: this.targetYear, monthNumber__numerationFrom0: this.targetMonthNumber__numerationFrom0
        }) -
        1;

  }


  private fillMatrixByDaysOfTargetMonth(): this {

    const targetMonthNumber__numerationFrom1: number = this.targetMonthNumber__numerationFrom0 + 1;

    const targetMonthName: MonthsNames = getMonthNameByNumber({
      targetMonthNumber: this.targetMonthNumber__numerationFrom0, numerationFrom: 0
    });

    let iteratedDayOfMonth: number = 1;

    for (
      let cellIndex: number = this.cellIndexOfFirstDayInTargetMonth;
      cellIndex <= this.cellIndexOfLastDayInTargetMonth;
      cellIndex++
    ) {

      this.dataFor42DaysMatrix[cellIndex] = {
        year: this.targetYear,
        monthNumber__numerationFrom0: this.targetMonthNumber__numerationFrom0,
        monthNumber__numerationFrom1: targetMonthNumber__numerationFrom1,
        monthName: targetMonthName,
        dayOfMonth: iteratedDayOfMonth,
        ...this.getDayData(cellIndex)
      };

      iteratedDayOfMonth = iteratedDayOfMonth + 1;

    }

    return this;

  }

  private fillMatrixByDaysOfPreviousMonth(): this {

    if (this.cellIndexOfFirstDayInTargetMonth === 0) {
      return this;
    }


    const yearOfPreviousMonth: number = getYearOfPreviousMonth({
      referenceYear: this.targetYear, referenceMonthNumber__numerationFrom0: this.targetMonthNumber__numerationFrom0
    });

    const previousMonthNumber__numerationFrom0: number = getPreviousMonthNumber({
      referenceMonthNumber__numerationFrom0: this.targetMonthNumber__numerationFrom0,
      firstMonthNumberInRelationToReturnableValue: 0
    });

    const previousMonthNumber__numerationFrom1: number = previousMonthNumber__numerationFrom0 + 1;

    const previousMonthName: MonthsNames = getMonthNameByNumber({
      targetMonthNumber: previousMonthNumber__numerationFrom0, numerationFrom: 0
    });

    let iteratedDayOfPreviousMonth: number = getDaysCountInSpecificMonth({
      year: yearOfPreviousMonth, monthNumber__numerationFrom0: previousMonthNumber__numerationFrom0
    });

    for (let cellIndex: number = this.cellIndexOfFirstDayInTargetMonth - 1; cellIndex >= 0; cellIndex--) {

      this.dataFor42DaysMatrix[cellIndex] = {
        year: yearOfPreviousMonth,
        monthNumber__numerationFrom0: previousMonthNumber__numerationFrom0,
        monthNumber__numerationFrom1: previousMonthNumber__numerationFrom1,
        monthName: previousMonthName,
        dayOfMonth: iteratedDayOfPreviousMonth,
        ...this.getDayData(cellIndex)
      };

      iteratedDayOfPreviousMonth = iteratedDayOfPreviousMonth - 1;

    }

    return this;

  }

  private fillMatrixDyDaysOfNextMonth(): this {

    if (isNotUndefined(this.dataFor42DaysMatrix[CalendarBuilder.CELLS_COUNT_IN_MATRIX - 1])) {
      return this;
    }


    const yearOfNextMonth: number = getYearOfNextMonth({
      referenceYear: this.targetYear, referenceMonthNumber__numerationFrom0: this.targetMonthNumber__numerationFrom0
    });

    const nextMonthNumber__numerationFrom0: number = getNextMonthNumber({
      referenceMonthNumber__numerationFrom0: this.targetMonthNumber__numerationFrom0,
      firstMonthNumberInRelationToReturnableValue: 0
    });

    const nextMonthNumber__numerationFrom1: number = nextMonthNumber__numerationFrom0 + 1;

    const nextMonthName: MonthsNames = getMonthNameByNumber({
      targetMonthNumber: nextMonthNumber__numerationFrom0, numerationFrom: 0
    });

    let iteratedDayOfNextMonth: number = 1;

    for (
      let cellIndex: number = this.cellIndexOfLastDayInTargetMonth + 1;
      cellIndex <= CalendarBuilder.CELLS_COUNT_IN_MATRIX - 1;
      cellIndex++
    ) {

      this.dataFor42DaysMatrix[cellIndex] = {
        year: yearOfNextMonth,
        monthNumber__numerationFrom0: nextMonthNumber__numerationFrom0,
        monthNumber__numerationFrom1: nextMonthNumber__numerationFrom1,
        monthName: nextMonthName,
        dayOfMonth: iteratedDayOfNextMonth,
        ...this.getDayData(cellIndex)
      };

      iteratedDayOfNextMonth = iteratedDayOfNextMonth + 1;

    }

    return this;

  }

  /* [ Optimization ] Although this method is a hardcode-like, it provides good optimization.
  *     Same or better optimization requires if refactoring has been decided. */
  private getDayData(targetCellIndex: number): CalendarBuilder.DayData {

    /* eslint-disable @typescript-eslint/no-magic-numbers --
     * The meaning of the value is clear from the parameter name. */
    switch (targetCellIndex) {

      case 0:
      case 7:
      case 14:
      case 21:
      case 28:
      case 35:

        return this.daysOfWeekData__0thElementIsFirstDayOfWeek[0];


      case 1:
      case 8:
      case 15:
      case 22:
      case 29:
      case 36:

        return this.daysOfWeekData__0thElementIsFirstDayOfWeek[1];


      case 2:
      case 9:
      case 16:
      case 23:
      case 30:
      case 37:

        return this.daysOfWeekData__0thElementIsFirstDayOfWeek[2];


      case 3:
      case 10:
      case 17:
      case 24:
      case 31:
      case 38:

        return this.daysOfWeekData__0thElementIsFirstDayOfWeek[3];


      case 4:
      case 11:
      case 18:
      case 25:
      case 32:
      case 39:

        return this.daysOfWeekData__0thElementIsFirstDayOfWeek[4];


      case 5:
      case 12:
      case 19:
      case 26:
      case 33:
      case 40:

        return this.daysOfWeekData__0thElementIsFirstDayOfWeek[5];


      default:

        return this.daysOfWeekData__0thElementIsFirstDayOfWeek[6];

    }
    /* eslint-enable @typescript-eslint/no-magic-numbers */

  }

}


namespace CalendarBuilder {

  export type CalendarCellData = Readonly<{
    year: number;
    monthNumber__numerationFrom0: number;
    monthNumber__numerationFrom1: number;
    monthName: MonthsNames;
    dayOfMonth: number;
    dayOfWeekName: DaysOfWeekNames;
    dayOfWeekNumber__numerationFrom0ForSunday: number;
  }>;

  export type DayData = Pick<CalendarCellData, "dayOfWeekName" | "dayOfWeekNumber__numerationFrom0ForSunday">;

  export type CompoundParameter =
    Readonly<{ targetYear: number; }> &
    (
      Readonly<{ targetMonthNumber__numerationFrom0: number; }> |
      Readonly<{ targetMonthNumber__numerationFrom1: number; }> |
      Readonly<{ targetMonthName: MonthsNames; }>
    ) &
    (
      { firstDayOfWeek__numerationFrom0ForSunday: number; } |
      { firstDayOfWeek__numerationFrom1ForSunday: number; } |
      { firstDayOfWeek: DaysOfWeekNames; }
    );

}


export default CalendarBuilder;
