import { addElementsToArray } from "@yamato-daiwa/es-extensions";


/* [ Mutable adding of one element to start ] */
const sample1: Array<string> = [ "INITIALLY_EXISTED_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2" ];

addElementsToArray({
  targetArray: sample1,
  newElements: [ "NEW_ELEMENT-1" ],
  toStart: true,
  mutably: true
});

/* 〚 Output 〛[ "NEW_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2" ] */
console.log(sample1);


/* [ Immutable adding of one element to end ] */
const sample2: ReadonlyArray<string> = [ "INITIALLY_EXISTED_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2" ];

/* 〚 Output 〛[ "INITIALLY_EXISTED_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2", "NEW_ELEMENT-1" ] */
console.log(
  addElementsToArray({
    targetArray: sample2,
    newElements: [ "NEW_ELEMENT-1" ],
    toEnd: true,
    mutably: false
  })
);

/* 〚 Output 〛[ "INITIALLY_EXISTED_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2" ] */
console.log(sample2);


/* [ Mutable adding of multiple elements to position (numeration from 0) ] */
const sample3: Array<string> = [ "INITIALLY_EXISTED_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2" ];

addElementsToArray({
  targetArray: sample3,
  newElements: [ "NEW_ELEMENT-1", "NEW_ELEMENT-2" ],
  toPosition__numerationFrom0: 1,
  mutably: true
});

/* 〚 Output 〛[ "INITIALLY_EXISTED_ELEMENT-1", "NEW_ELEMENT-1", "NEW_ELEMENT-2", "INITIALLY_EXISTED_ELEMENT-2" ] */
console.log(sample3);


/* [ Immutable adding of multiple elements to position (numeration from 1) ] */
/* 〚 Output 〛[ "INITIALLY_EXISTED_ELEMENT-1", "NEW_ELEMENT-1", "NEW_ELEMENT-2", "INITIALLY_EXISTED_ELEMENT-2" ] */
console.log(
  addElementsToArray({
    targetArray: [ "INITIALLY_EXISTED_ELEMENT-1", "INITIALLY_EXISTED_ELEMENT-2" ],
    newElements: [ "NEW_ELEMENT-1", "NEW_ELEMENT-2" ],
    toPosition__numerationFrom1: 2,
    mutably: false
  })
);
