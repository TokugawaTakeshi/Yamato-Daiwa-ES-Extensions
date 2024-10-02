import { DaysOfWeekNames, type MonthsNames } from "fundamental-constants";
import getMonthNameByNumber from "./getMonthNameByNumber";
import getMonthNumberByName from "./getMonthNumberByName";
import convert24HoursFormatTo12HoursFormat from "./convert24HoursFormatTo12HoursFormat";
import isBoolean from "../TypeGuards/isBoolean";
import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";


/* [ Approach ]
 * This class appears very similar with `DateWithoutTime`, but there is the significant difference because of which
 *    `TimePoint` could not be extended from `DateWithoutTime`. `DateWithoutTime` is the interval of 24 hours length
 *    which is not bound to specific time zone while `TimePoint` is being considered as point, not interval, and
 *    respects the time zone. */
class TimePoint {

  /* ━━━ Protected Fields ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  // < =================================================================================================================
  /* eslint-disable no-underscore-dangle -- [ Convention ]
   * The underscored fields MUST be changes ONLY via `nativeDateObject` setter. */
  protected _nativeDateObject!: Date;

  /* ─── Local ────────────────────────────────────────────────────────────────────────────────────────────────────── */
  protected _year__local: number | null = null;

  protected _monthName__local: MonthsNames | null = null;
  protected _monthNumber__numerationFrom0__local: number | null = null;
  protected _monthNumber__numerationFrom1__local: number | null = null;
  protected _monthNumber__numerationFrom1__2Digits__local: string | null = null;

  protected _dayOfMonth__local: number | null = null;
  protected _dayOfMonth__2Digits__local: string | null = null;

  protected _dayOfWeek__local: DaysOfWeekNames | null = null;
  protected _dayOfWeekNumber__numerationFrom0AsSunday__local: number | null = null;
  protected _dayOfWeekNumber__numerationFrom1AsSunday__local: number | null = null;
  protected _dayOfWeekNumber__numerationFrom1AsSunday__2Digits__local: string | null = null;

  protected _hours__24Format__local: number | null = null;
  protected _hours__24Format__2Digits__local: string | null = null;
  protected _hours__12Format__local: number | null = null;
  protected _isBeforeMidday__local: boolean | null = null;
  protected _isAfterMidday__local: boolean | null = null;

  protected _minutes__local: number | null = null;
  protected _minutes__2Digits__local: string | null = null;

  protected _seconds__local: number | null = null;
  protected _seconds__2Digits__local: string | null = null;

  protected _milliseconds__local: number | null = null;


  /* ─── UTC ──────────────────────────────────────────────────────────────────────────────────────────────────────── */
  protected _year__UTC: number | null = null;

  protected _monthName__UTC: MonthsNames | null = null;
  protected _monthNumber__numerationFrom0__UTC: number | null = null;
  protected _monthNumber__numerationFrom1__UTC: number | null = null;
  protected _monthNumber__numerationFrom1__2Digits__UTC: string | null = null;

  protected _dayOfMonth__UTC: number | null = null;
  protected _dayOfMonth__2Digits__UTC: string | null = null;

  protected _dayOfWeek__UTC: DaysOfWeekNames | null = null;
  protected _dayOfWeekNumber__numerationFrom0AsSunday__UTC: number | null = null;
  protected _dayOfWeekNumber__numerationFrom1AsSunday__UTC: number | null = null;
  protected _dayOfWeekNumber__numerationFrom1AsSunday__2Digits__UTC: string | null = null;

  protected _hours__24Format__UTC: number | null = null;
  protected _hours__24Format__2Digits__UTC: string | null = null;
  protected _hours__12Format__UTC: number | null = null;
  protected _isBeforeMidday__UTC: boolean | null = null;
  protected _isAfterMidday__UTC: boolean | null = null;

  protected _minutes__UTC: number | null = null;
  protected _minutes__2Digits__UTC: string | null = null;

  protected _seconds__UTC: number | null = null;
  protected _seconds__2Digits__UTC: string | null = null;

  protected _milliseconds__UTC: number | null = null;
  // > =================================================================================================================


