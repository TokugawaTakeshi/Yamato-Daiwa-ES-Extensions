/* eslint-disable no-underscore-dangle --
 * This class obeys to "dangled writable protected fields - public readonly fields" pattern */
import DaysOfWeek from "../ConstantsAndEnumerations/DateTime/DaysOfWeek";
import type MonthsNames from "../ConstantsAndEnumerations/DateTime/MonthsNames";

import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";

import getISO8601StringWithoutTimePart from "./getISO8601StringWithoutTimePart";
import getMonthNameByNumber from "./getMonthNameByNumber";
import shiftDateBySpecificDaysCount from "./shiftDateBySpecificDaysCount";
import isNumber from "../TypeGuards/Numbers/isNumber";
import isString from "../TypeGuards/Strings/isString";
import getMonthNumberByName from "./getMonthNumberByName";
import isValidNativeDate from "./isValidNativeDate";
import { getDaysCountInSpecificMonth } from "../index";
import capitalizeFirstCharacter from "../Strings/capitalizeFirstCharacter";


class DateWithoutTime {

  // < =================================================================================================================
  /* 〔 TypeScript functionality lack 〕
  * Do not manipulate with these fields directly - only via `nativeDateObject` getter. */
  protected _nativeDateObject!: Date;

  protected _year!: number;

  protected _monthName!: MonthsNames;
  protected _monthNumber__numerationFrom0!: number;
  protected _monthNumber__numerationFrom1!: number;
  protected _monthNumber__numerationFrom1__2Digits!: string;

  protected _dayOfMonth!: number;
  protected _dayOfMonth__2Digits!: string;

  protected _dayOfWeek!: DaysOfWeek;
  protected _dayOfWeekNumber__numerationFrom0AsSunday!: number;
  protected _dayOfWeekNumber__numerationFrom1AsSunday!: number;
  protected _dayOfWeekNumber__numerationFrom1AsSunday__2Digits!: string;
  // > =================================================================================================================


