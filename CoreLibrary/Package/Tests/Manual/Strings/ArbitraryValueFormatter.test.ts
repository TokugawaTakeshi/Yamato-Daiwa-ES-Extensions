import { ArbitraryValueFormatter } from "../../../Source";


console.log("=========================================================");
console.log("FOO");
console.log(ArbitraryValueFormatter.stringifyAndFormat("FOO"));

console.log("=========================================================");
console.log(Symbol("FOO"));
console.log(ArbitraryValueFormatter.stringifyAndFormat(Symbol("FOO")));

console.log("=========================================================");
console.log(123);
console.log(ArbitraryValueFormatter.stringifyAndFormat(123));

console.log("=========================================================");
console.log(123n);
console.log(ArbitraryValueFormatter.stringifyAndFormat(123n));

console.log("=========================================================");
console.log(true);
console.log(ArbitraryValueFormatter.stringifyAndFormat(true));

console.log("=========================================================");
/* eslint-disable-next-line no-undefined -- For testing purposes */
console.log(undefined);
/* eslint-disable-next-line no-undefined -- For testing purposes */
console.log(ArbitraryValueFormatter.stringifyAndFormat(undefined));

console.log("=========================================================");
console.log(null);
console.log(ArbitraryValueFormatter.stringifyAndFormat(null));


console.log("=========================================================");
console.log(

  /* eslint-disable-next-line prefer-arrow-callback -- For testing purposes */
  function sample(): string {
    return "TEST";
  }

);
console.log(
  ArbitraryValueFormatter.stringifyAndFormat(

    /* eslint-disable-next-line prefer-arrow-callback -- For testing purposes */
    function sample(): string {
      return "TEST";
    }

  )
);

console.log("=========================================================");
console.log(String);
console.log(ArbitraryValueFormatter.stringifyAndFormat(String));


console.log("=========================================================");

const sampleObject1: Readonly<{
  alpha: string;
  bravo: Set<string>;
}> = {
  alpha: "FOO",
  bravo: new Set<string>([ "BAR", "BAZ" ])
};

console.log(sampleObject1);
console.log(JSON.stringify(sampleObject1, null, 2));
console.log(ArbitraryValueFormatter.stringifyAndFormat(sampleObject1));


console.log("=========================================================");
const sampleMap1: Map<string, string> = new Map([
  [ "ALPHA", "FOO" ],
  [ "BRAVO", "BAR" ]
]);

console.log(sampleMap1);
console.log(JSON.stringify(sampleMap1, null, 2));
console.log(ArbitraryValueFormatter.stringifyAndFormat(sampleMap1));
