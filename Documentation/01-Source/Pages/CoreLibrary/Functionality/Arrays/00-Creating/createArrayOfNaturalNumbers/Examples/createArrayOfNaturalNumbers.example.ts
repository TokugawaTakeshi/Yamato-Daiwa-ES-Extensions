import { createArrayOfNaturalNumbers } from "@yamato-daiwa/es-extensions";


/* 〚 Output 〛[ 1, 2, 3 ] */
console.log(
  createArrayOfNaturalNumbers({ elementsCount: 3 })
);

/* 〚 Output 〛[ 3, 2, 1 ] */
console.log(
  createArrayOfNaturalNumbers({ elementsCount: 3, isDescendingOrder: true })
);

/* 〚 Output 〛[ 6, 7, 8 ] */
console.log(
  createArrayOfNaturalNumbers({ elementsCount: 3, startingNumber: 6 })
);

/* `InvalidParameterValueError` will be thrown */
console.log(
  createArrayOfNaturalNumbers({ elementsCount: 3, startingNumber: 1, isDescendingOrder: true })
);
