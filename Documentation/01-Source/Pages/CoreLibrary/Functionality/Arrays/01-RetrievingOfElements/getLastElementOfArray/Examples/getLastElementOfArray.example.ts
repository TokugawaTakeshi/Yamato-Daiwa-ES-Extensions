import { getLastElementOfArray } from "@yamato-daiwa/es-extensions";


/* 〚 Output 〛charlie  */
console.log(
  getLastElementOfArray([ "alpha", "bravo", "charlie" ])
);

/* 〚 Output 〛null  */
console.log(
  getLastElementOfArray([])
);

/* `UnexpectedEventError` will be thrown */
console.log(
  getLastElementOfArray([], { mustThrowErrorIfArrayIsEmpty: true })
);