  protected computingOnDemandSettings: TimePoint.ComputingOnDemandSettings;


  /* ━━━ Constructor ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public constructor(
    sourceDataAndOptions:
        TimePoint.DateTimeDefinition &
        Readonly<{ computingOnDemand?: TimePoint.ComputingOnDemandSettings | boolean; }>
  ) {
    this.computingOnDemandSettings = TimePoint.normalizeComputingOnDemandOptions(sourceDataAndOptions.computingOnDemand);
    this.nativeDateObject = TimePoint.normalizeDateTimeDefinition(sourceDataAndOptions);
  }


  /* ━━━ Public Accessors ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ─── Year ─────────────────────────────────────────────────────────────────────────────────────────────────────── */
  public get year__local(): number {
    return this._year__local ?? (this._year__local = this._nativeDateObject.getFullYear());
  }

  public get year__UTC(): number {
    return this._year__UTC ?? (this._year__UTC = this._nativeDateObject.getUTCFullYear());
  }


  /* ─── Month ────────────────────────────────────────────────────────────────────────────────────────────────────── */
  public get monthName__local(): MonthsNames {
    return this._monthName__local ?? (
      this._monthName__local = getMonthNameByNumber({
        targetMonthNumber: this._nativeDateObject.getMonth(), numerationFrom: 0
      })
    );
  }

  public get monthName__UTC(): MonthsNames {
    return this._monthName__UTC ?? (
      this._monthName__UTC = getMonthNameByNumber({
        targetMonthNumber: this._nativeDateObject.getUTCMonth(), numerationFrom: 0
      })
    );
  }

  public get monthNumber__numerationFrom0__local(): number {
    return this._monthNumber__numerationFrom0__local ?? (
      this._monthNumber__numerationFrom0__local = this._nativeDateObject.getMonth()
    );
  }

  public get monthNumber__numerationFrom0__UTC(): number {
    return this._monthNumber__numerationFrom0__UTC ?? (
      this._monthNumber__numerationFrom0__UTC = this._nativeDateObject.getUTCMonth()
    );
  }

  public get monthNumber__numerationFrom1__local(): number {
    return this._monthNumber__numerationFrom1__local ?? (
      this._monthNumber__numerationFrom1__local = this._nativeDateObject.getMonth() + 1
    );
  }

  public get monthNumber__numerationFrom1__UTC(): number {
    return this._monthNumber__numerationFrom1__UTC ?? (
      this._monthNumber__numerationFrom1__UTC = this._nativeDateObject.getUTCMonth() + 1
    );
  }

  public get monthNumber__numerationFrom1__2Digits__local(): string {
    return this._monthNumber__numerationFrom1__2Digits__local ?? (
      this._monthNumber__numerationFrom1__2Digits__local =
          (this._nativeDateObject.getMonth() + 1).toString().padStart(2, "0")
    );
  }

  public get monthNumber__numerationFrom1__2Digits__UTC(): string {
    return this._monthNumber__numerationFrom1__2Digits__UTC ?? (
      this._monthNumber__numerationFrom1__2Digits__UTC =
          (this._nativeDateObject.getUTCMonth() + 1).toString().padStart(2, "0")
    );
  }


  /* ─── Day of Month ─────────────────────────────────────────────────────────────────────────────────────────────── */
  public get dayOfMonth__local(): number {
    return this._dayOfMonth__local ?? (this._dayOfMonth__local = this._nativeDateObject.getDate());
  }

  public get dayOfMonth__UTC(): number {
    return this._dayOfMonth__UTC ?? (this._dayOfMonth__UTC = this._nativeDateObject.getUTCDate());
  }

  public get dayOfMonth__2Digits__local(): string {
    return this._dayOfMonth__2Digits__local ?? (
        this._dayOfMonth__2Digits__local = this._nativeDateObject.
            getDate().
            toString().
            padStart(2, "0")
    );
  }

  public get dayOfMonth__2Digits__UTC(): string {
    return this._dayOfMonth__2Digits__UTC ?? (
        this._dayOfMonth__2Digits__UTC = this._nativeDateObject.
        getUTCDate().
        toString().
        padStart(2, "0")
    );
  }


