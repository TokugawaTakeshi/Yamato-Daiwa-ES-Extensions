/* eslint-disable no-underscore-dangle --
 * This class obeys to "dangled writable protected fields - public readonly fields" pattern */

import type { MonthsNames } from "fundamental-constants";
import { DaysOfWeekNames } from "fundamental-constants";

import getMonthNameByNumber from "./getMonthNameByNumber";

import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";
import getMonthNumberByName from "./getMonthNumberByName";
import isBoolean from "../TypeGuards/isBoolean";
import getISO8601StringWithoutTimePart from "./getISO8601StringWithoutTimePart";


class DateWithoutTime {

  // < =================================================================================================================
  /* [ Convention ]
  * Do NOT manipulate with underscored fields directly, only via `nativeDateObject` setter (except contractor). */
  protected _nativeDateObject!: Date;

  protected _year?: number;

  protected _monthName?: MonthsNames;
  protected _monthNumber__numerationFrom0?: number;
  protected _monthNumber__numerationFrom1?: number;
  protected _monthNumber__numerationFrom1__2Digits?: string;

  protected _dayOfMonth?: number;
  protected _dayOfMonth__2Digits?: string;

  protected _dayOfWeek?: DaysOfWeekNames;
  protected _dayOfWeekNumber__numerationFrom0AsSunday?: number;
  protected _dayOfWeekNumber__numerationFrom1AsSunday?: number;
  protected _dayOfWeekNumber__numerationFrom1AsSunday__2Digits?: string;
  // > =================================================================================================================


  public constructor(
    sourceDataAndOptions: Readonly<
      (
        { ISO8601String: string; } |
        { millisecondsElapsedSinceUNIX_Epoch: number; } |
        { nativeDateObject: Date; } |
        DateWithoutTime.DateDefinition
      ) &
      {
        computingOnDemand?:
            Readonly<{
              year?: boolean;
              month?: boolean;
              dayOfMonth?: boolean;
              dayOfWeek?: boolean;
            }> |
            boolean;
      }
    >
  ) {

    let normalizedDate: Date;

    if ("ISO8601String" in sourceDataAndOptions) {

      normalizedDate = new Date(sourceDataAndOptions.ISO8601String);

      if (normalizedDate.toString() === "Invalid Date") {
        Logger.throwErrorAndLog({
          errorInstance: new InvalidParameterValueError({
            customMessage:
                `The passed value "${ sourceDataAndOptions.ISO8601String }" of "ISO8601String" is not valid ISO8601 ` +
                  "string."
          }),
          title: InvalidParameterValueError.localization.defaultTitle,
          occurrenceLocation: "DateWithoutTime.constructor(sourceDataAndOptions)"
        });
      }

    } else if ("millisecondsElapsedSinceUNIX_Epoch" in sourceDataAndOptions) {

      normalizedDate = new Date(sourceDataAndOptions.millisecondsElapsedSinceUNIX_Epoch);

      if (normalizedDate.toString() === "Invalid Date") {
        Logger.throwErrorAndLog({
          errorInstance: new InvalidParameterValueError({
            customMessage:
                `The passed value ${ sourceDataAndOptions.millisecondsElapsedSinceUNIX_Epoch } of ` +
                  "is not the valid amount of milliseconds elapsed since UNIX Epoch."
          }),
          title: InvalidParameterValueError.localization.defaultTitle,
          occurrenceLocation: "DateWithoutTime.constructor(sourceDataAndOptions)"
        });
      }

    } else if ("nativeDateObject" in sourceDataAndOptions) {

      normalizedDate = sourceDataAndOptions.nativeDateObject;

    } else {

      let monthNumber__numerationFrom0: number;

      if ("monthName" in sourceDataAndOptions) {
        monthNumber__numerationFrom0 =
            getMonthNumberByName({ targetMonthName: sourceDataAndOptions.monthName, numerationFrom: 0 });
      } else if ("monthNumber__numerationFrom1" in sourceDataAndOptions) {
        monthNumber__numerationFrom0 = sourceDataAndOptions.monthNumber__numerationFrom1 - 1;
      } else {
        monthNumber__numerationFrom0 = sourceDataAndOptions.monthNumber__numerationFrom0;
      }

      normalizedDate = new Date(
        sourceDataAndOptions.year, monthNumber__numerationFrom0, sourceDataAndOptions.dayOfMonth
      );

      if (normalizedDate.toString() === "Invalid Date") {
        Logger.throwErrorAndLog({
          errorInstance: new InvalidParameterValueError({
            customMessage:
                "Below date definition does not corresponding to valid Date." +
                ` ●                      Year: ${ sourceDataAndOptions.year }` +
                ` ● Month (numeration from 0): ${ monthNumber__numerationFrom0 }` +
                ` ●              Day of month: ${ sourceDataAndOptions.dayOfMonth }`
          }),
          title: InvalidParameterValueError.localization.defaultTitle,
          occurrenceLocation: "DateWithoutTime.constructor(sourceDataAndOptions)"
        });
      }

    }

    this._nativeDateObject = normalizedDate;

    if (
      (isBoolean(sourceDataAndOptions.computingOnDemand) && !sourceDataAndOptions.computingOnDemand) ||
      (!isBoolean(sourceDataAndOptions.computingOnDemand) && sourceDataAndOptions.computingOnDemand?.year !== true)
    ) {
      this._year = this._nativeDateObject.getFullYear();
    }

    if (
      (isBoolean(sourceDataAndOptions.computingOnDemand) && !sourceDataAndOptions.computingOnDemand) ||
      (!isBoolean(sourceDataAndOptions.computingOnDemand) && sourceDataAndOptions.computingOnDemand?.month !== true)
    ) {
      this._monthNumber__numerationFrom0 = this._nativeDateObject.getMonth();
      this._monthNumber__numerationFrom1 = this._monthNumber__numerationFrom0 + 1;
      this._monthNumber__numerationFrom1__2Digits = this._monthNumber__numerationFrom1.toString().padStart(2, "0");
      this._monthName = getMonthNameByNumber({ targetMonthNumber: this._monthNumber__numerationFrom1, numerationFrom: 1 });
    }

    if (
      (isBoolean(sourceDataAndOptions.computingOnDemand) && !sourceDataAndOptions.computingOnDemand) ||
      (!isBoolean(sourceDataAndOptions.computingOnDemand) && sourceDataAndOptions.computingOnDemand?.dayOfMonth !== true)
    ) {
      this._dayOfMonth = this._nativeDateObject.getDate();
      this._dayOfMonth__2Digits = this._dayOfMonth.toString().padStart(2, "0");
    }

    if (
      (isBoolean(sourceDataAndOptions.computingOnDemand) && !sourceDataAndOptions.computingOnDemand) ||
      (!isBoolean(sourceDataAndOptions.computingOnDemand) && sourceDataAndOptions.computingOnDemand?.dayOfWeek !== true)
    ) {

      this._dayOfWeekNumber__numerationFrom0AsSunday = this._nativeDateObject.getDay();
      this._dayOfWeekNumber__numerationFrom1AsSunday = this._dayOfWeekNumber__numerationFrom0AsSunday + 1;
      this._dayOfWeekNumber__numerationFrom1AsSunday__2Digits =
          this._dayOfWeekNumber__numerationFrom1AsSunday.toString().padStart(2, "0");

      switch (this._dayOfWeekNumber__numerationFrom1AsSunday) {
        case 1: { this._dayOfWeek = DaysOfWeekNames.sunday; break; }
        case 2: { this._dayOfWeek = DaysOfWeekNames.monday; break; }
        case 3: { this._dayOfWeek = DaysOfWeekNames.tuesday; break; }
        case 4: { this._dayOfWeek = DaysOfWeekNames.wednesday; break; }
        case 5: { this._dayOfWeek = DaysOfWeekNames.thursday; break; }
        case 6: { this._dayOfWeek = DaysOfWeekNames.friday; break; }
        default: { this._dayOfWeek = DaysOfWeekNames.saturday; }
      }

    }

  }


