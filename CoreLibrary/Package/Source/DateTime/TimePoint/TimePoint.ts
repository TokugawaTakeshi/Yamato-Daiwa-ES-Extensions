/* [ ESLint muting rationale ]
* There are too many numbers refers to month or day of week number in this class. */
/* eslint-disable @typescript-eslint/no-magic-numbers */

import DaysOfWeek from "../../ConstantsAndEnumerations/DateTime/DaysOfWeek";
import type MonthsNames from "../../ConstantsAndEnumerations/DateTime/MonthsNames";

import isNumber from "../../TypeGuards/Numbers/isNumber";
import isString from "../../TypeGuards/Strings/isString";
import getMonthNameByNumber from "../getMonthNameByNumber";

import Logger from "../../Logging/Logger";
import InvalidParameterValueError from "../../Errors/InvalidParameterValue/InvalidParameterValueError";

import TimePointLocalization__English from "./TimePointLocalization__English";


class TimePoint {

  private static localization: TimePoint.Localization = TimePointLocalization__English;

  public readonly year: number;

  public readonly monthName: MonthsNames;
  public readonly monthNumber__numerationFrom0: number;
  public readonly monthNumber__numerationFrom1: number;
  public readonly monthNumber__numerationFrom1__2Digits: string;

  public readonly dayOfMonth: number;
  public readonly dayOfMonth__2Digits: string;

  public readonly dayOfWeek: DaysOfWeek;
  public readonly dayOfWeekNumber__numerationFrom0AsSunday: number;
  public readonly dayOfWeekNumber__numerationFrom1AsSunday: number;
  public readonly dayOfWeekNumber__numerationFrom1AsSunday__2Digits: string;

  public readonly hours__24Format: number;
  public readonly hours__24Format__2Digits: string;
  public readonly hours__12Format: number;
  public readonly isBeforeMidday: boolean;
  public readonly isAfterMidday: boolean;

  public readonly minutes: number;
  public readonly minutes__2Digits: string;

  public readonly seconds: number;
  public readonly seconds__2Digits: string;

  public readonly milliseconds: number;

  public readonly nativeDateObject: Date;


  public static setLocalization(localization: TimePoint.Localization): void {
    TimePoint.localization = localization;
  }


  public constructor(rawDateTime: number | string | Date) {

    let normalizedDateTime: Date;

    if (isNumber(rawDateTime) || isString(rawDateTime)) {

      normalizedDateTime = new Date(rawDateTime);

      if (normalizedDateTime.toString() === "Invalid Date") {
        Logger.throwErrorAndLog({
          errorInstance: new InvalidParameterValueError({
            customMessage: TimePoint.localization.errors.invalidRawDateTime
          }),
          title: InvalidParameterValueError.localization.defaultTitle,
          occurrenceLocation: "TimePoint.constructor(rawDateTime)"
        });
      }

    } else {
      normalizedDateTime = rawDateTime;
    }

    this.nativeDateObject = normalizedDateTime;
    this.year = normalizedDateTime.getFullYear();

    this.monthNumber__numerationFrom0 = normalizedDateTime.getMonth();
    this.monthNumber__numerationFrom1 = this.monthNumber__numerationFrom0 + 1;
    this.monthNumber__numerationFrom1__2Digits = this.monthNumber__numerationFrom1.toString().padStart(2, "0");

    this.monthName = getMonthNameByNumber({ targetMonthNumber: this.monthNumber__numerationFrom1, numerationFrom: 1 });

    this.dayOfMonth = normalizedDateTime.getDate();
    this.dayOfMonth__2Digits = this.dayOfMonth.toString().padStart(2, "0");

    this.dayOfWeekNumber__numerationFrom0AsSunday = normalizedDateTime.getDay();
    this.dayOfWeekNumber__numerationFrom1AsSunday = this.dayOfWeekNumber__numerationFrom0AsSunday + 1;
    this.dayOfWeekNumber__numerationFrom1AsSunday__2Digits =
        this.dayOfWeekNumber__numerationFrom1AsSunday.toString().padStart(2, "0");

    switch (this.dayOfWeekNumber__numerationFrom1AsSunday) {
      case 1: { this.dayOfWeek = DaysOfWeek.sunday; break; }
      case 2: { this.dayOfWeek = DaysOfWeek.monday; break; }
      case 3: { this.dayOfWeek = DaysOfWeek.tuesday; break; }
      case 4: { this.dayOfWeek = DaysOfWeek.wednesday; break; }
      case 5: { this.dayOfWeek = DaysOfWeek.thursday; break; }
      case 6: { this.dayOfWeek = DaysOfWeek.friday; break; }
      default: { this.dayOfWeek = DaysOfWeek.saturday; }
    }

    this.hours__24Format = normalizedDateTime.getHours();
    this.hours__24Format__2Digits = this.hours__24Format.toString().padStart(2, "0");

    this.isBeforeMidday = this.hours__24Format < 13;
    this.isAfterMidday = !this.isBeforeMidday;

    if (this.hours__24Format === 0) {
      this.hours__12Format = 12;
    } else if (this.hours__24Format < 13) {
      this.hours__12Format = this.hours__24Format;
    } else {
      this.hours__12Format = this.hours__24Format - 12;
    }

    this.minutes = normalizedDateTime.getMinutes();
    this.minutes__2Digits = this.minutes.toString().padStart(2, "0");

    this.seconds = normalizedDateTime.getSeconds();
    this.seconds__2Digits = this.seconds.toString().padStart(2, "0");

    this.milliseconds = normalizedDateTime.getMilliseconds();
  }


  public format(formatter: (selfInstance: TimePoint) => string): string {
    return formatter(this);
  }

  public toISO8601String(): string {
    return this.nativeDateObject.toISOString();
  }

}


namespace TimePoint {
  export type Localization = Readonly<{
    errors: Readonly<{ invalidRawDateTime: string; }>;
  }>;
}


export default TimePoint;