  /* ─── Day of Week ──────────────────────────────────────────────────────────────────────────────────────────────── */
  public get dayOfWeek__local(): DaysOfWeekNames {
    return this._dayOfWeek__local ??
        (this._dayOfWeek__local = ((): DaysOfWeekNames => {
          switch (this._nativeDateObject.getDay()) {
            /* eslint-disable @typescript-eslint/no-magic-numbers --
            *  Currently there is no enumeration with number (from 0) of each day of week. */
            case 0: return DaysOfWeekNames.sunday;
            case 1: return DaysOfWeekNames.monday;
            case 2: return DaysOfWeekNames.tuesday;
            case 3: return DaysOfWeekNames.wednesday;
            case 4: return DaysOfWeekNames.thursday;
            case 5: return DaysOfWeekNames.friday;
            default: return DaysOfWeekNames.saturday;
            /* eslint-enable @typescript-eslint/no-magic-numbers */
          }
        })());
  }

  public get_dayOfWeek__UTC(): DaysOfWeekNames {
    return this._dayOfWeek__UTC ??
        (this._dayOfWeek__UTC = ((): DaysOfWeekNames => {
          switch (this._nativeDateObject.getUTCDay()) {
            /* eslint-disable @typescript-eslint/no-magic-numbers --
            *  Currently there is no enumeration with number (from 0) of each day of week. */
            case 0: return DaysOfWeekNames.sunday;
            case 1: return DaysOfWeekNames.monday;
            case 2: return DaysOfWeekNames.tuesday;
            case 3: return DaysOfWeekNames.wednesday;
            case 4: return DaysOfWeekNames.thursday;
            case 5: return DaysOfWeekNames.friday;
            default: return DaysOfWeekNames.saturday;
            /* eslint-enable @typescript-eslint/no-magic-numbers */
          }
        })());
  }

  public get dayOfWeekNumber__numerationFrom0AsSunday__local(): number {
    return this._dayOfWeekNumber__numerationFrom0AsSunday__local ??
        (this._dayOfWeekNumber__numerationFrom0AsSunday__local = this._nativeDateObject.getDay());
  }

  public get dayOfWeekNumber__numerationFrom0AsSunday__UTC(): number {
    return this._dayOfWeekNumber__numerationFrom0AsSunday__UTC ??
        (this._dayOfWeekNumber__numerationFrom0AsSunday__UTC = this._nativeDateObject.getUTCDay());
  }

  public get dayOfWeekNumber__numerationFrom1AsSunday__local(): number {
    return this._dayOfWeekNumber__numerationFrom1AsSunday__local ??
        (this._dayOfWeekNumber__numerationFrom1AsSunday__local = this._nativeDateObject.getDay() + 1);
  }

  public get dayOfWeekNumber__numerationFrom1AsSunday__UTC(): number {
    return this._dayOfWeekNumber__numerationFrom1AsSunday__UTC ??
        (this._dayOfWeekNumber__numerationFrom1AsSunday__UTC = this._nativeDateObject.getUTCDay() + 1);
  }

  public get dayOfWeekNumber__numerationFrom1AsSunday__2Digits__local(): string {
    return this._dayOfWeekNumber__numerationFrom1AsSunday__2Digits__local ?? (
      this._dayOfWeekNumber__numerationFrom1AsSunday__2Digits__local =
          (this._nativeDateObject.getDay() + 1).toString().padStart(2, "0")
    );
  }

  public get dayOfWeekNumber__numerationFrom1AsSunday__2Digits__UTC(): string {
    return this._dayOfWeekNumber__numerationFrom1AsSunday__2Digits__UTC ?? (
      this._dayOfWeekNumber__numerationFrom1AsSunday__2Digits__UTC =
          (this._nativeDateObject.getUTCDay() + 1).toString().padStart(2, "0")
    );
  }


  /* ─── Hours ────────────────────────────────────────────────────────────────────────────────────────────────────── */
  public get hours__24Format__local(): number {
    return this._hours__24Format__local ?? (this._hours__24Format__local = this._nativeDateObject.getHours());
  }

