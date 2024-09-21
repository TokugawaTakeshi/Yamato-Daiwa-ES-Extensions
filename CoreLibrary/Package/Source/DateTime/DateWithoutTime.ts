import { DaysOfWeekNames, type MonthsNames } from "fundamental-constants";

import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";
import getMonthNameByNumber from "./getMonthNameByNumber";
import getMonthNumberByName from "./getMonthNumberByName";
import getISO8601StringWithoutTimePart from "./getISO8601StringWithoutTimePart";
import isBoolean from "../TypeGuards/isBoolean";


class DateWithoutTime {

  /* ━━━ Protected Fields ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  // < =================================================================================================================
  /* eslint-disable no-underscore-dangle -- [ Convention ]
  * The underscored fields MUST be changes ONLY via `nativeDateObject` setter. */
  protected _nativeDateObject!: Date;

  protected _year: number | null = null;

  protected _monthName: MonthsNames | null = null;
  protected _monthNumber__numerationFrom0: number | null = null;
  protected _monthNumber__numerationFrom1: number | null = null;
  protected _monthNumber__numerationFrom1__2Digits: string | null = null;

  protected _dayOfMonth: number | null = null;
  protected _dayOfMonth__2Digits: string | null = null;

  protected _dayOfWeek: DaysOfWeekNames | null = null;
  protected _dayOfWeekNumber__numerationFrom0AsSunday: number | null = null;
  protected _dayOfWeekNumber__numerationFrom1AsSunday: number | null = null;
  protected _dayOfWeekNumber__numerationFrom1AsSunday__2Digits: string | null = null;
  // > =================================================================================================================

  protected computingOnDemandSettings: DateWithoutTime.ComputingOnDemandSettings;


  /* ━━━ Constructor ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public constructor(
    sourceDataAndOptions:
        DateWithoutTime.DateDefinition &
        Readonly<{ computingOnDemand?: Partial<DateWithoutTime.ComputingOnDemandSettings> | boolean; }>
  ) {

    this.computingOnDemandSettings = DateWithoutTime.
        normalizeComputingOnDemandOptions(sourceDataAndOptions.computingOnDemand);

    this.nativeDateObject = DateWithoutTime.normalizeDateDefinition(sourceDataAndOptions);

  }


  /* ━━━ Public Accessors ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public get year(): number {
    return this._year ?? (this._year = this._nativeDateObject.getFullYear());
  }

  public get monthName(): MonthsNames {
    return this._monthName ?? (
      this._monthName = getMonthNameByNumber({ targetMonthNumber: this._nativeDateObject.getMonth(), numerationFrom: 0 })
    );
  }

  public get monthNumber__numerationFrom0(): number {
    return this._monthNumber__numerationFrom0 ?? (
      this._monthNumber__numerationFrom0 = this._nativeDateObject.getMonth()
    );
  }

  public get monthNumber__numerationFrom1(): number {
    return this._monthNumber__numerationFrom1 ?? (
      this._monthNumber__numerationFrom1 = this._nativeDateObject.getMonth() + 1
    );
  }

  public get monthNumber__numerationFrom1__2Digits(): string {
    return this._monthNumber__numerationFrom1__2Digits ?? (
      this._monthNumber__numerationFrom1__2Digits = (this._nativeDateObject.getMonth() + 1).toString().padStart(2, "0")
    );
  }

  public get dayOfMonth(): number {
    return this._dayOfMonth ?? (this._dayOfMonth = this._nativeDateObject.getDate());
  }

  public get dayOfMonth__2Digits(): string {
    return this._dayOfMonth__2Digits ?? (
      this._dayOfMonth__2Digits = this._nativeDateObject.
          getDate().
          toString().
          padStart(2, "0")
    );
  }

  public get dayOfWeek(): DaysOfWeekNames {
    return this._dayOfWeek ??
        (this._dayOfWeek = ((): DaysOfWeekNames => {
          switch (this._dayOfWeekNumber__numerationFrom1AsSunday) {
            /* eslint-disable @typescript-eslint/no-magic-numbers --
            *  Currently there is no enumeration with number (from 0) of each day of week. */
            case 1: return DaysOfWeekNames.sunday;
            case 2: return DaysOfWeekNames.monday;
            case 3: return DaysOfWeekNames.tuesday;
            case 4: return DaysOfWeekNames.wednesday;
            case 5: return DaysOfWeekNames.thursday;
            case 6: return DaysOfWeekNames.friday;
            default: return DaysOfWeekNames.saturday;
            /* eslint-enable @typescript-eslint/no-magic-numbers */
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

