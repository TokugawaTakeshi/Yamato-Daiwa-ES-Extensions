import Assert from "assert";
import { describe } from "mocha";
import { CalendarBuilder } from "../../../Source";
import { DaysOfWeekNames, MonthsNames } from "fundamental-constants";


describe("CalendarBuilder", (): void => {

  describe("The month with Monday at 1st date", (): void => {

    it(
      "Week begins from Sunday",
      (): void => {

        /*
          31 1  2  3  4  5  6
          7  8  9  10 11 12 13
          14 15 16 17 18 19 20
          21 22 23 24 25 26 27
          28 29 30 1  2  3  4
         */
        const dataFor42DaysMatrix: Array<CalendarBuilder.CalendarCellData> = CalendarBuilder.generateDataFor42DaysMatrix({
          targetYear: 2024,
          targetMonthName: MonthsNames.april,
          firstDayOfWeek: DaysOfWeekNames.sunday
        });

        Assert.deepStrictEqual<Array<CalendarBuilder.CalendarCellData>>(
          dataFor42DaysMatrix,
          [

            /* === First week === */
            {
              year: 2024,
              monthName: MonthsNames.march,
              monthNumber__numerationFrom0: 2,
              monthNumber__numerationFrom1: 3,
              dayOfMonth: 31,
              dayOfWeekName: DaysOfWeekNames.sunday,
              dayOfWeekNumber__numerationFrom0ForSunday: 0
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 1,
              dayOfWeekName: DaysOfWeekNames.monday,
              dayOfWeekNumber__numerationFrom0ForSunday: 1
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 2,
              dayOfWeekName: DaysOfWeekNames.tuesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 2
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 3,
              dayOfWeekName: DaysOfWeekNames.wednesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 3
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 4,
              dayOfWeekName: DaysOfWeekNames.thursday,
              dayOfWeekNumber__numerationFrom0ForSunday: 4
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 5,
              dayOfWeekName: DaysOfWeekNames.friday,
              dayOfWeekNumber__numerationFrom0ForSunday: 5
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 6,
              dayOfWeekName: DaysOfWeekNames.saturday,
              dayOfWeekNumber__numerationFrom0ForSunday: 6
            },

            /* === 2nd week === */
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 7,
              dayOfWeekName: DaysOfWeekNames.sunday,
              dayOfWeekNumber__numerationFrom0ForSunday: 0
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 8,
              dayOfWeekName: DaysOfWeekNames.monday,
              dayOfWeekNumber__numerationFrom0ForSunday: 1
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 9,
              dayOfWeekName: DaysOfWeekNames.tuesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 2
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 10,
              dayOfWeekName: DaysOfWeekNames.wednesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 3
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 11,
              dayOfWeekName: DaysOfWeekNames.thursday,
              dayOfWeekNumber__numerationFrom0ForSunday: 4
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 12,
              dayOfWeekName: DaysOfWeekNames.friday,
              dayOfWeekNumber__numerationFrom0ForSunday: 5
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 13,
              dayOfWeekName: DaysOfWeekNames.saturday,
              dayOfWeekNumber__numerationFrom0ForSunday: 6
            },

            /* === 3rd week === */
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 14,
              dayOfWeekName: DaysOfWeekNames.sunday,
              dayOfWeekNumber__numerationFrom0ForSunday: 0
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 15,
              dayOfWeekName: DaysOfWeekNames.monday,
              dayOfWeekNumber__numerationFrom0ForSunday: 1
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 16,
              dayOfWeekName: DaysOfWeekNames.tuesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 2
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 17,
              dayOfWeekName: DaysOfWeekNames.wednesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 3
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 18,
              dayOfWeekName: DaysOfWeekNames.thursday,
              dayOfWeekNumber__numerationFrom0ForSunday: 4
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 19,
              dayOfWeekName: DaysOfWeekNames.friday,
              dayOfWeekNumber__numerationFrom0ForSunday: 5
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 20,
              dayOfWeekName: DaysOfWeekNames.saturday,
              dayOfWeekNumber__numerationFrom0ForSunday: 6
            },

            /* === 4th week === */
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 21,
              dayOfWeekName: DaysOfWeekNames.sunday,
              dayOfWeekNumber__numerationFrom0ForSunday: 0
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 22,
              dayOfWeekName: DaysOfWeekNames.monday,
              dayOfWeekNumber__numerationFrom0ForSunday: 1
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 23,
              dayOfWeekName: DaysOfWeekNames.tuesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 2
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 24,
              dayOfWeekName: DaysOfWeekNames.wednesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 3
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 25,
              dayOfWeekName: DaysOfWeekNames.thursday,
              dayOfWeekNumber__numerationFrom0ForSunday: 4
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 26,
              dayOfWeekName: DaysOfWeekNames.friday,
              dayOfWeekNumber__numerationFrom0ForSunday: 5
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 27,
              dayOfWeekName: DaysOfWeekNames.saturday,
              dayOfWeekNumber__numerationFrom0ForSunday: 6
            },


            /* === 5th week === */
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 28,
              dayOfWeekName: DaysOfWeekNames.sunday,
              dayOfWeekNumber__numerationFrom0ForSunday: 0
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 29,
              dayOfWeekName: DaysOfWeekNames.monday,
              dayOfWeekNumber__numerationFrom0ForSunday: 1
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 30,
              dayOfWeekName: DaysOfWeekNames.tuesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 2
            },
            {
              year: 2024,
              monthName: MonthsNames.may,
              monthNumber__numerationFrom0: 4,
              monthNumber__numerationFrom1: 5,
              dayOfMonth: 1,
              dayOfWeekName: DaysOfWeekNames.wednesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 3
            },
            {
              year: 2024,
              monthName: MonthsNames.may,
              monthNumber__numerationFrom0: 4,
              monthNumber__numerationFrom1: 5,
              dayOfMonth: 2,
              dayOfWeekName: DaysOfWeekNames.thursday,
              dayOfWeekNumber__numerationFrom0ForSunday: 4
            },
            {
              year: 2024,
              monthName: MonthsNames.may,
              monthNumber__numerationFrom0: 4,
              monthNumber__numerationFrom1: 5,
              dayOfMonth: 3,
              dayOfWeekName: DaysOfWeekNames.friday,
              dayOfWeekNumber__numerationFrom0ForSunday: 5
            },
            {
              year: 2024,
              monthName: MonthsNames.may,
              monthNumber__numerationFrom0: 4,
              monthNumber__numerationFrom1: 5,
              dayOfMonth: 4,
              dayOfWeekName: DaysOfWeekNames.saturday,
              dayOfWeekNumber__numerationFrom0ForSunday: 6
            },

            /* === 6th week === */
            {
              year: 2024,
              monthName: MonthsNames.may,
              monthNumber__numerationFrom0: 4,
              monthNumber__numerationFrom1: 5,
              dayOfMonth: 5,
              dayOfWeekName: DaysOfWeekNames.sunday,
              dayOfWeekNumber__numerationFrom0ForSunday: 0
            },
            {
              year: 2024,
              monthName: MonthsNames.may,
              monthNumber__numerationFrom0: 4,
              monthNumber__numerationFrom1: 5,
              dayOfMonth: 6,
              dayOfWeekName: DaysOfWeekNames.monday,
              dayOfWeekNumber__numerationFrom0ForSunday: 1
            },
            {
              year: 2024,
              monthName: MonthsNames.may,
              monthNumber__numerationFrom0: 4,
              monthNumber__numerationFrom1: 5,
              dayOfMonth: 7,
              dayOfWeekName: DaysOfWeekNames.tuesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 2
            },
            {
              year: 2024,
              monthName: MonthsNames.may,
              monthNumber__numerationFrom0: 4,
              monthNumber__numerationFrom1: 5,
              dayOfMonth: 8,
              dayOfWeekName: DaysOfWeekNames.wednesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 3
            },
            {
              year: 2024,
              monthName: MonthsNames.may,
              monthNumber__numerationFrom0: 4,
              monthNumber__numerationFrom1: 5,
              dayOfMonth: 9,
              dayOfWeekName: DaysOfWeekNames.thursday,
              dayOfWeekNumber__numerationFrom0ForSunday: 4
            },
            {
              year: 2024,
              monthName: MonthsNames.may,
              monthNumber__numerationFrom0: 4,
              monthNumber__numerationFrom1: 5,
              dayOfMonth: 10,
              dayOfWeekName: DaysOfWeekNames.friday,
              dayOfWeekNumber__numerationFrom0ForSunday: 5
            },
            {
              year: 2024,
              monthName: MonthsNames.may,
              monthNumber__numerationFrom0: 4,
              monthNumber__numerationFrom1: 5,
              dayOfMonth: 11,
              dayOfWeekName: DaysOfWeekNames.saturday,
              dayOfWeekNumber__numerationFrom0ForSunday: 6
            }

          ]
        );

      }

    );

    it(
      "Week begins from Monday",
      (): void => {

        /*
          1  2  3  4  5  6  7
          8  9  10 11 12 13 14
          15 16 17 18 19 20 21
          22 23 24 25 26 27 28
          29 30 1  2  3  4  5
         */
        const dataFor42DaysMatrix: Array<CalendarBuilder.CalendarCellData> = CalendarBuilder.generateDataFor42DaysMatrix({
          targetYear: 2024,
          targetMonthName: MonthsNames.april,
          firstDayOfWeek: DaysOfWeekNames.monday
        });

        Assert.deepStrictEqual<Array<CalendarBuilder.CalendarCellData>>(
          dataFor42DaysMatrix,
          [

            /* === First week === */
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 1,
              dayOfWeekName: DaysOfWeekNames.monday,
              dayOfWeekNumber__numerationFrom0ForSunday: 1
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 2,
              dayOfWeekName: DaysOfWeekNames.tuesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 2
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 3,
              dayOfWeekName: DaysOfWeekNames.wednesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 3
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 4,
              dayOfWeekName: DaysOfWeekNames.thursday,
              dayOfWeekNumber__numerationFrom0ForSunday: 4
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 5,
              dayOfWeekName: DaysOfWeekNames.friday,
              dayOfWeekNumber__numerationFrom0ForSunday: 5
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 6,
              dayOfWeekName: DaysOfWeekNames.saturday,
              dayOfWeekNumber__numerationFrom0ForSunday: 6
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 7,
              dayOfWeekName: DaysOfWeekNames.sunday,
              dayOfWeekNumber__numerationFrom0ForSunday: 0
            },

            /* === 2nd week === */
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 8,
              dayOfWeekName: DaysOfWeekNames.monday,
              dayOfWeekNumber__numerationFrom0ForSunday: 1
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 9,
              dayOfWeekName: DaysOfWeekNames.tuesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 2
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 10,
              dayOfWeekName: DaysOfWeekNames.wednesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 3
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 11,
              dayOfWeekName: DaysOfWeekNames.thursday,
              dayOfWeekNumber__numerationFrom0ForSunday: 4
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 12,
              dayOfWeekName: DaysOfWeekNames.friday,
              dayOfWeekNumber__numerationFrom0ForSunday: 5
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 13,
              dayOfWeekName: DaysOfWeekNames.saturday,
              dayOfWeekNumber__numerationFrom0ForSunday: 6
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 14,
              dayOfWeekName: DaysOfWeekNames.sunday,
              dayOfWeekNumber__numerationFrom0ForSunday: 0
            },

            /* === 3rd week === */
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 15,
              dayOfWeekName: DaysOfWeekNames.monday,
              dayOfWeekNumber__numerationFrom0ForSunday: 1
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 16,
              dayOfWeekName: DaysOfWeekNames.tuesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 2
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 17,
              dayOfWeekName: DaysOfWeekNames.wednesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 3
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 18,
              dayOfWeekName: DaysOfWeekNames.thursday,
              dayOfWeekNumber__numerationFrom0ForSunday: 4
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 19,
              dayOfWeekName: DaysOfWeekNames.friday,
              dayOfWeekNumber__numerationFrom0ForSunday: 5
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 20,
              dayOfWeekName: DaysOfWeekNames.saturday,
              dayOfWeekNumber__numerationFrom0ForSunday: 6
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 21,
              dayOfWeekName: DaysOfWeekNames.sunday,
              dayOfWeekNumber__numerationFrom0ForSunday: 0
            },

            /* === 4th week === */
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 22,
              dayOfWeekName: DaysOfWeekNames.monday,
              dayOfWeekNumber__numerationFrom0ForSunday: 1
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 23,
              dayOfWeekName: DaysOfWeekNames.tuesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 2
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 24,
              dayOfWeekName: DaysOfWeekNames.wednesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 3
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 25,
              dayOfWeekName: DaysOfWeekNames.thursday,
              dayOfWeekNumber__numerationFrom0ForSunday: 4
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 26,
              dayOfWeekName: DaysOfWeekNames.friday,
              dayOfWeekNumber__numerationFrom0ForSunday: 5
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 27,
              dayOfWeekName: DaysOfWeekNames.saturday,
              dayOfWeekNumber__numerationFrom0ForSunday: 6
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 28,
              dayOfWeekName: DaysOfWeekNames.sunday,
              dayOfWeekNumber__numerationFrom0ForSunday: 0
            },


            /* === 5th week === */
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 29,
              dayOfWeekName: DaysOfWeekNames.monday,
              dayOfWeekNumber__numerationFrom0ForSunday: 1
            },
            {
              year: 2024,
              monthName: MonthsNames.april,
              monthNumber__numerationFrom0: 3,
              monthNumber__numerationFrom1: 4,
              dayOfMonth: 30,
              dayOfWeekName: DaysOfWeekNames.tuesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 2
            },
            {
              year: 2024,
              monthName: MonthsNames.may,
              monthNumber__numerationFrom0: 4,
              monthNumber__numerationFrom1: 5,
              dayOfMonth: 1,
              dayOfWeekName: DaysOfWeekNames.wednesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 3
            },
            {
              year: 2024,
              monthName: MonthsNames.may,
              monthNumber__numerationFrom0: 4,
              monthNumber__numerationFrom1: 5,
              dayOfMonth: 2,
              dayOfWeekName: DaysOfWeekNames.thursday,
              dayOfWeekNumber__numerationFrom0ForSunday: 4
            },
            {
              year: 2024,
              monthName: MonthsNames.may,
              monthNumber__numerationFrom0: 4,
              monthNumber__numerationFrom1: 5,
              dayOfMonth: 3,
              dayOfWeekName: DaysOfWeekNames.friday,
              dayOfWeekNumber__numerationFrom0ForSunday: 5
            },
            {
              year: 2024,
              monthName: MonthsNames.may,
              monthNumber__numerationFrom0: 4,
              monthNumber__numerationFrom1: 5,
              dayOfMonth: 4,
              dayOfWeekName: DaysOfWeekNames.saturday,
              dayOfWeekNumber__numerationFrom0ForSunday: 6
            },
            {
              year: 2024,
              monthName: MonthsNames.may,
              monthNumber__numerationFrom0: 4,
              monthNumber__numerationFrom1: 5,
              dayOfMonth: 5,
              dayOfWeekName: DaysOfWeekNames.sunday,
              dayOfWeekNumber__numerationFrom0ForSunday: 0
            },

            /* === 6th week === */
            {
              year: 2024,
              monthName: MonthsNames.may,
              monthNumber__numerationFrom0: 4,
              monthNumber__numerationFrom1: 5,
              dayOfMonth: 6,
              dayOfWeekName: DaysOfWeekNames.monday,
              dayOfWeekNumber__numerationFrom0ForSunday: 1
            },
            {
              year: 2024,
              monthName: MonthsNames.may,
              monthNumber__numerationFrom0: 4,
              monthNumber__numerationFrom1: 5,
              dayOfMonth: 7,
              dayOfWeekName: DaysOfWeekNames.tuesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 2
            },
            {
              year: 2024,
              monthName: MonthsNames.may,
              monthNumber__numerationFrom0: 4,
              monthNumber__numerationFrom1: 5,
              dayOfMonth: 8,
              dayOfWeekName: DaysOfWeekNames.wednesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 3
            },
            {
              year: 2024,
              monthName: MonthsNames.may,
              monthNumber__numerationFrom0: 4,
              monthNumber__numerationFrom1: 5,
              dayOfMonth: 9,
              dayOfWeekName: DaysOfWeekNames.thursday,
              dayOfWeekNumber__numerationFrom0ForSunday: 4
            },
            {
              year: 2024,
              monthName: MonthsNames.may,
              monthNumber__numerationFrom0: 4,
              monthNumber__numerationFrom1: 5,
              dayOfMonth: 10,
              dayOfWeekName: DaysOfWeekNames.friday,
              dayOfWeekNumber__numerationFrom0ForSunday: 5
            },
            {
              year: 2024,
              monthName: MonthsNames.may,
              monthNumber__numerationFrom0: 4,
              monthNumber__numerationFrom1: 5,
              dayOfMonth: 11,
              dayOfWeekName: DaysOfWeekNames.saturday,
              dayOfWeekNumber__numerationFrom0ForSunday: 6
            },
            {
              year: 2024,
              monthName: MonthsNames.may,
              monthNumber__numerationFrom0: 4,
              monthNumber__numerationFrom1: 5,
              dayOfMonth: 12,
              dayOfWeekName: DaysOfWeekNames.sunday,
              dayOfWeekNumber__numerationFrom0ForSunday: 0
            }

          ]
        );

      }
    );

  });

  describe("The month with 29 days", (): void => {

    it(
      "Week begins from Sunday",
      (): void => {

        /*
           29 30 31 1  2  3  4
           5  6  7  8  9  10 11
           12 13 14 15 16 17 18
           19 20 21 22 23 24 25
           26 27 28 1  2  3  4
           5  6  7  8  9  10 11
         */
        const dataFor42DaysMatrix: Array<CalendarBuilder.CalendarCellData> = CalendarBuilder.generateDataFor42DaysMatrix({
          targetYear: 2023,
          targetMonthName: MonthsNames.february,
          firstDayOfWeek: DaysOfWeekNames.sunday
        });

        Assert.deepStrictEqual<Array<CalendarBuilder.CalendarCellData>>(
          dataFor42DaysMatrix,
          [

             /* === First week === */
            {
              year: 2023,
              monthName: MonthsNames.january,
              monthNumber__numerationFrom0: 0,
              monthNumber__numerationFrom1: 1,
              dayOfMonth: 29,
              dayOfWeekName: DaysOfWeekNames.sunday,
              dayOfWeekNumber__numerationFrom0ForSunday: 0
            },
            {
              year: 2023,
              monthName: MonthsNames.january,
              monthNumber__numerationFrom0: 0,
              monthNumber__numerationFrom1: 1,
              dayOfMonth: 30,
              dayOfWeekName: DaysOfWeekNames.monday,
              dayOfWeekNumber__numerationFrom0ForSunday: 1
            },
            {
              year: 2023,
              monthName: MonthsNames.january,
              monthNumber__numerationFrom0: 0,
              monthNumber__numerationFrom1: 1,
              dayOfMonth: 31,
              dayOfWeekName: DaysOfWeekNames.tuesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 2
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 1,
              dayOfWeekName: DaysOfWeekNames.wednesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 3
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 2,
              dayOfWeekName: DaysOfWeekNames.thursday,
              dayOfWeekNumber__numerationFrom0ForSunday: 4
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 3,
              dayOfWeekName: DaysOfWeekNames.friday,
              dayOfWeekNumber__numerationFrom0ForSunday: 5
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 4,
              dayOfWeekName: DaysOfWeekNames.saturday,
              dayOfWeekNumber__numerationFrom0ForSunday: 6
            },

            /* === 2nd week === */
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 5,
              dayOfWeekName: DaysOfWeekNames.sunday,
              dayOfWeekNumber__numerationFrom0ForSunday: 0
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 6,
              dayOfWeekName: DaysOfWeekNames.monday,
              dayOfWeekNumber__numerationFrom0ForSunday: 1
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 7,
              dayOfWeekName: DaysOfWeekNames.tuesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 2
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 8,
              dayOfWeekName: DaysOfWeekNames.wednesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 3
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 9,
              dayOfWeekName: DaysOfWeekNames.thursday,
              dayOfWeekNumber__numerationFrom0ForSunday: 4
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 10,
              dayOfWeekName: DaysOfWeekNames.friday,
              dayOfWeekNumber__numerationFrom0ForSunday: 5
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 11,
              dayOfWeekName: DaysOfWeekNames.saturday,
              dayOfWeekNumber__numerationFrom0ForSunday: 6
            },

            /* === 3rd week === */
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 12,
              dayOfWeekName: DaysOfWeekNames.sunday,
              dayOfWeekNumber__numerationFrom0ForSunday: 0
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 13,
              dayOfWeekName: DaysOfWeekNames.monday,
              dayOfWeekNumber__numerationFrom0ForSunday: 1
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 14,
              dayOfWeekName: DaysOfWeekNames.tuesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 2
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 15,
              dayOfWeekName: DaysOfWeekNames.wednesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 3
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 16,
              dayOfWeekName: DaysOfWeekNames.thursday,
              dayOfWeekNumber__numerationFrom0ForSunday: 4
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 17,
              dayOfWeekName: DaysOfWeekNames.friday,
              dayOfWeekNumber__numerationFrom0ForSunday: 5
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 18,
              dayOfWeekName: DaysOfWeekNames.saturday,
              dayOfWeekNumber__numerationFrom0ForSunday: 6
            },

            /* === 4th week === */
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 19,
              dayOfWeekName: DaysOfWeekNames.sunday,
              dayOfWeekNumber__numerationFrom0ForSunday: 0
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 20,
              dayOfWeekName: DaysOfWeekNames.monday,
              dayOfWeekNumber__numerationFrom0ForSunday: 1
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 21,
              dayOfWeekName: DaysOfWeekNames.tuesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 2
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 22,
              dayOfWeekName: DaysOfWeekNames.wednesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 3
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 23,
              dayOfWeekName: DaysOfWeekNames.thursday,
              dayOfWeekNumber__numerationFrom0ForSunday: 4
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 24,
              dayOfWeekName: DaysOfWeekNames.friday,
              dayOfWeekNumber__numerationFrom0ForSunday: 5
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 25,
              dayOfWeekName: DaysOfWeekNames.saturday,
              dayOfWeekNumber__numerationFrom0ForSunday: 6
            },

            /* === 5th week === */
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 26,
              dayOfWeekName: DaysOfWeekNames.sunday,
              dayOfWeekNumber__numerationFrom0ForSunday: 0
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 27,
              dayOfWeekName: DaysOfWeekNames.monday,
              dayOfWeekNumber__numerationFrom0ForSunday: 1
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 28,
              dayOfWeekName: DaysOfWeekNames.tuesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 2
            },
            {
              year: 2023,
              monthName: MonthsNames.march,
              monthNumber__numerationFrom0: 2,
              monthNumber__numerationFrom1: 3,
              dayOfMonth: 1,
              dayOfWeekName: DaysOfWeekNames.wednesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 3
            },
            {
              year: 2023,
              monthName: MonthsNames.march,
              monthNumber__numerationFrom0: 2,
              monthNumber__numerationFrom1: 3,
              dayOfMonth: 2,
              dayOfWeekName: DaysOfWeekNames.thursday,
              dayOfWeekNumber__numerationFrom0ForSunday: 4
            },
            {
              year: 2023,
              monthName: MonthsNames.march,
              monthNumber__numerationFrom0: 2,
              monthNumber__numerationFrom1: 3,
              dayOfMonth: 3,
              dayOfWeekName: DaysOfWeekNames.friday,
              dayOfWeekNumber__numerationFrom0ForSunday: 5
            },
            {
              year: 2023,
              monthName: MonthsNames.march,
              monthNumber__numerationFrom0: 2,
              monthNumber__numerationFrom1: 3,
              dayOfMonth: 4,
              dayOfWeekName: DaysOfWeekNames.saturday,
              dayOfWeekNumber__numerationFrom0ForSunday: 6
            },

            /* === 6th week === */
            {
              year: 2023,
              monthName: MonthsNames.march,
              monthNumber__numerationFrom0: 2,
              monthNumber__numerationFrom1: 3,
              dayOfMonth: 5,
              dayOfWeekName: DaysOfWeekNames.sunday,
              dayOfWeekNumber__numerationFrom0ForSunday: 0
            },
            {
              year: 2023,
              monthName: MonthsNames.march,
              monthNumber__numerationFrom0: 2,
              monthNumber__numerationFrom1: 3,
              dayOfMonth: 6,
              dayOfWeekName: DaysOfWeekNames.monday,
              dayOfWeekNumber__numerationFrom0ForSunday: 1
            },
            {
              year: 2023,
              monthName: MonthsNames.march,
              monthNumber__numerationFrom0: 2,
              monthNumber__numerationFrom1: 3,
              dayOfMonth: 7,
              dayOfWeekName: DaysOfWeekNames.tuesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 2
            },
            {
              year: 2023,
              monthName: MonthsNames.march,
              monthNumber__numerationFrom0: 2,
              monthNumber__numerationFrom1: 3,
              dayOfMonth: 8,
              dayOfWeekName: DaysOfWeekNames.wednesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 3
            },
            {
              year: 2023,
              monthName: MonthsNames.march,
              monthNumber__numerationFrom0: 2,
              monthNumber__numerationFrom1: 3,
              dayOfMonth: 9,
              dayOfWeekName: DaysOfWeekNames.thursday,
              dayOfWeekNumber__numerationFrom0ForSunday: 4
            },
            {
              year: 2023,
              monthName: MonthsNames.march,
              monthNumber__numerationFrom0: 2,
              monthNumber__numerationFrom1: 3,
              dayOfMonth: 10,
              dayOfWeekName: DaysOfWeekNames.friday,
              dayOfWeekNumber__numerationFrom0ForSunday: 5
            },
            {
              year: 2023,
              monthName: MonthsNames.march,
              monthNumber__numerationFrom0: 2,
              monthNumber__numerationFrom1: 3,
              dayOfMonth: 11,
              dayOfWeekName: DaysOfWeekNames.saturday,
              dayOfWeekNumber__numerationFrom0ForSunday: 6
            }

          ]
        );

      }

    );

    it(
      "Week begins from Monday",
      (): void => {

        /*
         30 31 1  2  3  4  5
         6  7  8  9  10 11 12
         13 14 15 16 17 18 19
         20 21 22 23 24 25 26
         27 28 1  2  3  4  5
         6  7  8  9  10 11 12
         */
        const dataFor42DaysMatrix: Array<CalendarBuilder.CalendarCellData> = CalendarBuilder.generateDataFor42DaysMatrix({
          targetYear: 2023,
          targetMonthName: MonthsNames.february,
          firstDayOfWeek: DaysOfWeekNames.monday
        });

        Assert.deepStrictEqual<Array<CalendarBuilder.CalendarCellData>>(
          dataFor42DaysMatrix,
          [

            /* === First week === */
            {
              year: 2023,
              monthName: MonthsNames.january,
              monthNumber__numerationFrom0: 0,
              monthNumber__numerationFrom1: 1,
              dayOfMonth: 30,
              dayOfWeekName: DaysOfWeekNames.monday,
              dayOfWeekNumber__numerationFrom0ForSunday: 1
            },
            {
              year: 2023,
              monthName: MonthsNames.january,
              monthNumber__numerationFrom0: 0,
              monthNumber__numerationFrom1: 1,
              dayOfMonth: 31,
              dayOfWeekName: DaysOfWeekNames.tuesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 2
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 1,
              dayOfWeekName: DaysOfWeekNames.wednesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 3
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 2,
              dayOfWeekName: DaysOfWeekNames.thursday,
              dayOfWeekNumber__numerationFrom0ForSunday: 4
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 3,
              dayOfWeekName: DaysOfWeekNames.friday,
              dayOfWeekNumber__numerationFrom0ForSunday: 5
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 4,
              dayOfWeekName: DaysOfWeekNames.saturday,
              dayOfWeekNumber__numerationFrom0ForSunday: 6
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 5,
              dayOfWeekName: DaysOfWeekNames.sunday,
              dayOfWeekNumber__numerationFrom0ForSunday: 0
            },

            /* === 2nd week === */
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 6,
              dayOfWeekName: DaysOfWeekNames.monday,
              dayOfWeekNumber__numerationFrom0ForSunday: 1
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 7,
              dayOfWeekName: DaysOfWeekNames.tuesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 2
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 8,
              dayOfWeekName: DaysOfWeekNames.wednesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 3
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 9,
              dayOfWeekName: DaysOfWeekNames.thursday,
              dayOfWeekNumber__numerationFrom0ForSunday: 4
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 10,
              dayOfWeekName: DaysOfWeekNames.friday,
              dayOfWeekNumber__numerationFrom0ForSunday: 5
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 11,
              dayOfWeekName: DaysOfWeekNames.saturday,
              dayOfWeekNumber__numerationFrom0ForSunday: 6
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 12,
              dayOfWeekName: DaysOfWeekNames.sunday,
              dayOfWeekNumber__numerationFrom0ForSunday: 0
            },

            /* === 3rd week === */
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 13,
              dayOfWeekName: DaysOfWeekNames.monday,
              dayOfWeekNumber__numerationFrom0ForSunday: 1
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 14,
              dayOfWeekName: DaysOfWeekNames.tuesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 2
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 15,
              dayOfWeekName: DaysOfWeekNames.wednesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 3
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 16,
              dayOfWeekName: DaysOfWeekNames.thursday,
              dayOfWeekNumber__numerationFrom0ForSunday: 4
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 17,
              dayOfWeekName: DaysOfWeekNames.friday,
              dayOfWeekNumber__numerationFrom0ForSunday: 5
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 18,
              dayOfWeekName: DaysOfWeekNames.saturday,
              dayOfWeekNumber__numerationFrom0ForSunday: 6
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 19,
              dayOfWeekName: DaysOfWeekNames.sunday,
              dayOfWeekNumber__numerationFrom0ForSunday: 0
            },

            /* === 4th week === */
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 20,
              dayOfWeekName: DaysOfWeekNames.monday,
              dayOfWeekNumber__numerationFrom0ForSunday: 1
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 21,
              dayOfWeekName: DaysOfWeekNames.tuesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 2
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 22,
              dayOfWeekName: DaysOfWeekNames.wednesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 3
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 23,
              dayOfWeekName: DaysOfWeekNames.thursday,
              dayOfWeekNumber__numerationFrom0ForSunday: 4
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 24,
              dayOfWeekName: DaysOfWeekNames.friday,
              dayOfWeekNumber__numerationFrom0ForSunday: 5
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 25,
              dayOfWeekName: DaysOfWeekNames.saturday,
              dayOfWeekNumber__numerationFrom0ForSunday: 6
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 26,
              dayOfWeekName: DaysOfWeekNames.sunday,
              dayOfWeekNumber__numerationFrom0ForSunday: 0
            },

            /* === 5th week === */
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 27,
              dayOfWeekName: DaysOfWeekNames.monday,
              dayOfWeekNumber__numerationFrom0ForSunday: 1
            },
            {
              year: 2023,
              monthName: MonthsNames.february,
              monthNumber__numerationFrom0: 1,
              monthNumber__numerationFrom1: 2,
              dayOfMonth: 28,
              dayOfWeekName: DaysOfWeekNames.tuesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 2
            },
            {
              year: 2023,
              monthName: MonthsNames.march,
              monthNumber__numerationFrom0: 2,
              monthNumber__numerationFrom1: 3,
              dayOfMonth: 1,
              dayOfWeekName: DaysOfWeekNames.wednesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 3
            },
            {
              year: 2023,
              monthName: MonthsNames.march,
              monthNumber__numerationFrom0: 2,
              monthNumber__numerationFrom1: 3,
              dayOfMonth: 2,
              dayOfWeekName: DaysOfWeekNames.thursday,
              dayOfWeekNumber__numerationFrom0ForSunday: 4
            },
            {
              year: 2023,
              monthName: MonthsNames.march,
              monthNumber__numerationFrom0: 2,
              monthNumber__numerationFrom1: 3,
              dayOfMonth: 3,
              dayOfWeekName: DaysOfWeekNames.friday,
              dayOfWeekNumber__numerationFrom0ForSunday: 5
            },
            {
              year: 2023,
              monthName: MonthsNames.march,
              monthNumber__numerationFrom0: 2,
              monthNumber__numerationFrom1: 3,
              dayOfMonth: 4,
              dayOfWeekName: DaysOfWeekNames.saturday,
              dayOfWeekNumber__numerationFrom0ForSunday: 6
            },
            {
              year: 2023,
              monthName: MonthsNames.march,
              monthNumber__numerationFrom0: 2,
              monthNumber__numerationFrom1: 3,
              dayOfMonth: 5,
              dayOfWeekName: DaysOfWeekNames.sunday,
              dayOfWeekNumber__numerationFrom0ForSunday: 0
            },

            /* === 6th week === */
            {
              year: 2023,
              monthName: MonthsNames.march,
              monthNumber__numerationFrom0: 2,
              monthNumber__numerationFrom1: 3,
              dayOfMonth: 6,
              dayOfWeekName: DaysOfWeekNames.monday,
              dayOfWeekNumber__numerationFrom0ForSunday: 1
            },
            {
              year: 2023,
              monthName: MonthsNames.march,
              monthNumber__numerationFrom0: 2,
              monthNumber__numerationFrom1: 3,
              dayOfMonth: 7,
              dayOfWeekName: DaysOfWeekNames.tuesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 2
            },
            {
              year: 2023,
              monthName: MonthsNames.march,
              monthNumber__numerationFrom0: 2,
              monthNumber__numerationFrom1: 3,
              dayOfMonth: 8,
              dayOfWeekName: DaysOfWeekNames.wednesday,
              dayOfWeekNumber__numerationFrom0ForSunday: 3
            },
            {
              year: 2023,
              monthName: MonthsNames.march,
              monthNumber__numerationFrom0: 2,
              monthNumber__numerationFrom1: 3,
              dayOfMonth: 9,
              dayOfWeekName: DaysOfWeekNames.thursday,
              dayOfWeekNumber__numerationFrom0ForSunday: 4
            },
            {
              year: 2023,
              monthName: MonthsNames.march,
              monthNumber__numerationFrom0: 2,
              monthNumber__numerationFrom1: 3,
              dayOfMonth: 10,
              dayOfWeekName: DaysOfWeekNames.friday,
              dayOfWeekNumber__numerationFrom0ForSunday: 5
            },
            {
              year: 2023,
              monthName: MonthsNames.march,
              monthNumber__numerationFrom0: 2,
              monthNumber__numerationFrom1: 3,
              dayOfMonth: 11,
              dayOfWeekName: DaysOfWeekNames.saturday,
              dayOfWeekNumber__numerationFrom0ForSunday: 6
            },
            {
              year: 2023,
              monthName: MonthsNames.march,
              monthNumber__numerationFrom0: 2,
              monthNumber__numerationFrom1: 3,
              dayOfMonth: 12,
              dayOfWeekName: DaysOfWeekNames.sunday,
              dayOfWeekNumber__numerationFrom0ForSunday: 0
            }

          ]
        );

      }
    );

  });

});