  public get hours__24Format__UTC(): number {
    return this._hours__24Format__UTC ?? (this._hours__24Format__UTC = this._nativeDateObject.getUTCHours());
  }

  public get hours__24Format__2Digits__local(): string {
    return this._monthNumber__numerationFrom1__2Digits__local ?? (
      this._monthNumber__numerationFrom1__2Digits__local = this._nativeDateObject.
          getHours().
          toString().
          padStart(2, "0")
    );
  }

  public get hours__24Format__2Digits__UTC(): string {
    return this._monthNumber__numerationFrom1__2Digits__UTC ?? (
      this._monthNumber__numerationFrom1__2Digits__UTC = this._nativeDateObject.
          getUTCHours().
          toString().
          padStart(2, "0")
    );
  }

  public get hours__12Format__local(): number {
    return this._hours__12Format__local ??
        (this._hours__12Format__local = convert24HoursFormatTo12HoursFormat(this._nativeDateObject.getHours()));
  }

  public get hours__12Format__UTC(): number {
    return this._hours__12Format__UTC ??
        (this._hours__12Format__UTC = convert24HoursFormatTo12HoursFormat(this._nativeDateObject.getUTCHours()));
  }

  public get isBeforeMidday__local(): boolean {
    return this._isBeforeMidday__local ?? (this._isBeforeMidday__local = this._nativeDateObject.getHours() < 13);
  }

  public get isBeforeMidday__UTC(): boolean {
    return this._isBeforeMidday__UTC ?? (this._isBeforeMidday__UTC = this._nativeDateObject.getUTCHours() < 13);
  }

  public get isAfterMidday__local(): boolean {
    return this._isAfterMidday__local ?? (this._isAfterMidday__local = this._nativeDateObject.getHours() >= 13);
  }

  public get isAfterMidday__UTC(): boolean {
    return this._isAfterMidday__UTC ?? (this._isAfterMidday__UTC = this._nativeDateObject.getUTCHours() >= 13);
  }

  public get minutes__local(): number {
    return this._minutes__local ?? (this._minutes__local = this._nativeDateObject.getMinutes());
  }

  public get minutes__UTC(): number {
    return this._minutes__UTC ?? (this._minutes__UTC = this._nativeDateObject.getUTCMinutes());
  }

  public get minutes__2Digits__local(): string {
    return this._minutes__2Digits__local ?? (
      this._minutes__2Digits__local = this._nativeDateObject.
          getMinutes().
          toString().
          padStart(2, "0")
    );
  }

  public get minutes__2Digits__UTC(): string {
    return this._minutes__2Digits__UTC ?? (
      this._minutes__2Digits__UTC = this._nativeDateObject.
          getUTCMinutes().
          toString().
          padStart(2, "0")
    );
  }

  public get seconds__local(): number {
    return this._seconds__local ?? (this._seconds__local = this._nativeDateObject.getSeconds());
  }

  public get seconds__UTC(): number {
    return this._seconds__UTC ?? (this._seconds__UTC = this._nativeDateObject.getUTCSeconds());
  }

  public get seconds__2Digits__local(): string {
    return this._seconds__2Digits__local ?? (
      this._seconds__2Digits__local = this._nativeDateObject.
          getSeconds().
          toString().
          padStart(2, "0")
    );
  }

  public get seconds__2Digits__UTC(): string {
    return this._seconds__2Digits__UTC ?? (
      this._seconds__2Digits__UTC = this._nativeDateObject.
          getUTCSeconds().
          toString().
          padStart(2, "0")
    );
  }

  public get milliseconds__local(): number {
    return this._milliseconds__local ?? (this._milliseconds__local = this._nativeDateObject.getMilliseconds());
  }

  public get milliseconds__UTC(): number {
    return this._milliseconds__UTC ?? (this._milliseconds__UTC = this._nativeDateObject.getUTCMilliseconds());
  }