  public constructor(rawDateTime: Date | DateWithoutTime.DateDefinition | string | number) {

    try {

      if (isNumber(rawDateTime) || isString(rawDateTime) || rawDateTime instanceof Date) {
        this.nativeDateObject = new Date(rawDateTime);
      } else {
        this.nativeDateObject = DateWithoutTime.dateDefinitionToNativeDateObject(rawDateTime);
      }

    } catch (error: unknown) {

      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterName: "rawDateTime",
          parameterNumber: 1
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "DateWithoutTime.constructor(rawDateTime)",
        wrappableError: error
      });

    }

  }


  /* === Public methods ============================================================================================= */
  public setAltogether(
    dateDefinition: Readonly<DateWithoutTime.DateDefinition>,
    options: Readonly<{ immutably?: true; }> = {}
  ): DateWithoutTime {

    if (options.immutably) {
      return new DateWithoutTime(dateDefinition);
    }


    this.nativeDateObject = DateWithoutTime.dateDefinitionToNativeDateObject(dateDefinition);

    return this;

  }

  /* [ TypeScript bug ] The annotation `Readonly<Omit<DateWithoutTime.DateDefinition, "dayOfMonth">>` causes TS2345 error. */
  public setLastDayOfSpecificMonthAndYear(
    dateDefinition: Readonly<
      { year: number; } &
      (
        { monthName: MonthsNames; } |
        { monthNumber__numerationFrom0: number; } |
        { monthNumber__numerationFrom1: number; }
      )
    >,
    options: Readonly<{ immutably?: true; }> = {}
  ): DateWithoutTime {

    const newMonthNumber__numerationFrom0: number = DateWithoutTime.getMonthNumberFrom0ByMonthDefinition(dateDefinition);

    const updatedNativeDateObject: Date = new Date(
      dateDefinition.year,
      newMonthNumber__numerationFrom0,
      getDaysCountInSpecificMonth({
        year: dateDefinition.year,
        monthNumber__numerationFrom0: newMonthNumber__numerationFrom0
      })
    );

    if (options.immutably) {
      return new DateWithoutTime(updatedNativeDateObject);
    }


    this.nativeDateObject = updatedNativeDateObject;

    return this;

  }

  public shiftBySpecificDaysCount(
    namedParameters: Readonly<
      { daysCount: number; } &
      (
        {
          toFuture: true;
          toPast?: undefined;
        } |
        {
          toPast: true;
          toFuture?: undefined;
        }
      ) &
      { immutably?: true; }
    >
  ): DateWithoutTime {

    const updatedNativeDateTime: Date = shiftDateBySpecificDaysCount({
      initialDate: this._nativeDateObject,
      dayCount: namedParameters.daysCount,
      ...namedParameters.toFuture === true ? { toFuture: true } : { toPast: true }
    });

    if (namedParameters.immutably === true) {
      return new DateWithoutTime(updatedNativeDateTime);
    }


    this.nativeDateObject = updatedNativeDateTime;

    return this;

  }

  public format(formatter: (selfInstance: DateWithoutTime) => string): string {
    return formatter(this);
  }

  public toISO8601String(): string {
    return getISO8601StringWithoutTimePart({
      nativeDateInstance: this._nativeDateObject,
      mustAssociateOutputWithLocalDate: false
    });
  }

  public toLocaleString(): string {
    return this._nativeDateObject.toLocaleDateString();
  }

  public clone(): DateWithoutTime {
    return new DateWithoutTime({
      year: this._year,
      monthName: this._monthName,
      dayOfMonth: this._dayOfMonth
    });
  }


  /* === Public accessors =========================================================================================== */
  public get year(): number { return this._year; }

  public get monthName(): MonthsNames { return this._monthName; }
  public get monthNumber__numerationFrom0(): number { return this._monthNumber__numerationFrom0; }
  public get monthNumber__numerationFrom1(): number { return this._monthNumber__numerationFrom1; }
  public get monthNumber__numerationFrom1__2Digits(): string { return this._monthNumber__numerationFrom1__2Digits; }

  public get dayOfMonth(): number { return this._dayOfMonth; }
  public get dayOfMonth__2Digits(): string { return this._dayOfMonth__2Digits; }

  public get dayOfWeek(): DaysOfWeek { return this._dayOfWeek; }
  public get dayOfWeekNumber__numerationFrom0AsSunday(): number { return this._dayOfWeekNumber__numerationFrom0AsSunday; }
  public get dayOfWeekNumber__numerationFrom1AsSunday(): number { return this._dayOfWeekNumber__numerationFrom1AsSunday; }
  public get dayOfWeekNumber__numerationFrom1AsSunday__2Digits(): string {
    return this._dayOfWeekNumber__numerationFrom1AsSunday__2Digits;
  }

  public get copyOfNativeDateObject(): Date {
    return new Date(this._nativeDateObject);
  }


  /* === Mutating =================================================================================================== */
  protected set nativeDateObject(newNativeDate: Date) {

    if (!isValidNativeDate(newNativeDate)) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterNumber: 1,
          parameterName: "newNativeDate",
          messageSpecificPart: "The specified date is invalid."
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "dateWithoutTime.[set]nativeDateObject(newNativeDate)"
      });
    }


    this._nativeDateObject = newNativeDate;

    this._year = this._nativeDateObject.getFullYear();

    this._monthNumber__numerationFrom0 = this._nativeDateObject.getMonth();
    this._monthNumber__numerationFrom1 = this._monthNumber__numerationFrom0 + 1;
    this._monthNumber__numerationFrom1__2Digits = this._monthNumber__numerationFrom1.toString().padStart(2, "0");

    this._monthName = getMonthNameByNumber({ targetMonthNumber: this._monthNumber__numerationFrom1, numerationFrom: 1 });

    this._dayOfMonth = this._nativeDateObject.getDate();
    this._dayOfMonth__2Digits = this._dayOfMonth.toString().padStart(2, "0");

    this._dayOfWeekNumber__numerationFrom0AsSunday = this._nativeDateObject.getDay();
    this._dayOfWeekNumber__numerationFrom1AsSunday = this._dayOfWeekNumber__numerationFrom0AsSunday + 1;
    this._dayOfWeekNumber__numerationFrom1AsSunday__2Digits =
        this._dayOfWeekNumber__numerationFrom1AsSunday.toString().padStart(2, "0");

    /* eslint-disable @typescript-eslint/no-magic-numbers --
     * The meaning of each number literal is obvious from switch/case statement. */
    switch (this._dayOfWeekNumber__numerationFrom1AsSunday) {
      case 1: { this._dayOfWeek = DaysOfWeek.sunday; break; }
      case 2: { this._dayOfWeek = DaysOfWeek.monday; break; }
      case 3: { this._dayOfWeek = DaysOfWeek.tuesday; break; }
      case 4: { this._dayOfWeek = DaysOfWeek.wednesday; break; }
      case 5: { this._dayOfWeek = DaysOfWeek.thursday; break; }
      case 6: { this._dayOfWeek = DaysOfWeek.friday; break; }
      default: { this._dayOfWeek = DaysOfWeek.saturday; }
    }
    /* eslint-enable @typescript-eslint/no-magic-numbers */

  }


  /* === Private utils ============================================================================================== */
  private static dateDefinitionToNativeDateObject(dateDefinition: Readonly<DateWithoutTime.DateDefinition>): Date {

    const newMonthNumber__numerationFrom0: number = DateWithoutTime.getMonthNumberFrom0ByMonthDefinition(dateDefinition);
    const daysCountInNewMonth: number = getDaysCountInSpecificMonth({
      year: dateDefinition.year,
      monthNumber__numerationFrom0: newMonthNumber__numerationFrom0
    });

    if (dateDefinition.dayOfMonth > daysCountInNewMonth) {

      const formattedMonthName: string = capitalizeFirstCharacter(
        getMonthNameByNumber({ targetMonthNumber: newMonthNumber__numerationFrom0, numerationFrom: 0 }).toLowerCase()
      );

      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterNumber: 1,
          parameterName: "dateDefinition",
          messageSpecificPart: `The desired new date is ${ dateDefinition.dayOfMonth } ${ formattedMonthName } ` +
              `${ dateDefinition.year } while only ${ daysCountInNewMonth } days in ${ formattedMonthName } of ` +
              `${ dateDefinition.year }.`
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "DateWithoutTime.dateDefinitionToNativeDateObject(dateDefinition)"
      });

    }

    return new Date(dateDefinition.year, newMonthNumber__numerationFrom0, dateDefinition.dayOfMonth);

  }

  private static getMonthNumberFrom0ByMonthDefinition(monthDefinition: Readonly<DateWithoutTime.MonthDefinition>): number {

    if ("monthName" in monthDefinition) {
      return getMonthNumberByName({
        targetMonthName: monthDefinition.monthName,
        numerationFrom: 0
      });
    }

    return "monthNumber__numerationFrom1" in monthDefinition ?
        monthDefinition.monthNumber__numerationFrom1 - 1 : monthDefinition.monthNumber__numerationFrom0;

  }

}


namespace DateWithoutTime {

  export type DateDefinition =
    {
      year: number;
      dayOfMonth: number;
    } & MonthDefinition;

  export type MonthDefinition =
    { monthName: MonthsNames; } |
    { monthNumber__numerationFrom0: number; } |
    { monthNumber__numerationFrom1: number; };

}


export default DateWithoutTime;
