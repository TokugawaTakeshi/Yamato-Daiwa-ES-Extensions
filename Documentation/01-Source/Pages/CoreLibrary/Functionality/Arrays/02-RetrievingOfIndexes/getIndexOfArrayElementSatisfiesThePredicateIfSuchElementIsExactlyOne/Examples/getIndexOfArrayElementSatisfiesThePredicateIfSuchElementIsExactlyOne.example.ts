import { getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne } from "@yamato-daiwa/es-extensions";


type Product = { ID: number; title: string; price: number; };

const sample: ReadonlyArray<Product> = [
  { ID: 1, title: "ALPHA", price: 100 },
  { ID: 2, title: "BRAVO", price: 500 }
];

/* 〚 Output 〛1  */
console.log(
  getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
    sample, (product: Product): boolean => product.ID === 2
  )
);

/* 〚 Output 〛null  */
console.log(
  getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
    sample, (product: Product): boolean => product.ID === 3
  )
);

/* 〚 Output 〛null  */
console.log(
  getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
    sample, (product: Product): boolean => product.price > 50
  )
);

/* `UnexpectedEventError` will be thrown */
console.log(
  getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
    sample,
    (product: Product): boolean => product.ID === 3,
    { mustThrowErrorIfElementNotFoundOrMatchesAreMultiple: true }
  )
);