  /* ━━━ Public Methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public format(formatter: (selfInstance: TimePoint) => string): string {
    return formatter(this);
  }

  public toISO8601String(): string {
    return this._nativeDateObject.toISOString();
  }

  public toLocaleString(): string {
    return this._nativeDateObject.toLocaleString();
  }

  public update(
    sourceDataAndOptions:
        TimePoint.DateTimeDefinition &
        Readonly<{
          mutably: boolean;
          computingOnDemand?: TimePoint.ComputingOnDemandSettings | boolean;
        }>
  ): TimePoint {

    this.computingOnDemandSettings = TimePoint.
        normalizeComputingOnDemandOptions(sourceDataAndOptions.computingOnDemand);

    if (sourceDataAndOptions.mutably) {
      this.nativeDateObject = TimePoint.normalizeDateTimeDefinition(sourceDataAndOptions);
      return this;
    }


    return new TimePoint(sourceDataAndOptions);

  }


  /* ━━━ Protected Methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ─── Mutating ─────────────────────────────────────────────────────────────────────────────────────────────────── */
  protected set nativeDateObject(newValue: Date) {

    this._nativeDateObject = newValue;

    if (!this.computingOnDemandSettings.year__local) {
      this._year__local = this._nativeDateObject.getFullYear();
    }

    if (!this.computingOnDemandSettings.year__UTC) {
      this._year__UTC = this._nativeDateObject.getUTCFullYear();
    }

    if (!this.computingOnDemandSettings.month__local) {

      this._monthNumber__numerationFrom0__local = this._nativeDateObject.getMonth();
      this._monthNumber__numerationFrom1__local = this._monthNumber__numerationFrom0__local + 1;

      this._monthNumber__numerationFrom1__2Digits__local = this._monthNumber__numerationFrom1__local.
          toString().
          padStart(2, "0");

      this._monthName__local = getMonthNameByNumber({
        targetMonthNumber: this._monthNumber__numerationFrom1__local, numerationFrom: 1
      });

    }

    if (!this.computingOnDemandSettings.month__UTC) {

      this._monthNumber__numerationFrom0__UTC = this._nativeDateObject.getUTCMonth();
      this._monthNumber__numerationFrom1__UTC = this._monthNumber__numerationFrom0__UTC + 1;

      this._monthNumber__numerationFrom1__2Digits__UTC = this._monthNumber__numerationFrom1__UTC.
          toString().
          padStart(2, "0");

      this._monthName__UTC = getMonthNameByNumber({
        targetMonthNumber: this._monthNumber__numerationFrom1__UTC, numerationFrom: 1
      });

    }

    if (!this.computingOnDemandSettings.dayOfMonth__local) {
      this._dayOfMonth__local = this._nativeDateObject.getDate();
      this._dayOfMonth__2Digits__local = this._dayOfMonth__local.toString().padStart(2, "0");
    }

    if (!this.computingOnDemandSettings.dayOfMonth__UTC) {
      this._dayOfMonth__UTC = this._nativeDateObject.getUTCDate();
      this._dayOfMonth__2Digits__UTC = this._dayOfMonth__UTC.toString().padStart(2, "0");
    }

    if (!this.computingOnDemandSettings.dayOfWeek__local) {

      this._dayOfWeekNumber__numerationFrom0AsSunday__local = this._nativeDateObject.getDay();
      this._dayOfWeekNumber__numerationFrom1AsSunday__local = this._dayOfWeekNumber__numerationFrom0AsSunday__local + 1;
      this._dayOfWeekNumber__numerationFrom1AsSunday__2Digits__local =
          this._dayOfWeekNumber__numerationFrom1AsSunday__local.toString().padStart(2, "0");

      switch (this._dayOfWeekNumber__numerationFrom1AsSunday__local) {
        /* eslint-disable @typescript-eslint/no-magic-numbers --
         *  Currently there is no enumeration with number (from 1) of each day of week. */
        case 1: { this._dayOfWeek__local = DaysOfWeekNames.sunday; break; }
        case 2: { this._dayOfWeek__local = DaysOfWeekNames.monday; break; }
        case 3: { this._dayOfWeek__local = DaysOfWeekNames.tuesday; break; }
        case 4: { this._dayOfWeek__local = DaysOfWeekNames.wednesday; break; }
        case 5: { this._dayOfWeek__local = DaysOfWeekNames.thursday; break; }
        case 6: { this._dayOfWeek__local = DaysOfWeekNames.friday; break; }
        default: { this._dayOfWeek__local = DaysOfWeekNames.saturday; }
        /* eslint-enable @typescript-eslint/no-magic-numbers */
      }

    }

    if (!this.computingOnDemandSettings.dayOfWeek__UTC) {

      this._dayOfWeekNumber__numerationFrom0AsSunday__UTC = this._nativeDateObject.getUTCDay();
      this._dayOfWeekNumber__numerationFrom1AsSunday__UTC = this._dayOfWeekNumber__numerationFrom0AsSunday__UTC + 1;
      this._dayOfWeekNumber__numerationFrom1AsSunday__2Digits__UTC =
          this._dayOfWeekNumber__numerationFrom1AsSunday__UTC.toString().padStart(2, "0");

      switch (this._dayOfWeekNumber__numerationFrom1AsSunday__UTC) {
          /* eslint-disable @typescript-eslint/no-magic-numbers --
           *  Currently there is no enumeration with number (from 0) of each day of week. */
        case 1: { this._dayOfWeek__UTC = DaysOfWeekNames.sunday; break; }
        case 2: { this._dayOfWeek__UTC = DaysOfWeekNames.monday; break; }
        case 3: { this._dayOfWeek__UTC = DaysOfWeekNames.tuesday; break; }
        case 4: { this._dayOfWeek__UTC = DaysOfWeekNames.wednesday; break; }
        case 5: { this._dayOfWeek__UTC = DaysOfWeekNames.thursday; break; }
        case 6: { this._dayOfWeek__UTC = DaysOfWeekNames.friday; break; }
        default: { this._dayOfWeek__UTC = DaysOfWeekNames.saturday; }
          /* eslint-enable @typescript-eslint/no-magic-numbers */
      }

    }

    if (!this.computingOnDemandSettings.hours__local) {

      this._hours__24Format__local = this._nativeDateObject.getHours();
      this._hours__24Format__2Digits__local = this._hours__24Format__local.toString().padStart(2, "0");

      this._isBeforeMidday__local = this._hours__24Format__local < 13;
      this._isAfterMidday__local = !this._isBeforeMidday__local;

      if (this._hours__24Format__local === 0) {
        this._hours__12Format__local = 12;
      } else if (this._hours__24Format__local < 13) {
        this._hours__12Format__local = this._hours__24Format__local;
      } else {
        this._hours__12Format__local = this._hours__24Format__local - 12;
      }

    }

    if (!this.computingOnDemandSettings.hours__UTC) {

      this._hours__24Format__UTC = this._nativeDateObject.getUTCHours();
      this._hours__24Format__2Digits__UTC = this._hours__24Format__UTC.toString().padStart(2, "0");

      this._isBeforeMidday__UTC = this._hours__24Format__UTC < 13;
      this._isAfterMidday__UTC = !this._isBeforeMidday__UTC;

      if (this._hours__24Format__UTC === 0) {
        this._hours__12Format__UTC = 12;
      } else if (this._hours__24Format__UTC < 13) {
        this._hours__12Format__UTC = this._hours__24Format__UTC;
      } else {
        this._hours__12Format__UTC = this._hours__24Format__UTC - 12;
      }

    }

    if (!this.computingOnDemandSettings.minutes__local) {
      this._minutes__local = this._nativeDateObject.getMinutes();
      this._minutes__2Digits__local = this._minutes__local.toString().padStart(2, "0");
    }

    if (!this.computingOnDemandSettings.minutes__UTC) {
      this._minutes__UTC = this._nativeDateObject.getUTCMinutes();
      this._minutes__2Digits__UTC = this._minutes__UTC.toString().padStart(2, "0");
    }

    if (!this.computingOnDemandSettings.seconds__local) {
      this._seconds__local = this._nativeDateObject.getSeconds();
      this._seconds__2Digits__local = this._seconds__local.toString().padStart(2, "0");
    }

    if (!this.computingOnDemandSettings.seconds__UTC) {
      this._seconds__UTC = this._nativeDateObject.getUTCSeconds();
      this._seconds__2Digits__UTC = this._seconds__UTC.toString().padStart(2, "0");
    }

    if (!this.computingOnDemandSettings.milliseconds__local) {
      this._milliseconds__local = this._nativeDateObject.getMilliseconds();
    }

    if (!this.computingOnDemandSettings.milliseconds__UTC) {
      this._milliseconds__UTC = this._nativeDateObject.getUTCMilliseconds();
    }

  }


