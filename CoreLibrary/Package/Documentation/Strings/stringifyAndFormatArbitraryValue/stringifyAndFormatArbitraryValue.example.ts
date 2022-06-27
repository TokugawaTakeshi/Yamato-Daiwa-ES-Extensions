import { stringifyAndFormatArbitraryValue } from "../../../Source";


console.log("Plain object:");
console.log(stringifyAndFormatArbitraryValue({ foo: "ALPHA", bar: "BRAVO" }));

console.log("\n");
console.log("Array of objects:");
console.log(stringifyAndFormatArbitraryValue([
  { foo: "ALPHA", bar: "BRAVO" },
  { foo: "CHARLIE", bar: "DELTA" }
]));

console.log("\n");
console.log("Error instance:");
console.log(stringifyAndFormatArbitraryValue(new Error("Something wrong")));

console.log("\n");
console.log("Regular expression:");
console.log(stringifyAndFormatArbitraryValue(/^\d$/u));

console.log("\n");
console.log("Set:");
console.log(stringifyAndFormatArbitraryValue(new Set([ "ALPHA", "BRAVO" ])));

console.log("\n");
console.log("Map:");
console.log(stringifyAndFormatArbitraryValue(new Map([
  [ "ALPHA", { foo: 1 } ],
  [ "BRAVO", { bar: 2 } ]
])));