  public update(
    sourceDataAndOptions:
        DateWithoutTime.DateDefinition &
        Readonly<{
          mutably: boolean;
          computingOnDemand?: Partial<DateWithoutTime.ComputingOnDemandSettings> | boolean;
        }>
  ): DateWithoutTime {

    this.computingOnDemandSettings = DateWithoutTime.
        normalizeComputingOnDemandOptions(sourceDataAndOptions.computingOnDemand);

    if (sourceDataAndOptions.mutably) {
      this.nativeDateObject = DateWithoutTime.normalizeDateDefinition(sourceDataAndOptions);
      return this;
    }


    return new DateWithoutTime(sourceDataAndOptions);

  }


  /* ━━━ Mutating ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  protected set nativeDateObject(newValue: Date) {

    this._nativeDateObject = newValue;

    this._year = this.computingOnDemandSettings.year ? null : this._nativeDateObject.getFullYear();

    if (this.computingOnDemandSettings.month) {
      this._monthNumber__numerationFrom0 = null;
      this._monthNumber__numerationFrom1 = null;
      this._monthNumber__numerationFrom1__2Digits = null;
      this._monthName = null;
    } else {
      this._monthNumber__numerationFrom0 = this._nativeDateObject.getMonth();
      this._monthNumber__numerationFrom1 = this._monthNumber__numerationFrom0 + 1;
      this._monthNumber__numerationFrom1__2Digits = this._monthNumber__numerationFrom1.toString().padStart(2, "0");
      this._monthName = getMonthNameByNumber({ targetMonthNumber: this._monthNumber__numerationFrom1, numerationFrom: 1 });
    }


    if (this.computingOnDemandSettings.dayOfMonth) {
      this._dayOfMonth = null;
      this._dayOfMonth__2Digits = null;
    } else {
      this._dayOfMonth = this._nativeDateObject.getDate();
      this._dayOfMonth__2Digits = this._dayOfMonth.toString().padStart(2, "0");
    }

    if (this.computingOnDemandSettings.dayOfWeek) {

      this._dayOfWeekNumber__numerationFrom0AsSunday = null;
      this._dayOfWeekNumber__numerationFrom1AsSunday = null;
      this._dayOfWeekNumber__numerationFrom1AsSunday__2Digits = null;
      this._dayOfWeek = null;

    } else {

      this._dayOfWeekNumber__numerationFrom0AsSunday = this._nativeDateObject.getDay();
      this._dayOfWeekNumber__numerationFrom1AsSunday = this._dayOfWeekNumber__numerationFrom0AsSunday + 1;
      this._dayOfWeekNumber__numerationFrom1AsSunday__2Digits =
          this._dayOfWeekNumber__numerationFrom1AsSunday.toString().padStart(2, "0");

      switch (this._dayOfWeekNumber__numerationFrom1AsSunday) {
        /* eslint-disable @typescript-eslint/no-magic-numbers --
         *  Currently there is no enumeration with number (from 0) of each day of week. */
        case 1: { this._dayOfWeek = DaysOfWeekNames.sunday; break; }
        case 2: { this._dayOfWeek = DaysOfWeekNames.monday; break; }
        case 3: { this._dayOfWeek = DaysOfWeekNames.tuesday; break; }
        case 4: { this._dayOfWeek = DaysOfWeekNames.wednesday; break; }
        case 5: { this._dayOfWeek = DaysOfWeekNames.thursday; break; }
        case 6: { this._dayOfWeek = DaysOfWeekNames.friday; break; }
        default: { this._dayOfWeek = DaysOfWeekNames.saturday; }
        /* eslint-enable @typescript-eslint/no-magic-numbers */
      }

    }

  }


  /* ━━━ Routines ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  protected static normalizeDateDefinition(dateDefinition: DateWithoutTime.DateDefinition): Date {

    let normalizedDate: Date;

    if ("ISO8601String" in dateDefinition) {

      normalizedDate = new Date(dateDefinition.ISO8601String);

      if (normalizedDate.toString() === "Invalid Date") {
        Logger.throwErrorAndLog({
          errorInstance: new InvalidParameterValueError({
            customMessage:
                `The passed value "${ dateDefinition.ISO8601String }" of "ISO8601String" is not valid ISO8601 ` +
                  "string."
          }),
          title: InvalidParameterValueError.localization.defaultTitle,
          occurrenceLocation: "DateWithoutTime.normalizeDateDefinition(dateDefinition)"
        });
      }

      return normalizedDate;

    }


    if ("millisecondsElapsedSinceUNIX_Epoch" in dateDefinition) {

      normalizedDate = new Date(dateDefinition.millisecondsElapsedSinceUNIX_Epoch);

      if (normalizedDate.toString() === "Invalid Date") {
        Logger.throwErrorAndLog({
          errorInstance: new InvalidParameterValueError({
            customMessage:
                `The passed value ${ dateDefinition.millisecondsElapsedSinceUNIX_Epoch } of ` +
                  "is not the valid amount of milliseconds elapsed since UNIX Epoch."
          }),
          title: InvalidParameterValueError.localization.defaultTitle,
          occurrenceLocation: "DateWithoutTime.normalizeDateDefinition(dateDefinition)"
        });
      }


      return normalizedDate;

    }


    if ("nativeDateObject" in dateDefinition) {
      return dateDefinition.nativeDateObject;
    }


    let monthNumber__numerationFrom0: number;

    if ("monthName" in dateDefinition) {
      monthNumber__numerationFrom0 =
          getMonthNumberByName({ targetMonthName: dateDefinition.monthName, numerationFrom: 0 });
    } else if ("monthNumber__numerationFrom1" in dateDefinition) {
      monthNumber__numerationFrom0 = dateDefinition.monthNumber__numerationFrom1 - 1;
    } else {
      monthNumber__numerationFrom0 = dateDefinition.monthNumber__numerationFrom0;
    }

    normalizedDate = new Date(
      dateDefinition.year, monthNumber__numerationFrom0, dateDefinition.dayOfMonth
    );

    if (normalizedDate.toString() === "Invalid Date") {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          customMessage:
              "Below date definition does not corresponding to valid Date." +
              ` ●                      Year: ${ dateDefinition.year }` +
              ` ● Month (numeration from 0): ${ monthNumber__numerationFrom0 }` +
              ` ●              Day of month: ${ dateDefinition.dayOfMonth }`
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "DateWithoutTime.normalizeDateDefinition(dateDefinition)"
      });
    }


    return normalizedDate;

  }

  protected static normalizeComputingOnDemandOptions(
    computingOnDemandSettings?: Partial<DateWithoutTime.ComputingOnDemandSettings> | boolean
  ): Required<DateWithoutTime.ComputingOnDemandSettings> {
    return isBoolean(computingOnDemandSettings) ?
      {
        year: computingOnDemandSettings,
        month: computingOnDemandSettings,
        dayOfMonth: computingOnDemandSettings,
        dayOfWeek: computingOnDemandSettings
      } :
      {
        year: computingOnDemandSettings?.year ?? false,
        month: computingOnDemandSettings?.month ?? false,
        dayOfMonth: computingOnDemandSettings?.dayOfMonth ?? false,
        dayOfWeek: computingOnDemandSettings?.dayOfWeek ?? false
      };
  }

}


namespace DateWithoutTime {

  export type DateDefinition = Readonly<
    { ISO8601String: string; } |
    { millisecondsElapsedSinceUNIX_Epoch: number; } |
    { nativeDateObject: Date; } |
    DateDefinition.ClearAPI
  >;

  export namespace DateDefinition {

    export type ClearAPI =
        Readonly<{
          year: number;
          dayOfMonth: number;
        }> &
        Month;

    export type Month = Readonly<
      { monthName: MonthsNames; } |
      { monthNumber__numerationFrom0: number; } |
      { monthNumber__numerationFrom1: number; }
    >;

  }

  export type ComputingOnDemandSettings = Readonly<{
    year: boolean;
    month: boolean;
    dayOfMonth: boolean;
    dayOfWeek: boolean;
  }>;

}


export default DateWithoutTime;