  /* ─── Routines ─────────────────────────────────────────────────────────────────────────────────────────────────── */
  protected static normalizeDateTimeDefinition(dateTimeDefinition: TimePoint.DateTimeDefinition): Date {

    let normalizedDateTime: Date;

    if ("ISO8601String" in dateTimeDefinition) {

      normalizedDateTime = new Date(dateTimeDefinition.ISO8601String);

      if (normalizedDateTime.toString() === "Invalid Date") {
        Logger.throwErrorAndLog({
          errorInstance: new InvalidParameterValueError({
            customMessage:
                `The passed value "${ dateTimeDefinition.ISO8601String }" of "ISO8601String" is not valid ISO8601 ` +
                "string."
          }),
          title: InvalidParameterValueError.localization.defaultTitle,
          occurrenceLocation: "TimePoint.normalizeDateTimeDefinition(dateTimeDefinition)"
        });
      }

      return normalizedDateTime;

    }


    if ("millisecondsElapsedSinceUNIX_Epoch" in dateTimeDefinition) {

      normalizedDateTime = new Date(dateTimeDefinition.millisecondsElapsedSinceUNIX_Epoch);

      if (normalizedDateTime.toString() === "Invalid Date") {
        Logger.throwErrorAndLog({
          errorInstance: new InvalidParameterValueError({
            customMessage:
                `The passed value ${ dateTimeDefinition.millisecondsElapsedSinceUNIX_Epoch } of ` +
                  "is not the valid amount of milliseconds elapsed since UNIX Epoch."
          }),
          title: InvalidParameterValueError.localization.defaultTitle,
          occurrenceLocation: "TimePoint.normalizeDateTimeDefinition(dateTimeDefinition)"
        });
      }


      return normalizedDateTime;

    }


    if ("nativeDateObject" in dateTimeDefinition) {
      return new Date(dateTimeDefinition.nativeDateObject);
    }


    let monthNumber__numerationFrom0: number;

    if ("monthName" in dateTimeDefinition) {
      monthNumber__numerationFrom0 =
          getMonthNumberByName({ targetMonthName: dateTimeDefinition.monthName, numerationFrom: 0 });
    } else if ("monthNumber__numerationFrom1" in dateTimeDefinition) {
      monthNumber__numerationFrom0 = dateTimeDefinition.monthNumber__numerationFrom1 - 1;
    } else {
      monthNumber__numerationFrom0 = dateTimeDefinition.monthNumber__numerationFrom0;
    }

    normalizedDateTime =
        dateTimeDefinition.isLocal ?
            new Date(
              dateTimeDefinition.year,
              monthNumber__numerationFrom0,
              dateTimeDefinition.dayOfMonth,
              dateTimeDefinition.hours,
              dateTimeDefinition.minutes,
              dateTimeDefinition.seconds,
              dateTimeDefinition.milliseconds
            ) :
            new Date(
              Date.UTC(
                dateTimeDefinition.year,
                monthNumber__numerationFrom0,
                dateTimeDefinition.dayOfMonth,
                dateTimeDefinition.hours,
                dateTimeDefinition.minutes,
                dateTimeDefinition.seconds,
                dateTimeDefinition.milliseconds
              )
            );

    // TODO その他
    // TODO DWTとの書き方の統一
    if (normalizedDateTime.toString() === "Invalid Date") {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          customMessage:
              "Below date and time definition does not corresponding to valid Date object." +
              ` ●                      Year: ${ dateTimeDefinition.year }` +
              ` ● Month (numeration from 0): ${ monthNumber__numerationFrom0 }` +
              ` ●              Day of month: ${ dateTimeDefinition.dayOfMonth }`
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "TimePoint.normalizeDateTimeDefinition(dateTimeDefinition)"
      });
    }


    return normalizedDateTime;

  }

  protected static normalizeComputingOnDemandOptions(
    computingOnDemandSettings?: Partial<TimePoint.ComputingOnDemandSettings> | boolean
  ): Required<TimePoint.ComputingOnDemandSettings> {
    return {
      ...isBoolean(computingOnDemandSettings) ?
          {
            year__local: computingOnDemandSettings,
            year__UTC: computingOnDemandSettings,
            month__local: computingOnDemandSettings,
            month__UTC: computingOnDemandSettings,
            dayOfMonth__local: computingOnDemandSettings,
            dayOfMonth__UTC: computingOnDemandSettings,
            dayOfWeek__local: computingOnDemandSettings,
            dayOfWeek__UTC: computingOnDemandSettings,
            hours__local: computingOnDemandSettings,
            hours__UTC: computingOnDemandSettings,
            minutes__local: computingOnDemandSettings,
            minutes__UTC: computingOnDemandSettings,
            seconds__local: computingOnDemandSettings,
            seconds__UTC: computingOnDemandSettings,
            milliseconds__local: computingOnDemandSettings,
            milliseconds__UTC: computingOnDemandSettings
          } :
          {
            year__local: computingOnDemandSettings?.year__local ?? false,
            year__UTC: computingOnDemandSettings?.year__UTC ?? false,
            month__local: computingOnDemandSettings?.month__local ?? false,
            month__UTC: computingOnDemandSettings?.month__UTC ?? false,
            dayOfMonth__local: computingOnDemandSettings?.dayOfMonth__local ?? false,
            dayOfMonth__UTC: computingOnDemandSettings?.dayOfMonth__UTC ?? false,
            dayOfWeek__local: computingOnDemandSettings?.dayOfWeek__local ?? false,
            dayOfWeek__UTC: computingOnDemandSettings?.dayOfWeek__UTC ?? false,
            hours__local: computingOnDemandSettings?.hours__local ?? false,
            hours__UTC: computingOnDemandSettings?.hours__UTC ?? false,
            minutes__local: computingOnDemandSettings?.minutes__local ?? false,
            minutes__UTC: computingOnDemandSettings?.minutes__UTC ?? false,
            seconds__local: computingOnDemandSettings?.seconds__local ?? false,
            seconds__UTC: computingOnDemandSettings?.seconds__UTC ?? false,
            milliseconds__local: computingOnDemandSettings?.milliseconds__local ?? false,
            milliseconds__UTC: computingOnDemandSettings?.milliseconds__UTC ?? false
          }
    };
  }

}


