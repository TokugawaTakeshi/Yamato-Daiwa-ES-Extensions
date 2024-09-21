import DateWithoutTime from "./DateWithoutTime";
import isBoolean from "../TypeGuards/isBoolean";
import isNotNull from "../TypeGuards/Nullables/isNotNull";


class TimePoint extends DateWithoutTime {

  /* ━━━ Protected Fields ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  // < =================================================================================================================
  /* eslint-disable no-underscore-dangle -- [ Convention ]
   * The underscored fields MUST be changes ONLY via `nativeDateObject` setter. */
  protected _hours__24Format: number | null = null;
  protected _hours__24Format__2Digits: string | null = null;
  protected _hours__12Format: number | null = null;
  protected _isBeforeMidday: boolean | null = null;
  protected _isAfterMidday: boolean | null = null;

  protected _minutes: number | null = null;
  protected _minutes__2Digits: string | null = null;

  protected _seconds: number | null = null;
  protected _seconds__2Digits: string | null = null;

  protected _milliseconds: number | null = null;
  // > =================================================================================================================

  protected computingOnDemandSettings: TimePoint.ComputingOnDemandSettings;


  /* ━━━ Constructor ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public constructor(
    sourceDataAndOptions:
        TimePoint.DateTimeDefinition &
        Readonly<{ computingOnDemand?: TimePoint.ComputingOnDemandSettings | boolean; }>
  ) {

    super(sourceDataAndOptions);

    this.computingOnDemandSettings = TimePoint.normalizeComputingOnDemandOptions(sourceDataAndOptions.computingOnDemand);
    this.nativeDateObject = TimePoint.normalizeDateTimeDefinition(sourceDataAndOptions);

  }


  /* ━━━ Public Accessors ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public get hours__24Format(): number {
    return this._hours__24Format ?? (this._hours__24Format = this._nativeDateObject.getHours());
  }

  public get hours__24Format__2Digits(): string {
    return this._monthNumber__numerationFrom1__2Digits ??
        (this._monthNumber__numerationFrom1__2Digits = this._nativeDateObject.getHours().toString().padStart(2, "0"));
  }

  public get hours__12Format(): number {

    if (isNotNull(this._hours__12Format)) {
      return this._hours__12Format;
    }


    const hours__24Format: number = this._nativeDateObject.getHours();

    if (hours__24Format === 0) {
      return this._hours__12Format = 12;
    }


    if (hours__24Format < 13) {
      return this._hours__12Format = hours__24Format;
    }


    return this._hours__12Format = hours__24Format - 12;

  }

  public get isBeforeMidday(): boolean {
    return this._isBeforeMidday ?? (this._isBeforeMidday = this._nativeDateObject.getTime() < 13);
  }

  public get isAfterMidday(): boolean {
    return this._isAfterMidday ?? (this._isAfterMidday = this._nativeDateObject.getTime() >= 13);
  }

  public get minutes(): number {
    return this._minutes ?? (this._minutes = this._nativeDateObject.getMinutes());
  }

  public get minutes__2Digits(): string {
    return this._minutes__2Digits ?? (
      this._minutes__2Digits = this._nativeDateObject.
          getMinutes().
          toString().
          padStart(2, "0")
    );
  }

  public get seconds(): number {
    return this._seconds ?? (this._seconds = this._nativeDateObject.getSeconds());
  }

  public get seconds__2Digits(): string {
    return this._seconds__2Digits ?? (
      this._seconds__2Digits = this._nativeDateObject.
          getSeconds().
          toString().
          padStart(2, "0")
    );
  }

  public get milliseconds(): number {
    return this._milliseconds ?? (this._milliseconds = this._nativeDateObject.getMilliseconds());
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

    this.computingOnDemandSettings = TimePoint.normalizeComputingOnDemandOptions(
      sourceDataAndOptions.computingOnDemand
    );

    if (sourceDataAndOptions.mutably) {
      this.nativeDateObject = TimePoint.normalizeDateTimeDefinition(sourceDataAndOptions);
      return this;
    }


    return new TimePoint(sourceDataAndOptions);

  }


  /* ━━━ Mutating ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  protected set nativeDateObject(newValue: Date) {

    super.nativeDateObject = newValue;

    if (this.computingOnDemandSettings.hours) {

      this._hours__24Format = null;
      this._hours__24Format__2Digits = null;

      this._isBeforeMidday = null;
      this._isAfterMidday = null;

      this._hours__12Format = null;

    } else {

      this._hours__24Format = this._nativeDateObject.getHours();
      this._hours__24Format__2Digits = this._hours__24Format.toString().padStart(2, "0");

      this._isBeforeMidday = this._hours__24Format < 13;
      this._isAfterMidday = !this._isBeforeMidday;

      if (this._hours__24Format === 0) {
        this._hours__12Format = 12;
      } else if (this._hours__24Format < 13) {
        this._hours__12Format = this._hours__24Format;
      } else {
        this._hours__12Format = this._hours__24Format - 12;
      }

    }

    if (this.computingOnDemandSettings.minutes) {
      this._minutes = null;
      this._minutes__2Digits = null;
    } else {
      this._minutes = this._nativeDateObject.getMinutes();
      this._minutes__2Digits = this._minutes.toString().padStart(2, "0");
    }

    if (this.computingOnDemandSettings.seconds) {
      this._seconds = null;
      this._seconds__2Digits = null;
    } else {
      this._seconds = this._nativeDateObject.getSeconds();
      this._seconds__2Digits = this._seconds.toString().padStart(2, "0");
    }

    this._milliseconds = this.computingOnDemandSettings.milliseconds ?
        null : this._nativeDateObject.getMilliseconds();

  }


  protected static normalizeDateTimeDefinition(dateTimeDefinition: TimePoint.DateTimeDefinition): Date {

    const normalizedDateTime: Date = DateWithoutTime.normalizeDateDefinition(dateTimeDefinition);

    if (
      ("ISO8601String" in dateTimeDefinition) ||
      ("millisecondsElapsedSinceUNIX_Epoch" in dateTimeDefinition) ||
      ("nativeDateObject" in dateTimeDefinition)
    ) {
      return normalizedDateTime;
    }


    normalizedDateTime.setHours(dateTimeDefinition.hours);
    normalizedDateTime.setMinutes(dateTimeDefinition.minutes);
    normalizedDateTime.setSeconds(dateTimeDefinition.seconds);
    normalizedDateTime.setMilliseconds(dateTimeDefinition.milliseconds);

    return normalizedDateTime;

  }

  protected static normalizeComputingOnDemandOptions(
    computingOnDemandSettings?: Partial<TimePoint.ComputingOnDemandSettings> | boolean
  ): Required<TimePoint.ComputingOnDemandSettings> {
    return {
      ...DateWithoutTime.normalizeComputingOnDemandOptions(computingOnDemandSettings),
      ...isBoolean(computingOnDemandSettings) ?
          {
            hours: computingOnDemandSettings,
            minutes: computingOnDemandSettings,
            seconds: computingOnDemandSettings,
            milliseconds: computingOnDemandSettings
          } :
          {
            hours: computingOnDemandSettings?.hours ?? false,
            minutes: computingOnDemandSettings?.minutes ?? false,
            seconds: computingOnDemandSettings?.seconds ?? false,
            milliseconds: computingOnDemandSettings?.milliseconds ?? false
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
        DateWithoutTime.DateDefinition.ClearAPI &
        Readonly<{
          hours: number;
          minutes: number;
          seconds: number;
          milliseconds: number;
        }>;

  }


  export type ComputingOnDemandSettings =
      DateWithoutTime.ComputingOnDemandSettings &
      ComputingOnDemandSettings.TimeFields;

  export namespace ComputingOnDemandSettings {
    export type TimeFields = Readonly<{
      hours: boolean;
      minutes: boolean;
      seconds: boolean;
      milliseconds: boolean;
    }>;
  }

}


export default TimePoint;
