// import Assert from "assert";
// import { doesTimeIntervalsOverlaps } from "../../../Source";


// describe("doesTimeIntervalsOverlaps", (): void => {
//
//   describe("No overlapping cases", (): void => {
//
//     const firstInterval: [ Date, Date ] = [ new Date("2022, 11, 1"), new Date("2022, 11, 15") ];
//     const secondInterval: [ Date, Date ] = [ new Date("2022, 12, 1"), new Date("2022, 12, 15") ];
//
//     it("test", (): void => {
//
//       Assert.strictEqual(
//         doesTimeIntervalsOverlaps({
//           firstInterval: { starting: firstInterval[0], ending: firstInterval[1] },
//           secondInterval: { starting: secondInterval[0], ending: secondInterval[1] },
//           mustConsiderExactJunctionAsOverlapping: true
//         }),
//         false
//       );
//
//     });
//
//   });
//
//   describe("Exact joining", (): void => {
//
//     const firstInterval: [ Date, Date ] = [ new Date("2022, 11, 1"), new Date("2022, 11, 15") ];
//     const secondInterval: [ Date, Date ] = [ new Date("2022, 11, 15"), new Date("2022, 11, 17") ];
//
//     it("test", (): void => {
//
//       Assert.strictEqual(
//         doesTimeIntervalsOverlaps({
//           firstInterval: { starting: firstInterval[0], ending: firstInterval[1] },
//           secondInterval: { starting: secondInterval[0], ending: secondInterval[1] },
//           mustConsiderExactJunctionAsOverlapping: false
//         }),
//         false
//       );
//
//       Assert.strictEqual(
//         doesTimeIntervalsOverlaps({
//           firstInterval: { starting: firstInterval[0], ending: firstInterval[1] },
//           secondInterval: { starting: secondInterval[0], ending: secondInterval[1] },
//           mustConsiderExactJunctionAsOverlapping: true
//         }),
//         true
//       );
//
//     });
//
//   });
//
//   describe("Strongly pronounced", (): void => {
//
//     const firstInterval: [ Date, Date ] = [ new Date("2022, 11, 1"), new Date("2022, 11, 15") ];
//     const secondInterval: [ Date, Date ] = [ new Date("2022, 11, 2"), new Date("2022, 11, 17") ];
//
//     it("test", (): void => {
//
//       Assert.strictEqual(
//         doesTimeIntervalsOverlaps({
//           firstInterval: { starting: firstInterval[0], ending: firstInterval[1] },
//           secondInterval: { starting: secondInterval[0], ending: secondInterval[1] },
//           mustConsiderExactJunctionAsOverlapping: true
//         }),
//         true
//       );
//
//     });
//
//   });
//
// });