namespace TimePoint {

  export type DateTimeDefinition = Readonly<
    { ISO8601String: string; } |
    { millisecondsElapsedSinceUNIX_Epoch: number; } |
    { nativeDateObject: Date; } |
    DateTimeDefinition.ClearAPI
  >;

  export namespace DateTimeDefinition {

    export type ClearAPI =
      Readonly<{
        year: number;
        dayOfMonth: number;
        hours: number;
        minutes: number;
        seconds: number;
        milliseconds: number;
        isLocal: boolean;
      }> &
      Month;

    export type Month = Readonly<
      { monthName: MonthsNames; } |
      { monthNumber__numerationFrom0: number; } |
      { monthNumber__numerationFrom1: number; }
    >;

  }

  export type ComputingOnDemandSettings = Readonly<{
    year__local: boolean;
    year__UTC: boolean;
    month__local: boolean;
    month__UTC: boolean;
    dayOfMonth__local: boolean;
    dayOfMonth__UTC: boolean;
    dayOfWeek__local: boolean;
    dayOfWeek__UTC: boolean;
    hours__local: boolean;
    hours__UTC: boolean;
    minutes__local: boolean;
    minutes__UTC: boolean;
    seconds__local: boolean;
    seconds__UTC: boolean;
    milliseconds__local: boolean;
    milliseconds__UTC: boolean;
  }>;

}


export default TimePoint;
