import { cropArray } from "@yamato-daiwa/es-extensions";


/* [ Immutable cropping from start ] */
/* 〚 Output 〛[ "BRAVO", "CHARLIE", "DELTA" ] */
console.log(
  cropArray({
    targetArray: [ "ALPHA", "BRAVO", "CHARLIE", "DELTA", "ECHO" ],
    fromStart: true,
    startingElementNumber__numerationFrom0: 1,
    endingElementNumber__numerationFrom0__including: 3,
    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
    mutably: false
  })
);


/* [ Mutable cropping from start by elements count ] */
const sample: Array<string> = [ "ALPHA", "BRAVO", "CHARLIE", "DELTA", "ECHO" ];

cropArray({
  targetArray: sample,
  fromStart: true,
  startingElementNumber__numerationFrom1: 2,
  elementsCount: 3,
  mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
  mutably: true
});

/* 〚 Output 〛[ "BRAVO", "CHARLIE", "DELTA" ] */
console.log(sample);


/* [ Immutable cropping from end ] */
/* 〚 Output 〛[ "ALPHA", "BRAVO", "CHARLIE" ] */
console.log(
  cropArray({
    targetArray: [ "ALPHA", "BRAVO", "CHARLIE", "DELTA", "ECHO" ],
    fromEnd: true,
    rightElementNumber__numerationFrom1_AndRight: 3,
    untilLeftmostElement: true,
    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
    mutably: false
  })
);


/* [ Ignoring of out-of-range request ] */
/* 〚 Output 〛[ "ECHO" ] */
console.log(
  cropArray({
    targetArray: [ "ALPHA", "BRAVO", "CHARLIE", "DELTA", "ECHO" ],
    fromStart: true,
    startingElementNumber__numerationFrom0: 4,
    elementsCount: 3,
    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: false,
    mutably: false
  })
);


/* [ Throwing of error for out-of-range request ] */
/* `InvalidParameterValueError` will be thrown */
console.log(
  cropArray({
    targetArray: [ "ALPHA", "BRAVO", "CHARLIE", "DELTA", "ECHO" ],
    fromStart: true,
    startingElementNumber__numerationFrom0: 4,
    elementsCount: 3,
    mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: true,
    mutably: false
  })
);
