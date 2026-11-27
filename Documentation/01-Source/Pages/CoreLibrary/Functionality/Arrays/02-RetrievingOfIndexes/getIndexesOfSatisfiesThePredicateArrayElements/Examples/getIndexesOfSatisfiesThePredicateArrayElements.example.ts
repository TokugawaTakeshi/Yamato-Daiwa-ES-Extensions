import { getIndexesOfSatisfiesThePredicateArrayElements } from "@yamato-daiwa/es-extensions";


type Product = { title: string; price: number; };

const sample: ReadonlyArray<Product> = [
  { title: "ALPHA", price: 100 },
  { title: "BRAVO", price: 500 },
  { title: "CHARLIE", price: 1000 },
  { title: "DELTA", price: 1500 }
];

/* 〚 Output 〛[ 2, 3 ] */
console.log(
  getIndexesOfSatisfiesThePredicateArrayElements(
    sample, (arrayElement: Product): boolean => arrayElement.price > 500
  )
);

/* 〚 Output 〛[] */
console.log(
  getIndexesOfSatisfiesThePredicateArrayElements(
    sample, (arrayElement: Product): boolean => arrayElement.price > 1500
  )
);
