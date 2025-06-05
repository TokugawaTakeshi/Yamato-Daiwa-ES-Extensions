import { ArbitraryValueFormatter } from "../../../Source";


console.log(ArbitraryValueFormatter.stringifyAndFormat("FOO"));
console.log(ArbitraryValueFormatter.stringifyAndFormat(Symbol("FOO")));
console.log(ArbitraryValueFormatter.stringifyAndFormat(123));
console.log(ArbitraryValueFormatter.stringifyAndFormat(123n));
console.log(ArbitraryValueFormatter.stringifyAndFormat(true));

/* eslint-disable-next-line no-undefined -- For testing purposes */
console.log(ArbitraryValueFormatter.stringifyAndFormat(undefined));
console.log(ArbitraryValueFormatter.stringifyAndFormat(null));

console.log(
  ArbitraryValueFormatter.stringifyAndFormat(

    /* eslint-disable-next-line prefer-arrow-callback -- For testing purposes */
    function sample(): string {
      return "TEST";
    }

  )
);

console.log(String);