  /* ━━━ Public Accessors ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public get year(): number {
    return this._year ?? (this._year = this._nativeDateObject.getFullYear());
  }

  public get monthName(): MonthsNames {
    return this._monthName ??
        (this._monthName = getMonthNameByNumber({ targetMonthNumber: this._nativeDateObject.getMonth(), numerationFrom: 0 }));
  }

  public get monthNumber__numerationFrom0(): number {
    return this._monthNumber__numerationFrom0 ?? (this._monthNumber__numerationFrom0 = this._nativeDateObject.getMonth());
  }

  public get monthNumber__numerationFrom1(): number {
    return this._monthNumber__numerationFrom1 ?? (this._monthNumber__numerationFrom1 = this._nativeDateObject.getMonth() + 1);
  }

  public get monthNumber__numerationFrom1__2Digits(): string {
    return this._monthNumber__numerationFrom1__2Digits ??
        (this._monthNumber__numerationFrom1__2Digits = (this._nativeDateObject.getMonth() + 1).toString().padStart(2, "0"));
  }

  public get dayOfMonth(): number {
    return this._dayOfMonth ?? (this._dayOfMonth = this._nativeDateObject.getDate());
  }

  public get dayOfMonth__2Digits(): string {
    return this._dayOfMonth__2Digits ??
        (this._dayOfMonth__2Digits = this._nativeDateObject.getDate().toString().padStart(2, "0"));
  }

  public get dayOfWeek(): DaysOfWeekNames {
    return this._dayOfWeek ??
        (this._dayOfWeek = ((): DaysOfWeekNames => {
          switch (this._dayOfWeekNumber__numerationFrom1AsSunday) {
            case 1: return DaysOfWeekNames.sunday;
            case 2: return DaysOfWeekNames.monday;
            case 3: return DaysOfWeekNames.tuesday;
            case 4: return DaysOfWeekNames.wednesday;
            case 5: return DaysOfWeekNames.thursday;
            case 6: return DaysOfWeekNames.friday;
            default: return DaysOfWeekNames.saturday;
          }
        })());
  }

  public get dayOfWeekNumber__numerationFrom0AsSunday(): number {
    return this._dayOfWeekNumber__numerationFrom0AsSunday ??
        (this._dayOfWeekNumber__numerationFrom0AsSunday = this._nativeDateObject.getDay());
  }

  public get dayOfWeekNumber__numerationFrom1AsSunday(): number {
    return this._dayOfWeekNumber__numerationFrom1AsSunday ??
        (this._dayOfWeekNumber__numerationFrom1AsSunday = this._nativeDateObject.getDay() + 1);
  }

  public get dayOfWeekNumber__numerationFrom1AsSunday__2Digits(): string {
    return this._dayOfWeekNumber__numerationFrom1AsSunday__2Digits ?? (
      this._dayOfWeekNumber__numerationFrom1AsSunday__2Digits =
        (this._nativeDateObject.getDay() + 1).toString().padStart(2, "0")
    );
  }


  /* ━━━ Public Methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
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

}


namespace DateWithoutTime {

  export type DateDefinition =
      Readonly<{
        year: number;
        dayOfMonth: number;
      }> &
      MonthDefinition;

  export type MonthDefinition = Readonly<
    { monthName: MonthsNames; } |
    { monthNumber__numerationFrom0: number; } |
    { monthNumber__numerationFrom1: number; }
  >;

}


export default DateWithoutTime;
