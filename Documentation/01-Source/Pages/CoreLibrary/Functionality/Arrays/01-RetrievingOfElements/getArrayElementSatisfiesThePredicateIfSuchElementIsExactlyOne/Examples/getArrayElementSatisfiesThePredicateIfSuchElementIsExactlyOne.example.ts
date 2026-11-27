import { getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne } from "@yamato-daiwa/es-extensions";


const sample: ReadonlyArray<string> = [ "Saint Paul", "Santa Barbara", "St. Louis", "Santa Monica" ];

/* 〚 Output 〛"St. Louis" */
console.log(
  getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
    sample, (arrayElement: string): boolean => arrayElement.startsWith("St.")
  )
);

/* 〚 Output 〛null */
console.log(
  getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
    sample, (arrayElement: string): boolean => arrayElement.startsWith("Santa")
  )
);

/* 〚 Output 〛null */
console.log(
  getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
    sample, (arrayElement: string): boolean => arrayElement.startsWith("Las")
  )
);

/* `UnexpectedEventError` will be thrown */
console.log(
  getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
    sample,
    (arrayElement: string): boolean => arrayElement.startsWith("Santa"),
    { mustThrowErrorIfElementNotFoundOrMatchesAreMultiple: true }
  )
);
